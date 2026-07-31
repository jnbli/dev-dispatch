import { requireActiveSubscription } from "@/lib/subscription";
import { AUTOFILL_ANSWERS } from "@/lib/autofill-data";

export default async function AutofillPage() {
  await requireActiveSubscription();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-2">Autofill Answers</h1>
      <p className="text-neutral-500 mb-8">
        Prerecorded answers to common application questions, matched by question text so you
        don&apos;t have to retype them for every job.
      </p>

      <div className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Question</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Options</th>
              <th className="px-4 py-3 font-semibold">Answer</th>
            </tr>
          </thead>
          <tbody>
            {AUTOFILL_ANSWERS.map((row, i) => (
              <tr
                key={`${row.question}-${i}`}
                className="border-t border-black/10 dark:border-white/10"
              >
                <td className="px-4 py-3">{row.question}</td>
                <td className="px-4 py-3 text-neutral-500">{row.type}</td>
                <td className="px-4 py-3 text-neutral-500">{row.options.join(", ") || "—"}</td>
                <td className="px-4 py-3 font-medium">{row.answer || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
