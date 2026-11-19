/* TRANG ÂM NHẠC (Cyber-Audio Lab): Canvas + CSS + Web Audio API, không thư viện, không file MP3 */
(function(){
var $=function(i){return document.getElementById(i)},still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('am-js');

/* ===== Âm thanh tổng hợp (Web Audio) ===== */
var AC=null,AN=null,on=false,FD=null,SC=[220,261.6,293.7,329.6,392,440,523.3,587.3,659.3,784];
function note(f,d,v,type){if(!on)return;var t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.6,t+d);g.gain.setValueAtTime(v||.06,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AN);o.start();o.stop(t+d)}
function drone(){var f=AC.createBiquadFilter(),g=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();f.type='lowpass';f.frequency.value=320;g.gain.value=.05;
 [55,82.4,110.5].forEach(function(q,i){var o=AC.createOscillator();o.type=i?'triangle':'sine';o.frequency.value=q;o.connect(f);o.start()});
 l.frequency.value=.12;lg.gain.value=140;l.connect(lg);lg.connect(f.frequency);l.start();f.connect(g);g.connect(AN)}
var ab=$('amAud');
ab.addEventListener('click',function(){
 if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();AN=AC.createAnalyser();AN.fftSize=64;AN.connect(AC.destination);FD=new Uint8Array(AN.frequencyBinCount);drone()}
 on=!on;AC[on?'resume':'suspend']();ab.classList.toggle('on',on);$('amAudL').textContent='SYNTH AUDIO: '+(on?'ON':'OFF');if(on)note(660,.2,.08,'triangle')});

/* ===== Nền phổ tần số: gradient cyan→violet→magenta, nhảy theo nhạc thật khi bật audio ===== */
var cv=$('amViz'),c=cv.getContext('2d'),W,H,bars,mx=-1000,t=0;
function size(){var d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);bars=Math.floor(W/18)}
addEventListener('resize',function(){size();if(still)draw()});addEventListener('mousemove',function(e){mx=e.clientX});
function draw(){
 c.clearRect(0,0,W,H);t+=.03;if(on&&FD)AN.getByteFrequencyData(FD);
 var base=H-52,g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'#38bdf8');g.addColorStop(.5,'#a855f7');g.addColorStop(1,'#fb7185');c.fillStyle=g;
 for(var i=0;i<bars;i++){var x=i*18+6,d=Math.abs(x-mx),bo=Math.max(0,1-d/180)*70,w=Math.sin(i*.25+t)*20+Math.cos(i*.12-t*1.4)*14,
  h=Math.max(6,Math.abs(w)+bo+(on&&FD?FD[i%FD.length]/255*70:0));
  c.globalAlpha=d<140?.8:.5;c.fillRect(x,base-h,4,h);
  c.globalAlpha=.16;c.fillRect(x,base+3,4,Math.min(h*.6,46))}
 c.globalAlpha=1;if(!still)requestAnimationFrame(draw)}
size();draw();

/* ===== Lõi sóng âm 3D: 2 vòng tia tần số + hạt quỹ đạo, nghiêng 3D theo chuột, nổ sáng khi chạm ===== */
var kc=$('amCore'),kx=kc.getContext('2d'),kw=kc.parentNode,kr=0,ke=0,rx=0,ry=0,tx2=0,ty2=0;
kc.addEventListener('mousemove',function(){ke=Math.max(ke,18)});
kc.addEventListener('click',function(){ke=46;note(SC[5],.3,.09,'triangle')});
addEventListener('mousemove',function(e){tx2=(e.clientX/innerWidth-.5)*2;ty2=(e.clientY/innerHeight-.5)*2});
function core(){
 var d=Math.min(devicePixelRatio||1,2),s=kc.clientWidth,i,a,l,R,cx;
 if(!s){if(!still)requestAnimationFrame(core);return}
 if(kc.width!==Math.round(s*d)){kc.width=kc.height=Math.round(s*d)}
 kx.setTransform(d,0,0,d,0,0);kx.clearRect(0,0,s,s);cx=s/2;R=s*.27;kr+=.012;ke*=.95;
 var gl=kx.createRadialGradient(cx,cx,R*.2,cx,cx,R*1.9);gl.addColorStop(0,'rgba(56,189,248,.3)');gl.addColorStop(.55,'rgba(168,85,247,.14)');gl.addColorStop(1,'rgba(168,85,247,0)');kx.fillStyle=gl;kx.fillRect(0,0,s,s);
 kx.lineCap='round';
 for(i=0;i<72;i++){a=i/72*6.2832+kr;l=R*(.08+Math.abs(Math.sin(i*.35+kr*4)*.22+Math.cos(i*.2-kr*3)*.16))+ke*R/80+(on&&FD?FD[i%FD.length]/255*R*.55:0);
  kx.strokeStyle='hsl('+(190+i/72*150)+',90%,68%)';kx.lineWidth=2.6;kx.beginPath();kx.moveTo(cx+Math.cos(a)*R,cx+Math.sin(a)*R);kx.lineTo(cx+Math.cos(a)*(R+l),cx+Math.sin(a)*(R+l));kx.stroke()}
 for(i=0;i<48;i++){a=i/48*6.2832-kr*1.6;l=R*(.05+Math.abs(Math.sin(i*.5-kr*5))*.14)+ke*R/160;
  kx.strokeStyle='rgba(255,255,255,.55)';kx.lineWidth=1.6;kx.beginPath();kx.moveTo(cx+Math.cos(a)*R*.78,cx+Math.sin(a)*R*.78);kx.lineTo(cx+Math.cos(a)*(R*.78-l),cx+Math.sin(a)*(R*.78-l));kx.stroke()}
 for(i=0;i<3;i++){a=kr*(1.2+i*.4)+i*2.1;var ox=cx+Math.cos(a)*R*1.75,oy=cx+Math.sin(a)*R*(1.1+i*.15),og=kx.createRadialGradient(ox,oy,0,ox,oy,10);
  og.addColorStop(0,'#fff');og.addColorStop(.35,'rgba(125,211,252,.7)');og.addColorStop(1,'rgba(125,211,252,0)');kx.fillStyle=og;kx.fillRect(ox-10,oy-10,20,20)}
 kx.textAlign='center';kx.fillStyle='#f8fafc';kx.font='700 '+(R*.17)+'px "JetBrains Mono",monospace';kx.fillText('TRL // CORE',cx,cx-2);
 kx.fillStyle='#7dd3fc';kx.font='500 '+(R*.12)+'px "JetBrains Mono",monospace';kx.fillText('50 TRACKS LAB',cx,cx+R*.2);
 rx+=(ty2*-16-rx)*.06;ry+=(tx2*18-ry)*.06;kw.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
 if(!still)requestAnimationFrame(core)}
core();

/* ===== Giải mã ký tự ===== */
var CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*';
[].forEach.call(document.querySelectorAll('.sc'),function(el){var o=el.getAttribute('data-value'),busy=false;
 function go(){if(still||busy)return;busy=true;var k=0,id=setInterval(function(){el.textContent=o.split('').map(function(ch,i){return(i<k||ch===' ')?ch:CH.charAt(Math.random()*CH.length|0)}).join('');if(k>=o.length){clearInterval(id);el.textContent=o;busy=false}k+=1/3},35)}
 el.addEventListener('mouseenter',go);go()});

/* ===== Thẻ quy trình: ánh sáng theo con trỏ + tiếng blip theo thang ngũ cung ===== */
[].forEach.call(document.querySelectorAll('.am-card'),function(card,i){
 card.style.setProperty('--i',i);card.querySelector('.am-port').style.setProperty('--i',i);
 card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--mx',(e.clientX-r.left)+'px');card.style.setProperty('--my',(e.clientY-r.top)+'px');card.style.setProperty('--hx',(x*100)+'%');card.style.setProperty('--hy',(y*100)+'%');card.style.transform='perspective(1000px) rotateY('+(x-.5)*9+'deg) rotateX('+(.5-y)*9+'deg) translateY(-6px)'});card.addEventListener('mouseleave',function(){card.style.transform=''});
 card.addEventListener('mouseenter',function(){note(SC[i*2+1],.18,.07,'triangle')})});

/* ===== Dao động ký (oscilloscope) + nghiêng 3D cho khung TRL ===== */
var oc=$('amOsc'),px=oc.getContext('2d'),boost=1,ph=0,pr=$('amProj');
function osc(){var d=Math.min(devicePixelRatio||1,2),w=oc.clientWidth,h=oc.clientHeight;if(oc.width!==w*d){oc.width=w*d;oc.height=h*d}px.setTransform(d,0,0,d,0,0);px.clearRect(0,0,w,h);
 var lv=on&&FD?(AN.getByteFrequencyData(FD),FD[2]/255):0;
 [['#00f0ff',.9,.02,16],['#8a2be2',-.6,.03,12],['#ff2a5f',.5,.045,9]].forEach(function(s){px.beginPath();px.strokeStyle=s[0];px.lineWidth=2;px.shadowColor=s[0];px.shadowBlur=8;
  for(var x=0;x<w;x+=2){var e=Math.sin(x/w*Math.PI),y=h/2+Math.sin(x*s[2]+ph*s[1])*s[3]*(boost+lv*1.5)*e;x?px.lineTo(x,y):px.moveTo(x,y)}px.stroke()});
 ph+=.12;boost+=(1-boost)*.06;if(!still)requestAnimationFrame(osc)}
osc();pr.addEventListener('mousemove',function(e){boost=2.2;var r=pr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pr.style.transform='perspective(900px) rotateY('+x*6+'deg) rotateX('+-y*6+'deg)';pr.style.setProperty('--mx',(e.clientX-r.left)+'px');pr.style.setProperty('--my',(e.clientY-r.top)+'px');pr.style.setProperty('--hx',((x+.5)*100)+'%');pr.style.setProperty('--hy',((y+.5)*100)+'%')});
pr.addEventListener('mouseleave',function(){pr.style.transform=''});

/* ===== Vault 50 tracks: tooltip + gợn sóng + step sequencer (bấm ô để "nạp" nốt, playhead quét từng cột) ===== */
function ring(q){var r=document.createElement('i');r.className='am-ring';q.appendChild(r);setTimeout(function(){r.remove()},850)}
var mt=$('amMx'),tip=$('amTip'),cells=[],col=0;
for(var i=0;i<50;i++){(function(i){var b=document.createElement('b'),n=('0'+(i+1)).slice(-2),r=Math.floor(i/10),cc=i%10;b.textContent=n;b.style.setProperty('--c',cc);
 function fr(){return SC[(cc+r*2)%10]*[.5,1,1,2,2][r]}
 b.addEventListener('mouseenter',function(){tip.textContent='[TRACK_'+n+' // STATUS: IN_PRODUCTION // LOCKED]';note(fr(),.12,.06);
  cells.forEach(function(q,j){var d=Math.hypot(Math.floor(j/10)-r,j%10-cc);q.style.setProperty('--k',Math.max(0,1-d/3.2).toFixed(2))})});
 b.addEventListener('click',function(){b.classList.toggle('arm');note(fr(),.2,.09,'triangle');ring(b)});
 b.fr=fr;cells.push(b);mt.appendChild(b)})(i)}
mt.addEventListener('mouseleave',function(){tip.textContent='[HOVER A CELL TO SCAN TRACK · CLICK TO ARM NOTE]';cells.forEach(function(q){q.style.setProperty('--k',0)})});
if(!still)setInterval(function(){cells.forEach(function(q,j){var h=j%10===col;q.classList.toggle('ph',h);if(h&&q.classList.contains('arm')){note(q.fr(),.25,.08,'triangle');ring(q)}});col=(col+1)%10},260);

/* ===== Con trỏ Frequency Scanner + thanh BPM đo tốc độ cuộn ===== */
var cur=$('amCur'),cx=0,cy=0,tx=0,ty=0;
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('act');cur.classList.toggle('big',!!e.target.closest('.am-card,.am-mx b,.am-aud,.am-proj'))});
(function mv(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(mv)})();
var bf=$('amBpmF'),bt=$('amBpmT'),ly=scrollY,sp=0;
function bpm(){var y=scrollY;sp=sp*.9+Math.min(Math.abs(y-ly),80)*.1;ly=y;var k=Math.min(1,sp/18),v=60+Math.round(k*120);
 bf.style.height=(5+k*95)+'%';bf.style.background='rgb('+Math.round(k*255)+','+Math.round(240-k*198)+','+Math.round(255-k*160)+')';bf.style.color=bf.style.background;bt.textContent='BPM '+('0'+v).slice(-3);requestAnimationFrame(bpm)}
bpm();

/* ===== Hiện dần ===== */
var secs=[].slice.call(document.querySelectorAll('.am-sec'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12});secs.forEach(function(s){io.observe(s)})}else secs.forEach(function(s){s.classList.add('vis')});
})();
