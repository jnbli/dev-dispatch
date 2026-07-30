import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { stripe, MONTHLY_PRICE_ID } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const baseUrl = process.env.APP_BASE_URL ?? new URL(request.url).origin;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: MONTHLY_PRICE_ID, quantity: 1 }],
    client_reference_id: session.user.sub,
    customer_email: session.user.email ?? undefined,
    success_url: `${baseUrl}/signup?step=3`,
    cancel_url: `${baseUrl}/signup?step=2`,
    metadata: { auth0_user_id: session.user.sub }
  });

  return NextResponse.json({ url: checkoutSession.url });
}
