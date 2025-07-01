import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();

  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  // Dummy AI Logic (Real AI Integrate karna ho toh OpenAI API yaha use karo)
  const generatedContent = `<h2>${topic}</h2><p>This is AI-generated content for: ${topic}</p>`;

  return NextResponse.json({ content: generatedContent });
}
