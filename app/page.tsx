"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Checkout from "../../components/Checkout";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const bookRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 0, rotation: 0, scale: 1 },
      {
        y: 100,
        rotation: 8,
        scale: 1.05,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        ease: "power2.out",
      }
    );

    // Section fade + slide in animations
    gsap.utils.toArray(".fade-slide").forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        ease: "power2.out",
      });
    });
  }, []);

  const { scrollY } = useScroll();
  const yBook = useTransform(scrollY, [0, 500], [0, 50]);
  const scaleBook = useTransform(scrollY, [0, 500], [1, 0.95]);

  function handleBuyClick() {
    setShowCheckout(true);
  }

  return (
    <main className="font-sans text-gray-900 relative">
      {/* Sticky Navbar */}
        <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/70 z-50 flex justify-between px-8 py-4 shadow-sm">
          <div className="font-semibold text-lg">Keve</div>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#buy" className="hover:underline">Buy</a>
          </div>
        </nav>

      {/* Floating Buy Button */}
      <button
        onClick={handleBuyClick}
        className="fixed bottom-8 right-8 px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:scale-105 transition-transform z-50"
      >
        Buy Now
      </button>

      {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden pt-20 lg:pt-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6 text-center lg:text-left fade-slide"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold">Keve</h1>
            <p className="text-lg lg:text-xl text-gray-700 max-w-lg">
              A motivational journey by <span className="font-semibold">Keve</span>. Unlock
              your potential, take control of your story, and start building daily habits
              that last.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start mt-6">
              <button
                onClick={handleBuyClick}
                className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 hover:scale-105 transition-transform"
              >
                Buy Now
              </button>
              <button
                onClick={() => setShowSample(true)}
                className="px-6 py-3 border border-black rounded-xl font-medium hover:bg-black hover:text-white hover:scale-105 transition-transform"
              >
                Read Sample
              </button>
            </div>
          </motion.div>

          <motion.div
            ref={bookRef}
            className="flex-1 flex justify-center lg:justify-end"
            style={{ y: yBook, scale: scaleBook }}
          >
            <img
              src="/book-cover.jpg"
              alt="Book Cover"
              className="w-64 lg:w-80 shadow-2xl rounded-2xl object-cover hover:rotate-1 hover:scale-105 transition-transform"
            />
          </motion.div>
        </div>
      </section>

            {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setShowCheckout(false)}
              >
                ✕
              </button>
              <Checkout onClose={() => setShowCheckout(false)} />
            </div>
          </div>
        )}

      

      {/* Sample Modal */}
      {showSample && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowSample(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Sample Excerpt</h2>
            <blockquote className="text-gray-800 italic">
              “Success is not a lightning strike — it is the accumulation of tiny decisions.”
            </blockquote>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-24 bg-white fade-slide">
        <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold mb-4">About the Book</h2>
            <p className="text-gray-700 mb-4">
              “Book” distills practical frameworks and bite-sized practices you can use
              daily to increase clarity, discipline, and momentum. Short chapters, clear
              exercises, and a compassionate voice — perfect for readers who want action.
            </p>
            <div className="grid gap-4 mt-6">
              <div className="p-4 border rounded-lg hover:scale-105 transition-transform shadow-md">
                <strong>Key Lesson 1:</strong> Small habits compound into massive results.
              </div>
              <div className="p-4 border rounded-lg hover:scale-105 transition-transform shadow-md">
                <strong>Key Lesson 2:</strong> Clarity beats motivation — build systems.
              </div>
              <div className="p-4 border rounded-lg hover:scale-105 transition-transform shadow-md">
                <strong>Key Lesson 3:</strong> Reflection turns action into learning.
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md p-8 fade-slide">
              <div className="mb-6">
                <div className="text-sm text-gray-500">Sample Excerpt</div>
                <blockquote className="mt-3 text-gray-800 italic">
                  “Success is not a lightning strike — it is the accumulation of tiny
                  decisions.”
                </blockquote>
              </div>
              <button
                onClick={() => setShowSample(true)}
                className="inline-block mt-4 text-sm underline hover:text-black transition"
              >
                Read full sample
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-20 bg-gray-50 fade-slide">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform">
            <div className="text-gray-600">Author</div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">About the Author</h3>
            <p className="text-gray-700 mt-3 max-w-xl">
              Author is a writer and coach focused on practical tools for building a
              steady life. Their voice is direct, compassionate, and oriented toward
              consistent progress.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white fade-slide">
        <div className="container mx-auto px-6 lg:px-20">
          <h3 className="text-3xl font-semibold mb-8">Praise</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Reader A", quote: "A crisp, clear read that I return to weekly." },
              { name: "Reader B", quote: "Lifechanging in small steps." },
              { name: "Reader C", quote: "Practical, short, and powerful." },
            ].map((r) => (
              <div
                key={r.name}
                className="border rounded-xl p-6 shadow-sm hover:scale-105 transition-transform"
              >
                <div className="italic">“{r.quote}”</div>
                <div className="mt-4 text-sm font-semibold">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 text-center fade-slide">
        <div className="container mx-auto px-6 lg:px-20">
          <h3 className="text-3xl font-semibold mb-6">Start Your Journey</h3>
          <p className="text-gray-600 mb-6">
            Buy the book and get instant access to the ebook version.
          </p>
          <button
            onClick={handleBuyClick}
            className="px-8 py-4 rounded-lg bg-black text-white font-medium hover:bg-gray-800 hover:scale-105 transition-transform"
          >
            Buy Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 fade-slide">
        © {new Date().getFullYear()} Author — All rights reserved.
      </footer>
    </main>
  );
}
