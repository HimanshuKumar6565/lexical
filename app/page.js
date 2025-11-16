"use client";

import { useState } from "react";

export default function Home() {
  const [originalText, setOriginalText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSimplify = async () => {
    if (!originalText.trim()) {
      alert("Please enter some text to simplify");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: originalText }),
      });

      const data = await response.json();

      if (response.ok) {
        setSimplifiedText(data.simplifiedText);
      } else {
        alert(data.error || "Failed to simplify text");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while simplifying the text");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setOriginalText("");
    setSimplifiedText("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-2xl">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">
          Lexical text Simplification
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Original
            </label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Enter text to simplify..."
              className="w-full h-32 sm:h-40 p-3 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:border-gray-400 dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSimplify}
              disabled={loading || !originalText.trim()}
              className="w-full sm:w-auto px-4 py-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 dark:bg-white dark:hover:bg-gray-200 dark:disabled:bg-gray-700 text-white dark:text-black text-sm disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Simplify"}
            </button>
            <button
              onClick={handleClear}
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
            >
              Clear
            </button>
          </div>

          {simplifiedText && (
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Simplified
              </label>
              <div className="w-full min-h-32 sm:min-h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {simplifiedText}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
