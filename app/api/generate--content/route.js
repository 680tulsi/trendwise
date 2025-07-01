import { NextResponse } from "next/server";

export async function POST(req) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Write a short engaging tech article about: ${topic}`,
        max_tokens: 500,
      }),
    });

    const data = await res.json();

    if (data.choices && data.choices.length > 0) {
      return NextResponse.json({ content: data.choices[0].text.trim() });
    } else {
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
