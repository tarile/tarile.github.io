/* TRANG GAMES: Stadium Arena — giải mã ký tự, thẻ 3 lớp, equalizer phát sóng, vòng xoay 3D, băng điều khiển (vanilla JS) */
(function(){
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,fine=window.matchMedia&&matchMedia('(hover:hover)').matches,CH='#X9@%&*ABCDEF0123456789/';
function $(i){return document.getElementById(i)}
function sc(el){var o=el.getAttribute('data-sc'),k=0,id;if(still||el._b)return;el._b=1;
 id=setInterval(function(){el.textContent=o.split('').map(function(c,i){return(i<k||c===' ')?c:CH.charAt(Math.random()*CH.length|0)}).join('');
  if(k>=o.length){clearInterval(id);el.textContent=o;el._b=0}k+=Math.max(.5,o.length/12)},42)}
var els=[].slice.call(document.querySelectorAll('[data-sc]'));
els.forEach(function(e){e.addEventListener('mouseenter',function(){sc(e)})});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){sc(x.target);io.unobserve(x.target)}})},{threshold:.4});els.forEach(function(e){io.observe(e)})}

/* Thẻ số liệu 3 lớp: nghiêng + lệch pha chiều sâu theo con trỏ */
if(fine&&!still)[].slice.call(document.querySelectorAll('.gm-st')).forEach(function(c){
 c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width*2-1,ny=(e.clientY-r.top)/r.height*2-1;
  c.style.setProperty('--mx',nx.toFixed(3));c.style.setProperty('--my',ny.toFixed(3));c.style.setProperty('--rx',(-ny*11).toFixed(2)+'deg');c.style.setProperty('--ry',(nx*13).toFixed(2)+'deg')});
 c.addEventListener('pointerleave',function(){c.style.setProperty('--mx',0);c.style.setProperty('--my',0);c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});

/* Equalizer phát sóng: thanh đối xứng + đường sóng; tần số đổi và phát sáng vàng khi rê chuột */
var C={co:[150,190,0],sk:[204,255,0],gd:[255,59,0],gy:[255,110,40]};
function mix(a,b,k){return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k]}
function rgb(c,a){return'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+a+')'}
function Eq(cv,f0){var cx=cv.getContext('2d'),W=0,H=0,dpr=1,t=0,last=0,vis=false,raf=0,s={f:f0,tf:f0,h:0,th:0};
 function size(){dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;if(!W)return;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);draw(0)}
 function draw(dt){t+=dt;var k=Math.min(1,dt*5);s.f+=(s.tf-s.f)*k;s.h+=(s.th-s.h)*Math.min(1,dt*6);
  cx.clearRect(0,0,W,H);var n=Math.max(16,Math.floor(W/9)),bw=W/n,mid=H/2,i,x,a,h,lo=mix(C.co,C.gd,s.h),hi=mix(C.sk,C.gy,s.h),g=cx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,rgb(hi,1));g.addColorStop(.5,rgb(lo,.85));g.addColorStop(1,rgb(hi,1));cx.fillStyle=g;
  for(i=0;i<n;i++){x=i/n;a=(Math.sin(x*7*s.f+t*2.3*s.f)*.5+.5)*(Math.sin(x*19+t*3.4*s.f)*.35+.65)*(.6+.4*Math.sin(x*3.2-t*1.1));
   h=Math.max(2,a*Math.pow(Math.sin(Math.PI*x),.6)*mid*.92);cx.fillRect(i*bw+1,mid-h,bw-2,h*2)}
  cx.beginPath();for(i=0;i<=n;i++){x=i/n;a=Math.sin(x*9*s.f+t*3*s.f)*.55+Math.sin(x*23-t*2.2*s.f)*.25;var y=mid+a*Math.pow(Math.sin(Math.PI*x),.8)*mid*.6;i?cx.lineTo(i*bw,y):cx.moveTo(0,y)}
  cx.lineWidth=2;cx.strokeStyle=rgb(mix([255,255,255],C.gy,s.h),.95);cx.shadowBlur=12+16*s.h;cx.shadowColor=rgb(hi,.95);cx.stroke();cx.shadowBlur=0}
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
})();

/* GAMES v2: lăng kính nhiệt theo con trỏ · bảng lật chữ · accordion màn chập · nút trọng lực (vanilla JS) */
(function(){
var still=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover)').matches;
function $(i){return document.getElementById(i)}
/* 1. Thermal Spotlight dot-matrix */
var cv=$('thm');
if(cv){var c=cv.getContext('2d'),W=0,H=0,px=-1e4,py=0,tx=0,ty=0,act=-1e5,SP=24,R=190;
 function size(){var d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0)}
 addEventListener('resize',size);size();
 addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;act=performance.now()},{passive:true});
 function draw(n){var t=n/1000;if(n-act>2500){tx=W*(.5+.36*Math.sin(t*.33));ty=H*(.45+.3*Math.sin(t*.5+1))}
  if(px<-9e3){px=tx;py=ty}px+=(tx-px)*.12;py+=(ty-py)*.12;
  c.clearRect(0,0,W,H);var g=c.createRadialGradient(px,py,0,px,py,R*1.6);g.addColorStop(0,'rgba(204,255,0,.13)');g.addColorStop(1,'rgba(204,255,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='#2E2E36';var pend=[],x,y,dx,dy,d,k;
  for(y=SP/2;y<H;y+=SP)for(x=SP/2;x<W;x+=SP){dx=x-px;dy=y-py;d=dx*dx+dy*dy;
   if(d<R*R){k=1-Math.sqrt(d)/R;pend.push(x,y,k*k)}else c.fillRect(x-.75,y-.75,1.5,1.5)}
  for(var i=0;i<pend.length;i+=3){k=pend[i+2];var r=1.5+k*5;c.fillStyle='rgb('+(46+158*k|0)+','+(46+209*k|0)+','+(54-54*k|0)+')';c.fillRect(pend[i]-r/2,pend[i+1]-r/2,r,r)}}
 if(still)draw(0);else(function f(n){requestAnimationFrame(f);if(!document.hidden)draw(n)})(0)}
/* 2. Split-flap */
var DG='0123456789',LT='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function mk(ch){var e=document.createElement('span');e.setAttribute('aria-hidden','true');
 if(ch===' '){e.className='fl sp';return{e:e,ch:ch}}
 e.className='fl';e.innerHTML='<span class="u"><b></b></span><span class="d"><b></b></span><span class="f"><span class="ff"><b></b></span><span class="fb"><b></b></span></span>';return{e:e,ch:ch,cur:' '}}
function setc(t,q,v){var l=t.e.querySelectorAll(q);for(var i=0;i<l.length;i++)l[i].textContent=v}
function flip(t,nx,done){var f=t.e.querySelector('.f');setc(t,'.u b',nx);setc(t,'.ff b',t.cur);setc(t,'.fb b',nx);
 f.classList.remove('go');void f.offsetWidth;f.classList.add('go');
 setTimeout(function(){setc(t,'.d b',nx);setc(t,'.ff b',nx);f.classList.remove('go');t.cur=nx;done&&done()},175)}
[].slice.call(document.querySelectorAll('.st-n')).forEach(function(n,idx){
 var full=n.textContent.trim(),ts=[];n.setAttribute('aria-label',full);n.textContent='';
 full.split('').forEach(function(ch){var t=mk(ch);ts.push(t);n.appendChild(t.e);if(ch!==' '){setc(t,'b',ch);t.cur=ch}});
 if(still)return;
 ts.forEach(function(t){if(t.ch!==' '){setc(t,'b','0');t.cur='0'}});
 function run(){ts.forEach(function(t,i){if(t.ch===' ')return;var pool=DG.indexOf(t.ch)>=0?DG:LT+DG,steps=3+(i%2)+idx%2,s=0;
  (function nxt(){var v=s<steps?pool.charAt(Math.random()*pool.length|0):t.ch;
   setTimeout(function(){flip(t,v,function(){if(s++<steps)nxt()})},s?60:i*110+idx*60)})()})}
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();run()}},{threshold:.5});io.observe(n)}else run()});
/* 4. Accordion màn chập */
var ac=$('ac');
if(ac){var its=[].slice.call(ac.children);
 function open(i){its.forEach(function(it,k){it.classList.toggle('on',k===i);it.setAttribute('aria-expanded',k===i)})}
 its.forEach(function(it,k){if(fine)it.addEventListener('mouseenter',function(){open(k)});it.addEventListener('click',function(){open(k)});it.addEventListener('focus',function(){open(k)})});
 open(0)}
/* 5. Nút trọng lực */
var bt=document.querySelector('.gm-btn');
if(bt&&fine&&!still){addEventListener('pointermove',function(e){var r=bt.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.sqrt(dx*dx+dy*dy);
 bt.style.transform=d<150?'translate('+(dx*.32).toFixed(1)+'px,'+(dy*.45).toFixed(1)+'px)':''},{passive:true})}
})();
