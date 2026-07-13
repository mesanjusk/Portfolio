import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "mahiiway_admin";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

function requireSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add it as an environment variable (any long random string)."
    );
  }
  return secret;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of arr) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(): Promise<string> {
  const key = await getKey(requireSecret());
  const exp = Date.now() + SESSION_DURATION_MS;
  const payload = toBase64Url(encoder.encode(JSON.stringify({ exp })));
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  try {
    const key = await getKey(requireSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!valid) return false;

    const { exp } = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Call at the top of every admin Server Action — defense in depth alongside the middleware. */
export async function requireAdmin() {
  const store = await cookies();
  const valid = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!valid) redirect("/admin/login");
}
