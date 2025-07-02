import connectDB  from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const articles = await Article.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(articles);
}


export async function POST(req) {
  await connectDB();
  const { title, excerpt, slug, content, media } = await req.json();

  if (!title || !excerpt || !slug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await Article.create({ title, excerpt, slug, content, media });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
  }
}
