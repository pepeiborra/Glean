"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[119],{15680:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>c,MDXProvider:()=>u,mdx:()=>g,useMDXComponents:()=>m,withMDXComponents:()=>d});var a=n(96540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),d=function(e){return function(t){var n=m(t.components);return a.createElement(e,o({},t,{components:n}))}},m=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=m(e.components);return a.createElement(c.Provider,{value:t},e.children)},h="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=m(n),u=r,h=d["".concat(i,".").concat(u)]||d[u]||f[u]||o;return n?a.createElement(h,s(s({ref:t},c),{},{components:n})):a.createElement(h,s({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},67555:(e,t,n)=>{n.d(t,{D4:()=>i,Lw:()=>s,gD:()=>l});var a=n(96540),r=n(14423);let o;function i(e){return a.createElement("a",{href:o+e.file},e.file)}function s(e){return a.createElement("a",{href:o+e.file},e.children)}o=(0,r.isInternal)()?"https://www.internalfb.com/code/fbsource/fbcode/":"https://github.com/facebookincubator/Glean/tree/master/";const l=e=>{let{children:t,internal:n,external:o}=e;return(0,r.fbContent)({internal:a.createElement("code",null,n),external:a.createElement("code",null,o)})}},48880:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(58168),r=(n(96540),n(15680));n(67555);const o={slug:"incremental",title:"Incremental indexing with Glean",author:"Simon Marlow",author_title:"Simon Marlow",author_url:"https://simonmar.github.io/",author_image_url:"http://simonmar.github.io/images/simonmarlow.jpg",tags:["glean","incremental"]},i="Incremental Indexing with Glean",s={permalink:"/blog/incremental",source:"@site/blog/2022-12-01-incremental.md",title:"Incremental indexing with Glean",description:"This post describes how Glean supports incremental indexing of",date:"2022-12-01T00:00:00.000Z",formattedDate:"December 1, 2022",tags:[{label:"glean",permalink:"/blog/tags/glean"},{label:"incremental",permalink:"/blog/tags/incremental"}],readingTime:7.075,hasTruncateMarker:!1,authors:[{name:"Simon Marlow",title:"Simon Marlow",url:"https://simonmar.github.io/",imageURL:"http://simonmar.github.io/images/simonmarlow.jpg"}],frontMatter:{slug:"incremental",title:"Incremental indexing with Glean",author:"Simon Marlow",author_title:"Simon Marlow",author_url:"https://simonmar.github.io/",author_image_url:"http://simonmar.github.io/images/simonmarlow.jpg",tags:["glean","incremental"]}},l={authorsImageUrls:[void 0]},c=[{value:"Background",id:"background",level:2},{value:"How incrementality works",id:"how-incrementality-works",level:2},{value:"What about derived facts?",id:"what-about-derived-facts",level:3},{value:"Performance",id:"performance",level:3},{value:"Stacked incremental DBs",id:"stacked-incremental-dbs",level:3},{value:"Derived facts in stacked incremental DBs",id:"derived-facts-in-stacked-incremental-dbs",level:3}],d={toc:c},m="wrapper";function u(e){let{components:t,...o}=e;return(0,r.mdx)(m,(0,a.A)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("p",null,"  This post describes how Glean supports ",(0,r.mdx)("em",{parentName:"p"},"incremental indexing")," of\nsource code, to maintain an up-to-date index of a large repository\nusing minimal resources. This is an overview of the problems and\nsome aspects of how we solved them; for the technical details of the\nimplementation see ",(0,r.mdx)("a",{parentName:"p",href:"/docs/implementation/incrementality"},"Implementation Notes:\nIncrementality"),"."),(0,r.mdx)("h2",{id:"background"},"Background"),(0,r.mdx)("p",null,"Indexing a large amount of source code can take a long time. It's not\nuncommon for very large indexing jobs to take multple\nhours. Furthermore, a monolithic indexing job produces a large DB that\ncan be slow to ship around, for example to replicate across a fleet of\nGlean servers."),(0,r.mdx)("p",null,"Source code changes often, and we would like to keep the index up to\ndate, but redoing the monolithic indexing job for every change is out\nof the question. Instead what we would like to do is to update a\nmonolithic index with the ",(0,r.mdx)("em",{parentName:"p"},"changes")," between the base revision and the\ncurrent revision, which should hopefully be faster than a full\nrepository indexing job because we only have to look at the things\nthat have changed. The goal is to be able to index the changes in\n",(0,r.mdx)("em",{parentName:"p"},"O(changes)")," rather than ",(0,r.mdx)("em",{parentName:"p"},"O(repository)"),", or as close to that as we\ncan get."),(0,r.mdx)("h2",{id:"how-incrementality-works"},"How incrementality works"),(0,r.mdx)("p",null,"To produce a modified DB, we hide a portion of the data in the\noriginal DB, and then stack a DB with the new data on top. Like this:"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Incremental stack",src:n(97838).A,width:"569",height:"458"})),(0,r.mdx)("p",null,'The user asks for the DB "new", and they can then work with the data\nin exactly the same way as they would for a single DB. The fact that\nthe DB is a stack is invisible to a user making queries. Furthermore,\nthe DB "old" still exists and can be used simultaneously, giving us\naccess to multiple versions of the DB at the same time. We can even\nhave many different versions of "new", each replacing a different\nportion of "old".'),(0,r.mdx)("p",null,"All of the interesting stuff is in how we hide part of the data in the\nold DB.  How do we hide part of the data?"),(0,r.mdx)("p",null,"When facts are added to a Glean DB, the producer of the facts can\nlabel facts with a ",(0,r.mdx)("em",{parentName:"p"},"unit"),". A unit is just a string; Glean doesn't impose\nany particular meaning on units so the indexer can use whatever\nconvention it likes, but typically a unit might be a filename or\nmodule name. For example, when indexing a file F, the indexer would\nlabel all the facts it produces with the unit F."),(0,r.mdx)("p",null,"To hide some of the data in a DB, we specify which units to exclude\nfrom the base DB, like this:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},"glean create --repo <new> --incremental <old> --exclude A,B,C\n")),(0,r.mdx)("p",null,"would create a DB ",(0,r.mdx)("inlineCode",{parentName:"p"},"<new>")," that stacks on top of ",(0,r.mdx)("inlineCode",{parentName:"p"},"<old>"),", hiding units A, B\nand C."),(0,r.mdx)("p",null,"So to index some code incrementally, we would first decide which files\nneed to be reindexed, create an incremental DB that hides those files\nfrom the base DB and then add the new facts."),(0,r.mdx)("p",null,'To implement hiding correctly, Glean has to remember which facts are\nowned by which units. But it\'s not quite that simple, because facts\ncan refer to each other, and the DB contents must be valid (which has\na formal definition but informally means "no dangling\nreferences"). For example, if we have facts ',(0,r.mdx)("strong",{parentName:"p"},"x")," and ",(0,r.mdx)("strong",{parentName:"p"},"y"),", where ",(0,r.mdx)("strong",{parentName:"p"},"x")," refers to\n",(0,r.mdx)("strong",{parentName:"p"},"y"),":"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Fact dependency",src:n(43150).A,width:"380",height:"229"})),(0,r.mdx)("p",null,"and we hide unit B, then ",(0,r.mdx)("strong",{parentName:"p"},"y")," must still be visible, otherwise the\nreference from ",(0,r.mdx)("strong",{parentName:"p"},"x")," would be dangling and the DB would not be valid."),(0,r.mdx)("p",null,"So after the indexer has finished producing facts, Glean propagates\nall the units through the graph of facts, resulting in a mapping from\nfacts to ",(0,r.mdx)("strong",{parentName:"p"},"ownership sets"),"."),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Fact dependency with ownership sets",src:n(23417).A,width:"389",height:"227"})),(0,r.mdx)("p",null,"It turns out that while there are lots of facts, there are relatively\nfew distinct ownership sets. Furthermore, facts produced together tend\nto have the same ownership set, and we can use this to store the\nmapping from facts to ownership sets efficiently. To summarise:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Ownership sets are assigned unique IDs and stored in the DB using ",(0,r.mdx)("a",{href:"https://github.com/facebook/folly/blob/main/folly/experimental/EliasFanoCoding.h"},"Elias Fano Coding")),(0,r.mdx)("li",{parentName:"ul"},"The mapping from facts to ownership sets is\nstored as an interval map")),(0,r.mdx)("p",null,"As a result, keeping all this information only adds about 7% to the DB\nsize."),(0,r.mdx)("h3",{id:"what-about-derived-facts"},"What about derived facts?"),(0,r.mdx)("p",null,"Derived facts must also have ownership sets, because we have to know\nwhich derived facts to hide. When is a derived fact visible? When all\nof the facts that it was derived from are visible."),(0,r.mdx)("p",null,"For example, if we have a fact ",(0,r.mdx)("strong",{parentName:"p"},"r")," that was derived from ",(0,r.mdx)("strong",{parentName:"p"},"p")," and ",(0,r.mdx)("strong",{parentName:"p"},"q"),":"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Derived fact",src:n(45061).A,width:"881",height:"268"})),(0,r.mdx)("p",null,"The ownership set of ",(0,r.mdx)("strong",{parentName:"p"},"r")," is ",(0,r.mdx)("inlineCode",{parentName:"p"},"{ P } & { Q }"),", indicating that it should be\nvisible if both P and Q are visible. Note that facts might be derived\nfrom other derived facts, so these ownership expressions can get\narbitrarily large. Normalising them to disjunctive normal form would\nbe possible, but we haven't found that to be necessary so far."),(0,r.mdx)("h3",{id:"performance"},"Performance"),(0,r.mdx)("p",null,"There are three aspects to performance:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Indexing performance"),". We measured the impact of computing\nownership at indexing time to be 2-3% for Python, for Hack it was in\nthe noise, and we don't\nexpect other languages to be significantly different."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Query performance"),". Initially query performance for an\nincremental stack was much slower because we have to calculate the visibility of every fact discovered during a query. However, with some ",(0,r.mdx)("a",{parentName:"li",href:"/docs/implementation/incrementality#caching-fact-ownership"},"caching optimisations"),' we were able to get the overhead to less than 10% for "typical" queries, of the kind that Glass does. Queries that do a lot of searching may be impacted by around 3x, but these are not typically found in production use cases.'),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"Incremental derivation performance"),". We would like derivation in the incremental DB to take time proportional to the number of facts in the increment. We implemented incremental derivation for some kinds of query; optimising queries to achieve this in general is a hard problem that we'll return to probably next year.")),(0,r.mdx)("h3",{id:"stacked-incremental-dbs"},"Stacked incremental DBs"),(0,r.mdx)("p",null,"So far we have only been considering how to stack a single increment\non top of a base DB. What if we want to create deeper stacks?"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Stacked incremental database",src:n(33350).A,width:"564",height:"633"})),(0,r.mdx)("p",null,'The DB "newer" stacks on top of "new", and hides some more units. So\nthere are now portions of both "new" and "old" that need to be hidden\n(the darker grey boxes), in addition to the original portion of "old"\nthat we hid (light grey box).'),(0,r.mdx)("p",null,'As before, we might have multiple versions of "newer" stacked on top\nof the same "new", and in general these DB stacks form a tree. All the\nintermediate nodes of the tree are usable simultaneously: no data is\nbeing modified, only shared and viewed differently depending on which\nnode we choose as the top of our stack.'),(0,r.mdx)("p",null,"One interesting aspect that arises when we consider how to track\nownership of facts in this model is fact dependencies across the\nboundaries between DBs.  For instance, suppose we have"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Stacked dependency",src:n(2423).A,width:"612",height:"323"})),(0,r.mdx)("p",null,'If we hide B, then considering the ownership data for "old" alone\nwould tell us that y is invisible. But we must make it visible,\nbecause x depends on it. So when computing the ownership data for\n"new", we have to transitively propagate ownership to facts in the\nbase DB(s), store that in "new", and consult it when deciding which\nfacts in "old" are visible.'),(0,r.mdx)("h3",{id:"derived-facts-in-stacked-incremental-dbs"},"Derived facts in stacked incremental DBs"),(0,r.mdx)("p",null,"A fact might be derived from multiple facts in different DBs in the\nstack, and we have to represent its ownership correctly. Therefore"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"There must be a single namespace of ownership sets for the whole DB stack. That is, stacked DBs add more sets. (or else we copy ownership sets from the base DB, which doesn't seem attractive)."),(0,r.mdx)("li",{parentName:"ul"},"Since a fact may be owned multiple different ways (see previous section) we have to take this into account when computing the ownership expression for a derived fact.")),(0,r.mdx)("p",null,"This is the most complex diagram in the post (phew!):"),(0,r.mdx)("p",null,(0,r.mdx)("img",{alt:"Stacked derived",src:n(94337).A,width:"804",height:"446"})),(0,r.mdx)("p",null,'Here the dashed arrow means "derived from" and the solid arrow means\n"refers to".'),(0,r.mdx)("p",null,"The fact ",(0,r.mdx)("strong",{parentName:"p"},"d")," should be visible if both ",(0,r.mdx)("strong",{parentName:"p"},"x")," and ",(0,r.mdx)("strong",{parentName:"p"},"y")," are visible. The\nownership of ",(0,r.mdx)("strong",{parentName:"p"},"x")," is ",(0,r.mdx)("inlineCode",{parentName:"p"},"{A}")," and ",(0,r.mdx)("strong",{parentName:"p"},"y")," is ",(0,r.mdx)("inlineCode",{parentName:"p"},"{B,C}")," (because it is referred to from ",(0,r.mdx)("strong",{parentName:"p"},"z"),"\nwhich has owner B), so the final owner of ",(0,r.mdx)("strong",{parentName:"p"},"d")," is ",(0,r.mdx)("inlineCode",{parentName:"p"},"{A} && {B,C}"),"."),(0,r.mdx)("p",null,"Tracking all this shouldn't be too expensive, but it's tricky to get\nright!"))}u.isMDXComponent=!0},80510:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{l(a.next(e))}catch(t){o(t)}}function s(e){try{l(a.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getSpecInfo=void 0;const r=n(88266);t.getSpecInfo=function(e){return a(this,void 0,void 0,(function*(){return yield r.call({module:"bloks",api:"getSpecInfo",args:{styleId:e}})}))}},88266:function(e,t){var n=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{l(a.next(e))}catch(t){o(t)}}function s(e){try{l(a.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.call=void 0;let a=!1,r=0;const o={};t.call=function(e){return n(this,void 0,void 0,(function*(){if("staticdocs.thefacebook.com"!==window.location.hostname&&"localhost"!==window.location.hostname)return Promise.reject(new Error("Not running on static docs"));a||(a=!0,window.addEventListener("message",(e=>{if("static-docs-bridge-response"!==e.data.event)return;const t=e.data.id;t in o||console.error(`Recieved response for id: ${t} with no matching receiver`),"response"in e.data?o[t].resolve(e.data.response):o[t].reject(new Error(e.data.error)),delete o[t]})));const t=r++,n=new Promise(((e,n)=>{o[t]={resolve:e,reject:n}})),i={event:"static-docs-bridge-call",id:t,module:e.module,api:e.api,args:e.args},s="localhost"===window.location.hostname?"*":"https://www.internalfb.com";return window.parent.postMessage(i,s),n}))}},70680:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{l(a.next(e))}catch(t){o(t)}}function s(e){try{l(a.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.reportFeatureUsage=t.reportContentCopied=void 0;const r=n(88266);t.reportContentCopied=function(e){return a(this,void 0,void 0,(function*(){const{textContent:t}=e;try{yield r.call({module:"feedback",api:"reportContentCopied",args:{textContent:t}})}catch(n){}}))},t.reportFeatureUsage=function(e){return a(this,void 0,void 0,(function*(){const{featureName:t,id:n}=e;console.log("used feature");try{yield r.call({module:"feedback",api:"reportFeatureUsage",args:{featureName:t,id:n}})}catch(a){}}))}},14423:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.OssOnly=t.FbInternalOnly=t.getEphemeralDiffNumber=t.hasEphemeralDiffNumber=t.isInternal=t.validateFbContentArgs=t.fbInternalOnly=t.fbContent=t.inpageeditor=t.feedback=t.uidocs=t.bloks=void 0,t.bloks=o(n(80510)),t.uidocs=o(n(3730)),t.feedback=o(n(70680)),t.inpageeditor=o(n(45458));const i=["internal","external"];function s(e){return c(e),d()?"internal"in e?l(e.internal):[]:"external"in e?l(e.external):[]}function l(e){return"function"==typeof e?e():e}function c(e){if("object"!=typeof e)throw new Error(`fbContent() args must be an object containing keys: ${i}. Instead got ${e}`);if(!Object.keys(e).find((e=>i.find((t=>t===e)))))throw new Error(`No valid args found in ${JSON.stringify(e)}. Accepted keys: ${i}`);const t=Object.keys(e).filter((e=>!i.find((t=>t===e))));if(t.length>0)throw new Error(`Unexpected keys ${t} found in fbContent() args. Accepted keys: ${i}`)}function d(){try{return Boolean(!1)}catch(e){return console.log("process.env.FB_INTERNAL couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),!1}}function m(){try{return null}catch(e){return console.log("process.env.PHABRICATOR_DIFF_NUMBER couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),null}}t.fbContent=s,t.fbInternalOnly=function(e){return s({internal:e})},t.validateFbContentArgs=c,t.isInternal=d,t.hasEphemeralDiffNumber=function(){return Boolean(m())},t.getEphemeralDiffNumber=m,t.FbInternalOnly=function(e){return d()?e.children:null},t.OssOnly=function(e){return d()?null:e.children}},45458:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{l(a.next(e))}catch(t){o(t)}}function s(e){try{l(a.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.submitDiff=void 0;const r=n(88266);t.submitDiff=function(e){return a(this,void 0,void 0,(function*(){const{file_path:t,new_content:n,project_name:a,diff_number:o}=e;try{return yield r.call({module:"inpageeditor",api:"createPhabricatorDiffApi",args:{file_path:t,new_content:n,project_name:a,diff_number:o}})}catch(i){throw new Error(`Error occurred while trying to submit diff. Stack trace: ${i}`)}}))}},3730:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{l(a.next(e))}catch(t){o(t)}}function s(e){try{l(a.throw(e))}catch(t){o(t)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getApi=t.docsets=void 0;const r=n(88266);t.docsets={BLOKS_CORE:"887372105406659"},t.getApi=function(e){return a(this,void 0,void 0,(function*(){const{name:t,framework:n,docset:a}=e;return yield r.call({module:"uidocs",api:"getApi",args:{name:t,framework:n,docset:a}})}))}},45061:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/derived-e46b2a6e3925959133e37b75619495a6.jpg"},43150:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/factdep1-59c2c6ff2bb70cadfffaa8ed1c3c725c.jpg"},23417:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/factdep2-ee89a8cde4e367c8d2e99fde1b9553a0.jpg"},97838:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/stack-f1841961d75a1c2d4d1338f3d18f0179.jpg"},2423:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/stacked-dependency-37bdf977436a2c7f69570eff127cb537.jpg"},94337:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/stacked-derived-fc2ba3ed856040135fc526e8a7ff6391.jpg"},33350:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/stacked-incremental-a591470e7df3a05595e75f76fad1a7ac.jpg"}}]);