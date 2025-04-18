/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include <atomic>
#include <chrono>

#include <folly/Chrono.h>
#include <folly/stop_watch.h>

#include "glean/rts/bytecode/syscall.h"
#include "glean/rts/query.h"
#include "glean/rts/serialize.h"
#include "glean/rts/set.h"

namespace facebook {
namespace glean {
namespace rts {

namespace {

// check for timeout in 1% of all next() calls, because Clock::now()
// is not cheap.
static constexpr uint32_t CHECK_TIMEOUT_INTERVAL = 100;

using Clock = folly::chrono::coarse_steady_clock;

// all queries started before the last interrupt will be aborted.
std::atomic<std::chrono::time_point<Clock>> last_interrupt =
    folly::chrono::coarse_steady_clock::time_point::min();

struct QueryExecutor : SetOps {
  // The following methods are all invoked from the compiled query
  // subroutine to access the DB and record results.

  // A live fact iterator
  using IterToken = uint64_t;

  // iterators
  struct Iter {
    std::unique_ptr<rts::FactIterator> iter;
    // remember the type and current key so that we can capture the
    // state of this iterator for a continuation.
    Pid type;
    Id id;
    size_t prefix_size;
    bool first;
  };

  QueryExecutor(
      Inventory& inventory,
      Define& facts,
      DefineOwnership* ownership,
      Subroutine& sub,
      Pid pid,
      std::shared_ptr<Subroutine> traverse,
      Depth depth,
      std::unordered_set<Pid, folly::hasher<Pid>>& expandPids,
      bool wantStats,
      std::vector<Iter> iters,
      uint64_t max_set_size)
      : SetOps(max_set_size),
        inventory(inventory),
        facts(facts),
        ownership(ownership),
        sub(sub),
        pid(pid),
        traverse(traverse),
        depth(depth),
        expandPids(expandPids),
        wantStats(wantStats),
        iters(std::move(iters)) {}

  //
  // Initiate a traversal of facts for a particular predicate and
  // key prefix. Returns a token that can be passed to next() to
  // fetch the next fact.
  //
  IterToken
  seek(Pid type, const unsigned char* key_begin, const unsigned char* key_end);

  IterToken seekWithinSection(
      Pid type,
      const unsigned char* key_begin,
      const unsigned char* key_end,
      Id from,
      Id upto);

  //
  // Returns the current seek token, so that the state can be reset in
  // the future using endSeek(). This is used for implementing
  // non-local jumps in the generated code.
  //
  IterToken currentSeek();

  //
  // Release the state associated with a previous seek() call.
  //
  void endSeek(IterToken token);

  //
  // Get the next fact in a traversal initiated by seek().  Returns 0
  // if there are no more facts.
  //
  // Fact::Ref next(IterToken token, FactIterator::Demand demand);

  void next(
      uint64_t token,
      uint64_t demand,
      Reg<uint64_t> ok,
      Reg<const unsigned char*> clause_begin,
      Reg<const unsigned char*> key_end,
      Reg<const unsigned char*> clause_end,
      Reg<Id> id);

  //
  // Look up a fact with id fid, and copy its key into kout and value
  // into vout.
  //
  // If kout is null, then don't copy the key (respectively vout/value).
  //
  // If kout is non-null, then it is reset to empty before copying the
  // key. This is to avoid the caller needing to remember to
  // ResetOutput() every time.
  //
  Pid lookupKeyValue(Id fid, binary::Output* kout, binary::Output* vout);

  //
  // Define a new derived fact, and return its fact ID.
  //
  Id newDerivedFact(Pid type, binary::Output* clause, size_t keySize);

  //
  // Record a nested fact that we visited during traversal, see
  // resultWithPid()
  //
  void nestedFact(Id id, Pid pid);

  //
  // Record a query result and return the total number of bytes produced.
  //
  size_t recordResult(
      Id id,
      binary::Output* key,
      binary::Output* val,
      Pid pid,
      bool rec);

  //
  // Wrapper around recordResult() which ignores the return value.
  //
  void resultWithPid(
      Id id,
      binary::Output* key,
      binary::Output* val,
      Pid pid,
      bool rec) {
    recordResult(id, key, val, pid, rec);
  }

  //
  // First free id of the underlying Define.
  //
  Id firstFreeId() {
    return facts.firstFreeId();
  }

  //
  // wrapper around resultWithPid() used by ordinary queries where we
  // want the prevailing pid and recursive values.
  //
  // Result is:
  //   0   if this fact ID was already in the result set
  //   >0  if this fact ID is new (result is the size in bytes of the
  //       fact and all its recursively nested facts that were expanded)
  //
  size_t result(Id id, binary::Output* key, binary::Output* val) {
    auto added = results_added.insert(id.toWord());
    if (added.second) {
      return recordResult(id, key, val, pid, 0);
    } else {
      DVLOG(5) << "result skipped dup (" << id.toWord() << ")";
      return 0;
    }
  }

  using SerializedCont = binary::Output;

  //
  // Produce a query continuation
  //
  SerializedCont queryCont(Subroutine::Activation& act) const;

  //
  // Done; collect and return the final results
  //
  std::unique_ptr<QueryResults> finish(folly::Optional<SerializedCont> cont);

  // ------------------------------------------------------------
  // Below here: query state

  // Timeouts
  folly::stop_watch<std::chrono::nanoseconds> watch;
  std::chrono::time_point<Clock> timeout;
  uint64_t check_timeout;

  bool timeExpired() {
    if (--check_timeout == 0) {
      if (Clock::now() > timeout) {
        return true;
      } else {
        check_timeout = CHECK_TIMEOUT_INTERVAL;
      }
    }
    return false;
  }

  std::chrono::time_point<Clock> start_time;
  inline bool interrupted() {
    auto last = last_interrupt.load(std::memory_order_relaxed);
    return last > start_time;
  }

  Inventory& inventory;
  Define& facts;
  DefineOwnership* ownership;
  // if null, don't compute ownership of derived facts
  Subroutine& sub;
  Pid pid;
  // expanding nested facts
  std::shared_ptr<Subroutine> traverse;
  Depth depth;
  std::unordered_set<Pid, folly::hasher<Pid>>& expandPids;

  // results so far
  folly::F14FastSet<uint64_t, folly::Hash> results_added;
  std::vector<uint64_t> result_ids;
  std::vector<uint64_t> result_pids;
  std::vector<HsString> result_keys;
  std::vector<HsString> result_values;

  // nested result facts
  folly::F14FastSet<uint64_t, folly::Hash> nested_results_added;
  std::vector<uint64_t> nested_result_ids;
  std::vector<uint64_t> nested_result_pids;
  std::vector<HsString> nested_result_keys;
  std::vector<HsString> nested_result_values;
  std::vector<Id> nested_result_pending;

  // query stats
  folly::F14FastMap<uint64_t, uint64_t> stats;
  bool wantStats;
  uint64_t result_bytes;

  std::vector<Iter> iters;
};

uint64_t QueryExecutor::seek(
    Pid type,
    const unsigned char* key_begin,
    const unsigned char* key_end) {
  const folly::ByteRange key(key_begin, key_end);
  auto token = iters.size();
  DVLOG(5) << "seek(" << type.toWord() << ") = " << token;
  iters.emplace_back(Iter{
      facts.seek(type, key, key.size()),
      type,
      Id::invalid(),
      key.size(),
      true});
  return static_cast<uint64_t>(token);
};

uint64_t QueryExecutor::seekWithinSection(
    Pid type,
    const unsigned char* key_begin,
    const unsigned char* key_end,
    Id from,
    Id upto) {
  const folly::ByteRange key(key_begin, key_end);
  auto token = iters.size();
  DVLOG(5) << "seekWithinSection(" << type.toWord() << ") = " << token;
  iters.emplace_back(Iter{
      facts.seekWithinSection(type, key, key.size(), from, upto),
      type,
      Id::invalid(),
      key.size(),
      true});
  return static_cast<uint64_t>(token);
};

uint64_t QueryExecutor::currentSeek() {
  return iters.size();
}

void QueryExecutor::endSeek(uint64_t token) {
  DVLOG(5) << "endSeek(" << token << ")";
  while (iters.size() > token) {
    iters.pop_back();
  }
};

void QueryExecutor::next(
    uint64_t token,
    uint64_t demand,
    Reg<uint64_t> ok,
    Reg<const unsigned char*> clause_begin,
    Reg<const unsigned char*> key_end,
    Reg<const unsigned char*> clause_end,
    Reg<Id> id) {
  if (timeExpired()) {
    ok.set(2);
    return;
  }
  if (interrupted()) {
    ok.set(2);
    return;
  }

  assert(token == iters.size() - 1);
  if (iters[token].first) {
    iters[token].first = false;
  } else {
    iters[token].iter->next();
  }
  auto res = iters[token].iter->get(
      demand != 0 ? FactIterator::KeyValue : FactIterator::KeyOnly);
  if (res) {
    iters[token].id = res.id;
    if (wantStats) {
      stats[iters[token].type.toWord()]++;
    }
  }
  DVLOG(5) << "next(" << token << ") = " << (res ? res.id.toWord() : 0);

  if (!res) {
    ok.set(0);
    return;
  }

  id.set(res.id);
  clause_begin.set(res.clause.bytes().data());
  key_end.set(res.clause.key().end());
  clause_end.set(res.clause.bytes().end());
  ok.set(1);
};

Pid QueryExecutor::lookupKeyValue(
    Id fid,
    binary::Output* kout,
    binary::Output* vout) {
  DVLOG(5) << "lookupKeyValue(" << fid.toWord() << ")";
  Pid pid;
  facts.factById(fid, [&](Pid pid_, auto clause) {
    pid = pid_;
    if (kout) {
      *kout = binary::Output();
      kout->put(clause.key());
    }
    if (vout) {
      *vout = binary::Output();
      vout->put(clause.value());
    }
  });
  return pid;
};

Id QueryExecutor::newDerivedFact(
    Pid type,
    binary::Output* key,
    size_t keySize) {
  Fact::Clause clause = Fact::Clause::from(key->bytes(), keySize);
  auto id = facts.define(type, clause);
  if (id == Id::invalid()) {
    if (auto predicate = inventory.lookupPredicate(type)) {
      error(
          "query for {} produced facts with identical keys "
          "but different values",
          predicate->name);
    } else {
      error("unknown pid: {}", type.toWord());
    }
  }

  // If we are going to store this derived fact in the DB, we need to
  // know its ownership set, which is determined by the facts it was
  // derived from.
  if (ownership) {
    std::set<UsetId> owners;

    // The Ids can only be facts that we already have computed owners for.
    for (const auto& iter : iters) {
      if (iter.id != Id::invalid()) {
        auto owner = facts.getOwner(iter.id);
        if (owner == INVALID_USET) {
          VLOG(1) << "fact " << iter.id.toWord() << " has no owner";
        } else {
          owners.insert(owner);
        }
      }
    }
    if (owners.size() > 0) {
      ownership->derivedFrom(type, id, owners);
    }
  }

  return id;
};

void put(binary::Output& out, const QueryExecutor::Iter& iter) {
  if (auto fact = iter.iter->get(FactIterator::KeyOnly)) {
    serialize::put(out, fact.id);
    serialize::put(out, iter.type);
    serialize::put(out, static_cast<uint64_t>(iter.prefix_size));
    serialize::put(out, iter.first);
    serialize::put(out, iter.iter->lower_bound());
    serialize::put(out, iter.iter->upper_bound());
  } else {
    serialize::put(out, Id::invalid().toWord());
    serialize::put(out, Pid::invalid().toWord());
  }
}

using SerializedCont = binary::Output;

SerializedCont QueryExecutor::queryCont(Subroutine::Activation& act) const {
  binary::Output out;

  serialize::put(out, iters);
  serialize::put(out, act);
  serialize::put(out, pid);
  serialize::put(out, traverse);

  return out;
};

void QueryExecutor::nestedFact(Id id, Pid pid) {
  DVLOG(5) << "nestedFact: " << id.toWord();
  if (depth == Depth::ExpandPartial &&
      expandPids.find(pid) == expandPids.end()) {
    return;
  }
  auto added = nested_results_added.insert(id.toWord());
  if (added.second) {
    nested_result_pending.emplace_back(id);
  }
};

size_t QueryExecutor::recordResult(
    Id id,
    binary::Output* key,
    binary::Output* val,
    Pid pid,
    bool rec) {
  assert(id != Id::invalid());
  result_ids.emplace_back(id.toWord());
  result_pids.emplace_back(pid.toWord());
  result_keys.emplace_back(key ? key->string() : "");
  result_values.emplace_back(val ? val->string() : "");
  DVLOG(5) << "result added (" << id.toWord() << ")";
  auto key_size = key ? key->size() : 0;
  auto val_size = val ? val->size() : 0;
  size_t bytes = sizeof(Id) + key_size + val_size;
  if (rec || depth != Depth::ResultsOnly) {
    {
      binary::Output bin;
      bin.expect(key_size + val_size);
      if (key) {
        bin.put(key->bytes());
      }
      if (val) {
        bin.put(val->bytes());
      }
      auto clause = Fact::Clause::from(bin.bytes(), key_size);
      if (traverse) {
        Predicate::runTraverse(
            *traverse, syscalls<&QueryExecutor::nestedFact>(*this), clause);
        ;
      } else {
        auto predicate = inventory.lookupPredicate(pid);
        if (!predicate) {
          error("unknown pid: {}", pid.toWord());
        }
        predicate->traverse(
            syscalls<&QueryExecutor::nestedFact>(*this), clause);
      }
    }
    while (nested_result_pending.size() > 0) {
      auto id = nested_result_pending[nested_result_pending.size() - 1];
      nested_result_pending.pop_back();
      facts.factById(id, [&](Pid pid_, auto clause) {
        inventory.lookupPredicate(pid_)->traverse(
            syscalls<&QueryExecutor::nestedFact>(*this), clause);
        nested_result_ids.emplace_back(id.toWord());
        nested_result_pids.emplace_back(pid_.toWord());
        auto key = binary::mkString(clause.key());
        auto val = binary::mkString(clause.value());
        bytes += sizeof(Id) + key.size() + val.size();
        nested_result_keys.emplace_back(std::move(key));
        nested_result_values.emplace_back(std::move(val));
      });
    }
  }
  return bytes;
};

std::unique_ptr<QueryResults> QueryExecutor::finish(
    folly::Optional<SerializedCont> cont) {
  auto res = std::make_unique<QueryResults>();
  res->fact_ids = std::move(result_ids);
  res->fact_pids = std::move(result_pids);
  res->fact_keys = std::move(result_keys);
  res->fact_values = std::move(result_values);
  res->nested_fact_ids = std::move(nested_result_ids);
  res->nested_fact_pids = std::move(nested_result_pids);
  res->nested_fact_keys = std::move(nested_result_keys);
  res->nested_fact_values = std::move(nested_result_values);
  res->result_bytes = result_bytes;

  if (cont.hasValue()) {
    res->continuation = cont->string();
  };

  if (wantStats) {
    res->stats = std::move(stats);
  }
  res->elapsed_ns = watch.elapsed().count();
  return res;
}

std::unique_ptr<QueryResults> executeQuery(
    Inventory& inventory,
    Define& facts,
    DefineOwnership* ownership,
    Subroutine& sub,
    Pid pid,
    std::shared_ptr<Subroutine> traverse,
    folly::Optional<uint64_t> maxResults,
    folly::Optional<uint64_t> maxBytes,
    folly::Optional<uint64_t> maxTime,
    folly::Optional<uint64_t> maxSetSize,
    Depth depth,
    std::unordered_set<Pid, folly::hasher<Pid>>& expandPids,
    bool wantStats,
    std::vector<QueryExecutor::Iter> iters,
    std::optional<Subroutine::Activation::State> restart) {
  QueryExecutor q(
      inventory,
      facts,
      ownership,
      sub,
      pid,
      traverse,
      depth,
      expandPids,
      wantStats,
      std::move(iters),
      maxSetSize ? *maxSetSize : UINT64_MAX);

  // coarse_steady_clock is around 1ms granularity which is enough for us.
  q.timeout = Clock::now();
  q.start_time = Clock::now();
  if (maxTime) {
    q.timeout += std::chrono::milliseconds{*maxTime};
    q.check_timeout = CHECK_TIMEOUT_INTERVAL;
  } else {
    q.check_timeout = UINT64_MAX;
  }

  auto max_results = maxResults ? *maxResults : UINT64_MAX;
  auto max_bytes = maxBytes ? *maxBytes : UINT64_MAX;

  // IF YOU BREAK BACKWARD COMPATIBILITY HERE, BUMP version IN
  // Glean.Bytecode.Generate.Instruction
  //
  // IF YOU ALSO BREAK FORWARD COMPATIBILITY, BUMP lowestSupportedVersion AS
  // WELL

  const auto context_ = syscalls<
      &QueryExecutor::seek,
      &QueryExecutor::seekWithinSection,
      &QueryExecutor::currentSeek,
      &QueryExecutor::endSeek,
      &QueryExecutor::next,
      &QueryExecutor::lookupKeyValue,
      &QueryExecutor::result,
      &QueryExecutor::resultWithPid,
      &QueryExecutor::newDerivedFact,
      &QueryExecutor::firstFreeId,
      &QueryExecutor::newSet,
      &QueryExecutor::insertOutputSet,
      &QueryExecutor::setToArray,
      &QueryExecutor::freeSet,
      &QueryExecutor::newWordSet,
      &QueryExecutor::insertWordSet,
      &QueryExecutor::wordSetToArray,
      &QueryExecutor::byteSetToByteArray,
      &QueryExecutor::freeWordSet>(q);

  folly::Optional<SerializedCont> cont;
  Subroutine::Activation::with(
      sub, context_.contextptr(), [&](Subroutine::Activation& activation) {
        if (restart.has_value()) {
          activation.resume(std::move(*restart));
        } else {
          activation.start();
        }

        auto args = activation.args();
        args =
            std::copy(context_.handlers_begin(), context_.handlers_end(), args);
        *args++ = 0; // unused
        *args++ = reinterpret_cast<uint64_t>(max_results);
        uint64_t* max_bytes_p = args;
        *args++ = reinterpret_cast<uint64_t>(max_bytes);

        activation.execute();
        if (activation.suspended()) {
          cont = q.queryCont(activation);
        }

        q.result_bytes = max_bytes - *max_bytes_p;
      });

  return q.finish(std::move(cont));
}
} // namespace

void interruptRunningQueries() {
  last_interrupt = Clock::now();
}

std::unique_ptr<QueryResults> restartQuery(
    Inventory& inventory,
    Define& facts,
    DefineOwnership* ownership,
    folly::Optional<uint64_t> maxResults,
    folly::Optional<uint64_t> maxBytes,
    folly::Optional<uint64_t> maxTime,
    folly::Optional<uint64_t> maxSetSize,
    Depth depth,
    std::unordered_set<Pid, folly::hasher<Pid>>& expandPids,
    bool wantStats,
    void* serializedCont,
    uint64_t serializedContLen) {
  binary::Input in{serializedCont, serializedContLen};

  std::shared_ptr<Subroutine> traverse;
  Pid pid;

  struct DeserializeIter {
    Define& facts;

    void get(binary::Input& in, QueryExecutor::Iter& result) {
      std::unique_ptr<FactIterator> iter;
      Id id;
      Pid type;
      serialize::get(in, id);
      serialize::get(in, type);

      if (type) {
        uint64_t prefixSize;
        bool first;
        std::optional<Id> lower_bound;
        std::optional<Id> upper_bound;
        serialize::get(in, prefixSize);
        serialize::get(in, first);
        serialize::get(in, lower_bound);
        serialize::get(in, upper_bound);

        std::string keyBuf;
        bool found = facts.factById(id, [&](auto pid, Fact::Clause clause) {
          if (pid != type) {
            error("restart iter fact has wrong type");
          }
          keyBuf = binary::mkString(clause.key());
        });
        if (!found) {
          error("restart iter fact not found");
        }
        const auto key = binary::byteRange(keyBuf);
        if (lower_bound.has_value() && upper_bound.has_value()) {
          auto from = lower_bound.value();
          auto to = upper_bound.value();
          iter = facts.seekWithinSection(type, key, prefixSize, from, to);
        } else {
          iter = facts.seek(type, key, prefixSize);
        }
        auto res = iter->get(FactIterator::KeyOnly);
        if (!res || res.key() != key) {
          error("restart iter didn't find a key");
        }
        id = res.id;
        result.prefix_size = prefixSize;
        result.first = first;
      } else {
        // We serialized a finished iterator
        iter = std::make_unique<EmptyIterator>();
        id = Id::invalid();
      }
      result.iter = std::move(iter);
      result.type = type;
      result.id = id;
    }

    std::vector<QueryExecutor::Iter> getIters(binary::Input& in) {
      // I can't figure out how to use the generic serialize::get for vectors
      // here, so expanding it inline
      size_t count;
      serialize::get(in, count);
      std::vector<QueryExecutor::Iter> iters = {};
      for (size_t n = 0; n < count; n++) {
        QueryExecutor::Iter elt;
        get(in, elt);
        iters.push_back(std::move(elt));
      }
      return iters;
    }
  };

  DeserializeIter di{facts};
  auto iters = di.getIters(in);

  auto [sub, state] = Subroutine::Activation::get(in);
  serialize::get(in, pid);
  serialize::get(in, traverse);

  return executeQuery(
      inventory,
      facts,
      ownership,
      sub,
      pid,
      traverse,
      maxResults,
      maxBytes,
      maxTime,
      maxSetSize,
      depth,
      expandPids,
      wantStats,
      std::move(iters),
      std::move(state));
}

std::unique_ptr<QueryResults> executeQuery(
    Inventory& inventory,
    Define& facts,
    DefineOwnership* ownership,
    Subroutine& sub,
    Pid pid,
    std::shared_ptr<Subroutine> traverse,
    folly::Optional<uint64_t> maxResults,
    folly::Optional<uint64_t> maxBytes,
    folly::Optional<uint64_t> maxTime,
    folly::Optional<uint64_t> maxSetSize,
    Depth depth,
    std::unordered_set<Pid, folly::hasher<Pid>>& expandPids,
    bool wantStats) {
  return executeQuery(
      inventory,
      facts,
      ownership,
      sub,
      pid,
      traverse,
      maxResults,
      maxBytes,
      maxTime,
      maxSetSize,
      depth,
      expandPids,
      wantStats,
      {},
      {});
}

} // namespace rts
} // namespace glean
} // namespace facebook
