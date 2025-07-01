import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
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
        prompt,
        max_tokens: 100,
      }),
    });

    const data = await res.json();

    if (data.choices && data.choices.length > 0) {
      return NextResponse.json({ text: data.choices[0].text.trim() });
    } else {
      return NextResponse.json({ error: "AI response error" }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
