import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-paper-deep/30">
      <header className="flex items-center justify-between border-b border-ink/10 bg-paper px-6 py-4 sm:px-8">
        <Link href="/admin" className="font-display text-lg text-ink">
          Mahii<span className="italic text-accent">Way</span>{" "}
          <span className="text-sm not-italic text-ink-soft">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
          >
            View site ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
