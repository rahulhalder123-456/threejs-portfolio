import { useState } from 'react';

const LocalChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const askOllama = async (customInput = null) => {
    const userText = customInput ?? input;
    if (!userText.trim()) return;

    const userMessage = { sender: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    if (!customInput) setInput('');

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Only answer questions related to Rahul Halder, his CV, projects, portfolio or professional background. If the question is unrelated, reply: 'Sorry, I can only answer questions related to Rahul Halder's work and portfolio.'\n\nUser: ${userText}`
        }),
      });

      const data = await res.json();

      const botMessage = {
        sender: 'bot',
        text: data.response || "⚠️ Something went wrong.",
        retryable: !data.response,
        original: userText,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const botMessage = {
        sender: 'bot',
        text: "⚠️ Error connecting to the assistant.",
        retryable: true,
        original: userText,
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (originalText, index) => {
    // Remove both the failed user and bot messages
    setMessages(prev => prev.filter((_, i) => i < index - 1 || i > index));
    askOllama(originalText); // Re-send automatically
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl hover:scale-105 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.956 9.956 0 01-4.216-.9L3 20l1.9-4.784A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-md h-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 flex flex-col animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-indigo-700">🤖 Local ChatBot</h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`relative p-2 rounded-lg max-w-[80%] text-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-100 self-end text-right'
                    : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
                {msg.retryable && (
                  <button
                    onClick={() => handleRetry(msg.original, idx)}
                    disabled={loading}
                    className="block mt-1 text-xs text-red-600 underline"
                  >
                    Retry
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-indigo-500 animate-pulse">Thinking...</div>
            )}
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askOllama()}
            disabled={loading}
            className="mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      )}
    </>
  );
};

export default LocalChatBot;
