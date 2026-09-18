// Alager Site — Sanity webhook: revalida o conteúdo em cache quando algo muda no CMS.
// next-sanity (defineLive) cacheia as queries com `revalidate: false` (indefinidamente)
// e depende de revalidação on-demand. Aponte um webhook do Sanity para cá
// (ex.: https://www.alager.org.br/api/sanity/webhook) para publicações refletirem
// no site sem precisar de redeploy.
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody(
    req,
    process.env.SANITY_REVALIDATE_SECRET
  );

  if (isValidSignature === false) {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const type = body?._type as string | undefined;
    if (type) {
      // next-sanity marca cada query em cache com `sanity:<_type>`
      // (Next 16 exige o 2º argumento "max" p/ expiração imediata)
      revalidateTag(`sanity:${type}`, "max");
    }
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, type: type ?? null });
  } catch (err) {
    return new Response(
      `Revalidation failed: ${err instanceof Error ? err.message : String(err)}`,
      { status: 500 }
    );
  }
}
