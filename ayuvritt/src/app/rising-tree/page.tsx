"use client";

import { BackButton } from "@/components/back-button";
import { Leaf1, Leaf2 } from "@/components/leaves";
import { GrowingTreeIcon } from "@/components/naturopathy-icons";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RisingTreePage() {
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsComplete(true);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    setTotalTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsComplete(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsComplete(false);
  };

  const progress = timeLeft > 0 ? 1 - timeLeft / totalTime : isComplete ? 1 : 0;

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
            Growing Tree Timer
          </h1>
          <p className="text-lg text-gray-600">
            Set your meditation time and watch the tree grow with you
          </p>
        </div>

        {/* Timer Input Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={isRunning ? () => setIsRunning(false) : handleStart}
                disabled={!isRunning && minutes === 0 && seconds === 0}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  isRunning
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-emerald-400"
                }`}
              >
                {isRunning ? "Stop" : isComplete ? "Start Again" : "Start"}
              </button>
              {(!isRunning && timeLeft > 0) || (!isRunning && isComplete) ? (
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Growing Tree Animation */}
        <div className="flex justify-center items-center">
          <div className="relative w-48 h-48">
            <motion.div className="absolute inset-0">
              <GrowingTreeIcon
                className="w-full h-full text-emerald-600"
                progress={progress}
                style={{
                  filter: `brightness(${100 + progress * 50}%)`,
                }}
              />
            </motion.div>

            {/* Timer Display */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <AnimatePresence>
                {isComplete ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl font-bold text-emerald-600"
                  >
                    Time&apos;s Up!
                  </motion.div>
                ) : (
                  <motion.div
                    key="timer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-2xl font-bold text-emerald-800"
                  >
                    {Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timeLeft % 60).toString().padStart(2, "0")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use the Timer
          </h2>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside">
            <li>
              Set your desired meditation duration using minutes and seconds
            </li>
            <li>Click &quot;Start&quot; to begin your meditation session</li>
            <li>Watch the tree grow as you progress through your meditation</li>
            <li>The timer will complete when the tree is fully grown</li>
            <li>Use the &quot;Reset&quot; button if you need to start over</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
