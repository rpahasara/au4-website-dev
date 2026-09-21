/* AU4 Labs — shared frontend prototype script. No dependencies, no network calls. */
const paths={spark:'M12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9Z',shield:'M12 2 21 6v6c0 5-9 10-9 10S3 17 3 12V6Z M9 12l2 2 4-5',people:'M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 22v-4a6 6 0 0 1 12 0v4 M17 4a4 4 0 0 1 0 8 M18 15a5 5 0 0 1 4 5v2',target:'M21 12a9 9 0 1 1-9-9 M17 12a5 5 0 1 1-5-5 M12 12 21 3 M17 3h4v4',cube:'M12 2 22 7v10l-10 5L2 17V7Z M2 7l10 5 10-5 M12 12v10 M7 4.5l10 5',cloud:'M6 19a5 5 0 0 1-1-10 7 7 0 0 1 14-1 5.5 5.5 0 0 1-1 11Z',bars:'M3 22V13h4v9Z M10 22V7h4v15Z M17 22V2h4v20Z',globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c-6 6-6 12 0 18 6-6 6-12 0-18',link:'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',refresh:'M21 12a9 9 0 1 1-3-6.7 M21 3v5h-5',gauge:'M21 15a9 9 0 1 0-18 0 M12 15l5-5',rocket:'M12 2c4 2 6 6 6 11l-3 3H9l-3-3C6 8 8 4 12 2Z M9 19c-1 2-1 3-1 3s2 0 3-1 M15 19c1 2 1 3 1 3s-2 0-3-1'};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=`<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="${paths[el.dataset.icon]||paths.spark}"/></svg>`});

/* ---------- Dialogs (small interactions only; main destinations are real pages) ---------- */
const dialog=document.querySelector('#detail'),title=document.querySelector('#dialog-title'),content=document.querySelector('#dialog-content');
const pages=[['Product Engineering','product-engineering.html'],['Cloud & DevOps','cloud-devops.html'],['Data & AI','data-ai.html'],['Cyber Security','cyber-security.html'],['Services overview','services.html'],['Solutions','solutions.html'],['Industries','industries.html'],['About AU4 Labs','about.html'],['Insights','insights.html'],['Careers','careers.html'],['Contact','contact.html'],['Privacy','privacy.html'],['Terms','terms.html'],['Cookies','cookies.html']];
const panels={
  story:['Technology with purpose.','The AU4 Labs story',['Understand the friction. We begin with your goals, constraints and everyday challenges.','Create the advantage. Product, cloud, data and security work together as one solution.','Build a lasting partnership. Clear communication and shared ownership guide the work.']]
};
let lastFocus=null;
function openPanel(key){
  if(!dialog)return;
  lastFocus=document.activeElement;
  title.textContent='';content.replaceChildren();
  if(key==='search'){
    title.textContent='Find your next advantage.';
    content.innerHTML='<label for="site-search">Search pages and services</label><input id="site-search" type="search" placeholder="Try cloud, security, or careers" autocomplete="off"><div class="dialog-links" id="results"></div>';
    renderSearch('');
  }else{
    const d=panels[key];if(!d)return;
    title.textContent=d[0];
    content.innerHTML=`<p>${d[1]}</p><ul class="dialog-list">${d[2].map(x=>`<li>${x}</li>`).join('')}</ul>`+(d[3]?`<p class="notice">${d[3]}</p>`:'');
  }
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
  const f=dialog.querySelector('input,button.close');if(f)f.focus();
}
function renderSearch(query){
  const q=query.trim().toLowerCase();
  const matched=pages.filter(p=>p[0].toLowerCase().includes(q));
  document.querySelector('#results').innerHTML=matched.length?matched.map(([label,href])=>`<a href="${href}">${label} →</a>`).join(''):'<p>No matches. Try “cloud”, “insights” or “contact”.</p>';
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-panel]');if(t){e.preventDefault();openPanel(t.dataset.panel)}});
document.addEventListener('input',e=>{if(e.target.id==='site-search')renderSearch(e.target.value)});
if(dialog){
  dialog.querySelector('.close').onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{if(lastFocus&&lastFocus.focus)lastFocus.focus()});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
}

/* ---------- Header: mobile menu + sticky ---------- */
document.querySelectorAll('.header, .pill-header').forEach(header=>{
  const nav=header.querySelector('.nav'),menu=header.querySelector('.menu');
  if(!nav||!menu)return;
  const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'};
  menu.onclick=e=>{e.stopPropagation();const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'×':'☰'};
  nav.addEventListener('click',e=>{if(e.target.closest('a,button'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
});
const stickyHeader=document.querySelector('.header');
if(stickyHeader)addEventListener('scroll',()=>stickyHeader.classList.toggle('stuck',scrollY>40),{passive:true});

/* ---------- Homepage service card stepper ---------- */
document.querySelectorAll('[data-direction]').forEach(b=>b.onclick=()=>{
  const cards=[...document.querySelectorAll('.service-card')];if(!cards.length)return;
  window.__sel=((window.__sel??-1)+Number(b.dataset.direction)+cards.length)%cards.length;
  cards.forEach((c,i)=>c.classList.toggle('selected',i===window.__sel));
  const link=cards[window.__sel].querySelector('a,button');if(link)link.focus({preventScroll:true});
});

/* ---------- Motion preference ---------- */
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let motion=!reduced.matches;
const toggle=document.querySelector('#motion-toggle');
function applyMotion(){document.body.classList.toggle('motion-off',!motion);if(toggle){toggle.setAttribute('aria-pressed',String(motion));toggle.textContent=motion?'Motion on':'Motion off'}}
if(toggle)toggle.onclick=()=>{motion=!motion;applyMotion()};
reduced.addEventListener('change',()=>{motion=!reduced.matches;applyMotion()});
applyMotion();

/* ---------- Section reveals ---------- */
document.documentElement.classList.add('js');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el)});

/* ---------- Contact form (frontend only) ---------- */
const form=document.querySelector('#inquiry');
if(form){
  const setError=(field,msg)=>{const input=form.elements[field];const box=form.querySelector(`[data-error="${field}"]`);if(!input||!box)return;input.setAttribute('aria-invalid',msg?'true':'false');box.textContent=msg||''};
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const v=n=>(form.elements[n]?.value||'').trim();
    let first=null;
    const checks=[['name',v('name')?'':'Please enter your name.'],['email',/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))?'':'Please enter a valid work email address.'],['message',v('message').length>9?'':'Please tell us a little about what you need (10 characters or more).']];
    checks.forEach(([f,msg])=>{setError(f,msg);if(msg&&!first)first=f});
    const result=form.querySelector('#form-result');
    if(first){result.textContent='Please correct the highlighted fields.';form.elements[first].focus();return}
    result.textContent='';
    const box=document.querySelector('#confirmation');
    box.hidden=false;
    box.querySelector('[data-echo]').textContent=`${v('name')} · ${v('email')}`;
    box.focus();
    form.reset();
  });
  form.addEventListener('input',e=>{if(e.target.name)setError(e.target.name,'')});
}

/* ---------- Flowing violet light (canvas) ---------- */
document.querySelectorAll('canvas.ribbons').forEach(canvas=>{
  const ctx=canvas.getContext('2d');let w=0,h=0,visible=true,last=0;
  new ResizeObserver(()=>{const b=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);w=b.width;h=b.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}).observe(canvas);
  new IntersectionObserver(e=>visible=e[0].isIntersecting).observe(canvas);
  function draw(time){
    requestAnimationFrame(draw);
    if(!visible||document.hidden||time-last<40)return;
    if(!motion&&last>0){if(canvas.dataset.static==='1')return;canvas.dataset.static='1'}else delete canvas.dataset.static;
    last=time;
    const t=motion?time*.00018:1;
    ctx.clearRect(0,0,w,h);
    for(let n=0;n<35;n++){
      ctx.beginPath();
      for(let x=0;x<=w;x+=7){const y=h*.57+Math.sin(x/w*6+t+n*.027)*h*.22+Math.sin(x/w*3.3-t)*h*.18+(n-17)*2;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}
      const g=ctx.createLinearGradient(0,0,w,0);
      g.addColorStop(0,'rgba(93,64,180,0)');
      g.addColorStop(.32,`rgba(145,103,255,${.12+Math.sin(n/35*Math.PI)*.2})`);
      g.addColorStop(.58,'rgba(106,95,250,.08)');
      g.addColorStop(1,'rgba(125,112,251,0)');
      ctx.strokeStyle=g;ctx.lineWidth=.7;ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
});

/* ---------- Horizontal sliders ---------- */
document.querySelectorAll('[data-slider]').forEach(track=>{
  const id=track.dataset.slider;
  const btns=[...document.querySelectorAll(`[data-slide][data-target="${id}"]`)];
  const step=()=>Math.max(240,track.firstElementChild.getBoundingClientRect().width+18);
  const sync=()=>{const max=track.scrollWidth-track.clientWidth-2;
    btns.forEach(b=>{const d=Number(b.dataset.slide);b.disabled=d<0?track.scrollLeft<=2:track.scrollLeft>=max})};
  btns.forEach(b=>b.onclick=()=>{track.scrollBy({left:step()*Number(b.dataset.slide),behavior:motion?'smooth':'auto'})});
  track.addEventListener('scroll',sync,{passive:true});
  addEventListener('resize',sync);sync();
});

/* ---------- Solutions: challenge navigator (accessible ARIA tabs) ---------- */
document.querySelectorAll('.ch-tabs[role="tablist"]').forEach(tablist=>{
  const tabs=[...tablist.querySelectorAll('[role="tab"]')];
  const panels=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls')));
  function select(i,focus){
    tabs.forEach((t,j)=>{
      const on=j===i;
      t.setAttribute('aria-selected',String(on));
      t.tabIndex=on?0:-1;
      if(panels[j])panels[j].hidden=!on;
    });
    const p=panels[i];
    if(p&&motion){p.classList.remove('chfade');void p.offsetWidth;p.classList.add('chfade');}
    if(focus)tabs[i].focus();
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>select(i,false));
    t.addEventListener('keydown',e=>{
      let n=null;
      if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%tabs.length;
      else if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;
      else if(e.key==='Home')n=0;
      else if(e.key==='End')n=tabs.length-1;
      if(n!==null){e.preventDefault();select(n,true);}
    });
  });
});
