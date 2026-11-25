/* TRANG GAMES: giải mã ký tự, băng điều khiển tự chạy (vanilla JS, không thư viện) */
(function(){
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,CH='#X9@%&*ABCDEF0123456789/';
function sc(el){var o=el.getAttribute('data-sc'),k=0,id;if(still||el._b)return;el._b=1;
 id=setInterval(function(){el.textContent=o.split('').map(function(c,i){return(i<k||c===' ')?c:CH.charAt(Math.random()*CH.length|0)}).join('');
  if(k>=o.length){clearInterval(id);el.textContent=o;el._b=0}k+=Math.max(.5,o.length/12)},42)}
var els=[].slice.call(document.querySelectorAll('[data-sc]'));
els.forEach(function(e){e.addEventListener('mouseenter',function(){sc(e)})});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){sc(x.target);io.unobserve(x.target)}})},{threshold:.4});els.forEach(function(e){io.observe(e)})}

/* Băng điều khiển OPS / DEV / ART / MEDIA: thanh tiến trình chạy đầy 4 giây rồi sang khâu kế, bấm tay để chọn, rê chuột để dừng */
var tabs=[].slice.call(document.querySelectorAll('.gm-tabs button')),pns=[].slice.call(document.querySelectorAll('.gm-pn')),bar=document.getElementById('gmBar'),cur=0;
function go(i){cur=i;tabs.forEach(function(t,k){t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});pns.forEach(function(p,k){p.classList.toggle('on',k===i)});
 bar.classList.remove('run');void bar.offsetWidth;if(!still)bar.classList.add('run')}
tabs.forEach(function(t,k){t.addEventListener('click',function(){go(k)})});
bar.addEventListener('animationend',function(){go((cur+1)%tabs.length)});
go(0);
})();
