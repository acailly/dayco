if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-30e9d199"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-5265c558.css",revision:null},{url:"assets/index-66c2b870.js",revision:null},{url:"assets/web-vitals-60d3425a.js",revision:null},{url:"index.html",revision:"5b91c2036fe9627bab9e1bd984c5ed24"},{url:"registerSW.js",revision:"1d1d50f18df189de45eb0978b806d399"},{url:"favicon-16x16.png",revision:"191d7150eec687fbcc4bb637f5ebd684"},{url:"favicon-32x32.png",revision:"8976326109b5e1610a29b95974f5bc23"},{url:"apple-touch-icon.png",revision:"c51e55ec2046d226486dee1a5b04547c"},{url:"safari-pinned-tab.svg",revision:"3abb7ce835556d0ffd66165ce53374b2"},{url:"manifest.webmanifest",revision:"d038055ffd288bb10937c6835aa49069"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));