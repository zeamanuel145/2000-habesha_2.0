"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "../../public/images/Hero-img1.png",
  "../../public/images/Hero-img2.png",
  "../../public/images/Hero-img3.png", // ← Add your third image here
];

export default function Hero({ onReservationClick }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Change background every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl">
          <p className="text-lg mb-4">Welcome to</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            2000 Habesha Cultural Restaurant
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Authentic Ethiopian Experience in the Heart of Addis Ababa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReservationClick}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Reserve a Table
            </button>
            <Link
              to="/menu"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
