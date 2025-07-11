"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

export default function ReservationModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    time: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (Math.random() > 0.3) {
        setShowSuccess(true)
      } else {
        setShowError(true)
      }
    } catch (error) {
      setShowError(true)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-cover bg-center bg-[url('/placeholder.svg?height=400&width=600')] rounded-lg max-w-md w-full relative">
          <div className="absolute inset-0 bg-black/70 rounded-lg"></div>
          <div className="relative z-10 p-8 text-center text-white">
            <button onClick={onClose} className="absolute top-4 left-4 text-white hover:text-gray-300">
              <X size={24} />
            </button>
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank you! You have reserved a seat!</h2>
              <p>Please Check your Email or SMS for your Confirmation Number.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showError) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reservation Failed</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sorry, we couldn't process your reservation. Please try again or contact us directly.
          </p>
          <button
            onClick={() => setShowError(false)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-cover bg-center bg-[url('/placeholder.svg?height=400&width=600')] rounded-lg max-w-md w-full relative">
        <div className="absolute inset-0 bg-black/70 rounded-lg"></div>
        <div className="relative z-10 p-8">
          <button onClick={onClose} className="absolute top-4 left-4 text-white hover:text-gray-300">
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-white text-center mb-6">Make Your Reservation</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30"
                required
              />
            </div>

            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30"
              required
              min="1"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30"
                required
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30"
                required
              >
                <option className="text-gray-500" value="">Choose Time</option>
                <option className="text-gray-500" value="12:00">12:00 PM</option>
                <option className="text-gray-500" value="13:00">1:00 PM</option>
                <option className="text-gray-500" value="14:00">2:00 PM</option>
                <option className="text-gray-500" value="18:00">6:00 PM</option>
                <option className="text-gray-500" value="19:00">7:00 PM</option>
                <option className="text-gray-500" value="20:00">8:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Reserve Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
