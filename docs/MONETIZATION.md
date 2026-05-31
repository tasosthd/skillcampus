# Monetization System

## Built into this version

- Free / Pro / Team pricing UI on the profile page.
- `subscriptions` table for Stripe or Paddle subscription state.
- `profiles.plan` and generated `profiles.is_premium` gate.
- Premium campuses, premium lessons and premium resources.
- Certificate table for paid completion credentials.
- Mentor profiles and office-hours positioning.

## Recommended pricing

- Free: community preview, open lessons, basic progress.
- Pro: €29/month for premium campuses, resources, challenges, certificates and mentor sessions.
- Team: €149/month for multiple seats, private cohorts and team analytics.

## Next build

1. Stripe Checkout session Edge Function.
2. Stripe customer portal Edge Function.
3. Webhook handler that updates `subscriptions` and `profiles.plan`.
4. Locked UI states that redirect non-paying users to checkout.
5. Admin revenue dashboard showing MRR, churn, conversion and cohort retention.
