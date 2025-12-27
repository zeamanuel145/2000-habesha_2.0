"use client"
import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const BACKEND_URL = "https://two000-habesha-2-0.onrender.com"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: "Hello! How can I help you today?", sender: "bot" }])
    }
    if (isOpen) inputRef.current?.focus()
  }, [isOpen, messages.length])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    const newUserMessage = { id: messages.length + 1, text: userMessage, sender: "user" }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { id: prev.length + 1, text: data.response, sender: "bot" }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: `Error: Could not connect to the chatbot. Please try again. (${error.message})`,
          sender: "bot",
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <>
      {/* Floating Button (Always Visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 
                     w-[95%] sm:w-[420px] md:w-[380px] 
                     h-[70vh] sm:h-[550px] 
                     bg-white dark:bg-gray-800 rounded-lg shadow-2xl 
                     border border-gray-200 dark:border-gray-700 
                     flex flex-col z-40 transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-yellow-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg text-center">Chat with us</h3>
            <p className="text-sm opacity-90 text-center">We’re here to help!</p>
          </div>

          {/* Messages Section */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[75%] p-3 rounded-lg text-sm break-words ${
                    msg.sender === "user"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-yellow-500 
                           dark:bg-gray-700 dark:text-white text-sm"
                disabled={isLoading}
                ref={inputRef}
              />
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
