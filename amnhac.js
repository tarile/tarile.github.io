/* TRANG ÂM NHẠC: 4 hiệu ứng riêng (Canvas + CSS + JS thuần, không thư viện) */
(function(){
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('am-js');

/* 1. Nền phổ tần số tương tác chuột */
var cv=document.getElementById('amViz');
if(cv){
 var c=cv.getContext('2d'),W,H,bars,mx=-1000,t=0;
 function size(){var d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);bars=Math.floor(W/18)}
 addEventListener('resize',function(){size();if(still)draw()});
 addEventListener('mousemove',function(e){mx=e.clientX});
 addEventListener('touchmove',function(e){mx=e.touches[0].clientX},{passive:true});
 function draw(){
  c.clearRect(0,0,W,H);t+=.03;
  for(var i=0;i<bars;i++){
   var x=i*18+6,d=Math.abs(x-mx),boost=Math.max(0,1-d/180)*110,
   w=Math.sin(i*.25+t)*28+Math.cos(i*.12-t*1.4)*20,h=Math.max(8,Math.abs(w)+boost);
   c.fillStyle=d<140?'rgba(255,42,75,.35)':'rgba(255,255,255,.06)';
   c.fillRect(x,H-h,4,h)}
  if(!still)requestAnimationFrame(draw)}
 size();draw();
}

/* 2. Giải mã ký tự cho tiêu đề và mã dự án */
var CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*';
[].forEach.call(document.querySelectorAll('.sc'),function(el){
 var o=el.getAttribute('data-value'),busy=false;
 function go(){
  if(still||busy)return;busy=true;var k=0,id=setInterval(function(){
   el.textContent=o.split('').map(function(ch,i){return(i<k||ch===' ')?ch:CH.charAt(Math.random()*CH.length|0)}).join('');
   if(k>=o.length){clearInterval(id);el.textContent=o;busy=false}
   k+=1/3},35)}
 el.addEventListener('mouseenter',go);go()});

/* 3. Viền phát sáng đỏ chạy theo con trỏ trên thẻ quy trình */
[].forEach.call(document.querySelectorAll('.am-card'),function(card){
 card.addEventListener('mousemove',function(e){
  var r=card.getBoundingClientRect();
  card.style.setProperty('--mx',(e.clientX-r.left)+'px');card.style.setProperty('--my',(e.clientY-r.top)+'px')})});

/* 4. Kho lưu trữ mã hóa: 50 ô nhấp nháy lệch pha (tượng trưng 50 tracks) */
var cells=document.getElementById('amCells');
if(cells){var h='';for(var i=0;i<50;i++)h+='<i style="--d:'+(((i*37)%50)/16).toFixed(2)+'s"></i>';cells.innerHTML=h}

/* Hiện dần từng phần khi cuộn */
var secs=[].slice.call(document.querySelectorAll('.am-sec'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12});
 secs.forEach(function(s){io.observe(s)})
}else secs.forEach(function(s){s.classList.add('vis')});
})();
