import connectDB from "@/lib/mongodb";
import { Article } from "@/models/Article";

export async function GET() {
  await connectDB();

  const articles = await Article.find().select("slug").lean();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const urls = articles.map((a) => `
    <url>
      <loc>${baseUrl}/article/${a.slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `).join("");

  const xml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
