"use client";

import { useState } from "react";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";
import Image from "next/image";
import { BackButton } from "@/components/back-button";
import { SearchBar } from "@/components/search-bar";

interface SearchResult {
  heading: string;
  description: string;
}

export default function MedicineInformation() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
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
        setSearchResult(null);
      } else {
        setSearchResult({
          heading: data.heading,
          description: data.description,
        });
      }
    } catch (err) {
      setError("Failed to fetch medicine information. Please try again." + err);
      setSearchResult(null);
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

      <main className="max-w-4xl mx-auto px-4 py-8 relative">
        <div className="text-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <BackButton href="/get-started" />
          </div>
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
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
          placeholder="Enter medicine name..."
        />

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
                {searchResult.heading}
              </h2>
              <div className="text-gray-700 whitespace-pre-wrap">
                {searchResult.description}
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
