"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { error: false });

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none focus:border-accent"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          That password isn&apos;t right.
        </p>
      )}
      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "Checking…" : "Enter"}
      </Button>
    </form>
  );
}
