import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export async function Nav() {
  const session = await auth0.getSession();

  return (
    <header className="border-b border-black/10 bg-neutral-50 dark:bg-neutral-950 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-neutral-700 dark:text-neutral-300">Dev</span>
          <span className="text-blue-600">Dispatch</span>
        </Link>

        {session ? (
          <nav className="flex items-center gap-6 text-sm font-semibold text-blue-600">
            <Link href="/jobs">JOBS</Link>
            <Link href="/companies">COMPANIES</Link>
            <Link href="/applications">APPLICATIONS</Link>
            <Link href="/account">ACCOUNT</Link>
            <a href="/auth/logout" className="underline text-neutral-900 dark:text-neutral-100">
              LOGOUT
            </a>
          </nav>
        ) : (
          <a href="/auth/login" className="text-sm font-semibold text-blue-600 underline">
            LOGIN
          </a>
        )}
      </div>
    </header>
  );
}
