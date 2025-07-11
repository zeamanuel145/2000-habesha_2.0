"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Drinks from "./pages/Drinks"
import OurStory from "./pages/OurStory"
import Feedback from "./pages/Feedback"
import Contact from "./pages/Contact"
import ProductDetail from "./pages/ProductDetail"
import ReservationModal from "./components/ReservationModal"
import ChatBox from "./components/ChatBox"
import { ThemeProvider } from "./context/ThemeContext"
import "./App.css"

function App() {
  const [showReservation, setShowReservation] = useState(false)

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header onReservationClick={() => setShowReservation(true)} />

          <Routes>
            <Route path="/" element={<Home onReservationClick={() => setShowReservation(true)} />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>

          {showReservation && <ReservationModal onClose={() => setShowReservation(false)} />}
          <ChatBox />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
