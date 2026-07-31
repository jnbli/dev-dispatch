import { requireActiveSubscription } from "@/lib/subscription";
import { JOBS, formatPostedAgo } from "@/lib/seed-data";

export default async function JobsPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-1">Jobs</h1>
      <p className="text-neutral-500 mb-8">Fresh roles from top companies, sorted by newest.</p>

      <div className="space-y-3">
        {JOBS.map((job) => (
          <div
            key={job.id}
            className="rounded-lg border border-black/10 dark:border-white/10 p-5 flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{job.title}</h2>
                {job.postedMinutesAgo < 15 && (
                  <span className="text-xs font-semibold text-amber-500 border border-amber-500 rounded-full px-2 py-0.5">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                {job.company} · {job.location} · {formatPostedAgo(job.postedMinutesAgo)}
              </p>
              <div className="flex gap-2 mt-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-neutral-500 border border-black/10 dark:border-white/10 rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="shrink-0 rounded-md bg-black border border-amber-500 px-4 py-2 text-sm font-semibold text-amber-400">
              Apply →
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
