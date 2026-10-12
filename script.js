(() => {
  "use strict";
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  const canvas = document.getElementById("windCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let w=0,h=0,dpr=1;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particles=[];
  const count=()=>Math.min(72,Math.max(28,Math.round(w/17)));
  function particle(random=false){return{x:random?Math.random()*(w||innerWidth):(w||innerWidth)+Math.random()*30,y:Math.random()*(h||innerHeight),r:.45+Math.random()*1.55,vx:.16+Math.random()*.58,vy:(Math.random()-.5)*.16,a:.12+Math.random()*.46,p:Math.random()*Math.PI*2,t:.003+Math.random()*.009};}
  function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);while(particles.length<count())particles.push(particle(true));while(particles.length>count())particles.pop();}
  function draw(time=0){ctx.clearRect(0,0,w,h);for(const p of particles){if(!reduced){p.x-=p.vx;p.y+=p.vy+Math.sin(time*.00045+p.p)*.12;p.p+=p.t;}if(p.x < -8){p.x=w+8;p.y=Math.random()*h;}if(p.y < -8)p.y=h+8;if(p.y>h+8)p.y=-8;const f=.68+.32*Math.sin(p.p);ctx.beginPath();ctx.fillStyle=`rgba(255,${Math.round(205+35*f)},${Math.round(155+55*f)},${p.a*f})`;ctx.shadowBlur=10;ctx.shadowColor="rgba(255,205,150,.55)";ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.shadowBlur=0;if(!reduced)requestAnimationFrame(draw);}
  addEventListener("resize",resize,{passive:true});resize();if(reduced)draw();else requestAnimationFrame(draw);
  document.querySelectorAll('[aria-disabled="true"]').forEach(el=>{if(el.tagName==="A")el.addEventListener("click",e=>e.preventDefault());});
})();