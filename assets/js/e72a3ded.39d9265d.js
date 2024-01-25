"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[702],{3905:(e,n,t)=>{t.r(n),t.d(n,{MDXContext:()=>s,MDXProvider:()=>f,mdx:()=>h,useMDXComponents:()=>d,withMDXComponents:()=>u});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(){return i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},i.apply(this,arguments)}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),u=function(e){return function(n){var t=d(n.components);return r.createElement(e,i({},n,{components:t}))}},d=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},f=function(e){var n=d(e.components);return r.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=d(t),f=o,m=u["".concat(a,".").concat(f)]||u[f]||p[f]||i;return t?r.createElement(m,c(c({ref:n},s),{},{components:t})):r.createElement(m,c({ref:n},s))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var s=2;s<i;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},12038:(e,n,t)=>{t.d(n,{EO:()=>c,O1:()=>a,Rr:()=>l});var r=t(67294),o=t(44256);let i;function a(e){return r.createElement("a",{href:i+e.file},e.file)}function c(e){return r.createElement("a",{href:i+e.file},e.children)}i=(0,o.isInternal)()?"https://www.internalfb.com/code/fbsource/fbcode/":"https://github.com/facebookincubator/Glean/tree/master/";const l=e=>{let{children:n,internal:t,external:i}=e;return(0,o.fbContent)({internal:r.createElement("code",null,t),external:r.createElement("code",null,i)})}},5021:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var r=t(83117),o=(t(67294),t(3905)),i=(t(44256),t(12038));const a={id:"lsif-go",title:"Go",sidebar_label:"Go"},c=void 0,l={unversionedId:"indexer/lsif-go",id:"indexer/lsif-go",title:"Go",description:"To index Go we use SourceGraph's LSIF indexer for Go. LSIF is a new format for tools to share information about code. Binary releases of lsif-go are available ffor x86 Linux which will work as Glean indexers. The LSIF indexer uses a recent (>1.15) version of Go.",source:"@site/docs/indexer/lsif-go.md",sourceDirName:"indexer",slug:"/indexer/lsif-go",permalink:"/docs/indexer/lsif-go",draft:!1,editUrl:"https://github.com/facebookincubator/Glean/tree/main/glean/website/docs/indexer/lsif-go.md",tags:[],version:"current",frontMatter:{id:"lsif-go",title:"Go",sidebar_label:"Go"},sidebar:"someSidebar",previous:{title:"TypeScript",permalink:"/docs/indexer/lsif-typescript"},next:{title:"Rust",permalink:"/docs/indexer/lsif-rust"}},s={},u=[{value:"Run the indexer",id:"run-the-indexer",level:2},{value:"In the shell",id:"in-the-shell",level:2},{value:"Schema",id:"schema",level:2}],d={toc:u};function f(e){let{components:n,...t}=e;return(0,o.mdx)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("p",null,"To index ",(0,o.mdx)("a",{parentName:"p",href:"https://go.dev/"},"Go")," we use SourceGraph's ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/sourcegraph/lsif-go"},"LSIF indexer for Go"),". ",(0,o.mdx)("a",{parentName:"p",href:"https://lsif.dev"},"LSIF")," is a new format for tools to share information about code. Binary releases of ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/sourcegraph/lsif-go/releases"},"lsif-go")," are available ffor x86 Linux which will work as Glean indexers. The LSIF indexer uses a recent (>1.15) ",(0,o.mdx)("a",{parentName:"p",href:"https://go.dev/dl/"},"version of Go"),"."),(0,o.mdx)("h2",{id:"run-the-indexer"},"Run the indexer"),(0,o.mdx)("p",null,"The indexer is run via the main ",(0,o.mdx)("inlineCode",{parentName:"p"},"glean")," CLI tool."),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},"> cabal build exe:glean\n")),(0,o.mdx)("p",null,"And index your Go repository with:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},"glean index go DIR --db NAME/INSTANCE\n")),(0,o.mdx)("p",null,"where"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"DIR")," is the root directory containing the Go project"),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"name/hash")," is the name of the repository to create")),(0,o.mdx)("p",null,"Provide the usual ",(0,o.mdx)("inlineCode",{parentName:"p"},"--db-root")," and ",(0,o.mdx)("inlineCode",{parentName:"p"},"--schema")," or ",(0,o.mdx)("inlineCode",{parentName:"p"},"--service")," arguments\nto ",(0,o.mdx)("inlineCode",{parentName:"p"},"glean")),(0,o.mdx)("h2",{id:"in-the-shell"},"In the shell"),(0,o.mdx)("p",null,"Go source can also be indexed directly from the Glean shell:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre"},":index go DIR\n")),(0,o.mdx)("p",null,"The shell will pick a DB name and hash for you based on ",(0,o.mdx)("inlineCode",{parentName:"p"},"DIR"),"."),(0,o.mdx)("h2",{id:"schema"},"Schema"),(0,o.mdx)("p",null,"The schema is in ",(0,o.mdx)(i.O1,{file:"glean/schema/source/lsif.angle",mdxType:"SrcFile"})))}f.isMDXComponent=!0},47596:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(n){i(n)}}function c(e){try{l(r.throw(e))}catch(n){i(n)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getSpecInfo=void 0;const o=t(11737);n.getSpecInfo=function(e){return r(this,void 0,void 0,(function*(){return yield o.call({module:"bloks",api:"getSpecInfo",args:{styleId:e}})}))}},11737:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(n){i(n)}}function c(e){try{l(r.throw(e))}catch(n){i(n)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.call=void 0;let r=!1,o=0;const i={};n.call=function(e){return t(this,void 0,void 0,(function*(){if("staticdocs.thefacebook.com"!==window.location.hostname&&"localhost"!==window.location.hostname)return Promise.reject(new Error("Not running on static docs"));r||(r=!0,window.addEventListener("message",(e=>{if("static-docs-bridge-response"!==e.data.event)return;const n=e.data.id;n in i||console.error(`Recieved response for id: ${n} with no matching receiver`),"response"in e.data?i[n].resolve(e.data.response):i[n].reject(new Error(e.data.error)),delete i[n]})));const n=o++,t=new Promise(((e,t)=>{i[n]={resolve:e,reject:t}})),a={event:"static-docs-bridge-call",id:n,module:e.module,api:e.api,args:e.args},c="localhost"===window.location.hostname?"*":"https://www.internalfb.com";return window.parent.postMessage(a,c),t}))}},24855:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(n){i(n)}}function c(e){try{l(r.throw(e))}catch(n){i(n)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.reportFeatureUsage=n.reportContentCopied=void 0;const o=t(11737);n.reportContentCopied=function(e){return r(this,void 0,void 0,(function*(){const{textContent:n}=e;try{yield o.call({module:"feedback",api:"reportContentCopied",args:{textContent:n}})}catch(t){}}))},n.reportFeatureUsage=function(e){return r(this,void 0,void 0,(function*(){const{featureName:n,id:t}=e;console.log("used feature");try{yield o.call({module:"feedback",api:"reportFeatureUsage",args:{featureName:n,id:t}})}catch(r){}}))}},44256:function(e,n,t){var r=this&&this.__createBinding||(Object.create?function(e,n,t,r){void 0===r&&(r=t),Object.defineProperty(e,r,{enumerable:!0,get:function(){return n[t]}})}:function(e,n,t,r){void 0===r&&(r=t),e[r]=n[t]}),o=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&r(n,e,t);return o(n,e),n};Object.defineProperty(n,"__esModule",{value:!0}),n.OssOnly=n.FbInternalOnly=n.getEphemeralDiffNumber=n.hasEphemeralDiffNumber=n.isInternal=n.validateFbContentArgs=n.fbInternalOnly=n.fbContent=n.inpageeditor=n.feedback=n.uidocs=n.bloks=void 0,n.bloks=i(t(47596)),n.uidocs=i(t(17483)),n.feedback=i(t(24855)),n.inpageeditor=i(t(27312));const a=["internal","external"];function c(e){return s(e),u()?"internal"in e?l(e.internal):[]:"external"in e?l(e.external):[]}function l(e){return"function"==typeof e?e():e}function s(e){if("object"!=typeof e)throw new Error(`fbContent() args must be an object containing keys: ${a}. Instead got ${e}`);if(!Object.keys(e).find((e=>a.find((n=>n===e)))))throw new Error(`No valid args found in ${JSON.stringify(e)}. Accepted keys: ${a}`);const n=Object.keys(e).filter((e=>!a.find((n=>n===e))));if(n.length>0)throw new Error(`Unexpected keys ${n} found in fbContent() args. Accepted keys: ${a}`)}function u(){try{return Boolean(!1)}catch(e){return console.log("process.env.FB_INTERNAL couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),!1}}function d(){try{return null}catch(e){return console.log("process.env.PHABRICATOR_DIFF_NUMBER couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),null}}n.fbContent=c,n.fbInternalOnly=function(e){return c({internal:e})},n.validateFbContentArgs=s,n.isInternal=u,n.hasEphemeralDiffNumber=function(){return Boolean(d())},n.getEphemeralDiffNumber=d,n.FbInternalOnly=function(e){return u()?e.children:null},n.OssOnly=function(e){return u()?null:e.children}},27312:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(n){i(n)}}function c(e){try{l(r.throw(e))}catch(n){i(n)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.submitDiff=void 0;const o=t(11737);n.submitDiff=function(e){return r(this,void 0,void 0,(function*(){const{file_path:n,new_content:t,project_name:r,diff_number:i}=e;try{return yield o.call({module:"inpageeditor",api:"createPhabricatorDiffApi",args:{file_path:n,new_content:t,project_name:r,diff_number:i}})}catch(a){throw new Error(`Error occurred while trying to submit diff. Stack trace: ${a}`)}}))}},17483:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(n){i(n)}}function c(e){try{l(r.throw(e))}catch(n){i(n)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getApi=n.docsets=void 0;const o=t(11737);n.docsets={BLOKS_CORE:"887372105406659"},n.getApi=function(e){return r(this,void 0,void 0,(function*(){const{name:n,framework:t,docset:r}=e;return yield o.call({module:"uidocs",api:"getApi",args:{name:n,framework:t,docset:r}})}))}}}]);