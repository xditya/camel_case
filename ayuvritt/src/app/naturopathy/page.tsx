"use client";

import { BackButton } from "@/components/back-button";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";
import Image from "next/image";
import Link from "next/link";
import { RoutineIcon, ChecklistIcon } from "@/components/naturopathy-icons";

export default function NaturopathyPage() {
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
            Naturopathy Guide
          </h1>
          <p className="text-lg text-gray-600">
            Explore daily routines and essential supplies for natural healing
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Routines Card */}
          <Link
            href="/naturopathy/routines"
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-8">
              <div className="w-12 h-12 mb-4 text-emerald-600">
                <RoutineIcon />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Daily Routines
              </h2>
              <p className="text-gray-600">
                Discover a structured daily schedule for optimal health and
                well-being through natural practices.
              </p>
              <div className="mt-4 text-emerald-600 group-hover:translate-x-2 transition-transform">
                View Schedule →
              </div>
            </div>
          </Link>

          {/* Supplies Checklist Card */}
          <Link
            href="/naturopathy/bucketlist"
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-8">
              <div className="w-12 h-12 mb-4 text-emerald-600">
                <ChecklistIcon />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Supplies Checklist
              </h2>
              <p className="text-gray-600">
                Get a comprehensive list of essential items needed for your
                naturopathy journey.
              </p>
              <div className="mt-4 text-emerald-600 group-hover:translate-x-2 transition-transform">
                View Checklist →
              </div>
            </div>
          </Link>
        </div>

        {/* Floating Leaf */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 text-green-600 opacity-10 w-8 h-8">
            <SmallLeaf />
          </div>
        </div>
      </main>
    </div>
  );
}
