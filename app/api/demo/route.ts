import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        output:
          "OpenAI API key is missing. Add OPENAI_API_KEY to .env.local and restart the dev server.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the AI Systems Assistant for a professional corporate AI Systems Lab website. Answer questions about AI tools, AI systems, automation, CRM workflows, customer response systems, business use cases, implementation strategy, risks, and limitations. Keep answers clear, professional, and practical.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        output:
          data.error?.message ||
          "OpenAI returned an error, but no error message was provided.",
      });
    }

    const output =
      data.choices?.[0]?.message?.content ||
      "The assistant received the request but did not generate a response.";

    return NextResponse.json({ output });
  } catch {
    return NextResponse.json({
      output:
        "Server error. Check app/api/demo/route.ts and make sure the dev server restarted.",
    });
  }
}