// Alager Site — Newsletter subscribe route
// POST /api/newsletter  body: { email }
// Forwards to Hostinger Reach (email marketing). Token stays server-side.

const HOSTINGER_CONTACTS_URL =
  "https://developers.hostinger.com/api/reach/v1/contacts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const token = process.env.HOSTINGER_API_TOKEN;
  if (!token) {
    return Response.json(
      { error: "Newsletter is not configured (HOSTINGER_API_TOKEN missing)." },
      { status: 500 },
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const tagUuid = process.env.HOSTINGER_TAG_UUID;
  const payload: { email: string; tag_uuids?: string[] } = { email };
  if (tagUuid) {
    payload.tag_uuids = [tagUuid];
  }

  try {
    const upstream = await fetch(HOSTINGER_CONTACTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (upstream.ok) {
      return Response.json({ ok: true });
    }

    // 401 → invalid/missing token (our config); 422 → payload rejected (e.g. duplicate).
    const status = upstream.status === 401 ? 502 : 400;
    return Response.json(
      { error: `Hostinger Reach rejected the request (${upstream.status}).` },
      { status },
    );
  } catch {
    return Response.json(
      { error: "Failed to reach Hostinger Reach." },
      { status: 502 },
    );
  }
}
