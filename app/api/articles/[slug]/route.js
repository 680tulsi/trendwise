import { NextResponse } from "next/server";

const articles = [
  {
    slug: "ai-changing-world",
    title: "AI is Changing the World",
    content: "Explore how AI is transforming industries...",
    media: ["https://via.placeholder.com/600x300"],
  },
  {
    slug: "google-trends-2025",
    title: "Latest Google Trends 2025",
    content: "Catch up with the hottest searches...",
    media: ["https://via.placeholder.com/600x300"],
  },
];

export async function GET(req, { params }) {
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
