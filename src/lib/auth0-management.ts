let cachedToken: { value: string; expiresAt: number } | null = null;

async function getManagementToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const domain = process.env.DEVDISPATCH_M2M_DOMAIN;
  const res = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.DEVDISPATCH_M2M_CLIENT_ID,
      client_secret: process.env.DEVDISPATCH_M2M_CLIENT_SECRET,
      audience: `https://${domain}/api/v2/`,
      grant_type: "client_credentials"
    })
  });

  if (!res.ok) {
    throw new Error(`Failed to get Auth0 Management API token: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.value;
}

export type SubscriptionStatus = "active" | "inactive" | "canceled" | "past_due";

export interface DevDispatchAppMetadata {
  stripe_customer_id?: string;
  subscription_status?: SubscriptionStatus;
}

export async function updateUserSubscriptionMetadata(
  auth0UserId: string,
  metadata: DevDispatchAppMetadata
) {
  const domain = process.env.DEVDISPATCH_M2M_DOMAIN;
  const token = await getManagementToken();

  const res = await fetch(`https://${domain}/api/v2/users/${encodeURIComponent(auth0UserId)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ app_metadata: metadata })
  });

  if (!res.ok) {
    throw new Error(`Failed to update Auth0 user metadata: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export async function getUser(auth0UserId: string) {
  const domain = process.env.DEVDISPATCH_M2M_DOMAIN;
  const token = await getManagementToken();

  const res = await fetch(`https://${domain}/api/v2/users/${encodeURIComponent(auth0UserId)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Auth0 user: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export async function findUserByStripeCustomerId(stripeCustomerId: string) {
  const domain = process.env.DEVDISPATCH_M2M_DOMAIN;
  const token = await getManagementToken();

  const query = encodeURIComponent(`app_metadata.stripe_customer_id:"${stripeCustomerId}"`);
  const res = await fetch(`https://${domain}/api/v2/users?q=${query}&search_engine=v3`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to look up Auth0 user by Stripe customer id: ${res.status} ${await res.text()}`);
  }

  const users = await res.json();
  return users[0] ?? null;
}
