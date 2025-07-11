"use client"

import { useState } from "react"
import { Star, Check, X } from "lucide-react"
import Footer from "../components/Footer"

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (Math.random() > 0.2) {
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

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-8 text-center mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your feedback has been received and is very important to us.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    )
  }

  if (showError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-8 text-center mx-4">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submission Failed</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sorry, we couldn't submit your feedback. Please try again.
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center bg-[url('/placeholder.svg?height=400&width=800')] pt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">We'd love your Feedback</h1>
            <p className="text-xl">Help us improve our service</p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Let us know How you feel
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Rate your experience
                </label>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`text-3xl ${
                        star <= formData.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star fill={star <= formData.rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Comment</label>
                <textarea
                  name="comment"
                  placeholder="Write your comment here..."
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
