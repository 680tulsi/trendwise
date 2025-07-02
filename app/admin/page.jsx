"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const isAdmin = true; // Temporary, बाद में Custom Auth लगाना है
    if (!isAdmin) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  const generateArticle = async () => {
    if (!title.trim()) return alert("Enter a topic first!");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      alert("Article generated successfully!");
      setTitle("");
      const updated = await res.json();
      setArticles((prev) => [...prev, updated]);
    } else {
      alert("Failed to generate article.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4">🛠 Admin Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Topic for Article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <button
            onClick={generateArticle}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Generate Article
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Articles List:</h2>
        <div className="space-y-4">
          {articles.map((a) => (
            <div key={a._id || a.slug} className="p-4 border border-gray-700 rounded">
              <h3 className="text-xl font-bold">{a.title}</h3>
              <p className="text-gray-400">{a.excerpt}</p>
              <p className="text-sm text-gray-500">Slug: {a.slug}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
