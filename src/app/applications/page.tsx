import { requireActiveSubscription } from "@/lib/subscription";

export default async function ApplicationsPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <p className="text-neutral-500">You haven&apos;t applied to any jobs yet.</p>
    </main>
  );
}
