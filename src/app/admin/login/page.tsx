import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main id="main" className="flex min-h-dvh items-center justify-center bg-paper bg-grain px-6">
      <div className="w-full max-w-sm rounded-3xl border border-ink/10 bg-paper p-8 text-center shadow-sm">
        <p className="font-display text-2xl text-ink">
          Mahii<span className="italic text-accent">Way</span>
        </p>
        <p className="mt-2 text-sm text-ink-soft">Admin</p>
        <LoginForm />
      </div>
    </main>
  );
}
