export default function OurStory() {
  return (
    <section id="story" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our journey began in the heart of Addis Ababa, rooted in ancient traditions, love for spices, and the joy
              of sharing meals inspired our vision. We built this space to offer more than food—we offer a taste of home
              and heritage.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              What Makes Us Unique: At 2000 Habesha, we offer far more than a meal — we deliver an authentic Ethiopian
              cultural journey. From handmade injera and locally sourced spices to traditional coffee ceremonies and
              live music, every visit immerses you in our heritage. At night, folk live music and dance performances
              that celebrate Ethiopia's vibrant traditions. Our warm hospitality and richly decorated space make every
              guest feel like part of the family.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Traditional Ethiopian food"
              className="rounded-lg w-full h-48 object-cover"
            />
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Ethiopian coffee ceremony"
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
