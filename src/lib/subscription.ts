import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getUser } from "@/lib/auth0-management";

export async function requireActiveSubscription() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/jobs");
  }

  const user = await getUser(session.user.sub);
  if (user.app_metadata?.subscription_status !== "active") {
    redirect("/signup?step=2");
  }

  return session;
}
