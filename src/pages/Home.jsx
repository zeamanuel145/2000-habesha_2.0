import Hero from "../components/Hero"
import OurStory from "../components/OurStory"
import FeaturedDishes from "../components/FeaturedDishes"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function Home({ onReservationClick }) {
  return (
    <div>
      <Hero onReservationClick={onReservationClick} />
      <OurStory />
      <FeaturedDishes />
      <Testimonials />
      <Footer />
    </div>
  )
}
