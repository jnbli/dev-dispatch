import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getUser } from "@/lib/auth0-management";
import { ManageBillingButton } from "@/components/ManageBillingButton";

export default async function AccountPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login?returnTo=/account");
  }

  const user = await getUser(session.user.sub);
  const subscriptionStatus = user.app_metadata?.subscription_status ?? "inactive";

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <section className="rounded-xl border border-black/10 dark:border-white/10 p-6">
        <h2 className="font-semibold underline mb-6">Request a new company</h2>
        <form className="grid sm:grid-cols-3 gap-3">
          <input
            disabled
            placeholder="Company Name"
            className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
          />
          <input
            disabled
            placeholder="Careers URL"
            className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
          />
          <input
            disabled
            placeholder="Example Listing"
            className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-transparent"
          />
        </form>
        <p className="mt-3 text-xs text-neutral-500">
          Company requests aren&apos;t wired up yet — this ships with the job board backend.
        </p>

        <h2 className="font-semibold underline mt-8 mb-3">Past requests</h2>
        <p className="text-sm text-neutral-500">No requests yet.</p>
      </section>

      <section className="rounded-xl border border-black/10 dark:border-white/10 p-6">
        <h2 className="font-semibold underline mb-4">Subscription &amp; Billing</h2>
        <p className="mb-4">
          Status:{" "}
          <span
            className={
              subscriptionStatus === "active"
                ? "text-green-600 font-semibold"
                : "text-neutral-500 font-semibold"
            }
          >
            {subscriptionStatus}
          </span>
        </p>
        {subscriptionStatus === "active" ? (
          <ManageBillingButton />
        ) : (
          <a
            href="/signup?step=2"
            className="inline-block rounded-md bg-black border border-amber-500 px-6 py-2 font-semibold text-amber-400 hover:bg-neutral-800"
          >
            Subscribe →
          </a>
        )}
      </section>
    </main>
  );
}
