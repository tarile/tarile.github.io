(function(){
var $=function(i){return document.getElementById(i)},RM=matchMedia('(prefers-reduced-motion: reduce)').matches,GAMES=['Free Fire','Liên Quân','PUBG','Play Together','FC Mobile VN'];
function fill(i,a,f){var el=$(i),k=el.querySelector('#fill');el.innerHTML=a.map(f).join('');if(k)el.insertBefore(k,el.firstChild)}
function pad(n){return('00'+n).slice(-3)}
/* Khối mẹ + 5 khối con: đổi tên file ảnh ở đây */
var KIDS=[['FF','unit-ff.jpg','QUÂN ĐOÀN UZI · FREE FIRE'],['LQ','unit-lq.jpg','CLAN UZI · LIÊN QUÂN'],['PUBG','unit-pubg.jpg','HỘI UZI · PUBG'],['PT','unit-pt.jpg','HỘI NHÓM UZI · PLAY TOGETHER'],['FC','unit-fc.jpg','LIÊN ĐOÀN UZI · FC MOBILE VN']];
/* Mặt khối mẹ: logo */
function lg(){return '<img class="lgimg" src="logo-uzi.jpg" alt="" aria-hidden="true" draggable="false">'}
function im(t,s){return '<span>'+t+'</span><img src="'+s+'" alt="" onload="this.previousSibling.remove()" onerror="this.remove()">'}
$('stage').innerHTML='<div class="cube" id="cube">'+[0,1,2,3,4,5].map(function(){return '<div>'+lg()+'</div>'}).join('')+'</div>'+KIDS.map(function(k,i){return '<div class="cc c'+(i+1)+'" data-n="'+k[2]+'" tabindex="0"><div class="cs"><div class="ck">'+[0,1,2,3,4,5].map(function(){return '<div>'+im(k[0],k[1])+'</div>'}).join('')+'</div></div></div>'}).join('');
/* HERO: khối 3D xoay theo chuột + nhảy số */
var cube=$('cube'),ry=25,rx=-20,tx=0,ty=0;
$('hero').addEventListener('mousemove',function(e){var r=this.getBoundingClientRect();tx=((e.clientY-r.top)/r.height-.5)*-70;ty=((e.clientX-r.left)/r.width-.5)*160});
(function f(){ry+=.35;cube.style.transform='rotateX('+(rx+=(tx-20-rx)*.06)+'deg) rotateY('+(ry+ty*.5)+'deg)';if(!RM)requestAnimationFrame(f)})();
new IntersectionObserver(function(es,o){es.forEach(function(e){if(!e.isIntersecting)return;o.unobserve(e.target);var b=e.target,n=+b.dataset.n,s=null;(function st(t){s=s||t;var p=Math.min((t-s)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)})(performance.now())})},{threshold:.5}).observe($('c1'));
['c1','c2','c3'].forEach(function(i){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();var b=$(i),n=+b.dataset.n,s=null;(function st(t){s=s||t;var p=Math.min((t-s)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)})(performance.now())}});o.observe($(i))});
/* 5 thẻ hologram */
var U=[['Quân Đoàn','Free Fire','#FFB300','Đã từng tạo lần 1 vào ngày 19/6/2020 - 24/10/2022','10/11/2025'],['Clan','Liên Quân Mobile','#00E5FF','1 Clan Duy Nhất','8/11/2026'],['Hội','PUBG','#E2E8F0','1 Hội Duy Nhất','13/4/2023'],['Hội Nhóm','Play Together','#3D8BFF','1 Hội Nhóm Duy Nhất','10/11/2026'],['Liên Đoàn','FC Mobile VN','#C084FC','1 Liên Đoàn Duy Nhất','9/11/2026']];
fill('cards',U,function(u,i){return '<article class="hc" style="--c:'+u[2]+'"><span class="no">0'+(i+1)+'</span><img class="hl-img" src="'+KIDS[i][1]+'" alt="Logo '+u[0]+' UZI" draggable="false" onerror="this.remove()"><small>'+u[1].toUpperCase()+'</small><h4>'+u[0]+' UZI</h4><p>'+u[3]+'</p><span class="d">THÀNH LẬP // '+u[4]+'</span></article>'});
[].forEach.call(document.querySelectorAll('.hc'),function(c){c.onmousemove=function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform='rotateX('+((.5-y)*16)+'deg) rotateY('+((x-.5)*16)+'deg) translateZ(12px)';c.style.setProperty('--bx',x*100+'%');c.style.setProperty('--by',y*100+'%')};c.onmouseleave=function(){c.style.transform=''}});
[].forEach.call(document.querySelectorAll('.bc'),function(c){c.onmousemove=function(e){var r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}});
/* Gia Đình UZI: giải mã ký tự cho tag + thông số khi rê chuột vào thẻ (0.3 giây) */
(function(){
if(RM)return;var SC='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
[].forEach.call(document.querySelectorAll('.bento .bc'),function(card){
 var els=[].slice.call(card.querySelectorAll('i,.st span'));
 els.forEach(function(el){el._t=el.textContent});
 card.addEventListener('mouseenter',function(){els.forEach(function(el){
  clearInterval(el._i);var t=el._t,n=0;
  el._i=setInterval(function(){n++;if(n>=12){clearInterval(el._i);el.textContent=t;return}
   var k=Math.floor(t.length*n/12);
   el.textContent=t.split('').map(function(c,j){return j<k||/[\s&]/.test(c)?c:SC.charAt(Math.random()*SC.length|0)}).join('')},25)})});
});
})();
/* Timeline */
fill('tl',[['10.11.2026','Mừng Kỉ Niệm 1 Năm Phục Hưng Quân Đoàn UZI','Ăn mừng kỉ niệm Quân Đoàn FF phục hưng sau 1 năm qua kèm theo nhiều kỉ niệm đáng nhớ và hành trình tiếp theo hướng tới phát triển tốt hơn'],['12.11.2026','Số Lượng Thành Viên Quân Đoàn UZI Tăng Đáng Kể','Sự thay đổi luật cực kì đáng kể đến từ Chỉ Huy Quân Đoàn UZI, phân cấp thành viên Thường, VIP, PREMIUM hợp lí làm gia tăng đáng kể số lượng thành viên tham gia vào quân đoàn'],['12.12.2026','Tổ Chức Custom Quy Mô Lớn','Sau thời gian chuẩn bị kỹ lưỡng để đảm bảo chất lượng từng trận đấu, sự kiện Custom Kỷ niệm 1 năm Quân Đoàn FF &amp; Mừng Sinh nhật Chỉ Huy UZI chính thức được tái định lịch và sẵn sàng khai hoả vào 12.12.2026'],['15.12.2026-1.1.2027','Hàng Loạt Sự Kiện &amp; Custom QĐ UZI','Quân Đoàn tổ chức phong phú về nhiều sự kiện khác nhau nhằm tạo tính sáng tạo và phát triển kỹ năng của thành viên quân đoàn, ngoài ra làm tăng sức hút và chất riêng của Quân Đoàn UZI']],function(e){return '<div class="ev"><time>'+e[0]+'</time><b>'+e[1]+'</b><span>'+e[2]+'</span></div>'});
/* Coverflow: [tiêu đề, nền tảng, link] */
var V=[['Video đú trend #1','Tiktok','https://www.tiktok.com/@tarile0211/video/7677109795672886549','video-trend-1.jpg'],['Video đú trend #2','Fanpage UZI','https://www.facebook.com/reel/997475752635289?locale=vi_VN','video-trend-2.jpg'],['Video đú trend #3','FB Tari Le','https://www.facebook.com/stories/2081008749308554/?source=profile_highlight&locale=vi_VN','video-trend-3.jpg'],['Video đú trend #4','Fanpage UZI','https://www.facebook.com/reel/2518575201902069?locale=vi_VN','video-trend-4.jpg'],['Video đú trend #5','Tiktok','https://www.tiktok.com/@tarile0211/video/7677103812863118612','video-trend-5.jpg']],cur=2,sw=0;
fill('cf',V,function(v){return '<a href="'+v[2].replace(/&/g,'&amp;')+'" target="_blank" rel="noopener noreferrer" data-p="'+v[1].toUpperCase()+'" aria-label="'+v[0]+' - Xem Trên '+v[1]+'"><img src="'+v[3]+'" alt="" loading="lazy" decoding="async" draggable="false" onerror="this.remove()"><span class="ov"></span><b>'+v[0]+'</b><small>Xem Trên '+v[1]+' ↗</small></a>'});
var sl=[].slice.call($('cf').children);
function cfr(){sl.forEach(function(a,i){var d=i-cur,m=Math.abs(d);a.style.transform='translateX('+d*62+'%) translateZ('+(-m*160)+'px) rotateY('+(-d*38)+'deg)';a.style.opacity=m>2?0:1-m*.3;a.style.zIndex=9-m;a.style.pointerEvents=m>2?'none':''})}
sl.forEach(function(a,i){a.onclick=function(e){if(sw){e.preventDefault();return}if(i!==cur){e.preventDefault();cur=i;cfr()}}});
function go(n){cur=Math.max(0,Math.min(sl.length-1,n));cfr()}
/* Cuộn con lăn chuột & vuốt trên dải video */
(function(){var cf=$('cf'),wl=0;
cf.addEventListener('wheel',function(e){var d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(Math.abs(d)<4)return;var n=cur+(d>0?1:-1);if(n<0||n>sl.length-1)return;e.preventDefault();var t=Date.now();if(t-wl<380)return;wl=t;go(n)},{passive:false});
var tx=0,ty=0;
cf.addEventListener('touchstart',function(e){var t=e.touches[0];tx=t.clientX;ty=t.clientY},{passive:true});
cf.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){sw=1;go(cur+(dx<0?1:-1));setTimeout(function(){sw=0},400)}},{passive:true});
})();
$('pv').onclick=function(){cur=Math.max(0,cur-1);cfr()};$('nx').onclick=function(){cur=Math.min(sl.length-1,cur+1);cfr()};cfr();
/* Vé giải đấu: tàn lửa + nút từ tính */
(function(){var c=$('em'),x=c.getContext('2d'),P=[],i;function rs(){c.width=c.offsetWidth;c.height=c.offsetHeight}rs();addEventListener('resize',rs);for(i=0;i<45;i++)P.push([Math.random(),Math.random(),Math.random()*2+.6,Math.random()*.6+.2]);var ev=false;new IntersectionObserver(function(es){ev=es[0].isIntersecting}).observe(c);(function f(){if(!ev&&!RM){requestAnimationFrame(f);return}x.clearRect(0,0,c.width,c.height);P.forEach(function(p){p[1]-=p[3]*.002;if(p[1]<0){p[1]=1;p[0]=Math.random()}x.fillStyle='rgba(255,'+(120+p[2]*40|0)+',30,'+p[1]*.8+')';x.beginPath();x.arc(p[0]*c.width,p[1]*c.height,p[2],0,6.3);x.fill()});if(!RM)requestAnimationFrame(f)})()})();
/* Vé giải đấu: cửa sập cơ khí mở khi cuộn tới */
(function(){var t=$('tkt');if(!t)return;
if(!RM&&'IntersectionObserver' in window){t.classList.add('arm');
 new IntersectionObserver(function(es){var v=es[0].isIntersecting;t.classList.toggle('tk-on',v);if(v)setTimeout(function(){t.classList.add('open')},250)},{threshold:.3}).observe(t)}
else t.classList.add('tk-on','open')})();
/* Giải đấu khác: thẻ "Đang Cập Nhật" kiểu kho dữ liệu niêm phong */
var VL=[['ARCHIVE // SLOT 01','Dữ liệu đang cập nhật','Hồ sơ giải đấu đang được đồng bộ...'],['ARCHIVE // SLOT 02','Dữ liệu đang cập nhật','Sắp công bố thành tích tiếp theo...'],['ARCHIVE // SLOT 03','Dữ liệu đang cập nhật','Đang chờ xác thực từ Chủ QĐ...']];
fill('bo',VL,function(v,i){return '<article class="vl" style="--n:'+i+'"><i class="vl-bm"></i><div class="vl-dial" aria-hidden="true"><i class="vl-r1"></i><i class="vl-r2"></i><i class="vl-sw"></i><i class="vl-b b1"></i><i class="vl-b b2"></i><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path class="vl-sh" d="M8 11V7.5a4 4 0 0 1 8 0V11"/><circle cx="12" cy="16" r="1.2"/></svg></div><span class="vl-tag">'+v[0]+'</span><h4 class="vl-t">'+v[1]+'</h4><p class="vl-s">'+v[2]+'</p><div class="vl-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div><div class="vl-pg" aria-hidden="true"><i></i></div><span class="vl-st"><i></i>STATUS: STANDBY</span></article>'});
/* Thành tích: huy hiệu lục giác 2 tầng + ngàm góc + đếm số */
var ACH=[
 ['#E5B85C','LEGACY // 01','<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>','Thuộc Top Quân Đoàn Lâu Đời Nhất','Sau bao nhiêu năm kể từ <strong>2020</strong>, trải qua nhiều lần đổi tên quân đoàn, tuyển và chọn lọc thành viên <strong>Quân Đoàn UZI</strong> vẫn duy trì vững mạnh đến ngày hôm nay','<span>EST.</span><b class="ach-n" data-s="2000" data-t="2020">2020</b><span>— BỀN VỮNG</span>'],
 ['#E2E8F0','COMMUNITY // 02','<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>','Tạo Nhiều Event &amp; Thu Hút Người Tham Gia','Tạo nhiều sự kiện độc lạ, mới mẻ, kèm thử thách khiến các thành viên hoặc thậm chí người ngoài quân đoàn rất thích thú muốn tham gia, đồng thời chuyển biến luật hợp lí thu hút nhiều người tham gia cùng <strong>Gia Đình UZI</strong>','<span>GIA ĐÌNH UZI // SÁNG TẠO</span>'],
 ['#F59E0B','ESPORTS &amp; WEB // 03','<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55-.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>','Giải Đấu Cộng Đồng Riêng &amp; Web QĐ UZI','Tạo ra sân chơi mới giúp các thành viên quân đoàn kèm những quân đoàn khác tranh đấu lành mạnh, văn minh, uy tín và trao giải thưởng thật thông qua <strong>4 mùa giải</strong>, tự sáng tạo ra Web dành riêng cho QĐ UZI','<b class="ach-n" data-s="0" data-t="4">4</b><span>MÙA GIẢI UY TÍN</span>']];
fill('ba',ACH,function(a){return '<article class="ach-card" style="--a:'+a[0]+'"><span class="ach-c tl"></span><span class="ach-c tr"></span><span class="ach-c bl"></span><span class="ach-c br"></span><span class="ach-badge">'+a[1]+'</span><div class="ach-em"><div class="ach-r1"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,3 93,26 93,74 50,97 7,74 7,26"/><circle cx="50" cy="3" r="3"/></svg></div><div class="ach-r2"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,5 90,27 90,73 50,95 10,73 10,27"/><circle cx="50" cy="5" r="2.5"/></svg></div><svg class="ach-ic" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+a[2]+'</svg></div><h3 class="ach-t">'+a[3]+'</h3><div class="ach-dv"></div><p class="ach-d">'+a[4]+'</p><div class="ach-ft">'+a[5]+'</div></article>'});
/* Số cột mốc chạy khi cuộn tới */
(function(){var g=$('ba'),ns=[].slice.call(g.querySelectorAll('.ach-n'));if(RM||!ns.length)return;
ns.forEach(function(n){n.textContent=n.dataset.s});
var io=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;io.disconnect();ns.forEach(function(n){var a=+n.dataset.s,b=+n.dataset.t,t0=performance.now();(function u(now){var p=Math.min((now-t0)/1400,1);n.textContent=Math.round(a+(b-a)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)})(t0)})},{threshold:.3});io.observe(g)})();
/* THÀNH TÍCH: 4 hiệu ứng */
(function(){
var g=$('ba');if(!g||RM||!window.IntersectionObserver)return;
var cards=[].slice.call(g.querySelectorAll('.ach-card'));if(!cards.length)return;
var NS='http://www.w3.org/2000/svg',dpr=Math.min(window.devicePixelRatio||1,2),can=typeof Element.prototype.animate==='function',hv=-1,E=[];
function R(a,b){return a+Math.random()*(b-a)}
function rgb(h){h=(h||'#E5B85C').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return(n>>16&255)+','+(n>>8&255)+','+(n&255)}

var fs=document.createElementNS(NS,'svg');fs.setAttribute('width','0');fs.setAttribute('height','0');fs.setAttribute('aria-hidden','true');fs.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
fs.innerHTML='<defs>'+cards.map(function(c,i){return '<filter id="achw'+i+'" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence id="acht'+i+'" type="fractalNoise" baseFrequency="0.012 0.08" numOctaves="1" seed="'+(3+i*5)+'" result="w"/><feDisplacementMap id="achd'+i+'" in="SourceGraphic" in2="w" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>'}).join('')+'</defs>';
document.body.appendChild(fs);
function wave(i){var c=cards[i];if(c._w)return;var d=fs.querySelector('#achd'+i),n=fs.querySelector('#acht'+i),t0=performance.now();c._w=1;c.style.filter='url(#achw'+i+')';
 (function f(now){var e=(now-t0)/1000,s=36*Math.exp(-4.2*e)*(.6+.4*Math.cos(e*20));
  d.setAttribute('scale',s.toFixed(2));n.setAttribute('baseFrequency',(.012+.006*Math.sin(e*13)).toFixed(4)+' '+(.08+.03*Math.cos(e*10)).toFixed(4));
  if(e<1.15)requestAnimationFrame(f);else{d.setAttribute('scale','0');c.style.filter='';c._w=0}})(t0)}

cards.forEach(function(c,i){
 var cv=document.createElement('canvas');cv.className='ach-emb';cv.setAttribute('aria-hidden','true');c.insertBefore(cv,c.firstChild);
 var o={c:c,cv:cv,x:cv.getContext('2d'),w:0,h:0,col:rgb(c.style.getPropertyValue('--a').trim()),p:[],m:{x:0,y:0,on:0}};E.push(o);
 function fit(){o.w=c.clientWidth;o.h=c.clientHeight;cv.width=Math.max(1,o.w*dpr);cv.height=Math.max(1,o.h*dpr);o.x.setTransform(dpr,0,0,dpr,0,0);
  if(!o.p.length)for(var k=0;k<34;k++)o.p.push({x:R(0,o.w),y:R(0,o.h),vx:R(-6,6),vy:R(-12,0),r:R(.7,2),s:R(.8,2.6),ph:R(0,6.3)})}
 fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(c);else addEventListener('resize',fit);
 function mv(e){var r=c.getBoundingClientRect();o.m.x=e.clientX-r.left;o.m.y=e.clientY-r.top}
 c.addEventListener('pointerenter',function(e){hv=i;o.m.on=1;mv(e)});c.addEventListener('pointermove',mv);
 c.addEventListener('pointerleave',function(){if(hv===i)hv=-1;o.m.on=0});
 var em=c.querySelector('.ach-em'),rg,lw=0;
 if(em){em.insertAdjacentHTML('beforeend','<svg class="ach-ring" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,3 93,26 93,74 50,97 7,74 7,26"/></svg>');rg=em.lastChild;
  var fire=function(){var n=performance.now();if(n-lw<1100)return;lw=n;wave(i);rg.classList.remove('go');void rg.getBoundingClientRect();rg.classList.add('go')};
  em.addEventListener('pointerenter',function(e){if(e.pointerType!=='touch')fire()});em.addEventListener('click',fire)}
});

function embers(dt,t){E.forEach(function(o){if(!o.c._on)return;var x=o.x,w=o.w,h=o.h,m=o.m,k=Math.pow(m.on?.94:.985,dt*60);
 x.clearRect(0,0,w,h);x.globalCompositeOperation='lighter';
 o.p.forEach(function(p){
  p.vx+=Math.sin(t*.7+p.ph)*8*dt;p.vy-=5*dt;
  if(m.on){var dx=m.x-p.x,dy=m.y-p.y,d=Math.sqrt(dx*dx+dy*dy)+.001,f=Math.min(1,170/d),rg=Math.max(-1,Math.min(1,(d-46)/46));
   p.vx+=(dx/d*340*f*rg-dy/d*230*f)*dt;p.vy+=(dy/d*340*f*rg+dx/d*230*f)*dt}
  p.vx*=k;p.vy*=k;p.x+=p.vx*dt;p.y+=p.vy*dt;
  if(p.y<-8){p.y=h+8;p.x=R(0,w);p.vx=p.vy=0}if(p.y>h+8)p.y=-8;if(p.x<-8)p.x=w+8;if(p.x>w+8)p.x=-8;
  var a=.25+.75*Math.abs(Math.sin(t*p.s+p.ph)),sp=Math.min(1,Math.sqrt(p.vx*p.vx+p.vy*p.vy)/160);
  x.fillStyle='rgba('+o.col+','+(a*(.5+.5*sp)).toFixed(3)+')';x.beginPath();x.arc(p.x,p.y,p.r*(1+sp*.6),0,6.3);x.fill();
  x.fillStyle='rgba('+o.col+','+(a*.13*(1+sp*2)).toFixed(3)+')';x.beginPath();x.arc(p.x,p.y,p.r*3.4,0,6.3);x.fill()});
 x.globalCompositeOperation='source-over'})}

var cn=document.createElement('canvas');cn.className='ach-net';cn.setAttribute('aria-hidden','true');g.appendChild(cn);
var cx=cn.getContext('2d'),NW=0,NH=0,pairs=[];
for(var i=0;i<cards.length;i++)for(var j=i+1;j<cards.length;j++)pairs.push({a:i,b:j,h:0,s:i});
function fitN(){NW=g.clientWidth;NH=g.clientHeight;cn.width=Math.max(1,NW*dpr);cn.height=Math.max(1,NH*dpr);cx.setTransform(dpr,0,0,dpr,0,0)}
fitN();if(window.ResizeObserver)new ResizeObserver(fitN).observe(g);else addEventListener('resize',fitN);
function bz(A,Q,B,u){var v=1-u;return[v*v*A[0]+2*v*u*Q[0]+u*u*B[0],v*v*A[1]+2*v*u*Q[1]+u*u*B[1]]}
function net(dt,t){cx.clearRect(0,0,NW,NH);var gr=g.getBoundingClientRect(),C=cards.map(function(c){var e=c.querySelector('.ach-em')||c,r=e.getBoundingClientRect();return[r.left+r.width/2-gr.left,r.top+r.height/2-gr.top]}),ng=cards.map(function(){return 0});
 pairs.forEach(function(p){if(!cards[p.a]._on||!cards[p.b]._on)return;
  var hot=hv===p.a||hv===p.b;if(hot)p.s=hv;p.h=Math.max(0,Math.min(1,p.h+(hot?2.4:-3)*dt));
  var A=C[p.a],B=C[p.b],dx=B[0]-A[0],dy=B[1]-A[1],L=Math.sqrt(dx*dx+dy*dy)||1,ar=Math.min(90,40+L*.12),Q=[(A[0]+B[0])/2+dy/L*ar,(A[1]+B[1])/2-dx/L*ar],s,u,pt;
  cx.setLineDash([3,7]);cx.lineWidth=1;cx.strokeStyle='rgba(255,158,0,'+(.11+.06*Math.sin(t*.8+p.a)).toFixed(3)+')';cx.beginPath();cx.moveTo(A[0],A[1]);cx.quadraticCurveTo(Q[0],Q[1],B[0],B[1]);cx.stroke();cx.setLineDash([]);
  if(p.h<=0)return;var fw=p.s===p.a;
  cx.globalCompositeOperation='lighter';cx.lineWidth=1.6;cx.strokeStyle='rgba(255,190,90,.95)';cx.shadowColor='#FF9E00';cx.shadowBlur=10;cx.beginPath();
  for(s=0;s<=28;s++){u=s/28*p.h;pt=bz(A,Q,B,fw?u:1-u);s?cx.lineTo(pt[0],pt[1]):cx.moveTo(pt[0],pt[1])}cx.stroke();
  pt=bz(A,Q,B,fw?p.h:1-p.h);cx.fillStyle='#fff';cx.beginPath();cx.arc(pt[0],pt[1],3,0,6.3);cx.fill();
  for(s=0;s<3;s++){u=((t*.55+s/3)%1)*p.h;pt=bz(A,Q,B,fw?u:1-u);cx.fillStyle='rgba(255,230,160,.95)';cx.beginPath();cx.arc(pt[0],pt[1],1.9,0,6.3);cx.fill()}
  cx.shadowBlur=0;cx.globalCompositeOperation='source-over';
  ng[p.s]=Math.max(ng[p.s],p.h);var o=p.s===p.a?p.b:p.a;if(p.h>.97)ng[o]=1});
 ng.forEach(function(v,i){if(v<.05)return;cx.strokeStyle='rgba(255,170,60,'+(.5*v).toFixed(3)+')';cx.lineWidth=1.2;cx.beginPath();cx.arc(C[i][0],C[i][1],58+2.5*Math.sin(t*3+i),0,6.3);cx.stroke()})}

var vis=false,run=false,last=0,T=0;
function loop(now){if(!vis||document.hidden){run=false;return}var dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;embers(dt,T);net(dt,T);requestAnimationFrame(loop)}
function kick(){if(vis&&!run&&!document.hidden){run=true;last=performance.now();requestAnimationFrame(loop)}}
new IntersectionObserver(function(es){vis=es[0].isIntersecting;kick()},{rootMargin:'80px'}).observe(g);document.addEventListener('visibilitychange',kick);

function mesh(w,h,cx_,cy_){var P=[],i,j,a,b,c,d,T=[];
 for(j=0;j<=cy_;j++){P[j]=[];for(i=0;i<=cx_;i++){var x=i/cx_*w,y=j/cy_*h;if(i>0&&i<cx_)x+=R(-.35,.35)*w/cx_;if(j>0&&j<cy_)y+=R(-.35,.35)*h/cy_;P[j][i]=[x,y]}}
 for(j=0;j<cy_;j++)for(i=0;i<cx_;i++){a=P[j][i];b=P[j][i+1];c=P[j+1][i+1];d=P[j+1][i];if(Math.random()<.5){T.push([a,b,c],[a,c,d])}else{T.push([a,b,d],[b,c,d])}}
 return T}
function shatter(c){var w=c.offsetWidth,h=c.offsetHeight,ov=document.createElement('div'),an=[],fin=false;
 ov.className='shat';ov.setAttribute('aria-hidden','true');ov.style.cssText='left:'+c.offsetLeft+'px;top:'+c.offsetTop+'px;width:'+w+'px;height:'+h+'px';
 function done(){if(fin)return;fin=true;c._on=true;c.style.transition='none';c.classList.remove('pre');c.classList.add('pop');ov.remove();
  requestAnimationFrame(function(){requestAnimationFrame(function(){c.style.transition=''})});setTimeout(function(){c.classList.remove('pop')},900)}
 try{mesh(w,h,3,3).forEach(function(t){
  var cl=c.cloneNode(true),mx=(t[0][0]+t[1][0]+t[2][0])/3,my=(t[0][1]+t[1][1]+t[2][1])/3,vx=mx-w/2,vy=my-h/2,vl=Math.sqrt(vx*vx+vy*vy)||1,tr=R(90,230),cp;
  cl.classList.remove('pre');cl.removeAttribute('id');
  [].forEach.call(cl.querySelectorAll('canvas,.ach-ring'),function(n){n.remove()});
  [].forEach.call(cl.querySelectorAll('.ach-n'),function(n){n.textContent=n.dataset.t});
  cp='polygon('+t.map(function(v){var dx=v[0]-mx,dy=v[1]-my,l=Math.sqrt(dx*dx+dy*dy)||1;return(v[0]+dx/l*.8).toFixed(1)+'px '+(v[1]+dy/l*.8).toFixed(1)+'px'}).join(',')+')';
  cl.style.clipPath=cp;cl.style.webkitClipPath=cp;cl.style.transformOrigin=mx.toFixed(1)+'px '+my.toFixed(1)+'px';ov.appendChild(cl);
  an.push(cl.animate([{opacity:0,transform:'translate('+(vx/vl*tr+R(-30,30)).toFixed(1)+'px,'+(vy/vl*tr+R(-60,10)).toFixed(1)+'px) rotate('+R(-50,50).toFixed(1)+'deg) scale('+R(.45,.8).toFixed(2)+')'},{opacity:1,transform:'none'}],{duration:R(750,1150),delay:R(0,320),easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}))});
  g.appendChild(ov);Promise.all(an.map(function(a){return a.finished})).then(done,done);setTimeout(done,2600)}catch(e){done()}}

if(can){cards.forEach(function(c){c.classList.add('pre')});
 var so=new IntersectionObserver(function(es){var k=0;es.forEach(function(e){if(!e.isIntersecting)return;so.unobserve(e.target);setTimeout(function(){shatter(e.target)},k++*230)})},{threshold:.2});
 cards.forEach(function(c){so.observe(c)})}
else cards.forEach(function(c){c._on=true});
})();
/* Terminal luật */
var T={'Luật Quân Đoàn':['t1','luat-quan-doan.txt',
'[1] KHÔNG PHÂN BIỆT vùng miền, giới tính, giàu nghèo, tuổi tác',
'[2] KHÔNG TAG @mọi người => chỉ tag người rủ chơi cùng, ví dụ: @Tari Le',
'[3] THÀNH VIÊN VIP thì đổi tên theo cú pháp: UZI + Kí Tự Khoảng Cách + TÊN FULL IN HOA',
'[4] XIN OFF QUÁ LÂU khoảng hơn 10 ngày thì nhớ báo trước cho Chủ QĐ',
'[5] Nên tương tác trong box nhiều để anh em còn biết mình là ai',
'[6] TUYỆT ĐỐI KHÔNG CHAT TRONG BOX THÔNG BÁO',
'[7] LUYỆN PHÒNG FF sẽ có khi Chủ QĐ THÔNG BÁO, anh em bình chọn trước sẽ ưu tiên slot để luyện, lâu lâu có Giao Lưu Quân Đoàn thì chỉ tham gia khi có Chủ QĐ duyệt',
'[8] Chơi Luyện Phòng FF thì áp dụng theo LUẬT LUYỆN PHÒNG FF GIÁP / HS'],
'Luật Luyện Phòng':['t2','luat-luyen-phong.txt',
'[1] CẤM HACK, CHEAT, TOOLS',
'[2] KO CỨU, KO NHẢY VÀO KEO TRÒN, CẤM ĐỤC KEO [trừ trường hợp kẹt keo để đi lại], CẤM LEO NÓC',
'[3] CẤM SPAM KEO LÀM KẸT GÓC KHÔNG ĐI ĐƯỢC, KỂ CẢ CHẶN BO CUỐI',
'[4] CẤM XÀI KỸ NĂNG CHỦ ĐỘNG [TRỪ ALOK]',
'[5] CẤM GÂY WAR, CẤM XÀI HÀNH ĐỘNG KHỊA TEAM ĐỊCH [được xài với đồng đội và người xem]',
'[6] SAI LUẬT THÌ CẤM PHÒNG 1 NGÀY, QUA 24H MỚI ĐƯỢC CHƠI TIẾP',
'[7] BẤT KỲ AI XÀI HACK, CHEAT, TOOLS => BỊ KICK VĨNH VIỄN'],
'Quyền Lợi Thành Viên':['t3','quyen-loi.txt',
['h','Thành Viên Bình Thường: [Điều kiện: áp dụng ở Quân Đoàn FreeFire]'],
'[1] Vào QĐ FF chưa đổi tên theo QĐ UZI hoặc Đổi Sai Mẫu QĐ UZI',
'[2] Chỉ được vào box chat + box thông báo UZI + gắn biệt danh là No Name + Kí Tự đầu tiên Tên Game Hiện Tại',
['h','Thành Viên VIP: [Điều kiện: áp dụng mọi game thuộc QĐ UZI]'],
'[1] Đổi tên theo QĐ UZI [áp dụng game FF] [Game Khác thuộc QĐ UZI thì không cần đổi tên, đổi thì thuộc thành viên PREMIUM]',
'[2] Được vào box chat + box thông báo UZI + gắn biệt danh đẹp',
'[3] Được tham gia đú trend cùng anh em QĐ UZI',
'[4] Được thiết kế tên lên web',
'[5] Được tham gia sự kiện của Quân Đoàn',
'[6] Được tham gia đại diện QĐ UZI bắn giải cộng đồng đa thể loại game',
['h','Thành Viên PREMIUM:'],
'{Điều Kiện được xét theo 1 trong 2:',
'[1] Vào QĐ FF đã đổi tên đúng mẫu + Vào QĐ game khác của QĐ UZI đã đổi tên đúng mẫu',
'[2] Vào QĐ UZI ở 2 game khác Free Fire + Đổi tên đúng mẫu}',
['h','Được Quyền Lợi:'],
'[1] Quyền hạn như VIP',
'[2] Được thiết kế riêng bản thân lên web của QĐ',
'[3] Được xem xét điều kiện làm Kì Cựu QĐ UZI [nếu đủ bản lĩnh]',
'[4] Được ưu tiên slot đầu về đú trend, đấu giải, custom',
'[5] Được Chủ QĐ để ý, nâng đỡ nhiều hơn và chơi cùng nhiều hơn']},
tp=$('tp'),rs=document.createElement('i'),
TK='(?=[\\p{Lu}\\p{N}]*\\p{Lu})[\\p{Lu}\\p{N}]{2,}',
RE=new RegExp('(^|[^\\p{L}\\p{N}])('+TK+'(?:(?:[ ]+(?:[/+][ ]+)?|,[ ]+)'+TK+')*)(?![\\p{L}\\p{N}])','gu');
rs.className='rs';rs.setAttribute('aria-hidden','true');tp.parentNode.appendChild(rs);
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function hl(s){return esc(s.normalize('NFC')).replace(RE,function(m,a,p){
 var c=/CẤM|(^| )KO( |$)|KICK|TUYỆT ĐỐI|SAI LUẬT/.test(p)?' warn':/PREMIUM/.test(p)?' prem':/VIP/.test(p)?' vip':'';
 return a+'<span class="cap'+c+'">'+p+'</span>'})}
function show(k,b){
 [].forEach.call($('tt').children,function(x){x.classList.toggle('on',x===b)});
 var a=T[k],h='<div class="rc" style="--i:0">'+k+'<i class="cu"></i></div>',n=1;
 a.slice(2).forEach(function(l){var hd=typeof l!=='string',t=hd?l[1]:l,m=!hd&&t.match(/^(\[\d+\])\s?([\s\S]*)$/);
  h+='<div class="rl'+(hd?' rg':'')+'" style="--i:'+(n++)+'">'+(m?'<b class="ix">'+m[1]+'</b> '+hl(m[2]):hl(t))+'</div>'});
 tp.className=a[0];tp.innerHTML=h;rs.classList.remove('go');void rs.offsetWidth;if(!RM)rs.classList.add('go')}
Object.keys(T).forEach(function(k,i){var b=document.createElement('button');b.type='button';b.textContent=k;b.onclick=function(){show(k,b)};$('tt').appendChild(b);if(!i)b.onclick()});
/* Chòm sao Thần Long 16:9: UZI – THE DRAGON CONSTELLATION */
(function(){
var cv=$('dr');if(!cv)return;
var c=cv.getContext('2d'),sky=$('dgSky'),hud=$('dgHud'),W=1280,H=720,K='uziHome';

/* ===== DỮ LIỆU SỐ ANH EM MỖI TỈNH ===== */
var MB={'Long An':4,'Trà Vinh':3,'Quảng Nam':2,'Quảng Bình':3,'Thái Nguyên':3,'TP.HCM':2,'Đà Nẵng':1,'Thừa Thiên Huế':1,'Kiên Giang':2,'Thanh Hóa':2,'Nghệ An':2,'Vĩnh Long':1,'Lào Cai':1,'Hậu Giang':2,'Bắc Ninh':1,'Bình Định':1,'Tuyên Quang':1,'Thái Bình':2,'Nam Định':1,'Sơn La':1,'Tiền Giang':1,'Ninh Thuận':1,'Hà Tĩnh':1,'Hà Nội':1,'Đắk Lắk':1,'Ninh Bình':1,'Lai Châu':1,'Cà Mau':1};

var MBN={"Long An":["AMIA","SIXBEO","DEATH","GHƯNG"],"Trà Vinh":["HANA","BOUBOR","TOBIE"],"Quảng Nam":["VTUNG","DVNT"],"Quảng Bình":["VLUAT","XHIEU","No VT"],"Thái Nguyên":["CANDY","黄文荣","Hong Em"],"TP.HCM":["TPHAT","Wait Wait"],"Đà Nẵng":["BẮP"],"Thừa Thiên Huế":["HANTEX"],"Kiên Giang":["HNAM","NHUTBUN"],"Thanh Hóa":["HaiYen","NG.HUY"],"Nghệ An":["GMINH","50MB"],"Vĩnh Long":["TARI"],"Ninh Bình":["MHOANG"],"Lào Cai":["Thu Thuy"],"Hậu Giang":["FOR","MEW"],"Bắc Ninh":["Emmi"],"Bình Định":["NTRI"],"Tuyên Quang":["OBITO"],"Thái Bình":["PAW","ZHY."],"Nam Định":["P.AN"],"Sơn La":["HUỲNH"],"Tiền Giang":["806"],"Ninh Thuận":["HUNTE"],"Hà Tĩnh":["WINDY"],"Hà Nội":["NINI"],"Đắk Lắk":["Như Hạo"],"Lai Châu":["TNGHIA"],"Cà Mau":["LopTruong"]};
var NAMES=['Hà Nội','TP.HCM','Cần Thơ','Đà Nẵng','Hải Phòng','An Giang','Bà Rịa - Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu','Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận','Cà Mau','Cao Bằng','Đắk Lắk','Đắk Nông','Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Tĩnh','Hải Dương','Hậu Giang','Hòa Bình','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng','Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'];

var T=0,last=0,raf=0,vis=false,lastPh=-1,roarT=-1,breathT=-1,qB=-1,rw=[],P=[],SH=[],HV=-1,SEL=-1,HOME='',i,sc=1,snd=false;
try{HOME=localStorage.getItem(K)||''}catch(e){}

var ST=[],E=[];
for(i=0;i<41;i++){
  var t=i/40;
  var nx=0.09+t*0.63;
  var ny=0.53+Math.sin(t*Math.PI*2.5-0.45)*0.16-(t*0.07);
  ST.push({nx:nx,ny:ny,t:t,part:i>35?'head':(i<6?'tail':'spine'),sz:i>35?3.6:(i<5?2.0:2.7),ph:i*0.24});
}
[[0.67,0.24,'horn',2.6],[0.62,0.17,'horn',2.3],[0.56,0.13,'horn',2.1],
 [0.70,0.26,'horn',2.5],[0.66,0.19,'horn',2.1],
 [0.63,0.31,'mane',2.3],[0.58,0.29,'mane',2.2],[0.53,0.33,'mane',2.0]
].forEach(function(d,k){ST.push({nx:d[0],ny:d[1],t:0.9,part:d[2],sz:d[3],ph:(41+k)*0.24})});

[[0.76,0.37,'head',3.2],[0.75,0.45,'jaw',2.7],[0.70,0.46,'jaw',2.4],
 [0.79,0.31,'whisker',2.1],[0.84,0.26,'whisker',1.9],[0.80,0.50,'whisker',2.1]
].forEach(function(d,k){ST.push({nx:d[0],ny:d[1],t:1,part:d[2],sz:d[3],ph:(49+k)*0.24})});

[[0.58,0.54,'claw',2.6],[0.62,0.62,'claw',2.5],[0.67,0.61,'claw',2.3],[0.65,0.67,'claw',2.3],
 [0.33,0.66,'claw',2.6],[0.30,0.75,'claw',2.5],[0.35,0.79,'claw',2.3],[0.27,0.78,'claw',2.3]
].forEach(function(d,k){ST.push({nx:d[0],ny:d[1],t:k<4?0.7:0.35,part:d[2],sz:d[3],ph:(55+k)*0.24})});

ST.forEach(function(s,idx){
  s.n=NAMES[idx];
  s.m=MB[s.n]||0;
  s.x=s.nx*W;s.y=s.ny*H;
  s.tw=Math.random()*6.3;
});

for(i=0;i<40;i++)E.push([i,i+1,1]);
[[37,41],[41,42],[42,43],[38,44],[44,45],[36,46],[46,47],[47,48],
 [40,49],[39,50],[50,51],[49,52],[52,53],[50,54],[49,50],
 [27,55],[55,56],[56,57],[56,58],
 [13,59],[59,60],[60,61],[60,62]
].forEach(function(e){E.push([e[0],e[1],1])});
for(i=3;i<37;i+=3)E.push([i,i+2,0]);

var ISL=[
  {n:'Quần đảo Hoàng Sa',nx:0.86,ny:0.63,s:'Quần đảo thiêng liêng của Tổ quốc',pts:[[0,0],[14,-8],[22,5],[8,14]]},
  {n:'Quần đảo Trường Sa',nx:0.90,ny:0.81,s:'Quần đảo thiêng liêng của Tổ quốc',pts:[[0,0],[-14,9],[12,15],[19,-4],[3,-13]]}
];

var DUST=[];for(i=0;i<150;i++)DUST.push([Math.random()*W,Math.random()*H,Math.random()*1.4+0.3,Math.random()*6.3]);
var TOT=0,NP=0,MX=0;ST.forEach(function(s){TOT+=s.m;if(s.m)NP++;if(s.m>MX)MX=s.m});
function R(a,b){return a+Math.random()*(b-a)}

var AC=null,mst,rev,nb;
function audio(){if(AC)return AC;var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();var cp=AC.createDynamicsCompressor(),n=AC.sampleRate*2.8|0,b=AC.createBuffer(2,n,AC.sampleRate),ch,d,k,rg;
 mst=AC.createGain();mst.gain.value=.9;mst.connect(cp);cp.connect(AC.destination);
 for(ch=0;ch<2;ch++){d=b.getChannelData(ch);for(k=0;k<n;k++)d[k]=(Math.random()*2-1)*Math.pow(1-k/n,2.6)}
 rev=AC.createConvolver();rev.buffer=b;rg=AC.createGain();rg.gain.value=.5;rev.connect(rg);rg.connect(mst);
 nb=AC.createBuffer(1,AC.sampleRate*3,AC.sampleRate);d=nb.getChannelData(0);for(k=0;k<d.length;k++)d[k]=Math.random()*2-1;return AC}
function out(n,wet){n.connect(mst);var g=AC.createGain();g.gain.value=wet;n.connect(g);g.connect(rev)}
function noise(){var s=AC.createBufferSource();s.buffer=nb;s.loop=true;return s}
function env(g,t,a,pk,d){g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d)}
function curve(k){var n=512,a=new Float32Array(n),x,q;for(q=0;q<n;q++){x=q*2/n-1;a[q]=(1+k)*x/(1+k*Math.abs(x))}return a}
function ok(){return snd&&vis&&AC&&AC.state==='running'}
function sRoar(){if(!ok())return;var t=AC.currentTime,D=2.8,sh=AC.createWaveShaper(),lp=AC.createBiquadFilter(),g=AC.createGain(),lf=AC.createOscillator(),lg=AC.createGain(),n,bp,ng,sb,sg;
 sh.curve=curve(30);lp.type='lowpass';lp.frequency.setValueAtTime(900,t);lp.frequency.exponentialRampToValueAtTime(160,t+D);
 [[1,.5],[1.498,.22],[.5,.35]].forEach(function(v){var o=AC.createOscillator(),og=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(92*v[0],t);o.frequency.exponentialRampToValueAtTime(36*v[0],t+D);og.gain.value=v[1];lf.connect(lg);lg.connect(o.frequency);o.connect(og);og.connect(sh);o.start(t);o.stop(t+D+.1)});
 lf.frequency.value=11;lg.gain.value=5;lf.start(t);lf.stop(t+D+.1);
 sh.connect(lp);lp.connect(g);env(g,t,.14,.42,D);out(g,.8);
 n=noise();bp=AC.createBiquadFilter();bp.type='bandpass';bp.Q.value=3;bp.frequency.setValueAtTime(700,t);bp.frequency.exponentialRampToValueAtTime(140,t+D);ng=AC.createGain();env(ng,t,.1,.28,D*.9);n.connect(bp);bp.connect(ng);out(ng,.7);n.start(t);n.stop(t+D);
 sb=AC.createOscillator();sg=AC.createGain();sb.type='sine';sb.frequency.setValueAtTime(52,t);sb.frequency.exponentialRampToValueAtTime(26,t+1.6);env(sg,t,.05,.6,1.7);sb.connect(sg);out(sg,.2);sb.start(t);sb.stop(t+1.8)}
function sBreath(){if(!ok())return;var t=AC.currentTime,D=2.8,n=noise(),bp=AC.createBiquadFilter(),hp=AC.createBiquadFilter(),g=AC.createGain(),k,c2,cg,cb;
 bp.type='bandpass';bp.Q.value=1.1;bp.frequency.setValueAtTime(1100,t);bp.frequency.exponentialRampToValueAtTime(260,t+D);hp.type='highpass';hp.frequency.value=160;
 env(g,t,.5,.3,D);n.connect(bp);bp.connect(hp);hp.connect(g);out(g,.6);n.start(t);n.stop(t+D);
 for(k=0;k<16;k++){c2=noise();cb=AC.createBiquadFilter();cb.type='highpass';cb.frequency.value=2200;cg=AC.createGain();var at=t+R(.1,2.4);cg.gain.setValueAtTime(.0001,at);cg.gain.linearRampToValueAtTime(R(.05,.14),at+.004);cg.gain.exponentialRampToValueAtTime(.0001,at+R(.03,.08));c2.connect(cb);cb.connect(cg);out(cg,.3);c2.start(at);c2.stop(at+.1)}}
function sFly(){if(!ok())return;var t=AC.currentTime,D=3.6,n=noise(),bp=AC.createBiquadFilter(),g=AC.createGain(),pn=AC.createStereoPanner?AC.createStereoPanner():null;
 bp.type='bandpass';bp.Q.value=2;bp.frequency.setValueAtTime(220,t);bp.frequency.exponentialRampToValueAtTime(1500,t+D*.5);bp.frequency.exponentialRampToValueAtTime(260,t+D);
 env(g,t,1.4,.12,D);n.connect(bp);bp.connect(g);if(pn){pn.pan.setValueAtTime(-.8,t);pn.pan.linearRampToValueAtTime(.8,t+D);g.connect(pn);out(pn,.5)}else out(g,.5);n.start(t);n.stop(t+D);
 [55,82.4,110].forEach(function(f,q){var o=AC.createOscillator(),og=AC.createGain();o.type='triangle';o.frequency.value=f;env(og,t,1.6,.07/(q+1),D+.4);o.connect(og);out(og,.6);o.start(t);o.stop(t+D+.5)})}

var HT=[['CHẾ ĐỘ 1/3: THẦN LONG BAY LƯỢN (LONG MẠCH)','#00F5D4'],['CHẾ ĐỘ 2/3: SÓNG XUNG KÍCH THIÊN HÀ','#FFD700'],['CHẾ ĐỘ 3/3: HƠI THỞ LỬA THIÊN HÀ','#FF4D00']];
function setHud(k){hud.textContent=HT[k][0];hud.style.color=HT[k][1];hud.style.borderColor=HT[k][1]}
function doFly(){setHud(0);sFly()}
function doRoar(){setHud(1);roarT=0;rw=[[0,'255,215,0'],[0.2,'0,245,212'],[0.4,'157,78,221']];sRoar()}
function doBreath(){setHud(2);breathT=0;sBreath()}

function step(dt){
  var q,ph,cyc;T+=dt;
  if(!RM){cyc=T%12;ph=cyc<4.5?0:cyc<8?1:2;if(ph!==lastPh){lastPh=ph;[doFly,doRoar,doBreath][ph]()}}
  if(qB>=0){qB-=dt;if(qB<0)doBreath()}

  var amp=RM?0:(lastPh===0?14:8);
  ST.forEach(function(s){
    var wy=Math.sin(T*2.3-s.ph)*amp*(0.4+s.t*0.7);
    var wx=Math.cos(T*1.7-s.ph)*(amp*0.35);
    s.x=s.nx*W+wx;
    s.y=s.ny*H+wy;
  });

  if(roarT>=0){
    roarT+=dt;
    while(rw.length&&roarT>=rw[0][0]){
      var item=rw.shift();
      P.push({w:1,x:ST[49].x,y:ST[49].y,r:10,a:1,c:item[1]});
    }
    if(roarT>4)roarT=-1;
  }

  if(breathT>=0){
    breathT+=dt;
    q=Math.ceil(dt*115);
    while(q--&&P.length<550){
      var an=R(-0.24,0.24),sp=R(240,460);
      var pal=['255,215,0','0,245,212','255,77,0','255,255,255'];
      P.push({x:ST[49].x+8,y:ST[49].y+4,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,l:0,m:R(0.75,1.45),r:R(1.5,3.5),c:pal[Math.random()*pal.length|0],br:1});
    }
    if(breathT>2.8)breathT=-1;
  }

  if(!RM&&Math.random()<dt*0.45&&SH.length<3){
    SH.push({x:R(W*0.05,W*0.75),y:R(H*0.04,H*0.35),vx:R(480,720),vy:R(160,260),l:0,m:R(0.6,1.0)});
  }
  for(q=SH.length-1;q>=0;q--){
    var ss=SH[q];ss.l+=dt;if(ss.l>=ss.m){SH.splice(q,1);continue}
    ss.x+=ss.vx*dt;ss.y+=ss.vy*dt;
  }

  if(!RM&&P.length<320){
    var idx=Math.random()*41|0,spNode=ST[idx];
    P.push({x:spNode.x+R(-12,12),y:spNode.y+R(-12,12),vx:R(-18,18),vy:R(-16,16),l:0,m:R(0.8,1.5),r:R(0.7,1.6),c:Math.random()<0.5?'0,245,212':'157,78,221'});
  }

  for(q=P.length-1;q>=0;q--){
    var p=P[q];
    if(p.w){p.r+=380*dt;p.a=1-p.r/680;if(p.a<=0)P.splice(q,1);continue}
    p.l+=dt;if(p.l>=p.m){P.splice(q,1);continue}
    p.x+=p.vx*dt;p.y+=p.vy*dt;
    if(p.br)p.y+=Math.sin(p.x*0.035)*35*dt;
    p.vx*=1-0.9*dt;p.vy*=1-0.9*dt;
  }
}

function mine(s){return HOME&&s.n===HOME}

function render(){
  var k,s,a,b,f,sh=0;
  c.setTransform(sc,0,0,sc,0,0);
  c.clearRect(0,0,W,H);

  var pulseA=0.11+Math.sin(T*1.4)*0.04;
  var nb1=c.createRadialGradient(W*0.44,H*0.46,30,W*0.44,H*0.46,W*0.46);
  nb1.addColorStop(0,'rgba(0,245,212,'+pulseA+')');
  nb1.addColorStop(0.5,'rgba(123,44,191,'+(pulseA*0.95)+')');
  nb1.addColorStop(1,'transparent');
  c.fillStyle=nb1;c.fillRect(0,0,W,H);

  var nb2=c.createRadialGradient(ST[49].x,ST[49].y,10,ST[49].x,ST[49].y,170);
  nb2.addColorStop(0,'rgba(255,77,0,'+(0.14+Math.sin(T*2.5)*0.05)+')');
  nb2.addColorStop(1,'transparent');
  c.fillStyle=nb2;c.fillRect(0,0,W,H);

  DUST.forEach(function(d){
    c.fillStyle='rgba(255,255,255,'+(.2+.35*Math.abs(Math.sin(T*1.1+d[3])))+')';
    c.beginPath();c.arc(d[0],d[1],d[2],0,6.3);c.fill();
  });
  SH.forEach(function(ss){
    var al=1-ss.l/ss.m,tx=ss.x-ss.vx*0.16,ty=ss.y-ss.vy*0.16;
    var g=c.createLinearGradient(ss.x,ss.y,tx,ty);
    g.addColorStop(0,'rgba(255,255,255,'+al+')');
    g.addColorStop(0.4,'rgba(0,245,212,'+(al*0.6)+')');
    g.addColorStop(1,'transparent');
    c.strokeStyle=g;c.lineWidth=2;c.beginPath();c.moveTo(ss.x,ss.y);c.lineTo(tx,ty);c.stroke();
  });

  if(roarT>=0&&roarT<1.3)sh=(1-roarT/1.3)*5.5;
  if(sh)c.translate(R(-sh,sh),R(-sh,sh));

  c.lineCap='round';c.lineJoin='round';c.lineWidth=18;
  for(k=0;k<40;k++){
    c.strokeStyle='rgba(0,245,212,0.045)';
    c.beginPath();c.moveTo(ST[k].x,ST[k].y);c.lineTo(ST[k+1].x,ST[k+1].y);c.stroke();
  }
  for(k=0;k<E.length;k++){
    a=ST[E[k][0]];b=ST[E[k][1]];
    var lg=c.createLinearGradient(a.x,a.y,b.x,b.y);
    var op=E[k][2]?0.62:0.2;
    lg.addColorStop(0,'rgba(0,245,212,'+op+')');
    lg.addColorStop(0.5,'rgba(157,78,221,'+(op*0.85)+')');
    lg.addColorStop(1,'rgba(255,215,0,'+(op*1.1)+')');
    c.lineWidth=E[k][2]?1.6:0.85;
    c.strokeStyle=lg;
    c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();
  }

  ISL.forEach(function(o,q){
    var bx=o.nx*W,by=o.ny*H+Math.sin(T*1.6+q*2)*4.5,pu=1+Math.sin(T*2.8+q)*0.18;
    o.x=bx;o.y=by;
    var g=c.createRadialGradient(bx,by,2,bx,by,38*pu);
    g.addColorStop(0,'rgba(255,215,0,.78)');
    g.addColorStop(0.5,'rgba(255,170,0,.22)');
    g.addColorStop(1,'rgba(255,215,0,0)');
    c.fillStyle=g;c.beginPath();c.arc(bx,by,38*pu,0,6.3);c.fill();

    c.strokeStyle='rgba(255,215,0,.8)';c.lineWidth=1.3;
    c.beginPath();
    o.pts.forEach(function(pt,idx){
      if(idx===0)c.moveTo(bx+pt[0],by+pt[1]);
      else c.lineTo(bx+pt[0],by+pt[1]);
    });
    c.closePath();c.stroke();

    o.pts.forEach(function(pt){
      c.fillStyle='#FFD700';c.beginPath();c.arc(bx+pt[0],by+pt[1],3,0,6.3);c.fill();
    });

    if(HV===63+q||SEL===63+q){
      c.strokeStyle='#fff';c.lineWidth=1.5;c.beginPath();c.arc(bx,by,26,0,6.3);c.stroke();
    }
    c.fillStyle='#FFD700';c.font='700 13px "Space Grotesk",sans-serif';c.textAlign='center';
    c.fillText(o.n.replace('Quần đảo ','').toUpperCase(),bx,by+34);
    c.textAlign='left';
  });

  c.globalCompositeOperation='lighter';
  P.forEach(function(p){
    if(p.w)return;
    f=1-p.l/p.m;
    c.fillStyle='rgba('+p.c+','+(.88*f)+')';
    c.beginPath();c.arc(p.x,p.y,p.r*(.5+f),0,6.3);c.fill();
    c.fillStyle='rgba('+p.c+','+(.16*f)+')';
    c.beginPath();c.arc(p.x,p.y,p.r*3.5,0,6.3);c.fill();
  });

  var pulseIdx=Math.floor((T*16)%41);
  var top=ST.slice().sort(function(a,b){return b.m-a.m}).slice(0,3);

  ST.forEach(function(s,q){
    var hv=HV===q,se=SEL===q,m=s.m;
    var isVein=(q<41&&Math.abs(q-pulseIdx)<=1);
    var rad=2.4+Math.sqrt(m)*0.68+(s.part==='head'?1.1:0)+(isVein?1.8:0)+(hv?2.4:0);
    var tw=0.72+0.28*Math.sin(T*2.2+s.tw);
    var col=isVein?'255,215,0':(m?'255,215,0':(s.part==='head'?'255,158,0':'255,255,255'));

    if(m||hv||se||isVein||s.part==='head'){
      var gl=c.createRadialGradient(s.x,s.y,0,s.x,s.y,rad*3.6);
      gl.addColorStop(0,'rgba('+(isVein?'255,215,0':(hv?'0,245,212':col))+','+(isVein?0.65:0.32)+')');
      gl.addColorStop(1,'transparent');
      c.fillStyle=gl;c.beginPath();c.arc(s.x,s.y,rad*3.6,0,6.3);c.fill();
    }

    c.fillStyle='rgba('+col+','+(m||isVein?1:tw*0.9)+')';
    c.beginPath();c.arc(s.x,s.y,rad,0,6.3);c.fill();

    if(m>0||isVein){
      c.strokeStyle='rgba(255,255,255,'+(isVein?0.85:tw*0.55)+')';c.lineWidth=0.9;
      c.beginPath();
      c.moveTo(s.x-rad*2.3,s.y);c.lineTo(s.x+rad*2.3,s.y);
      c.moveTo(s.x,s.y-rad*2.3);c.lineTo(s.x,s.y+rad*2.3);
      c.stroke();
    }

    if(se||mine(s)){
      c.strokeStyle=mine(s)?'#00F5D4':'#fff';c.lineWidth=1.6;
      c.beginPath();c.arc(s.x,s.y,rad+6,0,6.3);c.stroke();
    }

    if(m>0&&m===MX){
      c.save();c.globalCompositeOperation='lighter';
      for(var r2=0;r2<3;r2++){var pp=(T*0.5+r2/3+q*0.11)%1;
        c.strokeStyle='rgba(255,215,0,'+(0.75*(1-pp))+')';c.lineWidth=2.2*(1-pp)+0.5;
        c.beginPath();c.arc(s.x,s.y,rad+3+pp*38,0,6.3);c.stroke()}
      c.setLineDash([3,7]);c.lineDashOffset=-T*28;c.strokeStyle='rgba(0,245,212,.9)';c.lineWidth=1.4;
      c.beginPath();c.arc(s.x,s.y,rad+13,0,6.3);c.stroke();c.setLineDash([]);
      for(var o=0;o<3;o++){var aa=T*1.7+o*2.094+q,ox=s.x+Math.cos(aa)*(rad+13),oy=s.y+Math.sin(aa)*(rad+13);
        for(var tr=4;tr>=1;tr--){var ta=aa-tr*0.13;c.fillStyle='rgba(0,245,212,'+(0.12*(5-tr))+')';c.beginPath();c.arc(s.x+Math.cos(ta)*(rad+13),s.y+Math.sin(ta)*(rad+13),2.2-tr*0.3,0,6.3);c.fill()}
        c.fillStyle='rgba(255,255,255,.98)';c.beginPath();c.arc(ox,oy,2.2,0,6.3);c.fill()}
      c.restore();
    }
    if(m>0||hv||se||mine(s)){
      c.font='600 '+(m>=3||hv||se?13:12)+'px "Space Grotesk",sans-serif';
      var tx=s.n+(m?' · '+m:'')+(m&&m===MX?' ★':'')+(mine(s)?' ★ quê tôi':'');
      c.fillStyle=hv||se?'#fff':(m===MX?'#fff3a0':'rgba(255,215,0,.95)');
      var rt=s.x>W*0.74,lx=rt?s.x-rad-8:s.x+rad+8;
      c.textAlign=rt?'right':'left';
      c.fillText(tx,lx,s.y-7);
      if((hv||se)&&MBN[s.n]){c.font='500 11.5px "Space Grotesk",sans-serif';c.fillStyle='rgba(159,231,255,.95)';c.fillText(MBN[s.n].join(', '),lx,s.y+8)}
      c.textAlign='left';
    }
  });

  P.forEach(function(p){
    if(!p.w)return;
    c.strokeStyle='rgba('+p.c+','+(p.a*0.85)+')';
    c.lineWidth=3.2*p.a+0.6;
    c.beginPath();c.arc(p.x,p.y,p.r,0,6.3);c.stroke();
  });
  c.globalCompositeOperation='source-over';
}

function frame(n){raf=requestAnimationFrame(frame);var dt=Math.min((n-last)/1000,.05);last=n;step(dt);render()}
function run(){if(!raf&&vis){last=performance.now();raf=requestAnimationFrame(frame)}}
function halt(){if(raf){cancelAnimationFrame(raf);raf=0}}
function size(){var w=sky.clientWidth||1280,d=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(w*d);cv.height=Math.round(w*H/W*d);sc=cv.width/W;if(!raf){step(0);render()}}

function pick(e){
  var q=cv.getBoundingClientRect(),x=(e.clientX-q.left)/q.width*W,y=(e.clientY-q.top)/q.height*H,rr=e.pointerType==='touch'?28:18,best=-1,bd=rr,d;
  ST.forEach(function(s,k){d=Math.hypot(x-s.x,y-s.y);if(d<bd){bd=d;best=k}});
  ISL.forEach(function(o,k){d=Math.hypot(x-o.x,y-o.y);if(d<bd+10){bd=d;best=63+k}});
  return best;
}
function info(k){if(k<0)return null;if(k>=63)return{n:ISL[k-63].n,t:ISL[k-63].s};var s=ST[k];return{n:s.n,t:s.m?s.m+' anh em UZI':'Chưa có anh em nào ở đây',w:(MBN[s.n]||[]).join(', ')}}
var dgW=document.createElement('em');dgW.id='dgWho';dgW.className='dg-who';$('dgNum').parentNode.appendChild(dgW);
function show(){var k=HV>=0?HV:SEL,o=info(k);dgW.textContent=o&&o.w?'Gồm: '+o.w:'';$('dgName').textContent=o?o.n:'Chưa chọn';$('dgNum').textContent=o?o.t:'Chạm hoặc rê chuột vào một vì sao bất kỳ'}

cv.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var k=pick(e);if(k!==HV){HV=k;cv.style.cursor=k>=0?'pointer':'crosshair';show();if(!raf)render()}});
cv.addEventListener('pointerleave',function(){HV=-1;show();if(!raf)render()});
cv.addEventListener('pointerdown',function(e){var k=pick(e);if(k>=0){SEL=k;HV=e.pointerType==='touch'?k:HV;show();syncHome();if(!raf)render()}});

function select(k){SEL=k;show();syncHome();if(!raf)render()}
var tops=ST.map(function(s,k){return[k,s]}).filter(function(a){return a[1].m}).sort(function(a,b){return b[1].m-a[1].m}),mx=tops.length?tops[0][1].m:1;
$('dgTop').innerHTML=tops.map(function(a){var s=a[1];return'<button type="button" data-k="'+a[0]+'"'+(s.m===mx?' class="best"':'')+'><span>'+s.n+'</span><i style="--w:'+Math.round(s.m/mx*100)+'%"></i><b>'+s.m+'</b><em>'+(MBN[s.n]||[]).join(', ')+'</em></button>'}).join('');
$('dgTop').addEventListener('click',function(e){var b=e.target.closest('button');if(b)select(+b.dataset.k)});
$('dgTot').textContent=TOT+' thành viên · '+NP+'/63 chòm sao đã có dữ liệu kết nối';

function syncHome(){$('dgHome').textContent=(SEL>=0&&SEL<63&&ST[SEL].n===HOME)?'Bỏ đánh dấu quê tôi':'Đánh dấu quê tôi'}
$('dgHome').onclick=function(){if(SEL<0||SEL>=63){$('dgNum').textContent='Hãy chọn một vì sao tỉnh thành trước';return}HOME=ST[SEL].n===HOME?'':ST[SEL].n;try{localStorage.setItem(K,HOME)}catch(e){}syncHome();if(!raf)render()};
$('dgRoar').onclick=function(){doRoar();qB=1.2};
$('dgSnd').onclick=function(){if(!audio())return;if(AC.state==='suspended')AC.resume();snd=!snd;this.textContent=snd?'Tắt âm thanh':'Bật âm thanh';this.setAttribute('aria-pressed',snd);if(snd){setTimeout(function(){if(AC.state==='running')sRoar()},60)}};

syncHome();
if(window.ResizeObserver)new ResizeObserver(size).observe(sky);else addEventListener('resize',size);
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)run();else halt()},{threshold:.15}).observe(sky);else{vis=true;run()}
size();
})();
/* Bảng xếp hạng: sửa mảng MEM [tên, danh dự, game, thời gian vào] */
var MEM=[["UZI　TARI",195220,"BOSS","2020 đến nay"],["UZI　BOUBOR.",153612,"Free Fire, Play Together","2020 đến nay"],["UZI　HANA",113862,"Free Fire, Liên Quân","2020 đến nay"],["UZI　AMIA",269553,"Free Fire, Play Together","2025"],["UZI　806.!",5085,"Free Fire, Liên Quân","2026"],["UZI　BẮP",854,"Free Fire","2026"],["UZI　BỐNGYEU",666,"Free Fire","2026"],["UZI　CANDY",2048,"Free Fire","2026"],["UZI　DEATH",33242,"Free Fire, PUBG Mobile","2026"],["UZI　DVNT",6418,"Free Fire","2026"],["UZI　FORム",277813,"Free Fire","2025"],["UZI　G.HƯNG",26699,"Free Fire","2026"],["UZI　GMINH",6988,"Free Fire","2026"],["UZI　H.NAM",1296,"Free Fire","2026"],["UZI　HANTEX",1040,"Free Fire","2026"],["UZI　HUNTE",1681,"Free Fire","2026"],["UZI　HUỲNH",130,"Free Fire","2026"],["UZI　NG.HUY",27103,"Free Fire","2026"],["UZI　NHUTBUN",1756,"Free Fire","2026"],["UZI　NINI",8367,"Free Fire","2026"],["UZI　NTRI",22602,"Free Fire","2026"],["UZI　OBITO",4418,"Free Fire","2026"],["UZI　P.AN",17258,"Free Fire, Liên Quân","2026"],["UZI　PAW",1070,"Free Fire","2026"],["UZI　SIXBEO",2790,"Free Fire","2026"],["UZI　TOBIE.",20532,"Free Fire","2026"],["UZI　TPHAT",350,"Free Fire","2026"],["UZI　VLUAT",18304,"Free Fire, Liên Quân","2026"],["UZI　VTUNG",134450,"Free Fire, Liên Quân","2025"],["UZI　XHIEU",40094,"Free Fire","2026"],["UZI　黄文荣",250,"Free Fire","2026"],["No Name - 50MB",40,"Free Fire","2026"],["No Name - Devil",30,"Free Fire","2026"],["No Name - Hong Em",636,"Free Fire","2026"],["No Name - HaiYen",0,"Liên Quân","2026"],["No Name - Kim Anh",150,"Free Fire","2026"],["No Name - Như Hạo",30,"Free Fire","2026"],["UZI　WINDY",0,"Free Fire","2026"],["No Name - Thu Thuy",706,"Free Fire","2026"],["No Name - No VT",952,"Free Fire","2026"],["No Name - Vịt",0,"Free Fire","2026"],["UZI　MHOANG",0,"Free Fire","2026"],["UZI　ZEXU",570,"Free Fire","2026"],["UZI　ZHY.",10,"Free Fire, Play Together","2026"],["UZI　TNGHIA",362,"Free Fire","2026"],["UZI　MEW",738,"Free Fire","2026"],["No Name - PHTrinh",40,"Free Fire","2026"],["No Name - LopTruong",10,"Free Fire","2026"],["No Name - Nico Robin",100,"Free Fire","2026"],["No Name - Wait Wait",216,"Free Fire","2026"],["UZI　KPHUONG",390,"Free Fire","2026"],["UZI　QYUS",2447,"Free Fire","2026"]],MC=['#C0C8D4','#FFD400','#CD7F32'],qi=$('q'),sel=$('g');
/* Xếp hạng: TARI, BOUBOR., HANA cố định hạng 1-3; sau đó PREMIUM, rồi VIP, rồi còn lại; trong mỗi nhóm xếp theo danh dự giảm dần */
var PIN=['UZI\u3000TARI','UZI\u3000BOUBOR.','UZI\u3000HANA'];
function tier(m){var p=PIN.indexOf(m[0]);if(p>=0)return p;var t=rk(m);return t.indexOf('PREMIUM')>=0?10:(t.indexOf('VIP')>=0?11:12)}
MEM.sort(function(a,b){return tier(a)-tier(b)||b[1]-a[1]});
function rk(m){var t=[];if(m[2]==='BOSS')t.push('BOSS');if(/AMIA|VLUAT|ZHY\./i.test(m[0]))t.push('PREMIUM');if(/^UZI/i.test(m[0]))t.push('VIP');if(m[1]>=10000)t.push('ELITE');return t}
var TC={BOSS:'bs',PREMIUM:'pm',VIP:'vp',ELITE:'el'},TL={BOSS:'BOSS',PREMIUM:'PREMIUM',VIP:'VIP',ELITE:'★ ELITE'};
function bd(m,skip){return rk(m).filter(function(t){return t!==skip}).map(function(t){return '<em class="tg '+TC[t]+'">'+TL[t]+'</em>'}).join('')}
var rkS=document.createElement('select');rkS.id='rk';rkS.setAttribute('aria-label','Lọc hạng');rkS.innerHTML='<option value="">Tất cả hạng</option><option value="ELITE">★ ELITE (từ 10.000)</option><option value="VIP">VIP</option><option value="PREMIUM">PREMIUM</option>';sel.parentNode.insertBefore(rkS,sel.nextSibling);rkS.onchange=lb;
var pe=$('pod');if(pe&&!$('lbNote')){var nt=document.createElement('p');nt.id='lbNote';nt.className='lb-note';nt.textContent='Cập Nhật Vào 25.11.2026';pe.parentNode.insertBefore(nt,pe)}
$('pod').innerHTML=[1,0,2].map(function(i){var m=MEM[i],t=rk(m);return '<div class="pd p'+(i+1)+(m[1]>=10000?' elite':'')+(t.indexOf('PREMIUM')>=0?' pm':'')+(t.indexOf('BOSS')>=0?' boss':'')+'" style="--mc:'+MC[i===0?1:i===1?0:2]+'"><div class="md mdl m'+(i+1)+'" aria-label="Hạng '+(i+1)+'"><span class="mr c"></span><span class="mr a"></span><span class="mr b"></span><span class="mc"><i class="mn">'+(i+1)+'</i></span><span class="sp s1"></span><span class="sp s2"></span><span class="sp s3"></span></div><b class="pd-n">'+m[0]+'</b><span class="pd-h"><i>'+m[1].toLocaleString('vi-VN')+'</i> DANH DỰ</span><div class="pd-bds">'+bd(m,'BOSS')+'</div>'+(t.indexOf('BOSS')>=0?'<em class="tg bs">BOSS</em>':'<span class="pd-g">'+m[2]+'</span>')+'<span class="pd-t">VÀO: '+m[3]+'</span></div>'}).join('');
sel.innerHTML='<option value="">Tất cả game</option>'+GAMES.map(function(g){return '<option>'+g+'</option>'}).join('');
function lb(){var q=qi.value.trim().toLowerCase(),g=sel.value,r=rkS.value,h='',i,m,n=0;for(i=3;i<250;i++){m=MEM[i];if((q||g||r)&&(!m||(q&&m[0].toLowerCase().indexOf(q)<0)||(g&&m[2].indexOf(g)<0)||(r&&rk(m).indexOf(r)<0)))continue;n++;h+='<div class="rw'+(m?(m[1]>=10000?' elite':'')+(rk(m).indexOf('PREMIUM')>=0?' pm':'')+(rk(m).indexOf('VIP')>=0?' vip':''):' em')+'"><span>'+pad(i+1)+'</span>'+(m?'<span class="nm"><span class="nt">'+m[0]+'</span>'+bd(m)+'</span><span class="hn">'+m[1].toLocaleString('vi-VN')+'</span><span class="gm">'+m[2]+'</span><span class="tm">'+m[3]+'</span>':'<span>— Trống —</span><span>—</span><span>—</span><span>—</span>')+'</div>'}$('lb').innerHTML=h||'<div class="rw em"><span></span><span>Không tìm thấy.</span></div>';$('mc').textContent=MEM.length+' / 250 đã điền'+((q||g||r)?' · '+n+' kết quả':'')}
qi.oninput=lb;sel.onchange=lb;lb();
/* Chữ điện ảnh + thanh laser theo cuộn */
var ws=[],tk=0;
/* ===== SLOGAN: Kinetic Spotlight — đèn pha chạy theo chuột (tự lượn khi không có chuột), chữ gần đèn nhô lên và phát sáng, cụm từ khóa có sóng lụa vàng ngọc ===== */
(function(){
var kin=document.getElementById('kin'),kp=document.getElementById('kp');if(!kin||!kp)return;
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,
words='Quân Đoàn mạnh nhờ có các bạn ở đây, chứ không phải chiến thắng hôm nay'.split(' '),kws=[],lv=[],pos=[],
px=0,py=0,over=false,raf=0,t0=performance.now(),ref=kp.parentNode;
words.forEach(function(w,i){var s=document.createElement('span');s.className='kw'+((i>=4&&i<=8)||(i>=12)?' kh':'');s.style.setProperty('--i',i);s.textContent=w;kp.appendChild(s);kp.appendChild(document.createTextNode(' '));kws.push(s);lv.push(0)});
function measure(){pos=kws.map(function(w){return{x:w.offsetLeft+w.offsetWidth/2,y:w.offsetTop+w.offsetHeight/2}})}
function frame(now){
 raf=requestAnimationFrame(frame);
 var rk=kin.getBoundingClientRect(),rd=ref.getBoundingClientRect(),tt=(now-t0)/1000,x,y;
 if(over){x=px-rk.left;y=py-rk.top}else{x=rk.width*(.5+.42*Math.sin(tt*.55));y=rk.height*(.5+.28*Math.sin(tt*.37+1.2))}
 kin.style.setProperty('--mx',x+'px');kin.style.setProperty('--my',y+'px');
 var lx=x-(rd.left-rk.left),ly=y-(rd.top-rk.top),rad=Math.max(rd.width,520)*.2;
 kws.forEach(function(w,i){var p=pos[i];if(!p)return;var g=Math.max(0,1-Math.hypot(p.x-lx,p.y-ly)/rad);lv[i]+=(g-lv[i])*.12;w.style.setProperty('--l',lv[i].toFixed(3))})}
function start(){if(!raf&&!still){measure();raf=requestAnimationFrame(frame)}}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
kin.addEventListener('pointermove',function(e){over=true;px=e.clientX;py=e.clientY});
kin.addEventListener('pointerleave',function(){over=false});
kin.addEventListener('pointercancel',function(){over=false});
addEventListener('resize',measure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
if(still){kin.classList.add('go','rest')}
else if('IntersectionObserver' in window){new IntersectionObserver(function(es){if(es[0].isIntersecting){kin.classList.add('go');setTimeout(function(){kin.classList.add('rest')},1900);start()}else stop()},{threshold:.15}).observe(kin)}
else{kin.classList.add('go','rest');start()}
})();
var evs=[].slice.call(document.querySelectorAll('.ev'));
function onS(){var vh=innerHeight,r=$('tl').getBoundingClientRect();$('fill').style.height=Math.min(1,Math.max(0,(vh*.6-r.top)/r.height))*100+'%';evs.forEach(function(e){e.classList.toggle('lit',e.getBoundingClientRect().top<vh*.6)});var k=$('kin').getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.9-k.top)/(k.height*.8)));ws.forEach(function(w,i){w.style.opacity=.12+.88*Math.min(1,Math.max(0,p*ws.length-i))})}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;onS()})}},{passive:true});onS();
})();
/* ===== GIA NHẬP: Cổng Triệu Hồi — xoáy hạt hút vào nút, bấm là nổ xung kích + âm thanh tự tổng hợp (WebAudio, không dùng file ngoài) ===== */
(function(){
var sec=document.getElementById('join'),cv=document.getElementById('jnCv'),btn=document.getElementById('jnBtn');
if(!sec||!cv||!btn)return;
var cx=cv.getContext('2d'),st=document.getElementById('jnStage'),tx=document.getElementById('jnTx'),
rings=[].slice.call(sec.querySelectorAll('.jn-ring')),
still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,
W=0,H=0,dpr=1,CX=0,CY=0,R0=400,ps=[],sparks=[],pull=1,tgt=1,ang=0,spd=1,vis=false,last=0,busy=false,
COL=['0,229,255','0,229,255','255,212,0','192,132,252','255,255,255'];
function R(a,b){return a+Math.random()*(b-a)}
function spawn(p,far){p.r=far?R(.15,1)*R0:R0*R(.7,1);p.a=R(0,6.283);p.w=R(.5,1.3)*(Math.random()<.5?1:1);p.v=R(60,140);p.c=COL[Math.random()*COL.length|0]}
function size(){
 dpr=Math.min(devicePixelRatio||1,2);var s=sec.getBoundingClientRect(),b=st.getBoundingClientRect();
 W=s.width;H=s.height;cv.width=W*dpr;cv.height=H*dpr;CX=b.left+b.width/2-s.left;CY=b.top+b.height/2-s.top;R0=Math.max(W,H)*.6;
 var n=W<700?70:130;while(ps.length<n){var p={};spawn(p,true);ps.push(p)}ps.length=n}
function ring(t){rings[0].style.transform='rotate('+ang*.9+'deg)';rings[1].style.transform='rotate('+(-ang*1.9)+'deg)';rings[2].style.transform='rotate('+ang*.35+'deg)'}
function pos(r,a){return[CX+Math.cos(a)*r,CY+Math.sin(a)*r*.62]}
function frame(now){
 requestAnimationFrame(frame);var dt=Math.min((now-last)/1000,.05);last=now;if(!vis||document.hidden)return;
 pull+=(tgt-pull)*Math.min(1,dt*6);ang+=dt*14*pull;ring();
 cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);cx.globalCompositeOperation='lighter';cx.lineCap='round';
 var i,p,k,al,a,b;
 for(i=0;i<ps.length;i++){p=ps[i];
  p.a+=p.w*dt*pull*(1+R0/(p.r+90)*.5);p.r-=p.v*dt*pull*(1+(1-p.r/R0)*1.4);
  if(p.r<10){spawn(p,false);continue}
  k=p.r/R0;al=Math.min(1,(1-k)*3,k*7);
  a=pos(p.r,p.a);b=pos(p.r+p.v*.09*pull,p.a-p.w*.09*pull);
  cx.strokeStyle='rgba('+p.c+','+(al*.85).toFixed(3)+')';cx.lineWidth=1+(1-k)*1.2;cx.beginPath();cx.moveTo(b[0],b[1]);cx.lineTo(a[0],a[1]);cx.stroke()}
 for(i=sparks.length-1;i>=0;i--){p=sparks[i];p.t+=dt;if(p.t>=p.l){sparks.splice(i,1);continue}
  p.vx*=1-dt*2.2;p.vy*=1-dt*2.2;p.x+=p.vx*dt;p.y+=p.vy*dt;al=1-p.t/p.l;
  cx.strokeStyle='rgba('+p.c+','+al.toFixed(3)+')';cx.lineWidth=2*al+.4;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*.04,p.y-p.vy*.04);cx.stroke()}
 cx.globalCompositeOperation='source-over'}
/* ----- Âm thanh: Riser vút lên -> Cú đập sub -> Chốt khóa kim loại -> Hợp âm "power-up" (tổng hợp 100%) ----- */
var AC=null;
function sound(){
 var A=window.AudioContext||window.webkitAudioContext;if(!A)return;
 try{if(!AC)AC=new A();if(AC.state==='suspended')AC.resume();
 var c=AC,t=c.currentTime,m=c.createGain(),cp=c.createDynamicsCompressor();m.gain.value=.8;m.connect(cp);cp.connect(c.destination);
 function env(g,t0,pk,a,d){g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(pk,t0+a);g.gain.exponentialRampToValueAtTime(.0001,t0+a+d)}
 function osc(type,f0,f1,t0,dur,pk,att,dst){var o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t0);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t0+dur);env(g,t0,pk,att,dur-att);o.connect(g);g.connect(dst||m);o.start(t0);o.stop(t0+dur+.05)}
 function noise(t0,dur,type,f0,f1,pk,att){var n=c.sampleRate*dur|0,buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0),i;for(i=0;i<n;i++)d[i]=Math.random()*2-1;
  var s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=buf;f.type=type;f.Q.value=1.4;f.frequency.setValueAtTime(f0,t0);f.frequency.exponentialRampToValueAtTime(f1,t0+dur);env(g,t0,pk,att,dur-att);s.connect(f);f.connect(g);g.connect(m);s.start(t0)}
 /* 1. riser răng cưa qua bộ lọc mở dần + gió quét */
 var rs=c.createOscillator(),rf=c.createBiquadFilter(),rg=c.createGain();rs.type='sawtooth';rs.frequency.setValueAtTime(70,t);rs.frequency.exponentialRampToValueAtTime(1400,t+.34);
 rf.type='lowpass';rf.frequency.setValueAtTime(250,t);rf.frequency.exponentialRampToValueAtTime(6000,t+.34);env(rg,t,.22,.28,.08);rs.connect(rf);rf.connect(rg);rg.connect(m);rs.start(t);rs.stop(t+.42);
 noise(t,.36,'bandpass',300,5000,.3,.3);
 /* 2. cú đập: sub sine rơi tần + xung nhiễu */
 osc('sine',170,34,t+.34,.6,.95,.005);
 noise(t+.34,.14,'highpass',1500,6000,.5,.004);
 /* 3. chốt khóa kim loại: các tần số lệch hài tạo tiếng "keng" */
 [[1180,.2],[1763,.14],[2610,.1]].forEach(function(q){osc('square',q[0],q[0]*.985,t+.36,.32,q[1]*.35,.003)});
 /* 4. hợp âm power-up thăng lên (Rê - La - Rê) */
 [[587.3,0],[880,.06],[1174.7,.12]].forEach(function(q){osc('triangle',q[0],q[0]*1.01,t+.46+q[1],.5,.2,.01)});
 }catch(e){}}
function burst(){for(var i=0;i<150;i++){var a=R(0,6.283),v=R(140,720);sparks.push({x:CX,y:CY,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.7,t:0,l:R(.5,1.1),c:COL[Math.random()*COL.length|0]})}}
/* ----- Tương tác ----- */
btn.addEventListener('mouseenter',function(){if(!busy)tgt=2.4});
btn.addEventListener('mouseleave',function(){if(!busy)tgt=1;btn.style.setProperty('--mx','0px');btn.style.setProperty('--my','0px')});
btn.addEventListener('focus',function(){if(!busy)tgt=2.4});btn.addEventListener('blur',function(){if(!busy)tgt=1});
sec.addEventListener('pointermove',function(e){if(busy||e.pointerType==='touch')return;var b=btn.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),d=Math.sqrt(dx*dx+dy*dy);
 if(d<220){var f=(1-d/220)*.18;btn.style.setProperty('--mx',(dx*f).toFixed(1)+'px');btn.style.setProperty('--my',(dy*f).toFixed(1)+'px')}else{btn.style.setProperty('--mx','0px');btn.style.setProperty('--my','0px')}});
btn.addEventListener('click',function(e){
 if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();if(busy)return;busy=true;
 var u=btn.href;sound();sec.classList.remove('go');void sec.offsetWidth;sec.classList.add('go');
 tx.textContent='Đang kết nối…';pull=7;tgt=7;
 if(!still)setTimeout(burst,340);
 setTimeout(function(){tgt=1},600);
 setTimeout(function(){var w=window.open(u,'_blank');if(w){try{w.opener=null}catch(x){}}else{location.href=u}},720);
 setTimeout(function(){busy=false;sec.classList.remove('go');tx.textContent='Đăng ký làm thành viên'},1900)});
/* ----- Bộ đếm slot (lấy từ danh sách thành viên) ----- */
var n=52,bar=document.getElementById('jnBar'),nm=document.getElementById('jnNum');
function count(){var sl=document.querySelector('.jn-slot');if(sl){sl.classList.add('go');setTimeout(function(){sl.classList.add('on')},1850)}bar.style.width=Math.min(100,n/250*100)+'%';var t0=null;function s(t){if(t0===null)t0=t;var p=Math.min((t-t0)/1800,1);nm.textContent=Math.round(n*p)+' / 250';if(p<1)requestAnimationFrame(s)}requestAnimationFrame(s)}
/* ----- Chỉ chạy khi nhìn thấy ----- */
size();addEventListener('resize',size);if(window.ResizeObserver)new ResizeObserver(size).observe(sec);setTimeout(size,800);
var done=false;
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis&&!done){done=true;count()}},{threshold:.2}).observe(sec);else{vis=true;count()}
if(!still)requestAnimationFrame(function(s){last=s;frame(s)});else{nm.textContent=n+' / 250';bar.style.width=Math.min(100,n/250*100)+'%';var s0=document.querySelector('.jn-slot');if(s0)s0.classList.add('go','on')}
})();

/* ===== Lời cảm ơn: giải mã ký tự kiểu radar + sóng sáng chạy dọc chữ ===== */
(function(){
var kin=document.getElementById('kin'),kc=document.getElementById('kc');if(!kin||!kc||!('IntersectionObserver' in window))return;
var full=kc.textContent.trim(),G='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>+',sp=[],run=0,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,k=0;
kc.setAttribute('aria-label',full);kc.textContent='';
full.split(' ').forEach(function(w,wi,arr){var ws=document.createElement('span');ws.className='kcw';ws.setAttribute('aria-hidden','true');
 w.split('').forEach(function(ch){var e=document.createElement('span');e.className='kcc ok';e.style.setProperty('--k',k++);e.textContent=ch;ws.appendChild(e);sp.push({e:e,ch:ch,r:Math.random(),d:false})});
 kc.appendChild(ws);if(wi<arr.length-1)kc.appendChild(document.createTextNode(' '))});
function decode(){var id=++run,t0=performance.now(),n=sp.length;
 sp.forEach(function(s){s.d=false;s.e.classList.remove('ok')});
 (function f(now){if(id!==run)return;var t=(now-t0)/1000,all=true;
  sp.forEach(function(s,i){if(s.d)return;
   if(t>=0.2+i/n*2.1+s.r*0.3){s.d=true;s.e.textContent=s.ch;s.e.classList.remove('sc');s.e.classList.add('ok')}
   else{all=false;s.e.classList.add('sc');s.e.textContent=G.charAt(Math.random()*G.length|0)}});
  if(!all)requestAnimationFrame(f)})(t0)}
new IntersectionObserver(function(es){if(es[0].isIntersecting){kc.classList.add('on');if(!rm)decode()}else{kc.classList.remove('on');run++;sp.forEach(function(s){s.d=true;s.e.textContent=s.ch;s.e.classList.remove('sc');s.e.classList.add('ok')})}},{threshold:.45}).observe(kc);
})();
