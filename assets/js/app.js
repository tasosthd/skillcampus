const sb = window.scSupabase;
const page = document.body.dataset.page;
const state = {
  posts: JSON.parse(localStorage.getItem('sc_posts') || 'null') || SC_DEMO.posts,
  completed: JSON.parse(localStorage.getItem('sc_completed') || 'null') || SC_DEMO.lessons.filter(l=>l.done).map(l=>l.id),
  recent: JSON.parse(localStorage.getItem('sc_recent') || '[]')
};
const navItems = [
  ['dashboard','dashboard.html','nav.dashboard','⌁'],['campuses','campuses.html','nav.campuses','◆'],['lessons','lessons.html','nav.lessons','▶'],['community','community.html','nav.community','✦'],['messages','messages.html','nav.messages','✉'],['leaderboard','leaderboard.html','nav.leaderboard','▲'],['resources','resources.html','nav.resources','◼'],['profile','profile.html','nav.profile','●'],['admin','admin.html','nav.admin','⚙']
];
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
function save(){ localStorage.setItem('sc_posts', JSON.stringify(state.posts)); localStorage.setItem('sc_completed', JSON.stringify(state.completed)); localStorage.setItem('sc_recent', JSON.stringify(state.recent)); }
function pill(text, tone='') { return `<span class="pill ${tone}">${text}</span>`; }
function progress(p){ return `<div class="progress" aria-label="${p}% complete"><span style="width:${Math.max(0,Math.min(100,p))}%"></span></div>`; }
function xpPercent(){ return Math.round((SC_DEMO.user.xp / SC_DEMO.user.nextLevelXp) * 100); }
function buildSidebar(){
  const side = $('[data-sidebar]'); if(!side) return;
  side.innerHTML = `<div class="side-top"><a class="brand" href="../index.html"><span class="brand-mark">SC</span><span>SkillCampus</span></a><button class="ghost-btn close-nav" data-close-mobile-nav aria-label="Close menu">×</button></div><div class="user-mini"><div class="avatar">A</div><div><b>${SC_DEMO.user.name}</b><small>Lv. ${SC_DEMO.user.level} · ${SC_DEMO.user.plan}</small></div></div><nav class="side-nav" aria-label="Main navigation">${navItems.map(([key,href,label,icon])=>`<a class="${page===key?'active':''}" href="${href}"><span>${icon}</span><b data-i18n="${label}">${t(label)}</b></a>`).join('')}</nav><div class="side-bottom"><button class="ghost-btn lang-toggle" data-lang-toggle>${getLang()==='en'?'EL':'EN'}</button><button class="ghost-btn" data-logout>${t('nav.logout')}</button></div>`;
}
function setupChrome(){
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-open-mobile-nav]')) $('.sidebar')?.classList.add('open');
    if(e.target.closest('[data-close-mobile-nav]')) $('.sidebar')?.classList.remove('open');
    if(e.target.closest('[data-logout]')) { localStorage.removeItem('sc_posts'); location.href='auth.html'; }
  });
  const search = $('[data-global-search]');
  if(search) search.addEventListener('input', e => runGlobalSearch(e.target.value));
}
function renderCommandBar(target='commandBar'){
  const el = document.getElementById(target); if(!el) return;
  el.innerHTML = `<div class="command-card"><div><small>Daily streak</small><strong>${SC_DEMO.user.streak} days</strong></div><div><small>Level</small><strong>${SC_DEMO.user.level}</strong></div><div><small>Reputation</small><strong>${SC_DEMO.user.reputation}</strong></div><label class="search-box"><span>⌕</span><input data-global-search placeholder="Search lessons, campuses, resources..." aria-label="Search platform"></label></div><div id="searchResults" class="search-results" hidden></div>`;
}
function runGlobalSearch(q){
  const box = $('#searchResults'); if(!box) return;
  const query = q.trim().toLowerCase();
  if(!query){ box.hidden = true; box.innerHTML=''; return; }
  const results = [
    ...SC_DEMO.lessons.map(x=>({...x, kind:'Lesson', href:'lessons.html'})),
    ...SC_DEMO.campuses.map(x=>({...x, kind:'Campus', href:'campuses.html'})),
    ...SC_DEMO.resources.map(x=>({...x, kind:'Resource', href:'resources.html'}))
  ].filter(x => `${x.title} ${x.desc||''} ${x.body||''}`.toLowerCase().includes(query)).slice(0,8);
  box.hidden = false;
  box.innerHTML = results.length ? results.map(r=>`<a href="${r.href}" class="search-result"><small>${r.kind}</small><strong>${r.title}</strong><span>${r.desc || r.duration || ''}</span></a>`).join('') : '<div class="empty-state">No results yet. Try “Supabase”, “offer”, or “scripts”.</div>';
}
function renderDashboard(){
  renderCommandBar(); setupChrome();
  $('#statsGrid').innerHTML = [
    ['Completion', `${SC_DEMO.user.completion}%`, 'Across active campuses'], ['XP today', `+${SC_DEMO.user.xpToday}`, 'Daily target: 250 XP'], ['Rank', `#${SC_DEMO.user.rank}`, 'Top 3% this week'], ['Plan', SC_DEMO.user.plan, 'Premium content active']
  ].map(s=>`<article class="stat-card"><small>${s[0]}</small><strong>${s[1]}</strong><span>${s[2]}</span></article>`).join('');
  $('#continueLessons').innerHTML = SC_DEMO.lessons.slice(0,4).map(l=>`<button class="lesson-row" data-open-lesson="${l.id}"><span>${state.completed.includes(l.id)?'✓':l.premium?'🔒':'○'}</span><div><strong>${l.title}</strong><p>${l.duration} · ${l.xp} XP · ${l.premium?'Pro':'Open'}</p></div></button>`).join('');
  $('#recentLessons').innerHTML = (state.recent.length ? state.recent : ['l5','l2','l1']).slice(0,4).map(id=>SC_DEMO.lessons.find(l=>l.id===id)).filter(Boolean).map(l=>`<div class="mini-row"><b>${l.title}</b><span>${l.duration}</span></div>`).join('');
  $('#challengeList').innerHTML = SC_DEMO.challenges.map(c=>`<article class="mini-card"><div>${pill(c.status,c.premium?'premium':'')}<h3>${c.title}</h3><p>${c.submissions} submissions · ${c.due} left</p></div><strong>+${c.reward} XP</strong></article>`).join('');
  $('#pulseList').innerHTML = state.posts.slice(0,3).map(p=>`<div class="pulse-item"><b>${p.name}</b><p>${p.body}</p><small>${p.likes} likes · ${p.replies} replies</small></div>`).join('');
  $('#activityList').innerHTML = SC_DEMO.activity.map(a=>`<li>${a}</li>`).join('');
}
function renderCampuses(){
  renderCommandBar(); setupChrome();
  $('#campusGrid').innerHTML = SC_DEMO.campuses.map(c=>`<article class="campus-card"><div class="card-top"><div class="campus-icon">${c.title[0]}</div>${pill(c.premium?'Pro':'Open',c.premium?'premium':'')}</div><h2>${c.title}</h2><p>${c.desc}</p><div class="metric-strip"><span>${c.lessons} lessons</span><span>${c.members} members</span><span>${c.level}</span></div>${progress(c.progress)}<small>Outcome: ${c.outcome}</small><a class="secondary-btn full" href="lessons.html?campus=${c.id}">Open campus</a></article>`).join('');
  $('#mentorGrid').innerHTML = SC_DEMO.mentors.map(m=>`<article class="mentor-card"><div class="avatar">${m.name[0]}</div><div><h3>${m.name}</h3><p>${m.title}</p><small>${m.specialty} · ★ ${m.rating} · ${m.slots} slots</small></div></article>`).join('');
}
function renderLessons(){
  renderCommandBar(); setupChrome();
  const list=$('#lessonList'), viewer=$('#lessonViewer');
  const qs = new URLSearchParams(location.search); const campus = qs.get('campus');
  const lessons = campus ? SC_DEMO.lessons.filter(l=>l.campus_id===campus) : SC_DEMO.lessons;
  function open(l){
    if(!state.recent.includes(l.id)) state.recent.unshift(l.id); state.recent = state.recent.filter((x,i,a)=>a.indexOf(x)===i).slice(0,8); save();
    const done = state.completed.includes(l.id);
    viewer.innerHTML = `<div class="lesson-hero"><div>${pill(l.premium?'Pro lesson':'Open lesson',l.premium?'premium':'')} ${pill(l.duration)} ${pill(`${l.xp} XP`)}</div><h2>${l.title}</h2><p>${l.body}</p>${progress(done?100:35)}</div><section class="action-panel"><h3>Assignment</h3><p>${l.assignment}</p><ul class="task-list"><li>Study the lesson</li><li>Complete the action step</li><li>Post proof in the community</li></ul><button class="primary-btn" data-complete="${l.id}">${done?'Completed ✓':'Mark complete +XP'}</button></section><section class="resources-inline"><h3>Lesson resources</h3>${l.resources.map(r=>`<span>${r}</span>`).join('')}</section>`;
  }
  list.innerHTML = lessons.map(l=>`<button class="lesson-row" data-lesson="${l.id}"><span>${state.completed.includes(l.id)?'✓':l.premium?'🔒':'○'}</span><div><strong>${l.title}</strong><p>${l.duration} · ${l.xp} XP · ${l.views} views</p></div></button>`).join('');
  list.onclick=e=>{ const row=e.target.closest('[data-lesson]'); if(row) open(lessons.find(l=>l.id===row.dataset.lesson)); };
  viewer.onclick=e=>{ const btn=e.target.closest('[data-complete]'); if(!btn) return; if(!state.completed.includes(btn.dataset.complete)) state.completed.push(btn.dataset.complete); save(); renderLessons(); };
  open(lessons[0] || SC_DEMO.lessons[0]);
}
function renderCommunity(){
  renderCommandBar(); setupChrome(); const feed=$('#feedList');
  function draw(){ feed.innerHTML = state.posts.map(p=>`<article class="post-card"><div class="post-head"><div class="avatar">${p.name[0]}</div><div><b>${p.name}</b><small>${p.role||'Member'} · ${p.created||'Now'}</small></div>${pill(p.tag||'Post')}</div><p>${p.body}</p><div class="post-actions"><button data-like="${p.id}">♡ ${p.likes}</button><button>💬 ${p.replies}</button><button>+${p.reputation||0} rep</button><button>↗ Share</button></div></article>`).join(''); }
  draw();
  $('#postForm').onsubmit=e=>{ e.preventDefault(); const body=$('#postBody').value.trim(); if(!body)return; state.posts.unshift({id:Date.now(),name:'You',role:'Founder Member',body,likes:0,replies:0,tag:'Build Log',reputation:0,created:'Now'}); $('#postBody').value=''; save(); draw(); };
  feed.onclick=e=>{ const btn=e.target.closest('[data-like]'); if(!btn) return; const p=state.posts.find(x=>String(x.id)===String(btn.dataset.like)); if(p){ p.likes++; p.reputation=(p.reputation||0)+1; save(); draw(); } };
  $('#challengeRail').innerHTML = SC_DEMO.challenges.map(c=>`<div class="challenge-row"><b>${c.title}</b><span>+${c.reward} XP · ${c.due}</span></div>`).join('');
}
function renderMessages(){
  renderCommandBar(); setupChrome(); const list=$('#threadList'), head=$('#chatHeader'), msgs=$('#chatMessages');
  function open(t){ head.innerHTML=`<b>${t.name}</b><span>${t.last}</span>`; msgs.innerHTML=t.messages.map((m,i)=>`<div class="bubble ${i%2?'mine':''}">${m}<small>${i?'Today, 14:35':'Today, 14:18'}</small></div>`).join(''); }
  list.innerHTML=SC_DEMO.threads.map((t,i)=>`<button class="thread" data-thread="${i}"><div><b>${t.name}</b><span>${t.last}</span></div>${t.unread?`<em>${t.unread}</em>`:''}</button>`).join('');
  list.onclick=e=>{const b=e.target.closest('[data-thread]'); if(b) open(SC_DEMO.threads[b.dataset.thread]);}; open(SC_DEMO.threads[0]);
}
function renderLeaderboard(){
  renderCommandBar(); setupChrome();
  $('#leaderboardList').innerHTML=SC_DEMO.members.map((m,i)=>`<div class="leader-row"><div><strong>#${i+1} ${m.name}</strong><small>Level ${m.level} · ${m.reputation} reputation</small></div><span>${m.points.toLocaleString()} XP · ${m.streak}d streak</span></div>`).join('');
  $('#achievementGrid').innerHTML=SC_DEMO.achievements.map(a=>`<article class="achievement ${a.unlocked?'unlocked':''}"><span>${a.icon}</span><h3>${a.title}</h3><p>${a.desc}</p></article>`).join('');
}
function renderResources(){
  renderCommandBar(); setupChrome();
  $('#resourceGrid').innerHTML=SC_DEMO.resources.map(r=>`<article class="resource-card"><div class="card-top">${pill(r.type)}${pill(r.premium?'Pro':'Open',r.premium?'premium':'')}</div><h2>${r.title}</h2><p>${r.desc}</p><small>${r.downloads.toLocaleString()} downloads</small><button class="secondary-btn full">Open resource</button></article>`).join('');
  $('#featuredContent').innerHTML=SC_DEMO.lessons.slice(0,3).map(l=>`<div class="mini-row"><b>${l.title}</b><span>${l.duration}</span></div>`).join('');
}
function renderProfile(){
  renderCommandBar(); setupChrome();
  $('#profileName').textContent=SC_DEMO.user.name; $('#profileEmail').textContent=SC_DEMO.user.email;
  $('#profileStats').innerHTML=[['Level',SC_DEMO.user.level],['XP',SC_DEMO.user.xp.toLocaleString()],['Streak',`${SC_DEMO.user.streak}d`],['Reputation',SC_DEMO.user.reputation]].map(s=>`<div><small>${s[0]}</small><strong>${s[1]}</strong></div>`).join('');
  $('#profileAchievements').innerHTML=SC_DEMO.achievements.filter(a=>a.unlocked).map(a=>`<span>${a.icon} ${a.title}</span>`).join('');
  $('#planGrid').innerHTML=SC_DEMO.plans.map(p=>`<article class="plan-card ${p.name===SC_DEMO.user.plan?'active':''}"><h3>${p.name}</h3><strong>${p.price}</strong><p>${p.desc}</p><button class="secondary-btn full">${p.cta}</button></article>`).join('');
  $('#settingsList').innerHTML=['Email notifications','Weekly progress report','Public proof profile','Compact learning mode'].map((s,i)=>`<label class="switch-row"><input type="checkbox" ${i<2?'checked':''}><span>${s}</span></label>`).join('');
}
function setupAuth(){
  setupChrome(); let mode = new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup':'login';
  const status=$('#authStatus'), nameInput=$('#nameInput');
  function sync(){ $$('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===mode)); nameInput.parentElement.style.display=mode==='signup'?'grid':'none'; }
  $$('[data-auth-tab]').forEach(b=>b.onclick=()=>{mode=b.dataset.authTab; sync();}); sync();
  $('#authForm').onsubmit=async e=>{ e.preventDefault(); const email=$('#emailInput').value,password=$('#passwordInput').value; if(!sb){ status.textContent='Demo mode active. Add Supabase keys to persist accounts.'; location.href='dashboard.html'; return; } const res= mode==='signup' ? await sb.auth.signUp({email,password,options:{data:{name:nameInput.value}}}) : await sb.auth.signInWithPassword({email,password}); if(res.error) status.textContent=res.error.message; else location.href='dashboard.html'; };
}
function setupAdmin(){
  renderCommandBar(); setupChrome();
  $('#adminMetrics').innerHTML=[['Active users','2,810'],['MRR target','€18.4k'],['Completion rate','68%'],['Premium conversion','7.8%']].map(s=>`<article class="stat-card"><small>${s[0]}</small><strong>${s[1]}</strong></article>`).join('');
  $('#adminQueue').innerHTML=['3 pending certificate reviews','12 challenge submissions awaiting feedback','5 resource requests from Pro members','2 reported posts to moderate'].map(x=>`<li>${x}</li>`).join('');
  const bind=(formId,statusId,label)=>{$(`#${formId}`).onsubmit=async e=>{e.preventDefault(); const st=$(`#${statusId}`); if(!sb){st.textContent=`Demo ${label} saved locally. Connect Supabase to persist.`; return;} st.textContent=`${label} submitted. Add exact insert mapping for your production tables.`;};};
  bind('campusForm','campusStatus','campus'); bind('lessonForm','lessonStatus','lesson'); bind('resourceForm','resourceStatus','resource');
}
document.addEventListener('DOMContentLoaded',()=>{ buildSidebar(); setupChrome(); if(page==='dashboard')renderDashboard(); if(page==='campuses')renderCampuses(); if(page==='lessons')renderLessons(); if(page==='community')renderCommunity(); if(page==='messages')renderMessages(); if(page==='leaderboard')renderLeaderboard(); if(page==='resources')renderResources(); if(page==='profile')renderProfile(); if(page==='auth')setupAuth(); if(page==='admin')setupAdmin(); });
