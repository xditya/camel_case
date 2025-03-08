"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Leaf1, Leaf2 } from "@/components/leaves";
import { BackButton } from "@/components/back-button";

interface LocationResult {
  display_name: string;
  place_id: number;
}

interface Doctor {
  name: string;
  distance: number;
  address: string;
  type: string;
}

interface NominatimPlace {
  display_name: string;
  importance: number;
  type: string;
  lat: string;
  lon: string;
}

interface Coordinates {
  lat: number;
  lon: number;
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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);

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

  const calculateDistance = (
    point1: Coordinates,
    point2: Coordinates
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLon = ((point2.lon - point1.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const findNearbyDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const locationQuery = encodeURIComponent(formData.location);
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length > 0) {
        const userLocation = {
          lat: parseFloat(geoData[0].lat),
          lon: parseFloat(geoData[0].lon),
        };

        // Try with small radius first
        let viewboxSize = 0.1;
        let data = [];

        // Keep expanding search radius until we find results or hit max radius
        while (data.length === 0 && viewboxSize <= 2) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
              `format=json&` +
              // Modified search query to be more specific
              `q=ayurvedic&` +
              `viewbox=${userLocation.lon - viewboxSize},${
                userLocation.lat - viewboxSize
              },${userLocation.lon + viewboxSize},${
                userLocation.lat + viewboxSize
              }&` +
              `bounded=1&limit=50&` + // Increased limit
              `dedupe=1&` + // Remove duplicates
              `category=healthcare,medical` // Added category filter
          );
          const responseData = await response.json();
          data = Array.isArray(responseData) ? responseData : [];

          if (data.length === 0) {
            // Try alternative search if first attempt returns no results
            const altResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?` +
                `format=json&` +
                `amenity=hospital,clinic,doctors,healthcare&` +
                `lat=${userLocation.lat}&` +
                `lon=${userLocation.lon}&` +
                `radius=${viewboxSize * 111000}&` + // Convert degrees to meters (roughly)
                `limit=50`
            );
            const altData = await altResponse.json();
            data = Array.isArray(altData) ? altData : [];
          }

          viewboxSize *= 2;
        }

        const nearbyDoctors = data
          .filter(
            (place: NominatimPlace) =>
              place.display_name.toLowerCase().includes("hospital") ||
              place.display_name.toLowerCase().includes("clinic") ||
              place.display_name.toLowerCase().includes("medical") ||
              place.display_name.toLowerCase().includes("health") ||
              place.type === "hospital" ||
              place.type === "clinic"
          )
          .map((place: NominatimPlace) => {
            const distance = calculateDistance(userLocation, {
              lat: parseFloat(place.lat),
              lon: parseFloat(place.lon),
            });
            return {
              name: place.display_name.split(",")[0],
              distance: Math.round(distance * 10) / 10,
              address: place.display_name,
              type: place.type || "Healthcare Facility",
            };
          })
          .sort((a: Doctor, b: Doctor) => a.distance - b.distance)
          .slice(0, 5);

        setDoctors(nearbyDoctors);
        setShowDoctors(true);
      }
    } catch (error) {
      console.error("Error finding doctors:", error);
    }
    setLoadingDoctors(false);
  };

  const openInGoogleMaps = (address: string) => {
    // Encode the destination address for the URL
    const destination = encodeURIComponent(address);
    // Open Google Maps in a new tab with directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      "_blank"
    );
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
        <BackButton href="/get-started" />
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-[95%] sm:max-w-lg relative">
              <div className="p-4 sm:p-6">
                {!showDoctors ? (
                  <>
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
                        <p className="text-sm text-gray-500">
                          Patient Information
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Name
                            </p>
                            <p className="text-gray-900">{formData.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Age
                            </p>
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
                                Math.floor(
                                  Math.random() * randomMessages.length
                                )
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={findNearbyDoctors}
                        disabled={loadingDoctors}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                      >
                        {loadingDoctors ? (
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
                            <span>Finding...</span>
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
                            </svg>
                            <span>Find Doctors</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowResult(false)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Close
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Nearby Ayurvedic Centers
                      </h2>
                      <button
                        onClick={() => setShowDoctors(false)}
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto">
                      {doctors.length > 0 ? (
                        doctors.map((doctor, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                          >
                            <div className="font-medium text-gray-900 text-sm sm:text-base">
                              {doctor.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 mt-1">
                              {doctor.address}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs sm:text-sm text-gray-400">
                                ~{doctor.distance}km away • {doctor.type}
                              </div>
                              <button
                                onClick={() => openInGoogleMaps(doctor.address)}
                                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm flex items-center gap-1 py-1 px-2 rounded-md hover:bg-blue-50"
                              >
                                <svg
                                  className="w-4 h-4"
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
                                </svg>
                                Navigate
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-sm sm:text-base">
                            No healthcare facilities found in this area
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <button
                        onClick={() => setShowDoctors(false)}
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                      >
                        Back to Results
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
