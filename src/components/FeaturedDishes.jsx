import { Link } from "react-router-dom"
import { menuItems } from "../data/menuData"

export default function FeaturedDishes() {
  const featuredItems = menuItems.slice(0, 6)

  return (
    <section id="menu" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Dishes</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <Link to="/menu" className="bg-yellow-600 text-white px-4 py-2 rounded">
              Featured Dishes
            </Link>
            <Link
              to="/menu"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded"
            >
              All Menu
            </Link>
            <Link
              to="/drinks"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded"
            >
              Drinks
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((dish) => (
            <Link
              key={dish.id}
              to={`/product/${dish.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
            >
              <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{dish.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600 font-bold">{dish.price}</span>
                  <span className="text-yellow-600 hover:text-yellow-700 font-semibold">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
