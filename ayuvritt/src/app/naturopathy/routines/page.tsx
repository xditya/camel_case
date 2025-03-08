"use client";

import { BackButton } from "@/components/back-button";
import { Leaf1, Leaf2 } from "@/components/leaves";
import Image from "next/image";

interface TimeBlock {
  time: string;
  title: string;
  description: string;
}

interface RoutineSection {
  title: string;
  timeRange: string;
  activities: TimeBlock[];
}

const routineData: RoutineSection[] = [
  {
    title: "Morning Routine",
    timeRange: "5:00 AM - 9:00 AM",
    activities: [
      {
        time: "5:00 AM",
        title: "Wake Up & Hydrate",
        description:
          "Start the day by drinking a glass of warm water with lemon or a pinch of Himalayan salt to detoxify and kickstart digestion.",
      },
      {
        time: "5:15 AM",
        title: "Nasal Cleansing (Jala Neti)",
        description:
          "Use a neti pot with lukewarm saline water to cleanse the nasal passages. This helps improve breathing, reduce allergies, and clear the mind.",
      },
      {
        time: "5:30 AM",
        title: "Hip Bath (Sitz Bath)",
        description:
          "Sit in a hip bath with cold or warm water (depending on your body's needs) for 15-20 minutes. This improves circulation, relieves pelvic tension, and aids in detoxification.",
      },
      {
        time: "5:50 AM",
        title: "Spinal Bath",
        description:
          "Lie down in a shallow tub with cold water covering your spine for 10-15 minutes. This stimulates the nervous system, reduces stress, and energizes the body.",
      },
      {
        time: "6:10 AM",
        title: "Ear Cleaning & Throat Gargle",
        description:
          "Clean your ears gently with a cotton swab or warm oil. Follow this with a throat gargle using warm saline water or herbal infusions (like neem or tulsi) to cleanse the throat and prevent infections.",
      },
      {
        time: "6:30 AM",
        title: "Yoga & Pranayama",
        description:
          "Practice Surya Namaskar (Sun Salutation) for 10-15 minutes, followed by asanas like Bhujangasana (Cobra Pose), Paschimottanasana (Seated Forward Bend), and Vrikshasana (Tree Pose). End with Pranayama (Breathing Exercises) such as Anulom Vilom (Alternate Nostril Breathing) and Kapalbhati (Skull-Shining Breath) for 10 minutes to energize the body and calm the mind.",
      },
      {
        time: "7:30 AM",
        title: "Natural Energy Juice",
        description:
          "Drink a fresh juice made of seasonal fruits or vegetables (e.g., carrot, beetroot, amla, or orange) to boost energy and immunity.",
      },
      {
        time: "8:00 AM",
        title: "Mud Bath or Sun Bath",
        description:
          "Spend 20-30 minutes in a mud bath (if available) to detoxify the skin and relax the body. Alternatively, take a sun bath to absorb natural Vitamin D and improve mood.",
      },
      {
        time: "8:30 AM",
        title: "Light Breakfast",
        description:
          "Have a light, nutritious breakfast such as soaked nuts, seeds, fruits, or a bowl of oatmeal. Keep portions controlled and avoid processed foods.",
      },
    ],
  },
  {
    title: "Midday Routine",
    timeRange: "9:00 AM - 12:00 PM",
    activities: [
      {
        time: "9:00 AM",
        title: "Work or Activity",
        description:
          "Engage in productive work or activities while maintaining good posture and taking short breaks to stretch.",
      },
      {
        time: "12:00 PM",
        title: "Lunch",
        description:
          "Have a balanced, plant-based lunch with whole grains, lentils, vegetables, and a small portion of salad. Avoid overeating and chew your food slowly for better digestion.",
      },
    ],
  },
  {
    title: "Afternoon Routine",
    timeRange: "12:00 PM - 4:00 PM",
    activities: [
      {
        time: "12:30 PM",
        title: "Relaxation or Walk",
        description:
          "Take a short walk in nature or practice mindful breathing for 10-15 minutes to aid digestion and reduce stress.",
      },
      {
        time: "2:00 PM",
        title: "Herbal Tea",
        description:
          "Sip on a cup of herbal tea (e.g., ginger, tulsi, or chamomile) to refresh and detoxify the body.",
      },
      {
        time: "3:00 PM",
        title: "Ear Cleaning or Steam with Natural Leaves",
        description:
          "If needed, clean your ears gently or take a steam inhalation with natural leaves like eucalyptus or tulsi to clear the respiratory system.",
      },
    ],
  },
  {
    title: "Evening Routine",
    timeRange: "4:00 PM - 7:00 PM",
    activities: [
      {
        time: "4:00 PM",
        title: "Evening Yoga",
        description:
          "Practice gentle yoga asanas like Balasana (Child's Pose), Viparita Karani (Legs-Up-The-Wall Pose), and Savasana (Corpse Pose) to relax the body and mind.",
      },
      {
        time: "5:00 PM",
        title: "Juice or Snack",
        description:
          "Have a fresh juice or a light snack like roasted makhana (fox nuts) or a handful of nuts.",
      },
      {
        time: "6:00 PM",
        title: "Mud Bath or Sun Bath (Optional)",
        description:
          "Repeat the mud bath or sun bath if needed, or simply spend time outdoors in nature.",
      },
    ],
  },
  {
    title: "Night Routine",
    timeRange: "7:00 PM - 10:00 PM",
    activities: [
      {
        time: "7:00 PM",
        title: "Dinner",
        description:
          "Have a light, early dinner consisting of steamed vegetables, soups, or khichdi. Avoid heavy, fried, or processed foods.",
      },
      {
        time: "8:00 PM",
        title: "Steam with Natural Leaves",
        description:
          "Take a steam inhalation with natural leaves like eucalyptus or mint to relax and clear the respiratory system.",
      },
      {
        time: "8:30 PM",
        title: "Relaxation or Meditation",
        description:
          "Practice Yoga Nidra (Yogic Sleep) or Guided Meditation for 20-30 minutes to calm the mind and prepare for sleep.",
      },
      {
        time: "9:00 PM",
        title: "Self-Care",
        description:
          "Clean your face and body with natural cleansers, and massage your feet with warm oil (e.g., sesame or coconut) to promote relaxation.",
      },
      {
        time: "9:30 PM",
        title: "Gratitude Journaling",
        description:
          "Write down 3 things you are grateful for to end the day on a positive note.",
      },
      {
        time: "10:00 PM",
        title: "Sleep",
        description:
          "Go to bed early and aim for 7-8 hours of restful sleep. Maintain a calm environment and avoid screens before bedtime.",
      },
    ],
  },
];

function TimelineItem({ activity }: { activity: TimeBlock }) {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 h-full w-px bg-emerald-200">
        <div className="absolute left-0 top-1 -translate-x-1/2 h-2 w-2 rounded-full bg-emerald-500" />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
        <div className="text-sm text-emerald-600 font-medium mb-2">
          {activity.time}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600">{activity.description}</p>
      </div>
    </div>
  );
}

function RoutineSection({ section }: { section: RoutineSection }) {
  return (
    <div className="mb-12">
      <div className="sticky top-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 mb-6 z-10">
        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
        <p className="text-emerald-600">{section.timeRange}</p>
      </div>
      <div className="space-y-2">
        {section.activities.map((activity, index) => (
          <TimelineItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default function Naturopathy() {
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
            <BackButton href="/naturopathy" />
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
            Daily Naturopathy Routine
          </h1>
          <p className="text-lg text-gray-600">
            A holistic approach to natural healing and wellness
          </p>
        </div>

        <div className="space-y-8">
          {routineData.map((section, index) => (
            <RoutineSection key={index} section={section} />
          ))}
        </div>

        {/* Key Notes Section */}
        <div className="mt-12 bg-emerald-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Notes</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Hydration:</strong> Drink plenty of water throughout the
                day, but avoid drinking large amounts during meals.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Food Portions:</strong> Keep meals light and avoid
                overeating. Focus on fresh, seasonal, and natural foods.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Mindfulness:</strong> Practice mindfulness during meals,
                yoga, and daily activities to stay present and reduce stress.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Consistency:</strong> Follow this routine consistently
                to experience the full benefits of naturopathy.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
