"use client";

import { useState } from "react";
import Image from "next/image";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";

export default function Start() {
  const [showResult, setShowResult] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState("");
  const [diseaseInfo, setDiseaseInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    issues: "",
  });

  const getMedicineInfo = async (
    symptoms: string
  ): Promise<[string | null, string | null, string | null]> => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/getMedicine?symptoms=${encodeURIComponent(symptoms)}`
      );
      const data = await response.json();
      if (data.error) {
        return [null, null, data.error];
      }
      return [data.medicine, data.disease, null];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return [null, null, error.toString()];
    }
  };
  let disease, medicine;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getMedicineInfo(formData.issues.trim());
      medicine = res[0];
      disease = res[1];
      const error = res[2];
      if (error) {
        alert(error);
        return;
      }
      setMedicineInfo(medicine || "");
      setDiseaseInfo(disease || "");
    } catch (error) {
      console.error("Error in submission:", error);
      setMedicineInfo("paracetamol"); // Default fallback
      setDiseaseInfo("cold"); // Default fallback
    }
    setLoading(false);
    setShowResult(true);
  };

  // const randomMessages = [
  //   <span key="1">
  //     Based on your symptoms, we recommend a combination of traditional
  //     Ayurvedic herbs and modern therapeutic approaches. Our analysis suggests
  //     focusing on balancing your{" "}
  //     <span className="text-green-700 font-medium">{medicineInfo}Info}</span> and{" "}
  //     <span className="text-red-700 font-medium">{diseaseInfo}</span> dosha.
  //   </span>,
  //   <span key="2">
  //     Our analysis suggests focusing on balancing your{" "}
  //     <span className="text-green-700 font-medium">
  //       {medicineInfo}Info} | {diseaseInfo}
  //     </span>{" "}
  //     dosha.
  //   </span>,
  // ];

  const randomMessages = [
    <span key="1">
      After carefully analyzing your symptoms, our assessment indicates that you
      may be experiencing{" "}
      <span className="text-red-700 font-medium">{diseaseInfo}</span>. We
      recommend{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span>, a
      time-tested Ayurvedic remedy rooted in ancient formulations known for its
      natural healing properties.
    </span>,
    <span key="2">
      Based on a detailed evaluation of your symptoms, it appears that you may
      have <span className="text-red-700 font-medium">{diseaseInfo}</span>.{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span> is a
      traditional Ayurvedic remedy, derived from ancient formulations, known for
      its effectiveness in promoting recovery.
    </span>,
    <span key="3">
      Our thorough analysis of your symptoms suggests a likelihood of{" "}
      <span className="text-red-700 font-medium">{diseaseInfo}</span>. We
      recommend{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span>, an
      ancient Ayurvedic formulation trusted for centuries to support natural
      healing and balance.
    </span>,
    <span key="4">
      Following a detailed analysis of your symptoms, the findings suggest{" "}
      <span className="text-red-700 font-medium">{diseaseInfo}</span>.{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span> is a
      classical Ayurvedic remedy, carefully preserved from ancient traditions to
      restore health and well-being.
    </span>,
    <span key="5">
      Our evaluation points to{" "}
      <span className="text-red-700 font-medium">{diseaseInfo}</span> based on
      your symptoms. We suggest trying{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span>, a
      well-established Ayurvedic remedy from ancient texts, known for its
      targeted healing properties.
    </span>,
    <span key="6">
      Based on a comprehensive analysis of your symptoms, you may be
      experiencing{" "}
      <span className="text-red-700 font-medium">{diseaseInfo}</span>.{" "}
      <span className="text-green-700 font-medium">{medicineInfo}</span> is a
      traditional Ayurvedic solution, derived from ancient wisdom, and valued
      for its natural effectiveness in restoring balance and health.
    </span>,
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
            height={80}
            style={{ height: "auto" }}
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer"
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
              disabled={loading}
              className="w-full mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze"}
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
                        {
                          randomMessages[
                            Math.floor(Math.random() * randomMessages.length)
                          ]
                        }
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
