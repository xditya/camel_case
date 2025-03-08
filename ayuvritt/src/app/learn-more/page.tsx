"use client";

import Image from "next/image";
import { Leaf1, Leaf2, Leaf3, SmallLeaf } from "@/components/leaves";

export default function LearnMore() {
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
        <div className="absolute top-2/3 -left-6 transform -rotate-30 text-green-600 opacity-30 w-36 h-48">
          <Leaf3 />
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
        <div className="absolute top-3/4 -right-6 transform rotate-30 text-green-600 opacity-30 w-36 h-48">
          <Leaf3 />
        </div>
      </div>

      {/* Small Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 text-green-600 opacity-10 w-12 h-12">
          <SmallLeaf />
        </div>
        <div className="absolute top-2/3 left-1/4 text-green-600 opacity-10 w-10 h-10">
          <SmallLeaf />
        </div>
        <div className="absolute top-1/3 right-1/4 text-green-600 opacity-10 w-8 h-8">
          <SmallLeaf />
        </div>
        <div className="absolute top-3/4 right-1/3 text-green-600 opacity-10 w-12 h-12">
          <SmallLeaf />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section */}
        <div className="flex justify-center mb-5">
          <Image
            src="/name.png"
            alt="AyuVritt"
            width={250}
            height={250}
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Understanding <span className="text-green-600">AyuVritt</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we&apos;re revolutionizing healthcare by combining
            ancient Ayurvedic wisdom with modern scientific validation.
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm relative overflow-hidden">
            {/* Subtle corner leaf decoration */}
            <div className="absolute -bottom-6 -right-6 text-green-600 opacity-5 w-24 h-24">
              <Leaf1 />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              We aim to bridge the gap between traditional Ayurvedic medicine
              and modern healthcare through advanced AI-driven analysis and
              scientific validation.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-600 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Validate traditional formulations with modern science
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-600 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Enhance the credibility of Ayurvedic medicine
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-600 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Create sustainable healthcare solutions
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm relative overflow-hidden">
            {/* Subtle corner leaf decoration */}
            <div className="absolute -bottom-6 -left-6 text-green-600 opacity-5 w-24 h-24">
              <Leaf2 />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-gray-600 mb-6">
              Using cutting-edge technology and rigorous scientific methods to
              analyze and validate traditional Ayurvedic formulations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-gray-600">
                    Deep learning models analyze ancient texts and modern
                    research
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Scientific Validation
                  </h3>
                  <p className="text-gray-600">
                    Rigorous testing and documentation of effects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-900 text-white rounded-xl p-8 mb-16 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Safety</h3>
                <p className="text-green-100">
                  Comprehensive analysis of potential side effects
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Efficacy</h3>
                <p className="text-green-100">
                  Scientifically validated formulations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-green-100">
                  Bridging traditional wisdom with modern technology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section with Leaf Decoration */}
        <div className="text-center relative">
          =
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in revolutionizing healthcare by combining the best of
              both worlds.
            </p>
            <button
              onClick={() => {
                window.location.href = "/get-started";
              }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
