import { requireActiveSubscription } from "@/lib/subscription";
import { COMPANIES } from "@/lib/seed-data";

export default async function CompaniesPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-1">Companies</h1>
      <p className="text-neutral-500 mb-8">Companies currently in your feed.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {COMPANIES.map((company) => (
          <div
            key={company.name}
            className="rounded-lg border border-black/10 dark:border-white/10 p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{company.name}</h2>
              <span className="text-xs font-semibold text-amber-500 border border-amber-500 rounded-full px-2 py-0.5">
                {company.openRoles} open
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-2">{company.blurb}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
