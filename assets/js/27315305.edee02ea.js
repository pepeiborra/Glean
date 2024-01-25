"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6910],{3905:(e,n,t)=>{t.r(n),t.d(n,{MDXContext:()=>c,MDXProvider:()=>m,mdx:()=>h,useMDXComponents:()=>u,withMDXComponents:()=>d});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(){return o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},o.apply(this,arguments)}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),d=function(e){return function(n){var t=u(n.components);return r.createElement(e,o({},n,{components:t}))}},u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},m=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(t),m=a,p=d["".concat(i,".").concat(m)]||d[m]||f[m]||o;return t?r.createElement(p,l(l({ref:n},c),{},{components:t})):r.createElement(p,l({ref:n},c))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=p;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},12038:(e,n,t)=>{t.d(n,{EO:()=>l,O1:()=>i,Rr:()=>s});var r=t(67294),a=t(44256);let o;function i(e){return r.createElement("a",{href:o+e.file},e.file)}function l(e){return r.createElement("a",{href:o+e.file},e.children)}o=(0,a.isInternal)()?"https://www.internalfb.com/code/fbsource/fbcode/":"https://github.com/facebookincubator/Glean/tree/master/";const s=e=>{let{children:n,internal:t,external:o}=e;return(0,a.fbContent)({internal:r.createElement("code",null,t),external:r.createElement("code",null,o)})}},72024:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var r=t(83117),a=(t(67294),t(3905)),o=t(44256),i=t(12038);const l={id:"intro",title:"Querying Glean",sidebar_label:"Overview"},s=void 0,c={unversionedId:"query/intro",id:"query/intro",title:"Querying Glean",description:"Glean's query language is called Angle.  Read the [Angle",source:"@site/docs/query/intro.md",sourceDirName:"query",slug:"/query/intro",permalink:"/docs/query/intro",draft:!1,editUrl:"https://github.com/facebookincubator/Glean/tree/main/glean/website/docs/query/intro.md",tags:[],version:"current",frontMatter:{id:"intro",title:"Querying Glean",sidebar_label:"Overview"},sidebar:"someSidebar",previous:{title:"Design",permalink:"/docs/schema/design"},next:{title:"Introduction",permalink:"/docs/angle/intro"}},d={},u=[{value:"Query APIs",id:"query-apis",level:2},{value:"Thrift",id:"thrift",level:3},{value:"VS Code syntax highlighter",id:"vs-code-syntax-highlighter",level:2},{value:"Building from source",id:"building-from-source",level:3},{value:"Downloading from CI",id:"downloading-from-ci",level:3},{value:"Installing",id:"installing",level:3}],m=(f="Daiquery",function(e){return console.warn("Component "+f+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.mdx)("div",e)});var f;const p={toc:u};function h(e){let{components:n,...t}=e;return(0,a.mdx)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("p",null,"Glean's query language is called ",(0,a.mdx)("strong",{parentName:"p"},"Angle"),".  Read the ",(0,a.mdx)("a",{parentName:"p",href:"/docs/angle/guide"},"Angle\nGuide")," to learn about how to write Angle queries."),(0,a.mdx)("p",null,"The ",(0,a.mdx)("a",{parentName:"p",href:"/docs/shell"},"shell")," can be used for testing queries and schema\nchanges, and exploring the data."),(0,a.mdx)(o.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,a.mdx)("p",null,"The ",(0,a.mdx)("inlineCode",{parentName:"p"},"glean")," cli is installed by default in most Devservers and Ondemand flavours. To install it manually:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"sudo feature install glean_tools\n")),(0,a.mdx)("p",null,"To try queries interactively run the REPL with:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"glean shell\n")),(0,a.mdx)("p",null,"or build it from source"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"buck run //glean/tools/gleancli:glean -- shell\n")),(0,a.mdx)("p",null,"To make a single query:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"glean shell <query>\n"))),(0,a.mdx)(m,{mdxType:"Daiquery"}),(0,a.mdx)("h2",{id:"query-apis"},"Query APIs"),(0,a.mdx)(o.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,a.mdx)("p",null,"There are APIs in ",(0,a.mdx)("a",{parentName:"p",href:"api/fb/hack.md"},"Hack"),", ",(0,a.mdx)("a",{parentName:"p",href:"api/fb/python.md"},"Python"),",\n",(0,a.mdx)("a",{parentName:"p",href:"api/fb/rust.md"},"Rust"),", and ",(0,a.mdx)("a",{parentName:"p",href:"/docs/query/api/haskell"},"Haskell"),".")),(0,a.mdx)(o.OssOnly,{mdxType:"OssOnly"},(0,a.mdx)("p",null,"There is currently only a ",(0,a.mdx)("a",{parentName:"p",href:"/docs/query/api/haskell"},"Haskell")," API; APIs in other\nlanguages are coming soon.")),(0,a.mdx)("p",null,"All client layers are wrappers around the ",(0,a.mdx)("a",{parentName:"p",href:"#thrift"},"Thrift API"),"."),(0,a.mdx)("p",null,"The results of queries will be returned as instances of the Thrift\ntypes in ",(0,a.mdx)("inlineCode",{parentName:"p"},"glean/schema/thrift")," that are generated automatically from\nthe ",(0,a.mdx)("a",{parentName:"p",href:"/docs/schema/basic"},"schema"),"."),(0,a.mdx)("p",null,"The client layers provide a few useful things over the raw Thrift API:"),(0,a.mdx)("ul",null,(0,a.mdx)("li",{parentName:"ul"},"Connecting to the most recent database for a given repository;"),(0,a.mdx)("li",{parentName:"ul"},"Sharding to ensure we connect to a suitable server for that database;"),(0,a.mdx)("li",{parentName:"ul"},"In some cases, an API for building queries programmatically.")),(0,a.mdx)("h3",{id:"thrift"},"Thrift"),(0,a.mdx)("p",null,"Glean exposes a ",(0,a.mdx)(i.EO,{file:"glean/if/glean.thrift",mdxType:"SrcFileLink"},"Thrift\nAPI"),"."),(0,a.mdx)("p",null,"The two methods for querying are"),(0,a.mdx)("ul",null,(0,a.mdx)("li",{parentName:"ul"},(0,a.mdx)("inlineCode",{parentName:"li"},"userQuery")," - general queries returning an arbitrary number of results"),(0,a.mdx)("li",{parentName:"ul"},(0,a.mdx)("inlineCode",{parentName:"li"},"userQueryFacts")," - fetch the definition of a single fact given its ID")),(0,a.mdx)("p",null,"Queries are in Angle syntax, and results are encoded as JSON or Thrift\ncompact which you can encode/decode into the Thrift types."),(0,a.mdx)("h2",{id:"vs-code-syntax-highlighter"},"VS Code syntax highlighter"),(0,a.mdx)(o.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,a.mdx)("p",null,"We have a VS Code plugin for Angle syntax highlighting in VS Code: ",(0,a.mdx)("a",{parentName:"p",href:"https://www.internalfb.com/fb-vscode/marketplace/extension/nuclide.fb-glean/overview?leftNavTab=manage"},"Glean development Support")," the code lives ",(0,a.mdx)("a",{parentName:"p",href:"https://www.internalfb.com/code/fbsource/%5Bmaster%5D/xplat/vscode/vscode-extensions/fb-glean/"},"here"))),(0,a.mdx)(o.OssOnly,{mdxType:"OssOnly"},(0,a.mdx)("p",null,"A VS Code plugin for Angle syntax highlighting is available in this repository, under\n",(0,a.mdx)("inlineCode",{parentName:"p"},"glean/vscode/"),". It can either be built from source and installed, or one can download and\ninstall the .vsix file generated by our CI system."),(0,a.mdx)("h3",{id:"building-from-source"},"Building from source"),(0,a.mdx)("p",null,"Assuming you have Node JS installed on your system, run the following commands:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"cd glean/vscode\nnpx vsce package\n")),(0,a.mdx)("p",null,"The ",(0,a.mdx)("inlineCode",{parentName:"p"},"npx")," command should produce a ",(0,a.mdx)("inlineCode",{parentName:"p"},"glean-x.y.z.vsix")," file in the ",(0,a.mdx)("inlineCode",{parentName:"p"},"glean/vscode/")," directory,\nthat you can install in VS Code by following the instructions of the ",(0,a.mdx)("em",{parentName:"p"},"Installing")," section below."),(0,a.mdx)("h3",{id:"downloading-from-ci"},"Downloading from CI"),(0,a.mdx)("p",null,"Simply visit ",(0,a.mdx)("a",{parentName:"p",href:"https://github.com/facebookincubator/Glean/actions/workflows/ci.yml"},"this CI page"),",\nclick on the latest successful CI run, scroll down to the ",(0,a.mdx)("em",{parentName:"p"},"Artifacts")," section and click on\n",(0,a.mdx)("inlineCode",{parentName:"p"},"glean-vsix"),". This should give you a ",(0,a.mdx)("inlineCode",{parentName:"p"},".zip")," archive that contains a ",(0,a.mdx)("inlineCode",{parentName:"p"},"glean-x.y.z.vsix")," file\nthat you can install in VS Code by following the instructions in the next section."),(0,a.mdx)("h3",{id:"installing"},"Installing"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-lang=shell"},"code --install-extension path/to/glean-x.y.z.vsix\n")),(0,a.mdx)("p",null,(0,a.mdx)("a",{parentName:"p",href:"https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix"},"The VS Code documentation"),"\ndescribes alternative ways to install an extension from a ",(0,a.mdx)("inlineCode",{parentName:"p"},".vsix")," file, from within the editor,\nin case the above command does not work or a more graphical, user-friendly is preferable.")))}h.isMDXComponent=!0},47596:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(n){o(n)}}function l(e){try{s(r.throw(e))}catch(n){o(n)}}function s(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getSpecInfo=void 0;const a=t(11737);n.getSpecInfo=function(e){return r(this,void 0,void 0,(function*(){return yield a.call({module:"bloks",api:"getSpecInfo",args:{styleId:e}})}))}},11737:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(n){o(n)}}function l(e){try{s(r.throw(e))}catch(n){o(n)}}function s(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.call=void 0;let r=!1,a=0;const o={};n.call=function(e){return t(this,void 0,void 0,(function*(){if("staticdocs.thefacebook.com"!==window.location.hostname&&"localhost"!==window.location.hostname)return Promise.reject(new Error("Not running on static docs"));r||(r=!0,window.addEventListener("message",(e=>{if("static-docs-bridge-response"!==e.data.event)return;const n=e.data.id;n in o||console.error(`Recieved response for id: ${n} with no matching receiver`),"response"in e.data?o[n].resolve(e.data.response):o[n].reject(new Error(e.data.error)),delete o[n]})));const n=a++,t=new Promise(((e,t)=>{o[n]={resolve:e,reject:t}})),i={event:"static-docs-bridge-call",id:n,module:e.module,api:e.api,args:e.args},l="localhost"===window.location.hostname?"*":"https://www.internalfb.com";return window.parent.postMessage(i,l),t}))}},24855:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(n){o(n)}}function l(e){try{s(r.throw(e))}catch(n){o(n)}}function s(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.reportFeatureUsage=n.reportContentCopied=void 0;const a=t(11737);n.reportContentCopied=function(e){return r(this,void 0,void 0,(function*(){const{textContent:n}=e;try{yield a.call({module:"feedback",api:"reportContentCopied",args:{textContent:n}})}catch(t){}}))},n.reportFeatureUsage=function(e){return r(this,void 0,void 0,(function*(){const{featureName:n,id:t}=e;console.log("used feature");try{yield a.call({module:"feedback",api:"reportFeatureUsage",args:{featureName:n,id:t}})}catch(r){}}))}},44256:function(e,n,t){var r=this&&this.__createBinding||(Object.create?function(e,n,t,r){void 0===r&&(r=t),Object.defineProperty(e,r,{enumerable:!0,get:function(){return n[t]}})}:function(e,n,t,r){void 0===r&&(r=t),e[r]=n[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&r(n,e,t);return a(n,e),n};Object.defineProperty(n,"__esModule",{value:!0}),n.OssOnly=n.FbInternalOnly=n.getEphemeralDiffNumber=n.hasEphemeralDiffNumber=n.isInternal=n.validateFbContentArgs=n.fbInternalOnly=n.fbContent=n.inpageeditor=n.feedback=n.uidocs=n.bloks=void 0,n.bloks=o(t(47596)),n.uidocs=o(t(17483)),n.feedback=o(t(24855)),n.inpageeditor=o(t(27312));const i=["internal","external"];function l(e){return c(e),d()?"internal"in e?s(e.internal):[]:"external"in e?s(e.external):[]}function s(e){return"function"==typeof e?e():e}function c(e){if("object"!=typeof e)throw new Error(`fbContent() args must be an object containing keys: ${i}. Instead got ${e}`);if(!Object.keys(e).find((e=>i.find((n=>n===e)))))throw new Error(`No valid args found in ${JSON.stringify(e)}. Accepted keys: ${i}`);const n=Object.keys(e).filter((e=>!i.find((n=>n===e))));if(n.length>0)throw new Error(`Unexpected keys ${n} found in fbContent() args. Accepted keys: ${i}`)}function d(){try{return Boolean(!1)}catch(e){return console.log("process.env.FB_INTERNAL couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),!1}}function u(){try{return null}catch(e){return console.log("process.env.PHABRICATOR_DIFF_NUMBER couldn't be read, maybe you forgot to add the required webpack EnvironmentPlugin config?",e),null}}n.fbContent=l,n.fbInternalOnly=function(e){return l({internal:e})},n.validateFbContentArgs=c,n.isInternal=d,n.hasEphemeralDiffNumber=function(){return Boolean(u())},n.getEphemeralDiffNumber=u,n.FbInternalOnly=function(e){return d()?e.children:null},n.OssOnly=function(e){return d()?null:e.children}},27312:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(n){o(n)}}function l(e){try{s(r.throw(e))}catch(n){o(n)}}function s(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.submitDiff=void 0;const a=t(11737);n.submitDiff=function(e){return r(this,void 0,void 0,(function*(){const{file_path:n,new_content:t,project_name:r,diff_number:o}=e;try{return yield a.call({module:"inpageeditor",api:"createPhabricatorDiffApi",args:{file_path:n,new_content:t,project_name:r,diff_number:o}})}catch(i){throw new Error(`Error occurred while trying to submit diff. Stack trace: ${i}`)}}))}},17483:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,o){function i(e){try{s(r.next(e))}catch(n){o(n)}}function l(e){try{s(r.throw(e))}catch(n){o(n)}}function s(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getApi=n.docsets=void 0;const a=t(11737);n.docsets={BLOKS_CORE:"887372105406659"},n.getApi=function(e){return r(this,void 0,void 0,(function*(){const{name:n,framework:t,docset:r}=e;return yield a.call({module:"uidocs",api:"getApi",args:{name:n,framework:t,docset:r}})}))}}}]);