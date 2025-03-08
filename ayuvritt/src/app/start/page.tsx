"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Leaf1, Leaf2, SmallLeaf } from "@/components/leaves";

interface LocationResult {
  display_name: string;
  place_id: number;
}

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
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#location")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        setLoading(false);
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

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();

          const address = data.display_name;
          setFormData((prev) => ({
            ...prev,
            location: address,
          }));
        } catch (error) {
          setLocationError("Failed to get location details" + error);
        }
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError(
          error.code === 1
            ? "Please allow location access"
            : "Unable to get your location"
        );
        setLoadingLocation(false);
      }
    );
  };

  const searchLocation = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

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
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            location: e.target.value,
                          });
                          searchLocation(e.target.value);
                        }}
                        onFocus={() => {
                          if (formData.location) {
                            setShowSuggestions(true);
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                        placeholder="Search for a location..."
                        required
                        autoComplete="off"
                      />
                      {/* Dropdown Menu */}
                      {showSuggestions && searchResults.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {searchResults.map((result) => (
                            <li
                              key={result.place_id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  location: result.display_name,
                                });
                                setShowSuggestions(false);
                              }}
                            >
                              {result.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* Current Location Button */}
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={loadingLocation}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    >
                      {loadingLocation ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Current</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {locationError && (
                  <p className="mt-1 text-sm text-red-600">{locationError}</p>
                )}
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
