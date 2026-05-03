import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Hanuman Jewellers (Demo). How can I assist you today? Try typing "order", "hours", or "returns".' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Rule-based logic
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.includes('order')) {
        botResponse = 'Please provide your 6-character Order ID so I can check the status for you.';
      } else if (lowerInput.includes('hours')) {
        botResponse = 'Our Bahraich store is open Monday to Saturday, from 10:30 AM to 8:00 PM. We are closed on Sundays.';
      } else if (lowerInput.includes('returns')) {
        botResponse = 'We offer a 7-day return policy for unused jewelry. Custom orders and personalized items are non-refundable.';
      } else {
        botResponse = 'I am a demo bot! I only understand questions about your "order", our "hours", or "returns".';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-premium-maroon text-white p-4 rounded-full shadow-2xl hover:bg-red-900 transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden z-50 border border-gray-200 flex flex-col h-[450px]">
          {/* Header */}
          <div className="bg-premium-maroon text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-lg">Hanuman Assistant</h3>
              <p className="text-xs text-red-200">(Demo)</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-premium-gold text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold"
            />
            <button 
              type="submit"
              className="bg-premium-maroon text-white p-2 rounded-full hover:bg-red-900 transition-colors"
              aria-label="Send Message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
