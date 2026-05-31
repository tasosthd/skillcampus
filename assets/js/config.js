// Replace these with your real Supabase project values.
// Keep anon key in frontend only. Never put service_role key here.
window.SKILLCAMPUS_CONFIG = {
  SUPABASE_URL: 'https://YOUR-PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-SUPABASE-ANON-KEY'
};

window.scSupabase = (() => {
  const cfg = window.SKILLCAMPUS_CONFIG;
  const ready = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('YOUR-PROJECT') && !cfg.SUPABASE_ANON_KEY.includes('YOUR-');
  if (!ready || !window.supabase) return null;
  return window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
})();
