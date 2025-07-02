export const dynamic = "force-dynamic"; 

import Navbar from "@/components/Navbar";
import Link from "next/link";
import AIButton from "@/components/AIButton";

export default async function Dashboard() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let articles = [];
  
  try {
    const res = await fetch(`${baseURL}/api/articles`, { cache: "no-store" });
    
    if (!res.ok) {
      console.error("Failed to fetch articles. Status:", res.status);
    } else {
      articles = await res.json();
    }
    
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Welcome to TrendWise 👋
        </h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">📰 Latest AI Articles</h2>

          <div className="flex gap-4">
            <Link href="/dashboard/upload" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold">
              ➕ Upload New
            </Link>

            <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold">
              🌐 View Public Site
            </Link>

            <AIButton />
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-gray-400">No articles yet. Start writing!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                href={`/article/${article.slug}`}
                key={article._id}
                className="block bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-400">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
