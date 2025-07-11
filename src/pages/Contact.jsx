import Footer from "../components/Footer"

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Map Section */}
      <section className="h-96 bg-gray-300 dark:bg-gray-700">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Interactive Map Would Go Here</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Contact Us</h1>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">habesha2000@gmail.com</p>
                <p className="text-gray-600 dark:text-gray-300">+251 912 838 383</p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Address</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Addis Ababa, Namibia St.,</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Bole Atlas</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">Addis Ababa, Around</p>
                <p className="text-gray-600 dark:text-gray-300">Ethiopian Skylight Hotel</p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Opening Hours</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">From Sunday To Sunday</p>
                <p className="text-gray-600 dark:text-gray-300">10AM - 11PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
