/* TRANG GAMES: Obsidian Neon + 4D — giải mã ký tự, sóng đại dương tự chạy, vòng xoay 3D, băng điều khiển, trồi lên mờ dần (vanilla JS) */
(function(){
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,fine=window.matchMedia&&matchMedia('(hover:hover)').matches,CH='#X9@%&*ABCDEF0123456789/';
function $(i){return document.getElementById(i)}
function sc(el){var o=el.getAttribute('data-sc'),k=0,id;if(still||el._b)return;el._b=1;
 id=setInterval(function(){el.textContent=o.split('').map(function(c,i){return(i<k||c===' ')?c:CH.charAt(Math.random()*CH.length|0)}).join('');
  if(k>=o.length){clearInterval(id);el.textContent=o;el._b=0}k+=Math.max(.5,o.length/12)},42)}
var els=[].slice.call(document.querySelectorAll('[data-sc]'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){sc(x.target);io.unobserve(x.target)}})},{threshold:.4});els.forEach(function(e){io.observe(e)})}

/* Equalizer phát sóng: thanh đối xứng + đường sóng; tần số đổi và phát sáng vàng khi rê chuột */
var C={co:[112,0,255],sk:[0,240,255],gd:[255,46,136],gy:[230,254,255]};
function mix(a,b,k){return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k]}
function rgb(c,a){return'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+a+')'}
function Eq(cv,f0){var cx=cv.getContext('2d'),W=0,H=0,dpr=1,t=0,last=0,vis=false,raf=0,s={f:f0,tf:f0,h:0,th:0};
 function size(){dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;if(!W)return;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);draw(0)}
 function draw(dt){t+=dt;s.f+=(s.tf-s.f)*Math.min(1,dt*5);s.h+=(s.th-s.h)*Math.min(1,dt*6);
  cx.clearRect(0,0,W,H);var L=4,N=Math.max(24,Math.floor(W/6)),l,i,x,y,k,amp,base,sp,ph,g,ys=[];
  for(l=0;l<L;l++){k=l/(L-1);amp=H*(.12+.07*(L-l)/L)*(1+.4*s.h);base=H*(.46+.07*l);sp=(.5+l*.22)*s.f;ph=l*1.7;ys.length=0;
   cx.beginPath();cx.moveTo(0,H);
   for(i=0;i<=N;i++){x=i/N;y=base+Math.sin(x*6.2*(1+l*.3)+t*sp*1.6+ph)*amp+Math.sin(x*11+t*sp*1.1-ph)*amp*.38+Math.cos(x*3.1+t*.5*s.f)*amp*.5;ys.push(y);cx.lineTo(x*W,y)}
   cx.lineTo(W,H);cx.closePath();g=cx.createLinearGradient(0,base-amp*1.6,0,H);
   g.addColorStop(0,rgb(mix(C.sk,C.gy,k*.6+s.h*.3),.2+.22*k));g.addColorStop(1,rgb(C.co,.03));cx.fillStyle=g;cx.fill();
   cx.beginPath();for(i=0;i<=N;i++){i?cx.lineTo(i/N*W,ys[i]):cx.moveTo(0,ys[0])}
   cx.lineWidth=1+1.3*k;cx.strokeStyle=rgb(mix(C.sk,C.gy,.4+.6*k),.3+.6*k);if(l===L-1){cx.shadowBlur=14+14*s.h;cx.shadowColor=rgb(C.sk,.9)}cx.stroke();cx.shadowBlur=0}}
 function loop(n){raf=requestAnimationFrame(loop);var dt=Math.min((n-last)/1000,.05);last=n;if(vis&&!document.hidden)draw(dt)}
 size();addEventListener('resize',size);
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)size()},{threshold:0}).observe(cv);else vis=true;
 if(!still)requestAnimationFrame(function(n){last=n;loop(n)});
 return{set:function(f,h){s.tf=f;s.th=h?1:0;if(still)draw(.3)}}}
var eqA=$('eqA')&&Eq($('eqAc'),1),box=$('eqA'),rd=$('eqRd'),RD0=rd?rd.textContent:'';
if(eqA)[].slice.call(box.querySelectorAll('.eq-ss button')).forEach(function(b){
 function on(){eqA.set(+b.getAttribute('data-f'),1);box.classList.add('hot');rd.textContent=b.getAttribute('data-t')}
 function off(){eqA.set(1,0);box.classList.remove('hot');rd.textContent=RD0}
 b.addEventListener('mouseenter',on);b.addEventListener('focus',on);b.addEventListener('mouseleave',off);b.addEventListener('blur',off);b.addEventListener('click',on)});

/* Băng điều khiển OPS / DEV / ART / MEDIA */
var tabs=[].slice.call(document.querySelectorAll('.gm-tabs button')),pns=[].slice.call(document.querySelectorAll('.gm-pn')),bar=$('gmBar'),cur=0,FQ=[.8,1.5,1.1,2.4],eqB=$('eqBc')&&Eq($('eqBc'),FQ[0]);
function go(i){cur=i;tabs.forEach(function(t,k){t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});pns.forEach(function(p,k){p.classList.toggle('on',k===i)});
 if(eqB){eqB.set(FQ[i],0);$('eqBw').classList.remove('hot')}
 bar.classList.remove('run');void bar.offsetWidth;if(!still)bar.classList.add('run')}
tabs.forEach(function(t,k){t.addEventListener('click',function(){go(k)});
 t.addEventListener('mouseenter',function(){if(eqB){eqB.set(FQ[k]+.4,1);$('eqBw').classList.add('hot')}});
 t.addEventListener('mouseleave',function(){if(eqB){eqB.set(FQ[cur],0);$('eqBw').classList.remove('hot')}})});
bar.addEventListener('animationend',function(){go((cur+1)%tabs.length)});
go(0);

/* Vòng xoay sân đấu 3D: bấm nút, phím mũi tên hoặc kéo chuột để xoay */
var st=$('carStage'),ring=$('carRing');
if(st&&ring){
 var its=[].slice.call(ring.children),N=its.length,STEP=360/N,NM=['FREE FIRE','LIÊN QUÂN','PUBG MOBILE','PLAY TOGETHER','FC MOBILE VN'],ang=0,tgt=0,RR=300,drag=false,x0=0,a0=0,idx=-1,raf=0,dots=$('carDots');
 ring.style.setProperty('--st',STEP+'deg');
 its.forEach(function(it,k){it.style.setProperty('--k',k)});
 NM.slice(0,N).forEach(function(n,k){var b=document.createElement('button');b.type='button';b.textContent=n;b.onclick=function(){to(k)};dots.appendChild(b)});
 function size(){RR=Math.round(its[0].offsetWidth/2/Math.tan(Math.PI/N))+64;ring.style.setProperty('--R',RR+'px');render()}
 function render(){ring.style.transform='translateZ('+(-RR)+'px)';
  var c=((Math.round(ang/STEP)%N)+N)%N;
  its.forEach(function(it,k){var d=Math.abs(((k*STEP-ang)%360+540)%360-180),on=d<STEP/2;var sd=((k*STEP-ang)%360+540)%360-180;it.style.transform='rotateY('+sd.toFixed(2)+'deg) translateZ('+RR+'px) rotateY('+(-sd*.42).toFixed(2)+'deg)';it.style.opacity=(on?1:d<STEP*1.5?.62:.16).toFixed(2);it.style.filter=d>STEP*1.5?'blur(2px)':'none';it.classList.toggle('on',on)});
  if(c!==idx){idx=c;[].forEach.call(dots.children,function(b,k){b.classList.toggle('on',k===c)})}}
 function tick(){var d=tgt-ang;if(Math.abs(d)<.05){ang=tgt;raf=0;render();return}ang+=d*(still?1:.14);render();raf=requestAnimationFrame(tick)}
 function kick(){if(!raf)raf=requestAnimationFrame(tick)}
 function to(k){var cur=Math.round(tgt/STEP),c=((cur%N)+N)%N,d=k-c;if(d>N/2)d-=N;if(d<-N/2)d+=N;tgt=(cur+d)*STEP;kick()}
 $('carN').onclick=function(){tgt=(Math.round(tgt/STEP)+1)*STEP;kick()};$('carP').onclick=function(){tgt=(Math.round(tgt/STEP)-1)*STEP;kick()};
 st.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){$('carN').click();e.preventDefault()}else if(e.key==='ArrowLeft'){$('carP').click();e.preventDefault()}});
 st.addEventListener('pointerdown',function(e){drag=true;x0=e.clientX;a0=tgt;try{st.setPointerCapture(e.pointerId)}catch(x){}});
 st.addEventListener('pointermove',function(e){if(!drag)return;tgt=a0-(e.clientX-x0)*.32;kick()});
 function up(){if(!drag)return;drag=false;tgt=Math.round(tgt/STEP)*STEP;kick()}
 st.addEventListener('pointerup',up);st.addEventListener('pointercancel',up);
 addEventListener('resize',size);size();setTimeout(size,600);if(window.ResizeObserver)new ResizeObserver(size).observe(its[0]);
}

/* Trồi lên + mở khóa mờ dần khi cuộn (tự chạy, nhịp bậc thang) */
if('IntersectionObserver' in window&&!still){
 var RV=[].slice.call(document.querySelectorAll('.gm-hero>*:not(.gm-floor),.gm-hd,.gm-sec>p,.gm-sec>.gm-sub,.gm-chips,.gm-g3>.gm-cd,.gm-stats>.gm-st,.gm-met>.gm-st,.gm-eq:not(.mini),.gm-tk,.gm-mx>li,.car-ctl,.car-hint'));
 var rio=new IntersectionObserver(function(es){var n=0;es.forEach(function(x){if(!x.isIntersecting)return;var el=x.target,d=Math.min(n++,7)*90;rio.unobserve(el);
  el.style.transitionDelay=d+'ms';el.classList.add('in');setTimeout(function(){el.classList.remove('rv','in');el.style.transitionDelay=''},d+1100)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 RV.forEach(function(el){el.classList.add('rv');rio.observe(el)})}

/* ===== 4D: thẻ số liệu nghiêng theo chuột + đèn pha theo con trỏ + số đếm nhảy (glitch) + hạt năng lượng ===== */
var sts=[].slice.call(document.querySelectorAll('.gm-st'));
sts.forEach(function(st){var inn=st.querySelector('.st-in');if(!inn)return;
 st.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;
  var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  st.classList.add('live');
  st.style.setProperty('--mx',((x-.5)*2).toFixed(3));st.style.setProperty('--my',((y-.5)*2).toFixed(3));
  st.style.setProperty('--sx',(x*100).toFixed(1)+'%');st.style.setProperty('--sy',(y*100).toFixed(1)+'%');
  inn.style.setProperty('--ry',((x-.5)*24).toFixed(2)+'deg');inn.style.setProperty('--rx',((.5-y)*20).toFixed(2)+'deg')});
 st.addEventListener('pointerleave',function(){st.classList.remove('live');
  ['--mx','--my','--sx','--sy'].forEach(function(p){st.style.removeProperty(p)});
  inn.style.removeProperty('--rx');inn.style.removeProperty('--ry')})});
function pad(v,L){v=String(v);while(v.length<L)v='0'+v;return v}
function cu(st){var n=st.querySelector('.st-n'),bg=st.querySelector('.st-bg');if(!n)return;
 var o=n.textContent.trim(),T,L,t0=null,D;if(!/^\d+$/.test(o))return;T=+o;L=o.length;D=1200+Math.min(T,200)*4;
 function set(s){n.textContent=s;if(bg)bg.textContent=s}
 set(pad(0,L));
 function run(){n.classList.add('gl');
  function f(t){if(t0===null)t0=t;var p=Math.min((t-t0)/D,1),s=pad(Math.round(T*(1-Math.pow(1-p,3))),L);
   if(p<1&&Math.random()<.2)s=s.replace(/\d/g,function(d){return Math.random()<.4?String(Math.random()*10|0):d});
   set(s);if(p<1)requestAnimationFrame(f);else{set(o);n.classList.remove('gl')}}
  requestAnimationFrame(f)}
 if('IntersectionObserver' in window){var io2=new IntersectionObserver(function(es){if(es[0].isIntersecting){io2.disconnect();run()}},{threshold:.35});io2.observe(st)}else set(o)}
if(!still)sts.forEach(cu);
var hero=document.querySelector('.gm-hero');
if(hero&&!still){var pw=document.createElement('div'),cl=['#00F0FF','#7000FF','#FF2E88','#E6FEFF'],k,p;pw.className='gm-pts';pw.setAttribute('aria-hidden','true');
 for(k=0;k<34;k++){p=document.createElement('i');
  p.style.cssText='--l:'+(Math.random()*100).toFixed(1)+'%;--s:'+(2+Math.random()*3.5).toFixed(1)+'px;--d:'+(9+Math.random()*10).toFixed(1)+'s;--dl:-'+(Math.random()*18).toFixed(1)+'s;--dx:'+((Math.random()-.5)*160|0)+'px;--pc:'+cl[k%4];
  pw.appendChild(p)}
 hero.insertBefore(pw,hero.firstChild)}

/* Dòng thời gian năng lượng: tia laser chạy theo cuộn, đánh thức từng thẻ lịch sử theo thứ tự (vanilla JS, không thư viện) */
var tl=$('gmTl');
if(tl){
 var cds=[].slice.call(tl.children),pipe=document.createElement('i'),fl=document.createElement('i'),tk=0;
 pipe.className='tl-pipe';pipe.setAttribute('aria-hidden','true');fl.className='tl-fill';pipe.appendChild(fl);tl.insertBefore(pipe,tl.firstChild);
 cds.forEach(function(c){var n=document.createElement('i');n.className='tl-node';n.setAttribute('aria-hidden','true');c.appendChild(n)});
 function upd(){tk=0;var r=tl.getBoundingClientRect(),vh=innerHeight,vt=cds[cds.length-1].offsetTop>cds[0].offsetTop+8,
  p=still?1:Math.min(1,Math.max(0,(vh*.88-r.top)/(vh*.46+(vt?r.height*.5:0))));
  tl.classList.toggle('vt',vt);tl.style.setProperty('--p',p.toFixed(4));
  var pos=p*(vt?r.height:r.width);
  cds.forEach(function(c){c.classList.toggle('lit',pos>=(vt?c.offsetTop+27:c.offsetLeft+27))})}
 function req(){if(!tk){tk=1;requestAnimationFrame(upd)}}
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);upd();setTimeout(upd,600)}
})();
