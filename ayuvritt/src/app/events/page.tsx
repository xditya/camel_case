"use client";

import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "yoga" | "meditation" | "ayurveda" | "workshop";
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
}

// Sample events data - replace with your actual data source
const events: Event[] = [
  {
    id: "1",
    title: "Morning Yoga Session",
    date: "2024-03-25",
    time: "07:00 AM - 08:30 AM",
    location: "Zen Garden Studio",
    description:
      "Start your day with energizing yoga poses and breathing exercises.",
    category: "yoga",
    instructor: "Sarah Wilson",
    maxParticipants: 20,
    currentParticipants: 12,
  },
  {
    id: "2",
    title: "Meditation Workshop",
    date: "2024-03-26",
    time: "06:00 PM - 07:30 PM",
    location: "Peace Center",
    description: "Learn fundamental meditation techniques for stress relief.",
    category: "meditation",
    instructor: "David Chen",
    maxParticipants: 15,
    currentParticipants: 8,
  },
  // Add more events as needed
];

function EventCard({ event }: { event: Event }) {
  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = spotsLeft <= 3;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {event.title}
            </h3>
            <p className="text-emerald-600 font-medium mb-2">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.category === "yoga"
                ? "bg-blue-100 text-blue-800"
                : event.category === "meditation"
                ? "bg-purple-100 text-purple-800"
                : event.category === "ayurveda"
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Time:</span> {event.time}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {event.location}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Instructor:</span> {event.instructor}
          </p>
          <p className="text-gray-700 mt-3">{event.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">
            <span
              className={`font-medium ${
                isAlmostFull ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {spotsLeft} spots left
            </span>
            <span className="text-gray-500">
              {" "}
              ({event.currentParticipants}/{event.maxParticipants})
            </span>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
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
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600">
            Join our yoga, meditation, and wellness events
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Floating Leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 text-green-600 opacity-10 w-8 h-8">
            <SmallLeaf />
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-green-600 opacity-10 w-8 h-8">
            <SmallLeaf />
          </div>
        </div>
      </main>
    </div>
  );
}
