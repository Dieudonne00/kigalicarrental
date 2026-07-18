// Signed session tokens for the manager panel, using Web Crypto so the same
// code runs unmodified in both the Edge middleware (proxy.ts) and Node API
// routes. The previous "session token" was base64(managerId:timestamp) with
// no signature - anyone could forge a cookie value and the middleware only
// checked that a manager_session cookie existed at all, not that it was
// valid, so this replaces both the token format and the trust model.

const encoder = new TextEncoder();
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches the cookie maxAge

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of buf) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

export async function createSessionToken(managerId: string): Promise<string> {
  const payload = JSON.stringify({ managerId, exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = toBase64Url(encoder.encode(payload));
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ managerId: string } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  try {
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64) as BufferSource,
      encoder.encode(payloadB64)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    if (typeof payload.managerId !== "string") return null;

    return { managerId: payload.managerId };
  } catch {
    return null;
  }
}
