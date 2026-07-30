# Anvil Scout

Next.js app with Auth0 (login/signup) and Stripe (subscription billing) wired up.
Job board backend is not built yet — this covers account creation and payment.

## Running locally

Two terminals, both required for the full flow (signup → checkout → webhook → account page):

```bash
npm run dev
```

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

- `npm run dev` — starts the app at http://localhost:3000
- `stripe listen ...` — forwards Stripe webhook events (checkout completed, subscription updated) to your local `/api/stripe/webhook` route. Without this, Checkout will complete but the user's subscription status in Auth0 never gets updated.

Both need to stay running while you test. The webhook signing secret `stripe listen` prints matches `STRIPE_WEBHOOK_SECRET` in `.env` already — no copying needed unless it changes.

## Where things live

- `src/lib/auth0.ts` — Auth0 client config
- `src/lib/stripe.ts` — Stripe client + price ID
- `src/lib/auth0-management.ts` — reads/writes `subscription_status` and `stripe_customer_id` on the Auth0 user's `app_metadata` (via a separate M2M app authorized for the Management API)
- `src/lib/subscription.ts` — gate used by `/jobs`, `/companies`, `/applications` to require an active subscription
- `src/app/api/checkout`, `src/app/api/billing-portal`, `src/app/api/stripe/webhook` — the three Stripe-facing routes
- `src/app/signup`, `src/app/account` — the two pages that drive the Auth0 + Stripe flow

## Environment

See `.env.example` for the variable names. `.env` itself is git-ignored and holds real values:

- Stripe keys + price ID were pulled/created via the `stripe` CLI (already authenticated on this machine).
- Auth0 values (`AUTH0_CLIENT_*`, `DEVDISPATCH_M2M_*`) are set manually, not pulled via `stripe projects env --pull`. The Auth0 tenant is managed directly through the Auth0 dashboard (`dev-d3mj7ypc5jkgjk8n.us.auth0.com`) rather than the Stripe Projects CLI's Auth0 integration — that integration turned out to be tied to an inaccessible account, so this project switched to a self-managed tenant. If you rotate these, update `.env` by hand and restart `npm run dev` (env vars only load at process start).
