import { requireActiveSubscription } from "@/lib/subscription";

export default async function JobsPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <p className="text-neutral-500">
        The realtime job feed ships with the Dev Dispatch backend. Auth + billing are wired up —
        this page is gated behind an active subscription.
      </p>
    </main>
  );
}
