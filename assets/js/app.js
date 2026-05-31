const sb = window.scSupabase;
const page = document.body.dataset.page;
const navItems = [
  ['dashboard','dashboard.html','nav.dashboard','⌁'],['campuses','campuses.html','nav.campuses','◆'],['lessons','lessons.html','nav.lessons','▶'],['community','community.html','nav.community','✦'],['messages','messages.html','nav.messages','✉'],['leaderboard','leaderboard.html','nav.leaderboard','▲'],['resources','resources.html','nav.resources','◼'],['profile','profile.html','nav.profile','●'],['admin','admin.html','nav.admin','⚙']
];
function rel(path){ return location.pathname.includes('/pages/') ? path : 'pages/'+path; }
function buildSidebar(){
  const side = document.querySelector('[data-sidebar]'); if(!side) return;
  side.innerHTML = `<div class="side-top"><a class="brand" href="../index.html"><span class="brand-mark">SC</span><span>SkillCampus</span></a><button class="ghost-btn close-nav" data-close-mobile-nav>×</button></div><nav class="side-nav">${navItems.map(([key,href,label,icon])=>`<a class="${page===key?'active':''}" href="${href}"><span>${icon}</span><b data-i18n="${label}">${t(label)}</b></a>`).join('')}</nav><div class="side-bottom"><button class="ghost-btn lang-toggle" data-lang-toggle>${getLang()==='en'?'EL':'EN'}</button><button class="ghost-btn" data-logout>${t('nav.logout')}</button></div>`;
}
function setupMobileNav(){
  document.addEventListener('click',e=>{ if(e.target.closest('[data-open-mobile-nav]')) document.querySelector('.sidebar')?.classList.add('open'); if(e.target.closest('[data-close-mobile-nav]')) document.querySelector('.sidebar')?.classList.remove('open'); });
}
function pill(text){ return `<span class="pill">${text}</span>`; }
function progress(p){ return `<div class="progress"><span style="width:${p}%"></span></div>`; }
function renderDashboard(){
  const stats=[['Lessons completed','12'],['Weekly XP','1,240'],['Community wins','7'],['Premium modules','4']];
  document.getElementById('statsGrid').innerHTML=stats.map(s=>`<article class="stat-card"><small>${s[0]}</small><strong>${s[1]}</strong></article>`).join('');
  document.getElementById('continueLessons').innerHTML=demoLessons.slice(0,3).map(l=>`<button class="lesson-row"><span>${l.done?'✓':'○'}</span><div><strong>${l.title}</strong><p>${l.premium?'Premium':'Open'} lesson</p></div></button>`).join('');
  document.getElementById('pulseList').innerHTML=demoPosts.slice(0,3).map(p=>`<div class="pulse-item"><b>${p.name}</b><p>${p.body}</p></div>`).join('');
}
function renderCampuses(){ document.getElementById('campusGrid').innerHTML=demoCampuses.map(c=>`<article class="campus-card glass-card"><div class="campus-icon">${c.title[0]}</div><h2>${c.title}</h2><p>${c.desc}</p><div class="card-meta">${pill(c.level)}${pill(c.premium?'Premium':'Open')}</div>${progress(c.progress)}<a class="secondary-btn full" href="lessons.html?campus=${c.id}">Open campus</a></article>`).join(''); }
function renderLessons(){
  const list=document.getElementById('lessonList'), viewer=document.getElementById('lessonViewer');
  function open(l){ viewer.innerHTML=`<div class="lesson-hero"><span class="lock-badge">${l.premium?'Premium locked':'Open lesson'}</span><h2>${l.title}</h2><p>${l.body}</p></div><ul class="task-list"><li>Watch/read the lesson</li><li>Complete the action step</li><li>Post proof in community</li></ul><button class="primary-btn" data-complete="${l.id}">${l.done?'Completed':'Mark complete'}</button>`; }
  list.innerHTML=demoLessons.map(l=>`<button class="lesson-row" data-lesson="${l.id}"><span>${l.done?'✓':l.premium?'🔒':'○'}</span><div><strong>${l.title}</strong><p>${l.premium?'Premium':'Open'} · Campus ${l.campus_id}</p></div></button>`).join('');
  list.onclick=e=>{ const row=e.target.closest('[data-lesson]'); if(row) open(demoLessons.find(l=>l.id==row.dataset.lesson)); };
  open(demoLessons[0]);
}
function renderCommunity(){ const feed=document.getElementById('feedList'); const render=()=>feed.innerHTML=demoPosts.map(p=>`<article class="post-card glass-card"><div class="post-head"><div class="avatar">${p.name[0]}</div><b>${p.name}</b></div><p>${p.body}</p><div class="post-actions"><button>♡ ${p.likes}</button><button>💬 ${p.comments.length}</button><button>↗ Share</button></div><div class="comments">${p.comments.map(c=>`<span>${c}</span>`).join('')}</div></article>`).join(''); render(); document.getElementById('postForm').onsubmit=e=>{e.preventDefault(); const body=document.getElementById('postBody').value.trim(); if(!body)return; demoPosts.unshift({id:Date.now(),name:'You',body,likes:0,comments:[]}); document.getElementById('postBody').value=''; render();}; }
function renderMessages(){ const list=document.getElementById('threadList'), head=document.getElementById('chatHeader'), msgs=document.getElementById('chatMessages'); function open(t){ head.textContent=t.name; msgs.innerHTML=t.messages.map((m,i)=>`<div class="bubble ${i%2?'mine':''}">${m}<small>Today, ${14+i}:35</small></div>`).join(''); } list.innerHTML=demoThreads.map((t,i)=>`<button class="thread" data-thread="${i}"><b>${t.name}</b><span>${t.last}</span></button>`).join(''); list.onclick=e=>{const b=e.target.closest('[data-thread]'); if(b) open(demoThreads[b.dataset.thread]);}; open(demoThreads[0]); }
function renderLeaderboard(){ document.getElementById('leaderboardList').innerHTML=demoMembers.map((m,i)=>`<div class="leader-row"><strong>#${i+1} ${m.name}</strong><span>${m.points} XP · ${m.streak}d streak</span></div>`).join(''); }
function renderResources(){ document.getElementById('resourceGrid').innerHTML=demoResources.map(r=>`<article class="resource-card glass-card"><h2>${r.title}</h2><p>${r.type}</p>${pill(r.premium?'Premium':'Open')}<button class="secondary-btn full">Open</button></article>`).join(''); }
function setupAuth(){
  let mode = new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup':'login';
  const status=document.getElementById('authStatus');
  const nameInput=document.getElementById('nameInput');
  function sync(){ document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===mode)); nameInput.parentElement.style.display=mode==='signup'?'grid':'none'; }
  document.querySelectorAll('[data-auth-tab]').forEach(b=>b.onclick=()=>{mode=b.dataset.authTab; sync();}); sync();
  document.getElementById('authForm').onsubmit=async e=>{ e.preventDefault(); const email=emailInput.value,password=passwordInput.value; if(!sb){ status.textContent='Demo mode: add Supabase URL and anon key in assets/js/config.js'; location.href='dashboard.html'; return; } const res= mode==='signup' ? await sb.auth.signUp({email,password,options:{data:{name:nameInput.value}}}) : await sb.auth.signInWithPassword({email,password}); if(res.error) status.textContent=res.error.message; else location.href='dashboard.html'; };
}
function setupAdmin(){
  const campusStatus=document.getElementById('campusStatus'), lessonStatus=document.getElementById('lessonStatus');
  document.getElementById('campusForm').onsubmit=async e=>{e.preventDefault(); if(!sb){campusStatus.textContent='Demo saved locally. Add Supabase keys to persist.'; return;} const {error}=await sb.from('campuses').insert({title:campusTitle.value,description:campusDescription.value}); campusStatus.textContent=error?error.message:'Campus saved.';};
  document.getElementById('lessonForm').onsubmit=async e=>{e.preventDefault(); if(!sb){lessonStatus.textContent='Demo saved locally. Add Supabase keys to persist.'; return;} const {error}=await sb.from('lessons').insert({title:lessonTitle.value,content:lessonContent.value,is_premium:lessonPremium.checked}); lessonStatus.textContent=error?error.message:'Lesson saved.';};
}
document.addEventListener('DOMContentLoaded',()=>{ buildSidebar(); setupMobileNav(); if(page==='dashboard')renderDashboard(); if(page==='campuses')renderCampuses(); if(page==='lessons')renderLessons(); if(page==='community')renderCommunity(); if(page==='messages')renderMessages(); if(page==='leaderboard')renderLeaderboard(); if(page==='resources')renderResources(); if(page==='auth')setupAuth(); if(page==='admin')setupAdmin(); });
