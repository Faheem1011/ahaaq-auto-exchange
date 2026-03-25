"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import Image from "next/image";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial setup and let the animation play out
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds total loading screen duration
    return () => clearTimeout(timer);
  }, []);

  const text = "AHAAQ AUTO EXCHANGE".split("");

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 overflow-hidden"
          >
            {/* Background Atmosphere Elements */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1, transition: { duration: 2, ease: "easeOut" } }}
            />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Phase 1: Impact Logo */}
              <motion.div
                className="relative w-72 h-32 mb-12"
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: 0.2
                }}
              >
                <Image 
                  src="/logo.png"
                  alt="Ahaaq Auto Exchange"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Phase 2: Reveal Text with Stagger */}
              <div className="flex space-x-[2px] overflow-hidden">
                {text.map((char, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl md:text-4xl font-black tracking-[0.2em] text-zinc-900"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.8 + index * 0.04
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>

              {/* Phase 3: Shimmer Effect over Text container */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 pointer-events-none"
                style={{ width: "200%" }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 2.2
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {!loading && children}
      </motion.div>
    </>
  );
}
