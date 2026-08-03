import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendChatDigestEmail } from "@/lib/email";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const url = new URL(request.url);
    if (url.searchParams.get("manual") !== "1") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const unsent = await prisma.chatQuestion.findMany({
      where: { emailedAt: null },
      orderBy: { createdAt: "asc" },
    });

    if (unsent.length === 0) {
      return NextResponse.json({ message: "No new chat questions to send" });
    }

    await sendChatDigestEmail(unsent);

    await prisma.chatQuestion.updateMany({
      where: { id: { in: unsent.map((q) => q.id) } },
      data: { emailedAt: new Date() },
    });

    return NextResponse.json({ message: "Digest sent", count: unsent.length });
  } catch (error) {
    console.error("Chat digest cron error:", error);
    return NextResponse.json({ error: "Failed to send chat digest" }, { status: 500 });
  }
}
