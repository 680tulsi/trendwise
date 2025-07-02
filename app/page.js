"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import AIChatBox from "@/components/AIChatBox";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/articles`, { cache: "no-store" });
      const data = await res.json();
      setArticles(data);
    };
    fetchData();

    if ("Notification" in window) {
      setTimeout(() => {
        if (Notification.permission === "default") {
          Notification.requestPermission().then((permission) => {
            console.log("Notification Permission: ", permission);
            if (permission === "granted") {
              new Notification("🎉 TrendWise Notifications Enabled!");
            }
          });
        }
      }, 1500);
    }
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16 px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <h1 className="text-5xl font-extrabold">Welcome to TrendWise</h1>
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </div>

        <p className="text-lg max-w-2xl mx-auto">
          Discover AI-generated articles on trending tech, innovation & beyond. Stay ahead with fresh insights daily!
        </p>
      </section>

      <main className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        
       
        <div className="max-w-md mx-auto my-6">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h2 className="text-4xl font-bold text-center mb-8">
           Latest AI Generated Articles
        </h2>

        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-400">No articles found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}

      </main>

    
      <div className="fixed bottom-6 right-6 z-50">
        <AIChatBox />
      </div>

   
      <footer className="mt-12 py-6 bg-gray-900 text-center text-gray-500">
        © 2025 TrendWise | Built with 💡 AI-Powered Content
      </footer>
    </div>
  );
}
