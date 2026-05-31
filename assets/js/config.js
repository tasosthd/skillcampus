// Replace these with your real Supabase project values.
// Keep anon key in frontend only. Never put service_role key here.
window.SKILLCAMPUS_CONFIG = {
  SUPABASE_URL: 'https://ifkpepaopnpeyctgqipt.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlma3BlcGFvcG5wZXljdGdxaXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTE2NDMsImV4cCI6MjA5NTgyNzY0M30.62yTNdTxUt6iF0rTt0DhBT13OI72CHwLl3iesdn3ZHk'
};

window.scSupabase = (() => {
  const cfg = window.SKILLCAMPUS_CONFIG;
  const ready = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('YOUR-PROJECT') && !cfg.SUPABASE_ANON_KEY.includes('YOUR-');
  if (!ready || !window.supabase) return null;
  return window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
})();
