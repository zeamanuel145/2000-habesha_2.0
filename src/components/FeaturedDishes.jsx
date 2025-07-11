import { Link } from "react-router-dom";
import { menuItems } from "../data/menuData";

export default function FeaturedDishes() {
  const featuredItems = menuItems.slice(0, 6);

  return (
    <section id="menu" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 text-center lg:text-left space-y-6 lg:space-y-0">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Dishes
            </h2>
            <div className="flex justify-center lg:justify-start space-x-4 mt-4">
              <Link
                to="/menu"
                className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700 transition"
              >
                Featured Dishes
              </Link>
              <Link
                to="/menu"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                All Menu
              </Link>
              <Link
                to="/drinks"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Drinks
              </Link>
            </div>
          </div>
          <a
            href="/menu.pdf"
            download
            className="bg-brown-700 text-white px-5 py-2 rounded shadow hover:bg-brown-800 transition"
          >
            Download Menu
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((dish) => (
            <Link
              key={dish.id}
              to={`/product/${dish.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 text-base">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600 font-bold text-lg">
                    From birr {dish.price}
                  </span>
                  <span className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
