const pw=(()=>{try{return require('playwright-core')}catch(e){return require(process.env.PW_CORE||'playwright-core')}})();
const base=process.argv[2]||'http://localhost:8765/';const out=process.argv[3]||require('path').join(__dirname,'shots');
require('fs').mkdirSync(out,{recursive:true});
const WA='Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36 WhatsApp/2.24.1';
const devs=[['desktop','chromium',{viewport:{width:1440,height:900}}],['iphone','webkit',pw.devices['iPhone 13']],['android-wa','chromium',{...pw.devices['Pixel 7'],userAgent:WA}],['ipad','webkit',pw.devices['iPad Mini']],['small','chromium',{viewport:{width:360,height:740},isMobile:true,hasTouch:true,deviceScaleFactor:2}]];
const ov=p=>p.evaluate(()=>{const W=document.documentElement.clientWidth,bad=[];document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>W+1){let a=e.parentElement,clip=false;while(a&&a!==document.body){const s=getComputedStyle(a);if(/(auto|scroll|hidden|clip)/.test(s.overflowX)){clip=true;break}if(s.position==='fixed'){clip=true;break}a=a.parentElement}if(!clip&&getComputedStyle(e).position!=='fixed')bad.push(e.tagName+'.'+e.className+' r='+Math.round(r.right))}});return{sw:document.documentElement.scrollWidth,W,bad:bad.slice(0,8)}});
(async()=>{for(const[n,eng,d]of devs){const b=await pw[eng].launch(eng==='chromium'?{executablePath:(process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')}:{});const c=await b.newContext(d);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 // gift
 await p.goto(base+'#presente',{waitUntil:'load'});await p.waitForTimeout(700);await p.screenshot({path:`${out}/${n}-01-envelope.png`});
 const giftOv=await ov(p);
 await p.click('#gSeal');await p.waitForTimeout(900);await p.screenshot({path:`${out}/${n}-02-abrindo.png`});await p.waitForTimeout(2200);await p.screenshot({path:`${out}/${n}-03-carta.png`});
 await p.click('#gGo');await p.waitForTimeout(1200);
 const giftGone=await p.evaluate(()=>!document.getElementById('gift')&&!document.documentElement.classList.contains('gift-pending'));
 await p.screenshot({path:`${out}/${n}-04-hero.png`});
 const full=await ov(p);
 const secs=['lugares','bruna','laboratorio','programacao','jornada','viagem','faq'];
 for(const s of secs){await p.evaluate(id=>document.getElementById(id).scrollIntoView(),s);await p.waitForTimeout(700);await p.screenshot({path:`${out}/${n}-s-${s}.png`})}
 // interactions
 await p.evaluate(()=>document.getElementById('laboratorio').scrollIntoView());await p.fill('#labIn','reduzir atrasos');await p.click('#labForm button[type=submit]');await p.waitForTimeout(900);
 const hm=await p.$$eval('#hmw .hcard',x=>x.length);
 await p.evaluate(()=>document.getElementById('jornada').scrollIntoView());await p.waitForTimeout(300);
 const tl=await p.$$eval('.tl-item',x=>x.length);
 await p.click('.tl-item.task .tl-card');await p.waitForTimeout(600);await p.screenshot({path:`${out}/${n}-m-task.png`});await p.fill('#draft','teste');await p.click('#tDone');await p.waitForTimeout(500);
 const done=await p.evaluate(()=>JSON.parse(localStorage.getItem('perspectivas-2027-v3')).done.length);
 await p.evaluate(()=>document.querySelector('[data-interest]').click());await p.waitForTimeout(500);await p.fill('#iN','Ana');await p.click('#lN');await p.waitForTimeout(400);await p.click('#lN');await p.waitForTimeout(500);await p.screenshot({path:`${out}/${n}-m-whats.png`});
 const wa=await p.getAttribute('#lW','href');
 await p.keyboard.press('Escape');await p.waitForTimeout(300);
 const modalOv=await ov(p);
 // participant link: no gift
 const p2=await c.newPage();await p2.goto(base,{waitUntil:'load'});await p2.waitForTimeout(400);const noGift=await p2.evaluate(()=>getComputedStyle(document.getElementById('gift')).display==='none');
 console.log(n,JSON.stringify({giftOv,full,modalOv,giftGone,hm,tl,done,wa:(wa||'').slice(0,40),noGift,errs}));await b.close()}})();
