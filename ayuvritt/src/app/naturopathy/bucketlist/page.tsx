"use client";

import { BackButton } from "@/components/back-button";
import { Leaf1, Leaf2 } from "@/components/leaves";
import Image from "next/image";

interface Item {
  name: string;
  quantity: string;
  priceINR: string;
  priceUSD: string;
  isReusable?: boolean;
  isOptional?: boolean;
  category: string;
}

const items: Item[] = [
  {
    category: "Nasal Cleansing",
    name: "Neti Pot",
    quantity: "1 piece",
    priceINR: "₹200 - ₹300",
    priceUSD: "$2.50 - $4",
    isReusable: true,
  },
  {
    category: "Nasal Cleansing",
    name: "Non-iodized Salt",
    quantity: "1 kg",
    priceINR: "₹20 - ₹30",
    priceUSD: "$0.25 - $0.40",
  },
  {
    category: "Hip Bath & Spinal Bath",
    name: "Epsom Salt",
    quantity: "1 kg",
    priceINR: "₹150 - ₹200",
    priceUSD: "$2 - $3",
    isOptional: true,
  },
  {
    category: "Hip Bath & Spinal Bath",
    name: "Essential Oils",
    quantity: "1 small bottle",
    priceINR: "₹200 - ₹500",
    priceUSD: "$2.50 - $6",
    isOptional: true,
  },
  {
    category: "Ear Cleaning",
    name: "Cotton Swabs",
    quantity: "1 pack (100 pieces)",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Ear Cleaning",
    name: "Warm Oil (Coconut/Sesame)",
    quantity: "100 ml",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Throat Gargle",
    name: "Non-iodized Salt",
    quantity: "1 kg",
    priceINR: "₹20 - ₹30",
    priceUSD: "$0.25 - $0.40",
  },
  {
    category: "Throat Gargle",
    name: "Herbal Infusions (Neem/Tulsi)",
    quantity: "1 pack",
    priceINR: "₹100 - ₹200",
    priceUSD: "$1.20 - $2.50",
  },
  {
    category: "Yoga & Meditation",
    name: "Yoga Mat",
    quantity: "1 piece",
    priceINR: "₹500 - ₹1,000",
    priceUSD: "$6 - $12",
    isReusable: true,
  },
  {
    category: "Yoga & Meditation",
    name: "Meditation Cushion",
    quantity: "1 piece",
    priceINR: "₹300 - ₹600",
    priceUSD: "$4 - $7",
    isOptional: true,
    isReusable: true,
  },
  {
    category: "Natural Energy Juice",
    name: "Fresh Fruits/Vegetables",
    quantity: "Seasonal",
    priceINR: "₹1,500 - ₹2,000",
    priceUSD: "$18 - $24",
  },
  {
    category: "Natural Energy Juice",
    name: "Juicer/Blender",
    quantity: "1 piece",
    priceINR: "₹1,500 - ₹3,000",
    priceUSD: "$18 - $36",
    isReusable: true,
  },
  {
    category: "Mud Bath/Sun Bath",
    name: "Mud Powder",
    quantity: "1 kg",
    priceINR: "₹100 - ₹200",
    priceUSD: "$1.20 - $2.50",
  },
  {
    category: "Mud Bath/Sun Bath",
    name: "Sunscreen (Natural)",
    quantity: "1 bottle",
    priceINR: "₹300 - ₹500",
    priceUSD: "$4 - $6",
  },
  {
    category: "Steam with Natural Leaves",
    name: "Eucalyptus Leaves",
    quantity: "100 grams",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Steam with Natural Leaves",
    name: "Tulsi Leaves",
    quantity: "100 grams",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Steam with Natural Leaves",
    name: "Steam Inhaler",
    quantity: "1 piece",
    priceINR: "₹300 - ₹500",
    priceUSD: "$4 - $6",
    isReusable: true,
  },
  {
    category: "Food & Nutrition",
    name: "Whole Grains",
    quantity: "5 kg",
    priceINR: "₹500 - ₹1,000",
    priceUSD: "$6 - $12",
  },
  {
    category: "Food & Nutrition",
    name: "Lentils/Pulses",
    quantity: "5 kg",
    priceINR: "₹500 - ₹1,000",
    priceUSD: "$6 - $12",
  },
  {
    category: "Food & Nutrition",
    name: "Nuts & Seeds",
    quantity: "1 kg",
    priceINR: "₹500 - ₹1,000",
    priceUSD: "$6 - $12",
  },
  {
    category: "Food & Nutrition",
    name: "Cold-Pressed Oils",
    quantity: "1 liter",
    priceINR: "₹200 - ₹400",
    priceUSD: "$2.50 - $5",
  },
  {
    category: "Herbal Teas",
    name: "Herbal Tea Bags",
    quantity: "30 pieces",
    priceINR: "₹150 - ₹300",
    priceUSD: "$2 - $4",
    isOptional: true,
  },
  {
    category: "Self-Care",
    name: "Natural Face Cleanser",
    quantity: "1 bottle",
    priceINR: "₹200 - ₹400",
    priceUSD: "$2.50 - $5",
  },
  {
    category: "Self-Care",
    name: "Warm Oil for Foot Massage",
    quantity: "100 ml",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Gratitude Journaling",
    name: "Journal/Notebook",
    quantity: "1 piece",
    priceINR: "₹50 - ₹100",
    priceUSD: "$0.60 - $1.20",
  },
  {
    category: "Gratitude Journaling",
    name: "Pen",
    quantity: "1 piece",
    priceINR: "₹10 - ₹20",
    priceUSD: "$0.10 - $0.25",
  },
];

const categories = [
  "Nasal Cleansing",
  "Hip Bath & Spinal Bath",
  "Ear Cleaning",
  "Throat Gargle",
  "Yoga & Meditation",
  "Natural Energy Juice",
  "Mud Bath/Sun Bath",
  "Steam with Natural Leaves",
  "Food & Nutrition",
  "Herbal Teas",
  "Self-Care",
  "Gratitude Journaling",
];

function CategorySection({
  category,
  items,
}: {
  category: string;
  items: Item[];
}) {
  const categoryItems = items.filter((item) => item.category === category);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-emerald-800 mb-4">
        {category}
      </h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (INR)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (USD)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categoryItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                      {item.isReusable && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Reusable
                        </span>
                      )}
                      {item.isOptional && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Optional
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.priceINR}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.priceUSD}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BucketlistPage() {
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

      <main className="max-w-6xl mx-auto px-4 py-8 relative">
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
            Naturopathy Supplies
          </h1>
          <p className="text-lg text-gray-600">
            Monthly checklist of items needed for your naturopathy routine
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <CategorySection key={category} category={category} items={items} />
          ))}
        </div>

        {/* Total Cost Section */}
        <div className="mt-12 bg-emerald-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Total Estimated Monthly Cost
          </h2>
          <p className="text-black">Initial Cost</p>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-lg text-gray-600 mb-2">Indian Rupees (INR)</p>
              <p className="text-3xl font-bold text-emerald-600">₹7,000</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-lg text-gray-600 mb-2">US Dollars (USD)</p>
              <p className="text-3xl font-bold text-emerald-600">$85</p>
            </div>
          </div>
          <br />

          <p className="text-black">
            Remaining monthly cost same as montly expenses.
          </p>
        </div>

        {/* Notes Section */}
        <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Reusable Items:</strong> Items like the neti pot, yoga
                mat, juicer, and steam inhaler are one-time purchases and may
                not need to be replaced monthly.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Seasonal Variations:</strong> The cost of fresh fruits
                and vegetables may vary depending on the season and location.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Optional Items:</strong> Essential oils, meditation
                cushions, and herbal teas are optional and can be skipped if not
                needed.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
