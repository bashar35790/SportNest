"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    id: 1,
    text: "This platform provides everything athletes need to improve their game. The community is great, and the facilities keep me motivated, instill accountability through regular bookings, and allow me to build a professional routine by showcasing diverse sports.",
    name: "Francesca",
    handle: "@frrann",
    avatar: "https://i.pravatar.cc/150?u=francesca",
  },
  {
    id: 2,
    text: "SportNest eliminated the hurdle of sourcing venues, letting me focus on training. Their professional facilities, especially in the Premium tier, challenge me to perform at complex, multi-sport levels. With a supportive community and feedback, my skills have been elevated.",
    name: "Alfie",
    handle: "@alfiemitchell123",
    avatar: "https://i.pravatar.cc/150?u=alfie",
  },
  {
    id: 3,
    text: "SportNest transformed me from a casual player to a competitive athlete, enabling me to find flawless, responsive, accessible courts. It's a superb platform for booking with a supportive community backing your growth. Through it, I evolved my entire game.",
    name: "Hikmah",
    handle: "@Hikmahx",
    avatar: "https://i.pravatar.cc/150?u=hikmah",
  },
  {
    id: 4,
    text: "Finding a reliable turf used to be a nightmare before this app. Now, I can organize weekly matches with my team in seconds. The instant confirmation and secure payments are just the cherry on top. Highly recommended for any sports enthusiast!",
    name: "David",
    handle: "@david_plays",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: 5,
    text: "The best facility booking platform I've ever used. The UI is clean, the venues are top-notch, and the customer service is incredibly responsive. It has completely changed how our local club manages practice sessions.",
    name: "Sarah",
    handle: "@sarah_coach",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
];

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    // Initialize on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= REVIEWS.length - cardsToShow ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? REVIEWS.length - cardsToShow : prevIndex - 1,
    );
  };

  return (
    <section className="py-24 bg-[#F4F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
            A little <span className="text-pink-500">💖</span>{" "}
            <span className=" text-gradient">from our community</span>
          </h2>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-brand-secondary hover:bg-gray-600 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-brand-Cyan600 hover:bg-[#2c3a6b] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="w-full shrink-0 px-3"
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] h-full flex flex-col justify-between">
                  <p className="text-gray-500 leading-relaxed mb-10 text-[15px]">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      width={48}
                      height={48}
                    />
                    <div className=" text-left">
                      <h4 className="font-bold text-[#2A4365] text-sm md:text-base">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-400">{review.handle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
