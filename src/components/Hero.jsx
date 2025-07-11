"use client"
import { Link } from "react-router-dom"

export default function Hero({ onReservationClick }) {
  return (
    <section className="relative h-screen bg-cover bg-center bg-[url('/placeholder.svg?height=800&width=1200')]">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl">
          <p className="text-lg mb-4">Welcome to</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">2000 Habesha Cultural Restaurant</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Authentic Ethiopian Experience in the Heart of Addis Ababa</p>
          <div className="flex flex-col-2 sm:flex-row gap-4 justify-center">
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
  )
}
