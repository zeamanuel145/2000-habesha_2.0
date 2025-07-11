"use client"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { menuItems, drinkItems } from "../data/menuData"

export default function ProductDetail() {
  const { id } = useParams()
  const allItems = [...menuItems, ...drinkItems]
  const product = allItems.find((item) => item.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={product.type === "drink" ? "/drinks" : "/menu"}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{product.name}</h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>

              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">{product.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Main Ingredients:</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-3 mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <span className="text-3xl font-bold text-yellow-600">{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
