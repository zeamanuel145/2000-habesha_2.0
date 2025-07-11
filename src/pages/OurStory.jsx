import Footer from "../components/Footer"

export default function OurStory() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center bg-[url('/placeholder.svg?height=600&width=1200')] pt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Come and have an Unforgettable Experience</h1>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Reserve Now
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">Our Story</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our journey began in the heart of Addis Ababa, rooted in ancient traditions, love for spices, and the
                  joy of sharing meals inspired our vision. We built this space to offer more than food—we offer a taste
                  of home and heritage.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Every dish tells a story of our ancestors, every spice carries the essence of our land, and every meal
                  shared here creates new memories that bridge cultures and generations.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Traditional Ethiopian cooking"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">What Makes Us Unique</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                At 2000 Habesha, we offer far more than a meal — we deliver an authentic Ethiopian cultural journey.
                From handmade injera and locally sourced spices to traditional coffee ceremonies and live music, every
                visit immerses you in our heritage.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Our Specialties</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Handmade injera prepared daily</li>
                    <li>• Locally sourced authentic spices</li>
                    <li>• Traditional coffee ceremonies</li>
                    <li>• Live Ethiopian music and dance</li>
                    <li>• Family-style dining experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Our Mission</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    To preserve and share the rich culinary traditions of Ethiopia while creating a warm, welcoming
                    space where every guest feels like part of our extended family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
