{-
  Copyright (c) Meta Platforms, Inc. and affiliates.
  All rights reserved.

  This source code is licensed under the BSD-style license found in the
  LICENSE file in the root directory of this source tree.
-}

module Glean.Query.Flatten.Types
  ( F
  , initialFlattenState
  , FlattenState(..)
  , FlattenedQuery
  , FlatQuery_(..)
  , FlatQuery
  , FlatStatement(..)
  , falseStmt
  , FlatStatementGroup
  , singletonGroup
  , boundVars
  , boundVarsOf
  , boundVarsOfGen
  , freshWildStmt
  , freshWildQuery
  ) where

import Control.Monad.Except
import Control.Monad.State
import qualified Data.IntSet as IntSet
import qualified Data.List.NonEmpty as NonEmpty
import Data.List.NonEmpty (NonEmpty(..))
import Data.Text (Text)
import Data.Text.Prettyprint.Doc hiding ((<>))

import Glean.Angle.Types hiding (Type)
import Glean.Query.Codegen.Types
import Glean.Database.Schema
import Glean.RTS.Types as RTS
import Glean.Query.Vars


type FlattenedQuery = QueryWithInfo FlatQuery

data FlatQuery_ p = FlatQuery p (Maybe p) [FlatStatementGroup]
  -- Statements are grouped by the flattener:

type FlatQuery = FlatQuery_ Pat

-- | A FlatStatementGroup is a non-empty group of FlatStatement.
--
-- A group of statements arise from a single statement in the
-- un-flattened Angle code.  The statements within each group will be
-- rearranged by the Reorder pass, but the relative order of the
-- groups will be retained.  In other words: we don't change the order
-- of statements you write, but we'll try to optimise the order of
-- matches in a nested match.
type FlatStatementGroup = NonEmpty FlatStatement

singletonGroup :: FlatStatement -> FlatStatementGroup
singletonGroup s = s :| []

instance Pretty pat => Pretty (FlatQuery_ pat) where
  pretty (FlatQuery key maybeVal stmts) = case stmts of
    [] -> head
    _ -> hang 2 (sep (head <+> "where" : map prettyGroup stmts))
    where
    head = pretty key <> maybe mempty (\val -> " -> " <> pretty val) maybeVal
    prettyGroup stmts =
      brackets (align (sep (punctuate ";"
        (map pretty (NonEmpty.toList stmts)))))

data FlatStatement
  = FlatStatement Type Pat Generator
    -- ^ A simple statement: P = gen
  | FlatNegation [FlatStatementGroup]
    -- ^ The negation of a series of statements
  | FlatDisjunction [[FlatStatementGroup]]
    -- ^ A disjunction of alternatives: (stmts; ...) | ... | (stmts; ...)
    -- As a special case, if there is just one alternative this construct
    -- is used for nesting groups within a FlatStatementGroup. See
    -- Glean.Query.Flatten.floatGroups.
  | FlatConditional
      { cond :: [FlatStatementGroup]
      , then_ :: [FlatStatementGroup]
      , else_ :: [FlatStatementGroup]
      }
    -- ^ An if-then-else statement.
    -- If the statements in the condition match, the 'then' statements are
    -- evaluated, otherwide the 'else' statements are.

  deriving Show

instance VarsOf FlatStatement where
  varsOf w s r = case s of
    FlatStatement _ lhs rhs -> varsOf w lhs $! varsOf w rhs r
    FlatNegation stmts      -> varsStmts w stmts r
    FlatDisjunction stmtss  -> foldr (varsStmts w) r stmtss
    FlatConditional cond then_ else_ ->
      foldr (varsStmts w) r [cond, then_, else_]
    where
      varsStmts w stmts r = foldr (\g r -> foldr (varsOf w) r g) r stmts

freshWildQuery :: (Monad m, Fresh m) => FlatQuery -> m FlatQuery
freshWildQuery (FlatQuery p v stmts) =
  FlatQuery
    <$> freshWild p
    <*> mapM freshWild v
    <*> mapM freshWildGroup stmts

freshWildStmt :: (Monad m, Fresh m) => FlatStatement -> m FlatStatement
freshWildStmt (FlatStatement ty pat gen) = do
  pat' <- freshWild pat
  gen' <- freshWildGen gen
  return (FlatStatement ty pat' gen')
freshWildStmt (FlatNegation groups) =
  FlatNegation <$> mapM freshWildGroup groups
freshWildStmt (FlatDisjunction alts) =
  FlatDisjunction <$> mapM (mapM freshWildGroup) alts
freshWildStmt (FlatConditional cond then_ else_) =
  FlatConditional
    <$> mapM freshWildGroup cond
    <*> mapM freshWildGroup then_
    <*> mapM freshWildGroup else_

freshWildGroup
  :: (Monad m, Fresh m)
  => FlatStatementGroup
  -> m FlatStatementGroup
freshWildGroup = mapM freshWildStmt

freshWildGen :: (Monad m, Fresh m) => Generator -> m Generator
freshWildGen gen = case gen of
  FactGenerator pid pat val sect ->
    FactGenerator pid
      <$> freshWild pat
      <*> freshWild val
      <*> pure sect
  TermGenerator expr -> TermGenerator <$> freshWild expr
  DerivedFactGenerator pid key val ->
    DerivedFactGenerator pid
      <$> freshWild key
      <*> freshWild val
  ArrayElementGenerator ty expr ->
    ArrayElementGenerator ty <$> freshWild expr
  PrimCall op args ->
    PrimCall op <$> mapM freshWild args

-- | Like 'varsOf', but only including variables that can be bound by
-- this statement.
boundVars :: FlatStatement -> VarSet
boundVars stmt = boundVarsOf stmt IntSet.empty

boundVarsOf :: FlatStatement -> VarSet -> VarSet
boundVarsOf (FlatStatement _ lhs rhs) r =
  varsOf AllVars lhs (boundVarsOfGen rhs r)
boundVarsOf (FlatNegation _) r = r -- a negated query cannot bind variables
boundVarsOf (FlatDisjunction stmtss) r = foldr varsStmts r stmtss
  where varsStmts stmts r = foldr (\g r -> foldr boundVarsOf r g) r stmts
boundVarsOf (FlatConditional cond then_ else_) r =
  varsStmts cond $ varsStmts then_ $ varsStmts else_ r
  where varsStmts stmts r = foldr (\g r -> foldr boundVarsOf r g) r stmts

boundVarsOfGen :: Generator -> VarSet -> VarSet
boundVarsOfGen DerivedFactGenerator{} r = r
boundVarsOfGen ArrayElementGenerator{} r = r
boundVarsOfGen PrimCall{} r = r
boundVarsOfGen other r = varsOf AllVars other r

-- | a statement that always fails
falseStmt :: FlatStatement
falseStmt = FlatDisjunction []

instance Pretty FlatStatement where
  pretty = \case
    FlatStatement _ lhs rhs ->
      hang 2 $ sep [pretty lhs <+> "=", pretty rhs ]
    FlatNegation groups ->
      "!" <> doStmts groups
    FlatDisjunction groupss ->
      sep (punctuate " |" (map doStmts groupss))
    FlatConditional cond then_ else_ -> sep
      [ nest 2 $ sep ["if", doStmts cond ]
      , nest 2 $ sep ["then", doStmts then_]
      , nest 2 $ sep ["else", doStmts else_]
      ]
    where
    doStmts groups =
      hang 2 (sep [sep ("(" : punctuate ";" (map pretty groups)), ")"])


data FlattenState = FlattenState
  { flDbSchema :: DbSchema
  , flNextVar :: Int
  , flDeriveStored :: Maybe PredicateId
    -- ^ we should derive this DerivedAndStored predicate
  , flStack :: [PredicateId]
    -- ^ Stack of derived predicates, to prevent recursion. (for now,
    -- until we have support for recursion).
  }

initialFlattenState
  :: DbSchema
  -> Int
  -> Maybe PredicateId
  -> FlattenState
initialFlattenState dbSchema nextVar deriveStored = FlattenState
  { flDbSchema = dbSchema
  , flNextVar = nextVar
  , flDeriveStored = deriveStored
  , flStack = []
  }

type F a = StateT FlattenState (Except Text) a

instance Fresh (StateT FlattenState (Except Text)) where
  peek = gets flNextVar
  alloc = do
    state@FlattenState{..} <- get
    put state { flNextVar = flNextVar + 1 }
    return flNextVar
