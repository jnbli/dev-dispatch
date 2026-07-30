import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { getUser } from "@/lib/auth0-management";
import { PurchaseButton } from "@/components/PurchaseButton";

const STEPS = ["Create an account", "Select a plan", "Start using Dev Dispatch!"];

function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {STEPS.map((label, i) => {
        const stepNumber = i + 1;
        const active = stepNumber === current;
        const done = stepNumber < current;
        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${
                  active || done ? "bg-blue-600" : "bg-neutral-400"
                }`}
              >
                {stepNumber}
              </div>
              <span className={`text-xs whitespace-nowrap ${active ? "font-bold" : "text-neutral-500"}`}>
                {label}
              </span>
            </div>
            {stepNumber < STEPS.length && <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-6" />}
          </div>
        );
      })}
    </div>
  );
}

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step: stepParam } = await searchParams;
  const session = await auth0.getSession();

  let step = Number(stepParam ?? "1");
  if (!session) step = 1;
  if (session && step < 2) step = 2;

  let subscriptionActive = false;
  if (session) {
    const user = await getUser(session.user.sub);
    subscriptionActive = user.app_metadata?.subscription_status === "active";
  }
  if (subscriptionActive) step = 3;

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <StepProgress current={step} />

      <div className="rounded-xl border-2 border-blue-500 p-8">
        <h1 className="text-center text-2xl font-extrabold mb-8">
          <span className="text-neutral-700 dark:text-neutral-300">Dev</span>
          <span className="text-blue-600">Dispatch</span>
        </h1>

        {step === 1 && (
          <div className="text-center">
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Create your account to get started — you&apos;ll pick a plan next.
            </p>
            <a
              href={`/auth/login?screen_hint=signup&returnTo=${encodeURIComponent("/signup?step=2")}`}
              className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              SIGN UP
            </a>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-6 text-center text-neutral-600 dark:text-neutral-400">
              One plan, everything included.
            </p>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 mb-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-semibold">Monthly</span>
                <span>
                  <span className="line-through text-neutral-400 mr-2">$19</span>
                  <span className="text-xl font-bold">$10</span> / month
                </span>
              </div>
              <PurchaseButton />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              You&apos;re all set. Your subscription is active.
            </p>
            <Link
              href="/jobs"
              className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start using Dev Dispatch →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
