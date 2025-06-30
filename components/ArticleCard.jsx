"use client";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition">
        {article.title}
      </h2>
      <p className="text-gray-400 mb-4">{article.excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Read More →</span>
        <span className="group-hover:text-green-400">#AI #Tech</span>
      </div>
    </Link>
  );
}
