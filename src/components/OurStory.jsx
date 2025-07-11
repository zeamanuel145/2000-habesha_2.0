export default function OurStory() {
  return (
    //  <!-- our story -->
    <section id="story" class="py-16 bg-coffee-gradient">
      <div class="max-w-7xl mx-auto px-4">
        {/* // <!-- first layer --> */}

        <div class="grid md:grid-cols-2">
          <div>
            <h2 class="text-4xl font-bold text-amber-800 mb-12 text-center">
              Our Story
            </h2>
            <p class="text-gray-700 text-lg w-xl">
              Our journey began in the heart of Addis Ababa, where family
              recipes have been passed down through generations. We are inspired
              by our vision. We built this space to offer more than traditional
              and modern Ethiopian cultural heritage.
            </p>
          </div>
          <div class>
            <div class="flex items-center space-y-4">
              <img
                src="./images/masiko.jpg"
                alt="Restaurant Interior"
                class="rounded-lg w-full h-60 object-cover shadow-lg"
              />
              <img
                src="./images/agelgle.jpg"
                alt="Traditional Coffee Ceremony"
                class="rounded-lg w-full h-48 object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
        {/* second layer  */}
        <div class="grid grid-cols-2 gap-4">
          <div>
            <img
              src="./images/tradishinal_place.jpg"
              alt="Cultural Performance"
              class="rounded-lg w-full h-60 object-cover shadow-lg"
            />
          </div>
          <div>
            <h3 class="text-xl font-bold text-amber-800 pt-8 mb-4">
              What Makes Us Unique:
            </h3>
            <p class="text-gray-700 leading-relaxed">
              At 2000 Habesha, we offer more than a meal – we deliver an
              authentic Ethiopian cultural journey. From homemade injera and
              locally sourced spices to communal dining in traditional mesob
              baskets, every visit immerses you in our heritage. As night falls,
              live music and dance performances transport you to the heart of
              Ethiopian culture, making every guest feel like part of our
              extended family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
