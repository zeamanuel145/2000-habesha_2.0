
import Hero from "../components/Hero"
import OurStory from "../components/OurStory"
import FeaturedDishes from "../components/FeaturedDishes"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import Feedback from "./Feedback"
import { ThemeProvider } from "../context/ThemeContext"


export default function Home({ onReservationClick }) {
  return (
    <div>

      <ThemeProvider>
        <Hero onReservationClick={onReservationClick} />
        <OurStory />
        <FeaturedDishes />
        <Feedback />
        <Testimonials />
      </ThemeProvider>

      <Footer />
    </div>
  );
}
