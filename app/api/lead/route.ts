// app/api/lead/route.ts
import { NextResponse } from "next/server";

type LeadPayload = {
  mode?: string;
  name?: string;
  contact?: string;
  comment?: string;
  question?: string;
  page?: string;
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseChatIds(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = parseChatIds(process.env.TELEGRAM_CHAT_IDS);

    if (!token || chatIds.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_IDS" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as LeadPayload;

    const name = (body.name || "").trim();
    const contact = (body.contact || "").trim();
    const mode = (body.mode || "beta").trim();

    if (!name || !contact) {
      return NextResponse.json(
        { ok: false, error: "Name and contact are required" },
        { status: 400 }
      );
    }

    const lines: string[] = [];
    // lines.push("🧺 <b>Новая заявка</b>");
    lines.push(`<b>Тип:</b> ${escapeHtml(mode)}`);
    lines.push(`<b>Имя:</b> ${escapeHtml(name)}`);
    lines.push(`<b>Контакт:</b> ${escapeHtml(contact)}`);

    if (body.comment?.trim()) {
      lines.push(`<b>Комментарий:</b>\n${escapeHtml(body.comment.trim())}`);
    }
    if (body.question?.trim()) {
      lines.push(`<b>Вопрос:</b>\n${escapeHtml(body.question.trim())}`);
    }
    // if (body.page?.trim()) {
    //   lines.push(`<b>Страница:</b> ${escapeHtml(body.page.trim())}`);
    // }

    const text = lines.join("\n\n");
    
    const results = await Promise.allSettled(
      chatIds.map(async (chat_id) => {
        const resp = await fetch(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id,
              text,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          }
        );

        if (!resp.ok) {
          const details = await resp.text();
          throw new Error(`chat_id=${chat_id} failed: ${details}`);
        }

        return true;
      })
    );

    const failed = results
      .map((r, i) => ({ r, chat_id: chatIds[i] }))
      .filter((x) => x.r.status === "rejected")
      .map((x) => ({
        chat_id: x.chat_id,
        error:
          x.r.status === "rejected"
            ? String(x.r.reason?.message ?? x.r.reason)
            : "",
      }));

    return NextResponse.json({
      ok: true,
      sent: chatIds.length - failed.length,
      failed,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
