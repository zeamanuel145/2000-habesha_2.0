"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Download } from "lucide-react"
import { menuItems } from "../data/menuData"

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredItems = activeFilter === "all" ? menuItems : menuItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Menu Page</h1>
          </div>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "all"
                ? "bg-yellow-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            }`}
          >
            Featured Dishes
          </button>
          <button
            onClick={() => setActiveFilter("main")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "main"
                ? "bg-yellow-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            }`}
          >
            All Main Dishes
          </button>
          <button
            onClick={() => setActiveFilter("vegetarian")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "vegetarian"
                ? "bg-yellow-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            }`}
          >
            Vegan
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600 font-bold">{item.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
