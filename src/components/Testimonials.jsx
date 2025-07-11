export default function Testimonials() {
  const testimonials = [
    {
      name: "Desta Paterson",
      rating: 5,
      text: "The food here was fantastic. Ethiopian cuisine and the service was really good. The staff were very friendly and helpful. The atmosphere was great and the food was delicious. I would definitely recommend this place to anyone looking for authentic Ethiopian food.",
    },
    {
      name: "Christina Medina",
      rating: 5,
      text: "Best restaurant in our city! I love the traditional Ethiopian dishes and the coffee ceremony was amazing. The injera was fresh and all the stews were perfectly spiced. Will definitely be coming back!",
    },
    {
      name: "Solomon Admasu",
      rating: 5,
      text: "Feeling closer, the food reminds me of back home and the traditional music and dance performances make it even more special. The kitfo was prepared perfectly and the vegetarian combo was outstanding.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Testimonials and Feedbacks
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-yellow-800 text-white p-6 rounded-lg">
              <div className="text-4xl mb-4">"</div>
              <p className="mb-6 text-sm leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-800 font-bold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
