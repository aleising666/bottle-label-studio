const CACHE_VERSION='bls-v1';
const APP_SHELL=['/','/index.html','/manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_VERSION).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_VERSION).then(ca=>ca.put(r,cp));}return res;}).catch(()=>{if(r.mode==='navigate')return caches.match('/index.html');})));});
