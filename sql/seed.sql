-- Optional demo seed data. Run after schema.sql if you want starter content.
insert into public.achievements (code, title, description, icon, xp_bonus) values
('first_lesson', 'First Lesson Completed', 'Completed your first lesson.', '✓', 100),
('streak_14', '14-Day Streak', 'Returned daily for two weeks.', '🔥', 250),
('community_builder', 'Community Builder', 'Earned 250+ reputation.', '✦', 300),
('campus_finisher', 'Campus Finisher', 'Completed every lesson in one campus.', '◆', 500)
on conflict (code) do nothing;

insert into public.campuses (slug, title, description, category, level, outcome, is_premium, is_published) values
('creator-monetization', 'Creator Monetization', 'Turn content and proof into paid client acquisition.', 'Money', 'Beginner', 'Close your first service package.', false, true),
('ai-operator-systems', 'AI Operator Systems', 'Productize repeatable AI workflows.', 'Automation', 'Intermediate', 'Sell AI workflow retainers.', true, true),
('web-app-builder', 'Web App Builder', 'Ship Supabase SaaS products.', 'SaaS', 'Advanced', 'Launch a paid micro-SaaS MVP.', true, true)
on conflict (slug) do nothing;
