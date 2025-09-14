// extra part
// src/app/api/ai-answer/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // you can also use gpt-4o or gpt-3.5-turbo
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      aiAnswer: data.choices?.[0]?.message?.content || "No answer generated",
    });
  } catch (error) {
    console.error("AI Answer Error:", error);
    return NextResponse.json({ error: "Failed to generate answer" }, { status: 500 });
  }
}
