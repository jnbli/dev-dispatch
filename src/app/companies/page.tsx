import { requireActiveSubscription } from "@/lib/subscription";

export default async function CompaniesPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      <p className="text-neutral-500">
        The companies directory ships with the Anvil Scout backend. Auth + billing are wired up —
        this page is gated behind an active subscription.
      </p>
    </main>
  );
}
