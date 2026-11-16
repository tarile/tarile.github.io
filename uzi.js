(function(){
var $=function(i){return document.getElementById(i)},RM=matchMedia('(prefers-reduced-motion: reduce)').matches,GAMES=['Free Fire','Liên Quân','PUBG','Play Together','FC Mobile VN'];
function fill(i,a,f){var el=$(i),k=el.querySelector('#fill');el.innerHTML=a.map(f).join('');if(k)el.insertBefore(k,el.firstChild)}
function pad(n){return('00'+n).slice(-3)}
/* Khối mẹ + 5 khối con: đổi tên file ảnh ở đây */
var KIDS=[['FF','unit-ff.jpg','QUÂN ĐOÀN UZI · FREE FIRE'],['LQ','unit-lq.jpg','CLAN UZI · LIÊN QUÂN'],['PUBG','unit-pubg.jpg','HỘI UZI · PUBG'],['PT','unit-pt.jpg','HỘI NHÓM UZI · PLAY TOGETHER'],['FC','unit-fc.jpg','LIÊN ĐOÀN UZI · FC MOBILE VN']];
/* Mặt khối mẹ: logo (ảnh nhúng sẵn trong uzi.css) chia 3 lớp: biểu tượng / UZI / LEGENDS, mỗi lớp một hiệu ứng */
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
/* Coverflow: [tiêu đề, nền tảng, link giả] */
var V=[['Video đú trend #1','Tiktok','https://www.tiktok.com/@tarile0211/video/7677109795672886549','video-trend-1.jpg'],['Video đú trend #2','Fanpage UZI','https://www.facebook.com/reel/997475752635289?locale=vi_VN','video-trend-2.jpg'],['Video đú trend #3','FB Tari Le','https://www.facebook.com/stories/2081008749308554/?source=profile_highlight&locale=vi_VN','video-trend-3.jpg'],['Video đú trend #4','Fanpage UZI','https://www.facebook.com/reel/2518575201902069?locale=vi_VN','video-trend-4.jpg'],['Video đú trend #5','Tiktok','https://www.tiktok.com/@tarile0211/video/7677103812863118612','video-trend-5.jpg']],cur=2,sw=0;
fill('cf',V,function(v){return '<a href="'+v[2].replace(/&/g,'&amp;')+'" target="_blank" rel="noopener noreferrer" data-p="'+v[1].toUpperCase()+'" aria-label="'+v[0]+' - Xem Trên '+v[1]+'"><img src="'+v[3]+'" alt="" loading="lazy" decoding="async" draggable="false" onerror="this.remove()"><span class="ov"></span><b>'+v[0]+'</b><small>Xem Trên '+v[1]+' ↗</small></a>'});
var sl=[].slice.call($('cf').children);
function cfr(){sl.forEach(function(a,i){var d=i-cur,m=Math.abs(d);a.style.transform='translateX('+d*62+'%) translateZ('+(-m*160)+'px) rotateY('+(-d*38)+'deg)';a.style.opacity=m>2?0:1-m*.3;a.style.zIndex=9-m;a.style.pointerEvents=m>2?'none':''})}
sl.forEach(function(a,i){a.onclick=function(e){if(sw){e.preventDefault();return}if(i!==cur){e.preventDefault();cur=i;cfr()}}});
function go(n){cur=Math.max(0,Math.min(sl.length-1,n));cfr()}
/* Cuộn con lăn chuột trên dải video để chuyển video; tới video đầu/cuối thì trả lại cho trang cuộn bình thường */
(function(){var cf=$('cf'),wl=0;
cf.addEventListener('wheel',function(e){var d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(Math.abs(d)<4)return;var n=cur+(d>0?1:-1);if(n<0||n>sl.length-1)return;e.preventDefault();var t=Date.now();if(t-wl<380)return;wl=t;go(n)},{passive:false});
/* Điện thoại: vuốt trái / phải để chuyển video */
var tx=0,ty=0;
cf.addEventListener('touchstart',function(e){var t=e.touches[0];tx=t.clientX;ty=t.clientY},{passive:true});
cf.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){sw=1;go(cur+(dx<0?1:-1));setTimeout(function(){sw=0},400)}},{passive:true});
})();
$('pv').onclick=function(){cur=Math.max(0,cur-1);cfr()};$('nx').onclick=function(){cur=Math.min(sl.length-1,cur+1);cfr()};cfr();
/* Vé giải đấu: tàn lửa + nút từ tính */
(function(){var c=$('em'),x=c.getContext('2d'),P=[],i;function rs(){c.width=c.offsetWidth;c.height=c.offsetHeight}rs();addEventListener('resize',rs);for(i=0;i<45;i++)P.push([Math.random(),Math.random(),Math.random()*2+.6,Math.random()*.6+.2]);var ev=false;new IntersectionObserver(function(es){ev=es[0].isIntersecting}).observe(c);(function f(){if(!ev&&!RM){requestAnimationFrame(f);return}x.clearRect(0,0,c.width,c.height);P.forEach(function(p){p[1]-=p[3]*.002;if(p[1]<0){p[1]=1;p[0]=Math.random()}x.fillStyle='rgba(255,'+(120+p[2]*40|0)+',30,'+p[1]*.8+')';x.beginPath();x.arc(p[0]*c.width,p[1]*c.height,p[2],0,6.3);x.fill()});if(!RM)requestAnimationFrame(f)})()})();
/* Vé giải đấu: cửa sập cơ khí mở khi cuộn tới; các hiệu ứng lặp chỉ chạy khi vé đang trong màn hình */
(function(){var t=$('tkt');if(!t)return;
if(!RM&&'IntersectionObserver' in window){t.classList.add('arm');
 new IntersectionObserver(function(es){var v=es[0].isIntersecting;t.classList.toggle('tk-on',v);if(v)setTimeout(function(){t.classList.add('open')},250)},{threshold:.3}).observe(t)}
else t.classList.add('tk-on','open')})();
/* Huy hiệu */
function bd(id,a,ic){fill(id,a,function(t){return '<article class="bd"><div class="hex">'+ic+'</div><h4>'+t[0]+'</h4><p>'+t[1]+'</p></article>'})}
bd('bo',[['Giải đấu khác #1','Tên giải · Kết quả · Năm'],['Giải đấu khác #2','Tên giải · Kết quả · Năm'],['Giải đấu khác #3','Tên giải · Kết quả · Năm']],'⚔');
/* Thành tích: huy hiệu lục giác 2 tầng + ngàm góc + đếm số */
var ACH=[
 ['#E5B85C','LEGACY // 01','<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>','Thuộc Top Quân Đoàn Lâu Đời Nhất','Sau bao nhiêu năm kể từ <strong>2020</strong>, trải qua nhiều lần đổi tên quân đoàn, tuyển và chọn lọc thành viên <strong>Quân Đoàn UZI</strong> vẫn duy trì vững mạnh đến ngày hôm nay','<span>EST.</span><b class="ach-n" data-s="2000" data-t="2020">2020</b><span>— BỀN VỮNG</span>'],
 ['#E2E8F0','COMMUNITY // 02','<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>','Tạo Nhiều Event &amp; Thu Hút Người Tham Gia','Tạo nhiều sự kiện độc lạ, mới mẻ, kèm thử thách khiến các thành viên hoặc thậm chí người ngoài quân đoàn rất thích thú muốn tham gia, đồng thời chuyển biến luật hợp lí thu hút nhiều người tham gia cùng <strong>Gia Đình UZI</strong>','<span>GIA ĐÌNH UZI // SÁNG TẠO</span>'],
 ['#F59E0B','ESPORTS &amp; WEB // 03','<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>','Giải Đấu Cộng Đồng Riêng &amp; Web QĐ UZI','Tạo ra sân chơi mới giúp các thành viên quân đoàn kèm những quân đoàn khác tranh đấu lành mạnh, văn minh, uy tín và trao giải thưởng thật thông qua <strong>4 mùa giải</strong>, tự sáng tạo ra Web dành riêng cho QĐ UZI','<b class="ach-n" data-s="0" data-t="4">4</b><span>MÙA GIẢI UY TÍN</span>']];
fill('ba',ACH,function(a){return '<article class="ach-card" style="--a:'+a[0]+'"><span class="ach-c tl"></span><span class="ach-c tr"></span><span class="ach-c bl"></span><span class="ach-c br"></span><span class="ach-badge">'+a[1]+'</span><div class="ach-em"><div class="ach-r1"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,3 93,26 93,74 50,97 7,74 7,26"/><circle cx="50" cy="3" r="3"/></svg></div><div class="ach-r2"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,5 90,27 90,73 50,95 10,73 10,27"/><circle cx="50" cy="5" r="2.5"/></svg></div><svg class="ach-ic" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+a[2]+'</svg></div><h3 class="ach-t">'+a[3]+'</h3><div class="ach-dv"></div><p class="ach-d">'+a[4]+'</p><div class="ach-ft">'+a[5]+'</div></article>'});
/* Số cột mốc chạy khi cuộn tới */
(function(){var g=$('ba'),ns=[].slice.call(g.querySelectorAll('.ach-n'));if(RM||!ns.length)return;
ns.forEach(function(n){n.textContent=n.dataset.s});
var io=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;io.disconnect();ns.forEach(function(n){var a=+n.dataset.s,b=+n.dataset.t,t0=performance.now();(function u(now){var p=Math.min((now-t0)/1400,1);n.textContent=Math.round(a+(b-a)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)})(t0)})},{threshold:.3});io.observe(g)})();
/* ===== THÀNH TÍCH: 4 hiệu ứng độc bản, tự viết 100% bằng JS + canvas + SVG filter (không thư viện, không bản quyền) =====
   1) Tàn lửa từ tính  2) Nứt vỡ & tái tạo  3) Sóng biến dạng lỏng  4) Mạng lưới năng lượng nối 3 huy hiệu */
(function(){
var g=$('ba');if(!g||RM||!window.IntersectionObserver)return;
var cards=[].slice.call(g.querySelectorAll('.ach-card'));if(!cards.length)return;
var NS='http://www.w3.org/2000/svg',dpr=Math.min(window.devicePixelRatio||1,2),can=typeof Element.prototype.animate==='function',hv=-1,E=[];
function R(a,b){return a+Math.random()*(b-a)}
function rgb(h){h=(h||'#E5B85C').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return(n>>16&255)+','+(n>>8&255)+','+(n&255)}

/* --- 3) Bộ lọc sóng biến dạng: mỗi thẻ một bộ lọc riêng, chỉ bật khi có sóng --- */
var fs=document.createElementNS(NS,'svg');fs.setAttribute('width','0');fs.setAttribute('height','0');fs.setAttribute('aria-hidden','true');fs.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
fs.innerHTML='<defs>'+cards.map(function(c,i){return '<filter id="achw'+i+'" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence id="acht'+i+'" type="fractalNoise" baseFrequency="0.012 0.08" numOctaves="1" seed="'+(3+i*5)+'" result="w"/><feDisplacementMap id="achd'+i+'" in="SourceGraphic" in2="w" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>'}).join('')+'</defs>';
document.body.appendChild(fs);
function wave(i){var c=cards[i];if(c._w)return;var d=fs.querySelector('#achd'+i),n=fs.querySelector('#acht'+i),t0=performance.now();c._w=1;c.style.filter='url(#achw'+i+')';
 (function f(now){var e=(now-t0)/1000,s=36*Math.exp(-4.2*e)*(.6+.4*Math.cos(e*20));
  d.setAttribute('scale',s.toFixed(2));n.setAttribute('baseFrequency',(.012+.006*Math.sin(e*13)).toFixed(4)+' '+(.08+.03*Math.cos(e*10)).toFixed(4));
  if(e<1.15)requestAnimationFrame(f);else{d.setAttribute('scale','0');c.style.filter='';c._w=0}})(t0)}

/* --- Dựng lớp phụ cho từng thẻ: canvas tàn lửa + vòng xung kích lục giác --- */
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

/* --- 1) Tàn lửa: bay lơ lửng, khi rê chuột bị hút và xoáy thành vòng quanh con trỏ --- */
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

/* --- 4) Mạng lưới năng lượng: tia đồng bắn từ huy hiệu đang trỏ sang các huy hiệu còn lại --- */
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

/* --- Vòng lặp chung: chỉ chạy khi khu Thành Tích đang hiện trên màn hình --- */
var vis=false,run=false,last=0,T=0;
function loop(now){if(!vis||document.hidden){run=false;return}var dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;embers(dt,T);net(dt,T);requestAnimationFrame(loop)}
function kick(){if(vis&&!run&&!document.hidden){run=true;last=performance.now();requestAnimationFrame(loop)}}
new IntersectionObserver(function(es){vis=es[0].isIntersecting;kick()},{rootMargin:'80px'}).observe(g);document.addEventListener('visibilitychange',kick);

/* --- 2) Nứt vỡ & tái tạo: thẻ hiện ra từ các mảnh tam giác bay vào rồi ghép khít (mỗi lần tải một kiểu vỡ khác) --- */
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
/* Terminal luật: tự nhận diện cụm IN HOA để tô màu + chữ "lock-on" (quét laser rồi bốc sáng); bảng nền có viền sáng xoay + cực quang + radar quét khi đổi tab */
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
'[5] CẤM GÂY WAR, CẤM XÀI HÀNH ĐỘNG KHI TEAM ĐỊCH [được xài với đồng đội và người xem]',
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
/* Địa cầu 3D check-in */
(function(){var cv=$('gl'),c=cv.getContext('2d'),R=210,C=280,D=[],T=.4,ph=-106*Math.PI/180,hov=0,t=0,K='uziGlobe',mine=[],i,y,r,a;cv.width=cv.height=1120;c.scale(2,2);
for(i=0;i<900;i++){y=1-2*(i+.5)/900;r=Math.sqrt(1-y*y);a=i*2.39996;D.push([Math.cos(a)*r,y,Math.sin(a)*r])}
var S=[[21.03,105.85,'Hà Nội'],[16.05,108.2,'Đà Nẵng'],[10.78,106.7,'TP.HCM'],[10.03,105.78,'Cần Thơ']];
try{mine=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
function V(la,lo){la*=Math.PI/180;lo*=Math.PI/180;return[Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)]}
function P(v,k){var x=v[0]*k,y=v[1]*k,z=v[2]*k,cp=Math.cos(ph),sp=Math.sin(ph),xr=x*cp+z*sp,zr=-x*sp+z*cp,ct=Math.cos(T),st=Math.sin(T);return[C+R*xr,C-R*(y*ct-zr*st),zr*ct+y*st]}
function pin(p,col,i){var v=V(p[0],p[1]),b=P(v,1);if(b[2]<-.05)return;var e=P(v,1.38+.08*Math.sin(t*.04+i)),g=c.createLinearGradient(b[0],b[1],e[0],e[1]);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,255,255,0)');c.strokeStyle=g;c.lineWidth=3;c.shadowColor=col;c.shadowBlur=14;c.beginPath();c.moveTo(b[0],b[1]);c.lineTo(e[0],e[1]);c.stroke();c.shadowBlur=0;c.fillStyle=col;c.beginPath();c.arc(b[0],b[1],4,0,6.3);c.fill();if(b[2]>.15){c.fillStyle='#fff';c.font='600 13px "Space Grotesk",sans-serif';c.fillText(p[2],e[0]+8,e[1]+4)}}
function draw(){t++;if(!hov&&!RM)ph-=.003;c.clearRect(0,0,560,560);var g=c.createRadialGradient(C,C,R*.9,C,C,R*1.2);g.addColorStop(0,'rgba(204,255,0,.15)');g.addColorStop(1,'rgba(204,255,0,0)');c.fillStyle=g;c.beginPath();c.arc(C,C,R*1.2,0,6.3);c.fill();c.fillStyle='#0d1016';c.beginPath();c.arc(C,C,R,0,6.3);c.fill();D.forEach(function(d){var p=P(d,1);if(p[2]>0){c.fillStyle='rgba(204,255,0,'+(.1+.5*p[2])+')';c.fillRect(p[0],p[1],1.6,1.6)}});S.forEach(function(p,i){pin(p,'#E2E8F0',i)});mine.forEach(function(p,i){pin(p,'#00E5FF',i+9)});requestAnimationFrame(draw)}
function save(){$('gc').textContent=mine.length+' cờ do bạn cắm';try{localStorage.setItem(K,JSON.stringify(mine))}catch(e){}}
cv.onmouseenter=function(){hov=1};cv.onmouseleave=function(){hov=0};
cv.addEventListener('click',function(e){var q=cv.getBoundingClientRect(),u=((e.clientX-q.left)/q.width*560-C)/R,v=(C-(e.clientY-q.top)/q.height*560)/R,w2=1-u*u-v*v;if(w2<0)return;var w=Math.sqrt(w2),ct=Math.cos(T),st=Math.sin(T),zr=w*ct-v*st,yy=v*ct+w*st,cp=Math.cos(ph),sp=Math.sin(ph),n=prompt('Tên địa điểm check-in:');if(n&&n.trim()){mine.push([+(Math.asin(yy)*180/Math.PI).toFixed(2),+(Math.atan2(u*cp-zr*sp,u*sp+zr*cp)*180/Math.PI).toFixed(2),n.trim().slice(0,24).replace(/[<>&]/g,'')]);save()}});
$('gu').onclick=function(){mine.pop();save()};$('gp').onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(JSON.stringify(mine));$('gc').textContent='Đã sao chép '+mine.length+' cờ'};
save();draw()})();
/* Bảng xếp hạng: sửa mảng MEM [tên, danh dự, game, thời gian vào] */
var NM='UZI•Rồng Lửa|Bảo Kiên|Minh Phát|Hoàng Nam|Gia Huy|Thanh Tùng|Quốc Bảo|Đức Anh|Tuấn Kiệt|Nhật Minh|Khánh Duy|Hữu Phước|Trọng Nghĩa|Anh Khoa|Thiên Ân|Việt Hưng|Công Danh|Phúc Lâm|Ngọc Sơn|Mạnh Cường|Tấn Lộc|Hải Đăng|Trí Dũng|Bảo Long|Quang Vinh|Đăng Khôi|Xuân Bách|Thế Vĩ|Kim Ngân|Lan Anh'.split('|'),
MEM=NM.map(function(n,i){return[n,Math.max(100,2500-i*73),GAMES[i%5],(i%12+1)+'/2026']}),MC=['#C0C8D4','#FFD400','#CD7F32'],qi=$('q'),sel=$('g');
$('pod').innerHTML=[1,0,2].map(function(i){var m=MEM[i];return '<div class="pd p'+(i+1)+'" style="--mc:'+MC[i===0?1:i===1?0:2]+'"><div class="md">'+(i+1)+'</div><b>'+m[0]+'</b><span>'+m[1].toLocaleString('vi-VN')+' DANH DỰ</span><br><span>'+m[2]+'</span></div>'}).join('');
sel.innerHTML='<option value="">Tất cả game</option>'+GAMES.map(function(g){return '<option>'+g+'</option>'}).join('');
function lb(){var q=qi.value.trim().toLowerCase(),g=sel.value,h='',i,m,n=0;for(i=3;i<250;i++){m=MEM[i];if((q||g)&&(!m||(q&&m[0].toLowerCase().indexOf(q)<0)||(g&&m[2]!==g)))continue;n++;h+='<div class="rw'+(m?'':' em')+'"><span>'+pad(i+1)+'</span>'+(m?'<span>'+m[0]+'</span><span>'+m[1].toLocaleString('vi-VN')+'</span><span>'+m[2]+'</span><span>'+m[3]+'</span>':'<span>— Trống —</span><span>—</span><span>—</span><span>—</span>')+'</div>'}$('lb').innerHTML=h||'<div class="rw em"><span></span><span>Không tìm thấy.</span></div>';$('mc').textContent=MEM.length+' / 250 đã điền'+((q||g)?' · '+n+' kết quả':'')}
qi.oninput=lb;sel.onchange=lb;lb();
/* Chữ điện ảnh + thanh laser theo cuộn */
var ws=[],tk=0;'Quân Đoàn mạnh không phải vì thắng nhiều trận, mà vì có các bạn ở đây'.split(' ').forEach(function(w){var s=document.createElement('span');s.textContent=w+' ';$('kp').appendChild(s);ws.push(s)});
var evs=[].slice.call(document.querySelectorAll('.ev'));
function onS(){var vh=innerHeight,r=$('tl').getBoundingClientRect();$('fill').style.height=Math.min(1,Math.max(0,(vh*.6-r.top)/r.height))*100+'%';evs.forEach(function(e){e.classList.toggle('lit',e.getBoundingClientRect().top<vh*.6)});var k=$('kin').getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.9-k.top)/(k.height*.8)));ws.forEach(function(w,i){w.style.opacity=.12+.88*Math.min(1,Math.max(0,p*ws.length-i))})}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;onS()})}},{passive:true});onS();

})();
