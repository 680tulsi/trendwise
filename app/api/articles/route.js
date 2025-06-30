import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";

export async function GET() {
  await connectDB();
  const articles = await Article.find().select("title excerpt slug").lean();
  return NextResponse.json(articles);
}

export async function POST(req) {
  await connectDB();
  const { title, slug, excerpt } = await req.json();

  if (!title || !slug || !excerpt) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // OpenAI API Call for SEO content
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an expert SEO content generator." },
          { role: "user", content: `Write a SEO optimized blog post with headings, meta description, OG tags, media for: ${title}` },
        ],
        temperature: 0.7,
      }),
    });

    const gptData = await gptRes.json();
    
    if (!gptData.choices || gptData.choices.length === 0) {
      return NextResponse.json({ error: "OpenAI API Failed" }, { status: 500 });
    }

    const content = gptData.choices[0].message.content;

    await Article.create({
      title,
      slug,
      excerpt,
      content,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}


