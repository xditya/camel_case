"use client";

import { useState } from "react";
import Image from "next/image";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";

export default function Start() {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    issues: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative Leaves - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none">
        <div className="absolute top-20 -left-4 transform -rotate-15 text-green-600 opacity-20 w-32 h-48">
          <Leaf1 />
        </div>
        <div className="absolute top-1/3 -left-8 transform rotate-45 text-green-600 opacity-20 w-40 h-52">
          <Leaf2 />
        </div>
      </div>

      {/* Decorative Leaves - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none">
        <div className="absolute top-24 -right-4 transform rotate-15 text-green-600 opacity-20 w-32 h-48">
          <Leaf2 />
        </div>
        <div className="absolute top-1/2 -right-10 transform -rotate-45 text-green-600 opacity-20 w-40 h-56">
          <Leaf1 />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-16 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/name.png"
            alt="AyuVritt"
            width={200}
            height={200}
            onClick={() => (window.location.href = "/")}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Tell Us About Yourself
            </h1>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="issues"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Describe Your Health Concerns
                </label>
                <textarea
                  id="issues"
                  value={formData.issues}
                  onChange={(e) =>
                    setFormData({ ...formData, issues: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Analyze
            </button>
          </div>
        </form>

        {/* Result Popup */}
        {showResult && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-lg w-full relative">
              {/* Decorative leaf in corner */}
              <div className="absolute -top-4 -right-4 text-green-600 opacity-10 w-20 h-20 pointer-events-none">
                <SmallLeaf />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Analysis Results
                  </h2>
                  <button
                    onClick={() => setShowResult(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Patient Information</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Name
                        </p>
                        <p className="text-gray-900">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Age</p>
                        <p className="text-gray-900">{formData.age}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Location
                        </p>
                        <p className="text-gray-900">{formData.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Health Concerns</p>
                    <p className="text-gray-900 mt-1">{formData.issues}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Recommended Approach
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 mt-2">
                      <p className="text-gray-800">
                        Based on your symptoms, we recommend a combination of
                        traditional Ayurvedic herbs and modern therapeutic
                        approaches. Our analysis suggests focusing on balancing
                        your{" "}
                        <span className="text-green-700 font-medium">
                          Vata-Pitta
                        </span>{" "}
                        dosha.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowResult(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
