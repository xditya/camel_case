"use client";

import { useState } from "react";
import { Leaf1, Leaf2 } from "@/components/leaves";
import Image from "next/image";
import { BackButton } from "@/components/back-button";
import { SearchBar } from "@/components/search-bar";

interface YogaResult {
  problem: string;
  asana: string;
  benefits: string;
  technique: string;
  breathing: string;
  Level: string;
}

export default function YogaTherapies() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<YogaResult | null>(null);
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
        }/yogaSearch?problem=${encodeURIComponent(query.trim())}`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSearchResult(null);
      } else {
        setSearchResult(data);
      }
    } catch (err) {
      setError("Failed to fetch yoga information. Please try again. " + err);
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
        <BackButton href="/get-started" />
        {/* Header Section */}
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
            Yoga Therapies
          </h1>
          <p className="text-lg text-gray-600">
            Discover yoga poses and their therapeutic benefits for your specific
            needs
          </p>
        </div>

        {/* Search Section */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
          placeholder="Enter yoga concern..."
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
                Recommended Yoga Practice for &quot;{query.trim()}&quot;
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Condition
                  </h3>
                  <p className="text-black">{searchResult.problem}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Recommended Asana
                  </h3>
                  <p className="text-gray-700">{searchResult.asana}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Benefits
                  </h3>
                  <p className="text-gray-700">{searchResult.benefits}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Technique
                  </h3>
                  <p className="text-gray-700">{searchResult.technique}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Breathing
                  </h3>
                  <p className="text-gray-700">{searchResult.breathing}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Difficulty Level
                  </h3>
                  <p className="text-gray-700">{searchResult.Level}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
