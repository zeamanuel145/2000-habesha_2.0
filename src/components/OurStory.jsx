export default function OurStory() {
  return (
    <section
      id="story"
      className="bg-[#f8f1e9] py-20 px-4 text-[#2b1608] shadow-lg dark:bg-gray-900 dark:text-whites"
    >
      <div className="max-w-7xl mx-auto space-y-16 shadow-amber-400">
        {/* Top section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left text */}
          <div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Our Story
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our journey began in the heart of Addis Ababa, where family
              traditions, love for spices, and the joy of sharing meals inspired
              our vision. We built this space to offer more than food—we offer a
              taste of home and heritage.
            </p>
          </div>

          {/* Right column with 2 stacked images */}
          <div className=" flex  gap-4">
            <img
              src="./images/masiko.jpg"
              alt="Cultural Performance"
              className="rounded-xl shadow-md w-full h-40 object-cover"
            />
            <img
              src="./images/agelgle.jpg"
              alt="Traditional Basket"
              className="rounded-xl shadow-md w-full h-40 object-cover"
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left image */}
          <img
            src="./images/tradishinal_place.jpg"
            alt="Traditional Restaurant"
            className="rounded-xl shadow-md w-full h-64 object-cover"
          />

          {/* Right text */}
          <div>
            <h3 className="text-xl font-bold text-amber-800 mb-4 dark:text-white">
              What Makes Us Unique:
            </h3>
            <p className="text-gray-700 leading-relaxed">
              At 2000 Habesha, we offer more than a meal — we deliver an
              authentic Ethiopian cultural journey. From homemade injera and
              locally sourced spices to communal dining in traditional mesob
              baskets, every visit immerses you in our heritage. As night falls,
              the air fills with live music and dance performances that
              celebrate Ethiopia's vibrant traditions. Our warm hospitality and
              richly decorated space make every guest feel like part of the
              family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
