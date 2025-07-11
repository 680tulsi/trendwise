"use client";
import { useEffect, useState } from "react";

export default function CommentsSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/comment?slug=${slug}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [slug]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!name || !text) return alert("Name and Comment are required");

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        name,
        comment: text,
      }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments(prev => [newComment, ...prev]);
      setName("");
      setText("");
    }
  };

  return (
    <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">💬 Comments</h2>

      {comments.length === 0 && (
        <p className="text-gray-400 mb-4">No comments yet. Be the first to comment!</p>
      )}

      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {comments.map((c) => (
          <div key={c._id} className="p-3 border border-gray-700 rounded hover:border-green-500 transition">
            <p className="font-semibold text-green-400">{c.name}</p>
            <p className="text-gray-300">{c.comment}</p>
            <p className="text-gray-500 text-xs mt-1">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <form onSubmit={postComment} className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-700 bg-gray-900 p-3 rounded text-white"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border border-gray-700 bg-gray-900 p-3 rounded text-white focus:ring-2 focus:ring-green-600 outline-none"
          placeholder="Write your comment..."
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
