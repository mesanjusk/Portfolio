"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function loginAction(_prevState: { error: boolean }, formData: FormData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it as an environment variable to enable admin login."
    );
  }

  if (password !== expected) {
    return { error: true };
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
