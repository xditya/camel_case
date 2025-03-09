"use client";

import { BackButton } from "@/components/back-button";
import { Leaf1, Leaf2 } from "@/components/leaves";
import Image from "next/image";
import { useState } from "react";
import { SearchBar } from "@/components/search-bar";

interface MeditationResponse {
  error: null | string;
  issue: string;
  Meditation: string;
  description: string;
  duration: string;
  instruction: string;
}

interface MeditationResult {
  title: string;
  description: string;
  duration: string;
  steps: string[];
  searchedFor: string;
}

export default function MeditationPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<MeditationResult[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/meditationSearch?issue=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data: MeditationResponse = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const formattedResult: MeditationResult = {
        title: data.Meditation,
        description: data.description,
        duration: data.duration,
        steps: data.instruction.split(". ").filter((step) => step.trim()),
        searchedFor: data.issue,
      };

      setSearchResults([formattedResult]);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none">
        <div className="absolute top-20 -left-4 transform -rotate-15 text-green-600 opacity-20 w-32 h-48">
          <Leaf1 />
        </div>
      </div>
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
            Meditation Guide
          </h1>
          <p className="text-lg text-gray-600">
            Search for meditation techniques based on your needs
          </p>
        </div>

        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          loading={loading}
          placeholder="Enter meditation concern..."
        />

        {/* Results Section */}
        {error && <div className="text-red-600 text-center mb-8">{error}</div>}

        {searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <span className="text-sm text-emerald-600 font-medium">
                    Meditation for: {result.searchedFor}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-emerald-800 mb-4">
                  {result.title}
                </h2>

                <p className="text-gray-600 mb-4">{result.description}</p>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Instructions
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        {result.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="pl-2">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Recommended Duration
                      </h3>
                      <p className="text-gray-600">{result.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Remember: Start with what feels comfortable and gradually
                    increase your practice duration.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Initial Info Section */}
        {!searchResults.length && !loading && (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Getting Started with Meditation
            </h2>
            <p className="text-gray-600 mb-4">
              Meditation is a powerful practice that can help reduce stress,
              improve focus, and promote overall well-being. Enter your specific
              concern above to receive personalized meditation recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Benefits</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Reduced stress and anxiety</li>
                  <li>• Improved concentration</li>
                  <li>• Better emotional well-being</li>
                  <li>• Enhanced self-awareness</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Tips</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Start with short sessions</li>
                  <li>• Find a quiet space</li>
                  <li>• Be consistent with practice</li>
                  <li>• Stay comfortable but alert</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
