"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-semibold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Book
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A motivational journey by <span className="text-white font-semibold">Author</span>
        </motion.p>
        <div className="flex gap-4 mt-10">
          <a
            href="https://paystack.com/pay/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Buy Now
          </a>
          <a
            href="#learn"
            className="px-6 py-3 border border-white text-white rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Learn More
          </a>
        </div>
        <motion.div
          style={{ y }}
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-40"
        >
          <video
            ref={videoRef}
            src="/book-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="learn"
        className="h-screen flex flex-col justify-center items-center px-8 text-center bg-neutral-950"
      >
        <motion.h2
          className="text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Power of Change
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          “Book” is a motivational experience designed to help you rediscover your drive, 
          break through doubt, and take back control of your story. Each page is a spark 
          for self-belief, ambition, and purpose.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 bg-black">
        © {new Date().getFullYear()} Author. All rights reserved.
      </footer>
    </main>
  );
}
