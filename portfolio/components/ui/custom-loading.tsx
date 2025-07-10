import React, { useEffect, useRef, useState } from "react"

/**
 * Custom loading animation using Tailwind CSS keyframes and animation classes.
 * This component uses the 'spin-glow' and 'pulse-glow' animations from your tailwind.config.ts.
 */

export default function CustomLoading() {
  const [progress, setProgress] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dotIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Progress bar animation
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 18); // ~1.8s for 100%
    // Dots animation
    dotIntervalRef.current = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 350);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (dotIntervalRef.current) clearInterval(dotIntervalRef.current);
    };
  }, []);

  // For rotating the inner circle and animating the lines
  const [innerRotation, setInnerRotation] = useState(0);
  useEffect(() => {
    const innerInterval = setInterval(() => {
      setInnerRotation((prev) => prev + 6); // Remove modulo for seamless rotation
    }, 16);
    return () => clearInterval(innerInterval);
  }, []);

  // For animating the lines in the inner circle
  const numLines = 12;
  const activeLine = Math.floor(((innerRotation % 360) / 360) * numLines) % numLines;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex flex-col items-center justify-center z-50 min-h-screen select-none px-2 sm:px-0">
      {/* Top left and right icons */}
      <div className="absolute left-2 sm:left-4 top-8 sm:top-1/4 text-primary-300 opacity-40 text-xl sm:text-3xl">&lt;&gt;</div>
      <div className="absolute right-2 sm:right-4 top-8 sm:top-1/4 text-accent-200 opacity-40 text-xl sm:text-3xl"></div>

      {/* Loader Circle with rotating inner fill */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 sm:mb-8 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Outer background circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#e3e6ed"
            strokeWidth="6"
            fill="none"
          />
          {/* Outer progress circle (solid blue) */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#2563eb"
            strokeWidth="6"
            fill="none"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 44}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.2s linear' }}
          />
        </svg>
        {/* Rotating inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-200 via-primary-400 to-primary-600 opacity-95 shadow-lg flex items-center justify-center"
            style={{ transform: `rotate(${innerRotation}deg)`, transition: 'transform 0.1s linear' }}
          >
            <svg className="w-10 h-10 opacity-80" viewBox="0 0 50 50">
              <g>
                {[...Array(numLines)].map((_, i) => {
                  // Animate the active line with a brighter color and scale
                  const isActive = i === activeLine;
                  return (
                    <rect
                      key={i}
                      x="23"
                      y="6"
                      width="4"
                      height={isActive ? 14 : 10}
                      rx="2"
                      fill={isActive ? '#fff' : '#1e293b'}
                      opacity={isActive ? 1 : (i + 1) / numLines}
                      transform={`rotate(${i * 30} 25 25)`}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#a21caf] bg-clip-text text-transparent text-center break-words">
        Portfolio Loading
      </h1>
      <p className="text-base sm:text-xl text-slate-600 mb-6 sm:mb-8 text-center px-2">Creating beautiful experiences</p>

      {/* Progress bar and status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-xs sm:max-w-md mx-auto mb-2 text-slate-500 text-xs sm:text-sm gap-1 sm:gap-0">
        <div className="flex items-center gap-1 justify-center sm:justify-start">
          <span className="text-accent-400" style={{ color: "blue" }}>⚡</span> Initializing...
        </div>
        <span className="text-primary-700 text-right">{progress}%</span>
      </div>
      <div className="w-full max-w-xs sm:max-w-md h-1 bg-primary-100 rounded-full mb-4 sm:mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-700 rounded-full animate-pulse-glow transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              activeDot === i
                ? 'bg-accent-500 opacity-100 scale-110 shadow-md'
                : 'bg-primary-300 opacity-60 scale-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
