// app/dashboard/upload/page.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      return alert("All fields are required");
    }

    setLoading(true);

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        excerpt,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        content,
        media: media ? [media] : [],
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Article uploaded successfully!");
      router.push("/dashboard");
    } else {
      alert("Error uploading article.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto py-10 px-4 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-4">✍️ Upload New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Excerpt"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />

          <textarea
            placeholder="Full Content"
            className="w-full h-32 p-3 rounded bg-gray-900 border border-gray-700 text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="text"
            placeholder="Media Image URL (Optional)"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
          >
            {loading ? "Uploading..." : "Upload Article"}
          </button>
        </form>
      </main>
    </div>
  );
}
