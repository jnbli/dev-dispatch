import Link from "next/link";
import { auth0 } from "@/lib/auth0";

const FEATURES = [
  {
    title: "Get jobs in real-time",
    body: "We pull listings directly from company career pages the moment they're posted, allowing you to apply before they hit traditional job boards."
  },
  {
    title: "Built for software engineers",
    body: "No promoted listings. No recruitment agencies. Just curated remote software engineering jobs from 100+ U.S. companies."
  },
  {
    title: "Save time and apply smarter",
    body: "Curate your feed for only the companies you care about, and request new companies to be added at any time."
  }
];

const PLAN_FEATURES = [
  "View new jobs from 100+ top companies in realtime",
  "Apply to jobs hours before they even hit LinkedIn",
  "Blacklist companies you don't want to see in your feed",
  "Request additional companies to be added",
  "No reposts. No promoted listings. Ever",
  "New companies added every week",
  "24/7 email customer support",
  "Complete access to all future product updates"
];

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            The only <span className="text-amber-500">realtime</span> job board for remote,
            U.S. software engineering roles
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Apply to jobs in realtime before they hit LinkedIn or Indeed.
          </p>
          <Link
            href={session ? "/jobs" : "/signup"}
            className="mt-6 inline-block rounded-md bg-black border border-amber-500 px-6 py-3 font-semibold text-amber-400 hover:bg-neutral-800"
          >
            Get Started →
          </Link>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-10 text-center text-neutral-400">
          job feed preview
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-10">Why Anvil Scout?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-black/10 dark:border-white/10 p-6">
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Pricing</h2>
        <div className="rounded-xl border-2 border-amber-500 p-8">
          <h3 className="font-semibold text-lg">Monthly</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {PLAN_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-amber-500">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <span className="line-through text-neutral-400 mr-2">$19</span>
              <span className="text-2xl font-bold">$10</span>
              <span className="text-neutral-500"> / month</span>
            </div>
            <Link
              href={session ? "/account" : "/signup"}
              className="rounded-md bg-black border border-amber-500 px-5 py-2 font-semibold text-amber-400 hover:bg-neutral-800"
            >
              Purchase →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
