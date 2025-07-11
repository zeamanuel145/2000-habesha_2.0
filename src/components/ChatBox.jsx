"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I help you today?", sender: "bot" }])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your message! Our team will get back to you shortly.",
        sender: "bot",
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col z-40">
          {/* Chat Header */}
          <div className="bg-yellow-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat with us</h3>
            <p className="text-sm opacity-90">We're here to help!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
