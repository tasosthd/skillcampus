# SkillCampus Pro

Original premium dark learning/community SaaS starter using HTML, CSS, JavaScript, and Supabase.

## Files created

- `index.html` — premium landing page
- `pages/auth.html` — custom email/password auth screen
- `pages/dashboard.html` — growth dashboard with stats, lesson progress and community pulse
- `pages/campuses.html` — campus/category system
- `pages/lessons.html` — lesson viewer with premium lock UI and tasks
- `pages/community.html` — posts, likes/comments UI and local demo posting
- `pages/messages.html` — direct messages layout
- `pages/leaderboard.html` — member ranking UI
- `pages/resources.html` — resources vault with premium labels
- `pages/profile.html` — user profile screen
- `pages/admin.html` — admin forms for campuses and lessons
- `assets/css/styles.css` — full responsive dark premium design system
- `assets/js/config.js` — Supabase configuration
- `assets/js/i18n.js` — Greek/English language support
- `assets/js/data.js` — demo data for offline testing
- `assets/js/app.js` — UI rendering, auth handling, demo interactions, admin inserts
- `sql/schema.sql` — Supabase tables, RLS policies, profile trigger

## Supabase setup

1. Create a Supabase project.
2. Open SQL editor.
3. Paste and run `sql/schema.sql`.
4. Open `assets/js/config.js`.
5. Replace:
   - `https://YOUR-PROJECT.supabase.co`
   - `YOUR-SUPABASE-ANON-KEY`
6. Keep the service role key out of frontend code.

## Tables included

- `profiles`
- `campuses`
- `lessons`
- `lesson_progress`
- `posts`
- `post_likes`
- `comments`
- `messages`
- `resources`

## How to test

Open `index.html` locally or host the folder on Vercel/Netlify.

Without Supabase keys:
- The app works in demo mode.
- Dashboard, campuses, lessons, community, DMs, leaderboard, resources and profile load with demo data.

With Supabase keys:
- Signup/login works with Supabase Auth.
- Admin forms insert campuses and lessons.
- RLS policies protect premium content and user-owned data.

Main pages to test:

1. Landing page CTA
2. Auth signup/login
3. Dashboard stats and lesson cards
4. Campus cards on desktop/mobile
5. Lesson viewer and mark-complete UI
6. Community post composer
7. Messages layout
8. Leaderboard rows
9. Resources premium/open cards
10. Greek/English language toggle
11. Mobile sidebar menu
12. Admin campus/lesson forms

## Monetization plan

Fast monetization:
- Sell access to one campus for €49–€99.
- Offer a monthly Pro subscription at €19–€49/month.
- Sell premium resources like scripts, editing packs, templates and checklists.
- Add a paid community tier with weekly live calls.

Long-term monetization:
- Add Stripe Checkout and store subscription status in `profiles.is_premium`.
- Create niche campuses: video editing, AI workflows, web app building, client acquisition.
- Add certificates, progress milestones and public proof profiles.
- Sell B2B access to agencies or small teams.

## Next engineering upgrades

- Stripe integration
- Real-time Supabase channels for posts and messages
- File uploads for resources and avatars
- Admin-only route protection
- Lesson video embeds
- Search and filters
- Notification system
- Better analytics dashboard
