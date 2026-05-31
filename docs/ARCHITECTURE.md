# SkillCampus Pro Architecture Notes

## Product layers

1. **Acquisition layer**: landing page, clear CTA, premium positioning.
2. **Activation layer**: auth, onboarding-ready profile, first dashboard, continue learning widgets.
3. **Learning layer**: campuses, lessons, assignments, completion tracking, recently viewed lessons.
4. **Engagement layer**: community posts, challenges, reputation, notifications, activity feeds.
5. **Retention layer**: daily streaks, XP, levels, badges, leaderboards, weekly progress settings.
6. **Monetization layer**: plan UI, premium gates, subscriptions table, premium resources, certificates.
7. **Operations layer**: admin command center, content forms, review queue, moderation queue.

## Frontend approach

The current implementation stays framework-free for simple hosting, but the code is now structured around reusable render functions and shared demo state. The next production step should move this into a component framework such as React/Next.js when server routes, Stripe webhooks and protected pages are required.

## Supabase approach

The schema is normalized around user-owned activity and admin-owned content. RLS policies separate public content, private progress, private messages, premium gates and admin operations.

## Scale path

- Add Supabase Edge Functions for Stripe webhooks and certificate generation.
- Add database views for dashboard analytics instead of calculating everything on the client.
- Add full-text search indexes across lessons, resources and posts.
- Add realtime channels for community posts, notifications and messages.
