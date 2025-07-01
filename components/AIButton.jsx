"use client";
import { useState } from "react";

export default function AIButton() {
  const [aiContent, setAiContent] = useState("");

  return (
    <div>
      <button
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
        onClick={async () => {
          const topic = prompt("Enter article topic:");
          if (topic) {
            const res = await fetch("/api/generate-content", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ topic }),
            });
            const data = await res.json();
            console.log("Generated Article:", data.content);
            setAiContent(data.content);
          }
        }}
      >
        🤖 AI Generate
      </button>

      {aiContent && (
        <div
          className="mt-4 p-4 border border-purple-500 rounded text-white"
          dangerouslySetInnerHTML={{ __html: aiContent }}
        />
      )}
    </div>
  );
}
