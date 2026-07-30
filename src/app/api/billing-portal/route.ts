import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { stripe } from "@/lib/stripe";
import { getUser } from "@/lib/auth0-management";

export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await getUser(session.user.sub);
  const stripeCustomerId = user.app_metadata?.stripe_customer_id as string | undefined;
  if (!stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer on file" }, { status: 400 });
  }

  const baseUrl = process.env.APP_BASE_URL ?? new URL(request.url).origin;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${baseUrl}/account`
  });

  return NextResponse.json({ url: portalSession.url });
}
