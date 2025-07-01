import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/comment";



export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const comments = await Comment.find({ slug }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(comments);
}

export async function POST(req) {
  await connectDB();

  const { slug, name, comment } = await req.json();

  if (!slug || !name || !comment) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newComment = await Comment.create({ slug, name, comment });
  return NextResponse.json(newComment);
}
