import { NextResponse } from "next/server";

export async function POST(req) {
  const { topic } = await req.json();

  const content = `
    <h1>${topic} - AI Generated Content</h1>
    <p>This is dummy AI-generated content for the topic: ${topic}.</p>
  `;

  return NextResponse.json({ content });
}
