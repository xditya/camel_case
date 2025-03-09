"use client";

import { useRouter } from "next/navigation";
import { Leaf1, Leaf2, Leaf3, SmallLeaf } from "@/components/leaves";
import { JSX } from "react";
import Image from "next/image";
import {
  PlantIcon,
  PrescriptionIcon,
  SkincareIcon,
} from "@/components/naturopathy-icons";

interface FeatureCard {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
}

export default function GetStarted() {
  const router = useRouter();

  const features: FeatureCard[] = [
    {
      title: "Symptom Analysis",
      description:
        "Get personalized Ayurvedic medicine recommendations based on your symptoms",
      link: "/medicine-recommendations",
      icon: (
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
      ),
    },
    {
      title: "Medicine Information",
      description: "Learn about different Ayurvedic medicines and their uses",
      link: "/medicine-information",
      icon: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Yoga Therapies",
      description:
        "Explore traditional yoga poses and their therapeutic benefits",
      link: "/yoga-therapies",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4" r="2" />
          <line x1="12" y1="6" x2="12" y2="14" />
          <path d="M12 8 L8 12" />
          <path d="M12 8 L16 12" />
          <line x1="12" y1="14" x2="12" y2="20" />
          <path d="M10 20h4" />
          <path d="M12 14 L9 14 Q8 14 8 15 L8 16" />
        </svg>
      ),
    },
    {
      title: "Meditation",
      description: "Controlling your mind through meditation",
      link: "/meditation",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a2 2 0 100 4 2 2 0 000-4z" />
          <path d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75" />
          <path d="M9.42864 15.0036L8.5715 16.8486C8.5715 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42864 21 6.42864 21H8.50007L10.7501 19.75L13.5001 18" />
          <path d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261" />
        </svg>
      ),
    },
    {
      title: "Events",
      description: "Take part in mindfulness",
      link: "/events",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 8h18" />
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <circle cx="8" cy="14" r="1" />
          <circle cx="16" cy="14" r="1" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      ),
    },
    {
      title: "Naturopathy",
      description: "Purity the inner self",
      link: "/naturopathy",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22V12" />
          <path d="M12 12c0-4 3-6 6-6-1 4-3 6-6 6z" />
          <path d="M12 12c0-4-3-6-6-6 1 4 3 6 6 6z" />
          <path d="M12 8c0-3 2-5 5-5-.5 3-2 5-5 5z" />
          <path d="M12 8c0-3-2-5-5-5 .5 3 2 5 5 5z" />
          <path d="M12 22c1-2 4-3 6-2" />
          <path d="M12 22c-1-2-4-3-6-2" />
        </svg>
      ),
    },
    {
      title: "Rising Tree",
      description: "Focusing on chakras",
      link: "/rising-tree",
      icon: <PlantIcon className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Prescription Analysis",
      description: "Analysing hand written prescriptions",
      link: "/prescription-analysis",
      icon: <PrescriptionIcon className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Beauty Care",
      description: "Ayurvedic beauty care tips",
      link: "/beauty-care",
      icon: <SkincareIcon className="w-6 h-6 text-emerald-600" />,
    },
  ];

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center mb-16">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Path to <span className="text-green-600">Wellness</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our range of services to begin your journey towards
            holistic health
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => router.push(feature.link)}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

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
    </div>
  );
}
