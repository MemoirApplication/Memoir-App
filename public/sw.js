if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>a(e,n),f={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>f[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/190-a97b97732fa21eb8.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/206-5b7bbefb356f4164.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/222-24967befbf38f393.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/342-667df66059136b73.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/346.23b1c363d5063dc4.js",revision:"23b1c363d5063dc4"},{url:"/_next/static/chunks/373-dcf6623ced8c65f2.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/539-6ac101bc1639f73b.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/54a60aa6.c56c00943a26a965.js",revision:"c56c00943a26a965"},{url:"/_next/static/chunks/617-e2ddc87e559f8a46.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/648-dfe57355006cc313.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/691-b52631f732738592.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/6963a3ef.cdf33faebd516799.js",revision:"cdf33faebd516799"},{url:"/_next/static/chunks/6be7e44c.3b96a1140b076571.js",revision:"3b96a1140b076571"},{url:"/_next/static/chunks/704-f42c06a68fe8df80.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/70e0d97a.3f814418dde4486d.js",revision:"3f814418dde4486d"},{url:"/_next/static/chunks/76567b6f.e892dc5f78c8508c.js",revision:"e892dc5f78c8508c"},{url:"/_next/static/chunks/776-226caa7f30356e42.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/779-4947da50ce6b2afd.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/789-1565b9f581f97680.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/795d4814.00ec959cf1d73466.js",revision:"00ec959cf1d73466"},{url:"/_next/static/chunks/811-402243f43c476ecd.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/819-8fc550e1a41d3101.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/882-4ec5aa9fd00cc3cf.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/9.870d08947cb16826.js",revision:"870d08947cb16826"},{url:"/_next/static/chunks/939-924f2663f9258438.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/94730671.b0d26e498d193c67.js",revision:"b0d26e498d193c67"},{url:"/_next/static/chunks/app/(landingPage)/layout-18129896fbd93fa2.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/(landingPage)/page-13b4ae929fdb3ab9.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/(main)/(routes)/documents/%5BdocumentId%5D/page-6ff265e6f35eb5c3.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/(main)/(routes)/documents/page-a9181d3c8c451c58.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/(main)/layout-92d20c8571a467e5.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/_not-found/page-cc0b5b8d51b73f58.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/error-bc7cf4bb99c8d3c4.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/app/layout-052a7f6bd1abc4b4.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/c0e397d0.40b920f38ba31fcb.js",revision:"40b920f38ba31fcb"},{url:"/_next/static/chunks/c16f53c3.3b5139bb4d76da3e.js",revision:"3b5139bb4d76da3e"},{url:"/_next/static/chunks/f8e4659f-beabdf5ec32d5a3d.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/fcfb803e-6cd1a0dbba67cc09.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/fd9d1056-c559d7d339eadebd.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/main-10b70564614f5c08.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/main-app-83865b06859d5ba5.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c2ad8d7d504a88ee.js",revision:"eaFB3obPSCWatufsrddfs"},{url:"/_next/static/css/361ff34305d781f3.css",revision:"361ff34305d781f3"},{url:"/_next/static/css/6a7f77059fcb2105.css",revision:"6a7f77059fcb2105"},{url:"/_next/static/css/7014391a08c0c5bf.css",revision:"7014391a08c0c5bf"},{url:"/_next/static/css/942dc58561df5ee6.css",revision:"942dc58561df5ee6"},{url:"/_next/static/eaFB3obPSCWatufsrddfs/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/eaFB3obPSCWatufsrddfs/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/android-chrome-512x512.1a44f022.png",revision:"0861080b9b9cebf3bcd587824b2d5fa5"},{url:"/_next/static/media/inter-v12-latin-100.ac803252.woff2",revision:"ac803252"},{url:"/_next/static/media/inter-v12-latin-100.ecd9c1ab.woff",revision:"ecd9c1ab"},{url:"/_next/static/media/inter-v12-latin-200.1e4cfb59.woff",revision:"1e4cfb59"},{url:"/_next/static/media/inter-v12-latin-200.71082441.woff2",revision:"71082441"},{url:"/_next/static/media/inter-v12-latin-300.66721718.woff",revision:"66721718"},{url:"/_next/static/media/inter-v12-latin-300.9c0edf75.woff2",revision:"9c0edf75"},{url:"/_next/static/media/inter-v12-latin-500.32f7e84c.woff",revision:"32f7e84c"},{url:"/_next/static/media/inter-v12-latin-500.b7be75b9.woff2",revision:"b7be75b9"},{url:"/_next/static/media/inter-v12-latin-600.30783081.woff",revision:"30783081"},{url:"/_next/static/media/inter-v12-latin-600.a3e93aa0.woff2",revision:"a3e93aa0"},{url:"/_next/static/media/inter-v12-latin-700.14747af5.woff",revision:"14747af5"},{url:"/_next/static/media/inter-v12-latin-700.7ddf3c11.woff2",revision:"7ddf3c11"},{url:"/_next/static/media/inter-v12-latin-800.1c3ff413.woff2",revision:"1c3ff413"},{url:"/_next/static/media/inter-v12-latin-800.405370de.woff",revision:"405370de"},{url:"/_next/static/media/inter-v12-latin-900.307c1a48.woff2",revision:"307c1a48"},{url:"/_next/static/media/inter-v12-latin-900.945c1e63.woff",revision:"945c1e63"},{url:"/_next/static/media/inter-v12-latin-regular.493934f7.woff2",revision:"493934f7"},{url:"/_next/static/media/inter-v12-latin-regular.64aa2fed.woff",revision:"64aa2fed"},{url:"/default-monochrome.svg",revision:"ee0b166c289536f616fc8ffda0b6ca73"},{url:"/icon-192x192.png",revision:"e583bac65cf97e0cadf3b6fa0241e4d3"},{url:"/icon-256x256.png",revision:"311b3696470db82a8d8f742bbcaedd96"},{url:"/icon-384x384.png",revision:"89479124dc5f03599898905117c097fe"},{url:"/icon-512x512.png",revision:"68d3567b47db556a677fd34220a976ec"},{url:"/logo-dark.svg",revision:"65afeb7b122221406dc3f013112aaeff"},{url:"/logo.svg",revision:"603e25d04ec6debe0f39ab241d5c9a8a"},{url:"/manifest.json",revision:"dd97db7a61e2962ab4396d83f36b432a"},{url:"/manifest.webmanifest",revision:"80541616a212e5d671fd6ee8f251f358"},{url:"/profile.png",revision:"ec04d7070df73769d8ed0e83114ed7cf"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
