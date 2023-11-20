(()=>{"use strict";var e={917:(e,n,t)=>{t.d(n,{Z:()=>c});var r=t(81),o=t.n(r),i=t(645),a=t.n(i)()(o());a.push([e.id,"/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}",""]);const c=a},426:(e,n,t)=>{t.d(n,{Z:()=>f});var r=t(81),o=t.n(r),i=t(645),a=t.n(i),c=t(917),s=t(667),l=t.n(s),u=new URL(t(997),t.b),d=a()(o());d.i(c.Z);var p=l()(u);d.push([e.id,`@font-face {\n    font-family: inter;\n    src: url(${p});\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: inter;\n}\n\nh1, h2, h3, h4, h5, h6 {\n    font-weight: bold;\n}\n\n#container {\n    --sidebar-width: 20%;\n    display: flex;\n    flex-wrap: nowrap\n}\n\n#sidebar {\n    flex-basis: var(--sidebar-width);\n}\n\n#main-content {\n    flex-basis: calc(100% - var(--sidebar-width));\n}`,""]);const f=d},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var i={},a=[],c=0;c<e.length;c++){var s=e[c],l=r.base?s[0]+r.base:s[0],u=i[l]||0,d="".concat(l," ").concat(u);i[l]=u+1;var p=t(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=o(f,r);r.byIndex=c,n.splice(c,0,{identifier:d,updater:m,references:1})}a.push(d)}return a}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var c=t(i[a]);n[c].references--}for(var s=r(e,o),l=0;l<i.length;l++){var u=t(i[l]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}i=s}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},997:(e,n,t)=>{e.exports=t.p+"853e01975d2783d9fa29.ttf"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return e[r](i,i.exports,t),i.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{const e=function(){const e=[];return{all_projects:e,new_project:function(n){e.push(function(e){const n=[];return{name:e,all_items:n,new_item:function(e,t,r){n.push(function(e,n,t,r){return{name:e,due_date:n,priority:t,status:"undone"}}(e,t,r))},done_item:function(e){n[e].status="done"},remove_item:function(e){n.splice(e,1)}}}(n))},remove_project:function(n){e.splice(n,1)}}}(),n=function(){const e=[];return{all_projects:e,new_project:function(n){e.push(function(e,n){const t=[],r=document.createElement("div");r.setAttribute("id","header-bar"),r.innerHTML=`\n        <h1>${e}</h1>\n        <div id = "create-new-todo">+ New todo</div> \n    `,t.push(r);const o=document.createElement("li");return o.textContent=e,o.setAttribute("data-index",n),{dom_project_in_dropdown:o,all_items:t,new_item:function(e,n,r){t.push(function(e,n,t,r,o){const i=document.createElement("div");return i.setAttribute("class",`todo-item ${t} undone`),i.setAttribute("data-index",o),i.innerHTML=`\n        <div id = "mark-done">o</div>\n        <p>${e}</p>\n        <span class = "time">${n}</span>\n        <div id = "remove">x</div>\n    `,{item:i}}(e,n,r,0,t.length))},done_item:function(e){t[e].status="done"},remove_item:function(e){t.splice(e,1)}}}(n,e.length))},remove_project:function(n){e.splice(n,1)}}}();var r=t(379),o=t.n(r),i=t(795),a=t.n(i),c=t(569),s=t.n(c),l=t(565),u=t.n(l),d=t(216),p=t.n(d),f=t(589),m=t.n(f),h=t(426),v={};v.styleTagTransform=m(),v.setAttributes=u(),v.insert=s().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=p(),o()(h.Z,v),h.Z&&h.Z.locals&&h.Z.locals;const b=document.getElementById("main-content"),g=document.getElementById("create-new-project"),y=g.parentElement;function w(e){b.innerHTML="",e.forEach((e=>{b.appendChild(e)}))}g.addEventListener("click",(function(t){const r=prompt("name?");e.new_project(r),n.new_project(r);const o=n.all_projects.length,i=n.all_projects[o-1];y.insertBefore(n.all_projects[o-1].dom_project_in_dropdown,g),w(i.all_items)})),y.addEventListener("click",(function(e){const t=e.target;if("LI"==t.tagName&&"create-new-project"!=t.id){const e=t.getAttribute("data-index");console.log(e),w(n.all_projects[e].all_items)}}))})()})();