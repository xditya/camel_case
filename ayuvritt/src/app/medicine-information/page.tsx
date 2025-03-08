"use client";

import { useState } from "react";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";
import Image from "next/image";

export default function MedicineInformation() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/medicineSearch?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSearchResult("");
      } else {
        setSearchResult(data.description);
      }
    } catch (err) {
      setError("Failed to fetch medicine information. Please try again." + err);
      setSearchResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative Leaves - Left */}
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none">
        <div className="absolute top-20 -left-4 transform -rotate-15 text-green-600 opacity-20 w-32 h-48">
          <Leaf1 />
        </div>
      </div>

      {/* Decorative Leaves - Right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none">
        <div className="absolute top-24 -right-4 transform rotate-15 text-green-600 opacity-20 w-32 h-48">
          <Leaf2 />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Image
              src="/name.png"
              alt="AyuVritt"
              width={200}
              height={80}
              style={{ height: "auto" }}
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medicine Information
          </h1>
          <p className="text-gray-600 text-lg">
            Search for detailed information about Ayurvedic medicines
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 ">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter medicine name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {searchResult && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Results
              </h2>
              <div className="text-gray-700 whitespace-pre-wrap">
                {searchResult}
              </div>
            </div>
          </div>
        )}

        {/* Floating Leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 text-green-600 opacity-10 w-8 h-8">
            <SmallLeaf />
          </div>
        </div>
      </main>
    </div>
  );
}
