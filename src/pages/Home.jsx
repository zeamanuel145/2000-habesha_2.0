import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import FeaturedDishes from "../components/FeaturedDishes";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Map from "../components/Map";

export default function Home({ onReservationClick }) {
  return (
    <div>
      <Hero onReservationClick={onReservationClick} />
      <OurStory />
      <FeaturedDishes />
      <Testimonials />
      <Map />
      <Footer />
    </div>
  );
}
