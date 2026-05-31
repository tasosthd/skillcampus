const demoCampuses = [
  {id:1,title:'Creator Monetization',desc:'Turn short-form content, editing, and offers into client acquisition.',level:'Beginner',premium:false,progress:72},
  {id:2,title:'AI Operator Systems',desc:'Build automations, prompts, workflows and sell productivity outcomes.',level:'Intermediate',premium:true,progress:38},
  {id:3,title:'Web App Builder',desc:'Ship Supabase SaaS products with auth, dashboards and premium locks.',level:'Advanced',premium:true,progress:21},
  {id:4,title:'Client Acquisition',desc:'Outreach scripts, offer design, objections and closing routines.',level:'Beginner',premium:false,progress:84}
];
const demoLessons = [
  {id:1,campus_id:1,title:'Define your paid transformation',body:'Pick one audience, one painful problem, and one measurable outcome. Write a clear promise before creating content.',premium:false,done:true},
  {id:2,campus_id:1,title:'Build your proof portfolio',body:'Create three proof assets: before/after edit, client-style case study, and fast sample delivery.',premium:false,done:false},
  {id:3,campus_id:2,title:'AI workflow productization',body:'Map a repeated business task and turn it into a repeatable workflow you can sell monthly.',premium:true,done:false},
  {id:4,campus_id:3,title:'Supabase schema basics',body:'Create tables, RLS policies and relationships before touching the UI. Security is product quality.',premium:true,done:false}
];
const demoPosts = [
  {id:1,name:'Nikos',body:'Closed my first €250 editing package after posting proof daily for 9 days.',likes:18,comments:['Huge win','Keep compounding']},
  {id:2,name:'Maria',body:'Finished the AI workflow lesson and built a client onboarding automation.',likes:12,comments:['Clean execution']},
  {id:3,name:'Aurilumix',body:'Building a premium campus app. Dark UI, Supabase, community, lessons. Let’s ship.',likes:31,comments:['Future SaaS king']}
];
const demoMembers = [
  {name:'Aurilumix Builder',points:4820,streak:9}, {name:'Nikos Creator',points:4310,streak:13}, {name:'Maria Ops',points:3980,streak:6}, {name:'Leo Apps',points:3440,streak:4}
];
const demoResources = [
  {title:'Outreach Script Pack',type:'Template',premium:false}, {title:'Editing Client Brief',type:'PDF',premium:false}, {title:'Premium Offer Builder',type:'Workbook',premium:true}, {title:'Supabase RLS Checklist',type:'Checklist',premium:true}
];
const demoThreads = [
  {name:'Nikos Creator',last:'Can you review my offer?',messages:['Yo, can you review my offer?','Yes — send the promise and price.']},
  {name:'Maria Ops',last:'Workflow is ready.',messages:['Workflow is ready.','Nice. Productize it into a monthly package.']}
];
