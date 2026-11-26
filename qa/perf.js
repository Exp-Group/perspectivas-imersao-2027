const pw=(()=>{try{return require('playwright-core')}catch(e){return require(process.env.PW_CORE||'playwright-core')}})();
const url=process.argv[2];
(async()=>{const b=await pw.chromium.launch({executablePath:(process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')});
const c=await b.newContext({...pw.devices['Pixel 7']});const p=await c.newPage();const cdp=await c.newCDPSession(p);
await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6e6/8*1.5,uploadThroughput:750e3/8});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
let bytes=0;p.on('response',async r=>{try{const h=await r.headerValue('content-length');bytes+=+h||0}catch(e){}});
const t0=Date.now();await p.goto(url,{waitUntil:'load',timeout:120000});const tl=Date.now()-t0;
await p.waitForTimeout(3000);
const m=await p.evaluate(()=>new Promise(res=>{const o={};new PerformanceObserver(l=>{const e=l.getEntries();o.lcp=Math.round(e[e.length-1].startTime)}).observe({type:'largest-contentful-paint',buffered:true});const n=performance.getEntriesByType('navigation')[0];o.dcl=Math.round(n.domContentLoadedEventEnd);o.fcp=Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{}).startTime||0);setTimeout(()=>res(o),300)}));
// scroll jank: measure frame times while scrolling
const fr=await p.evaluate(()=>new Promise(res=>{let last=performance.now(),long=0,frames=0;const H=document.documentElement.scrollHeight;let y=0;function f(t){frames++;if(t-last>50)long++;last=t;y+=120;scrollTo(0,y);if(y<H*0.6)requestAnimationFrame(f);else res({frames,long})}requestAnimationFrame(f)}));
console.log(JSON.stringify({loadMs:tl,...m,scroll:fr}));await b.close()})();
