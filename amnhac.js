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
function lvl(i){if(!on||!FD)return 0;AN.getByteFrequencyData(FD);return FD[i%FD.length]/255*90}
function draw(){
 c.clearRect(0,0,W,H);t+=.03;if(on&&FD)AN.getByteFrequencyData(FD);
 for(var i=0;i<bars;i++){var x=i*18+6,d=Math.abs(x-mx),b=Math.max(0,1-d/180)*110,w=Math.sin(i*.25+t)*28+Math.cos(i*.12-t*1.4)*20,
  h=Math.max(8,Math.abs(w)+b+(on&&FD?FD[i%FD.length]/255*90:0)),g=c.createLinearGradient(0,H-h,0,H);
  g.addColorStop(0,d<140?'rgba(255,42,95,.55)':'rgba(138,43,226,.22)');g.addColorStop(1,d<140?'rgba(255,42,95,.1)':'rgba(0,240,255,.1)');
  c.fillStyle=g;c.fillRect(x,H-h,4,h)}
 if(!still)requestAnimationFrame(draw)}
size();draw();

/* ===== Giải mã ký tự ===== */
var CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*';
[].forEach.call(document.querySelectorAll('.sc'),function(el){var o=el.getAttribute('data-value'),busy=false;
 function go(){if(still||busy)return;busy=true;var k=0,id=setInterval(function(){el.textContent=o.split('').map(function(ch,i){return(i<k||ch===' ')?ch:CH.charAt(Math.random()*CH.length|0)}).join('');if(k>=o.length){clearInterval(id);el.textContent=o;busy=false}k+=1/3},35)}
 el.addEventListener('mouseenter',go);go()});

/* ===== Thẻ quy trình: ánh sáng theo con trỏ + tiếng blip theo thang ngũ cung ===== */
[].forEach.call(document.querySelectorAll('.am-card'),function(card,i){
 card.style.setProperty('--i',i);card.querySelector('.am-port').style.setProperty('--i',i);
 card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();card.style.setProperty('--mx',(e.clientX-r.left)+'px');card.style.setProperty('--my',(e.clientY-r.top)+'px')});
 card.addEventListener('mouseenter',function(){note(SC[i*2+1],.18,.07,'triangle')})});

/* ===== Dao động ký (oscilloscope) + nghiêng 3D cho khung TRL ===== */
var oc=$('amOsc'),px=oc.getContext('2d'),boost=1,ph=0,pr=$('amProj');
function osc(){var d=Math.min(devicePixelRatio||1,2),w=oc.clientWidth,h=oc.clientHeight;if(oc.width!==w*d){oc.width=w*d;oc.height=h*d}px.setTransform(d,0,0,d,0,0);px.clearRect(0,0,w,h);
 var lv=on&&FD?(AN.getByteFrequencyData(FD),FD[2]/255):0;
 [['#00f0ff',.9,.02,16],['#8a2be2',-.6,.03,12],['#ff2a5f',.5,.045,9]].forEach(function(s){px.beginPath();px.strokeStyle=s[0];px.lineWidth=2;px.shadowColor=s[0];px.shadowBlur=8;
  for(var x=0;x<w;x+=2){var e=Math.sin(x/w*Math.PI),y=h/2+Math.sin(x*s[2]+ph*s[1])*s[3]*(boost+lv*1.5)*e;x?px.lineTo(x,y):px.moveTo(x,y)}px.stroke()});
 ph+=.12;boost+=(1-boost)*.06;if(!still)requestAnimationFrame(osc)}
osc();pr.addEventListener('mousemove',function(e){boost=2.2;var r=pr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pr.style.transform='perspective(900px) rotateY('+x*6+'deg) rotateX('+-y*6+'deg)'});
pr.addEventListener('mouseleave',function(){pr.style.transform=''});

/* ===== Vault 50 tracks: tooltip + gợn sóng + step sequencer (bấm ô để "nạp" nốt, playhead quét từng cột) ===== */
var mt=$('amMx'),tip=$('amTip'),cells=[],col=0;
for(var i=0;i<50;i++){(function(i){var b=document.createElement('b'),n=('0'+(i+1)).slice(-2),r=Math.floor(i/10),cc=i%10;b.textContent=n;
 function fr(){return SC[(cc+r*2)%10]*[.5,1,1,2,2][r]}
 b.addEventListener('mouseenter',function(){tip.textContent='[TRACK_'+n+' // STATUS: IN_PRODUCTION // LOCKED]';note(fr(),.12,.06);
  cells.forEach(function(q,j){var d=Math.hypot(Math.floor(j/10)-r,j%10-cc);q.style.setProperty('--k',Math.max(0,1-d/3.2).toFixed(2))})});
 b.addEventListener('click',function(){b.classList.toggle('arm');note(fr(),.2,.09,'triangle')});
 b.fr=fr;cells.push(b);mt.appendChild(b)})(i)}
mt.addEventListener('mouseleave',function(){tip.textContent='[HOVER A CELL TO SCAN TRACK · CLICK TO ARM NOTE]';cells.forEach(function(q){q.style.setProperty('--k',0)})});
if(!still)setInterval(function(){cells.forEach(function(q,j){var h=j%10===col;q.classList.toggle('ph',h);if(h&&q.classList.contains('arm'))note(q.fr(),.25,.08,'triangle')});col=(col+1)%10},260);

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
