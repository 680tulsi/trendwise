"use client";
import { useState } from "react";

export default function AIChatBox() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input) return alert("Please enter your question");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.text);
    } catch (err) {
      console.error(err);
      alert("Error connecting to AI");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">🤖 Ask TrendWise AI</h2>
      <input
        type="text"
        placeholder="Ask something about latest tech..."
        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="p-4 bg-gray-800 border border-gray-600 rounded mt-4">
          <strong>AI Response:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}
