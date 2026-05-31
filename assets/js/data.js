const SC_DEMO = {
  user: {
    id: 'demo-user',
    name: 'Aurilumix Builder',
    email: 'demo@skillcampus.pro',
    role: 'Founder Member',
    plan: 'Pro',
    level: 7,
    xp: 6420,
    xpToday: 180,
    nextLevelXp: 7200,
    streak: 14,
    reputation: 420,
    rank: 8,
    completion: 68,
    joined: '2026-05-01'
  },
  campuses: [
    { id:'creator', title:'Creator Monetization', desc:'Turn short-form content, editing and proof into paid client acquisition.', level:'Beginner', premium:false, progress:72, members:1240, lessons:18, category:'Money', mentor:'Nikos V.', outcome:'Close your first €250–€1,000 service package' },
    { id:'ai-operator', title:'AI Operator Systems', desc:'Build automations, prompts and workflows that sell monthly productivity outcomes.', level:'Intermediate', premium:true, progress:38, members:860, lessons:24, category:'Automation', mentor:'Maria K.', outcome:'Package repeatable AI workflows as retainers' },
    { id:'web-saas', title:'Web App Builder', desc:'Ship Supabase SaaS products with auth, dashboards, premium locks and admin tooling.', level:'Advanced', premium:true, progress:21, members:610, lessons:31, category:'SaaS', mentor:'Alex P.', outcome:'Launch a paid micro-SaaS MVP' },
    { id:'client-acquisition', title:'Client Acquisition', desc:'Outreach scripts, offer design, objections, follow-ups and closing routines.', level:'Beginner', premium:false, progress:84, members:1750, lessons:16, category:'Sales', mentor:'Elena S.', outcome:'Build a predictable lead engine' }
  ],
  lessons: [
    { id:'l1', campus_id:'creator', title:'Define your paid transformation', body:'Pick one audience, one painful problem and one measurable outcome. The market pays for movement, not information.', premium:false, done:true, duration:'12 min', xp:120, assignment:'Write your one-line offer and post it for review.', resources:['Offer Clarity Checklist'], views:82 },
    { id:'l2', campus_id:'creator', title:'Build your proof portfolio', body:'Create three proof assets: a before/after edit, a client-style case study and a fast sample delivery.', premium:false, done:false, duration:'18 min', xp:160, assignment:'Upload or link one proof asset.', resources:['Proof Portfolio Template'], views:64 },
    { id:'l3', campus_id:'ai-operator', title:'AI workflow productization', body:'Map a repeated business task and turn it into a documented workflow you can sell monthly.', premium:true, done:false, duration:'24 min', xp:220, assignment:'Submit one automation map.', resources:['Workflow SOP Pack'], views:44 },
    { id:'l4', campus_id:'web-saas', title:'Supabase schema foundations', body:'Create tables, indexes, RLS policies and relationships before touching the UI. Security is product quality.', premium:true, done:false, duration:'31 min', xp:260, assignment:'Create your first normalized schema.', resources:['RLS Starter SQL'], views:39 },
    { id:'l5', campus_id:'client-acquisition', title:'Daily outreach sprint', body:'Run a focused 25-message sprint with a clear offer, short proof and one ask.', premium:false, done:true, duration:'15 min', xp:140, assignment:'Log 25 outreach attempts.', resources:['DM Scripts'], views:103 }
  ],
  posts: [
    { id:'p1', name:'Nikos', role:'Creator Monetization', body:'Closed my first €250 editing package after posting proof daily for 9 days.', likes:18, replies:5, tag:'Win', reputation:32, created:'Today, 11:40' },
    { id:'p2', name:'Maria', role:'AI Operator Systems', body:'Finished the AI workflow lesson and built a client onboarding automation.', likes:12, replies:3, tag:'Build Log', reputation:18, created:'Today, 09:15' },
    { id:'p3', name:'Aurilumix', role:'Web App Builder', body:'Building a premium campus app. Dark UI, Supabase, community, lessons. Shipping hard.', likes:31, replies:8, tag:'Progress', reputation:51, created:'Yesterday, 21:05' }
  ],
  challenges: [
    { id:'c1', title:'7-Day Proof Sprint', reward:600, due:'7 days', status:'Active', submissions:328, premium:false },
    { id:'c2', title:'Build a Paid Resource Vault', reward:900, due:'12 days', status:'Pro', submissions:74, premium:true },
    { id:'c3', title:'100 Outreach Messages', reward:750, due:'5 days', status:'Active', submissions:512, premium:false }
  ],
  achievements: [
    { id:'a1', title:'First Lesson Completed', icon:'✓', unlocked:true, desc:'Completed your first lesson.' },
    { id:'a2', title:'14-Day Streak', icon:'🔥', unlocked:true, desc:'Returned daily for two weeks.' },
    { id:'a3', title:'Community Builder', icon:'✦', unlocked:true, desc:'Earned 250+ reputation.' },
    { id:'a4', title:'Campus Finisher', icon:'◆', unlocked:false, desc:'Complete every lesson in one campus.' },
    { id:'a5', title:'Certified Operator', icon:'▣', unlocked:false, desc:'Earn a certificate from a premium path.' }
  ],
  resources: [
    { id:'r1', title:'Offer Clarity Checklist', type:'Checklist', premium:false, downloads:1420, desc:'A tactical worksheet for turning skills into paid outcomes.' },
    { id:'r2', title:'DM Scripts Vault', type:'Scripts', premium:false, downloads:2310, desc:'Short outreach templates for creators, builders and service sellers.' },
    { id:'r3', title:'RLS Starter SQL', type:'Code Pack', premium:true, downloads:410, desc:'Production-minded Supabase policy starter kit.' },
    { id:'r4', title:'Stripe Pricing Page Blueprint', type:'Monetization', premium:true, downloads:290, desc:'Pricing tiers, checkout flow and subscription management plan.' }
  ],
  mentors: [
    { id:'m1', name:'Nikos V.', title:'Video Offer Mentor', specialty:'Editing packages', rating:'4.9', slots:3 },
    { id:'m2', name:'Maria K.', title:'AI Systems Mentor', specialty:'Workflow automation', rating:'4.8', slots:5 },
    { id:'m3', name:'Alex P.', title:'SaaS Builder Mentor', specialty:'Supabase architecture', rating:'5.0', slots:2 }
  ],
  members: [
    { name:'Elena', points:12440, streak:28, reputation:930, level:14 },
    { name:'Nikos', points:11280, streak:19, reputation:870, level:13 },
    { name:'Maria', points:10120, streak:17, reputation:760, level:12 },
    { name:'Aurilumix', points:6420, streak:14, reputation:420, level:7 },
    { name:'Alex', points:5880, streak:9, reputation:390, level:6 }
  ],
  threads: [
    { name:'Nikos V.', last:'Send me your proof asset.', unread:2, messages:['Your offer is stronger now. Keep it outcome-based.','Send me your proof asset and I will review the hook.'] },
    { name:'Maria K.', last:'Automation map looks clean.', unread:0, messages:['Your onboarding automation map looks clean.','Next step: price the result, not the tool.'] },
    { name:'Alex P.', last:'Schema first. UI second.', unread:1, messages:['Schema first. UI second. That is how you avoid demo-app chaos.'] }
  ],
  notifications: [
    { type:'XP', text:'+180 XP from completing lessons today', time:'12 min ago' },
    { type:'Reply', text:'Nikos replied to your proof post', time:'46 min ago' },
    { type:'Badge', text:'14-Day Streak achievement unlocked', time:'Yesterday' }
  ],
  activity: [
    'Completed Daily outreach sprint',
    'Unlocked 14-Day Streak',
    'Posted in Community feed',
    'Downloaded Offer Clarity Checklist'
  ],
  plans: [
    { name:'Free', price:'€0', desc:'Preview lessons, join open community, track basic progress.', cta:'Current' },
    { name:'Pro', price:'€29/mo', desc:'Premium campuses, certificates, mentor office hours and resource vault.', cta:'Upgrade' },
    { name:'Team', price:'€149/mo', desc:'Seats, admin analytics, private cohorts and team progress reporting.', cta:'Contact sales' }
  ]
};
