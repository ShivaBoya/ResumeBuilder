"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, Sparkles, Bot, User } from "lucide-react";

const CopilotWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm your AI Resume Assistant. How can I help you build the perfect resume today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    "Improve my professional summary",
    "What key skills should I add?",
    "Review my work experience",
    "Suggest a better headline"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI Response (Mock)
    setTimeout(() => {
      let responseText = "I can certainly help with that! Since I'm currently in demo mode, I suggest checking our 'Templates' section for design ideas.";

      if (text.toLowerCase().includes("summary")) {
        responseText = "For a strong summary, focus on your years of experience, key achievements, and what unique value you bring. Try starting with: 'Results-oriented Professional with X years of experience in...'";
      } else if (text.toLowerCase().includes("skills")) {
        responseText = "Tailor your skills to the job description! Categorize them into Technical (e.g., React, Node.js) and Soft Skills (e.g., Leadership, Communication). Our new 'Categorized Skills' feature is perfect for this.";
      } else if (text.toLowerCase().includes("experience")) {
        responseText = "Use bullet points starting with strong action verbs (e.g., 'Led', 'Developed', 'Optimized'). Quantify your results whenever possible (e.g., 'Increased efficiency by 20%').";
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Backdrop for mobile - closes on click */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
        />
      )}

      {/* Slide-In Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-[100] flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="p-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
              <Bot className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Information Warning */}
        <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-xs text-center text-indigo-700 dark:text-indigo-300 border-b border-indigo-100 dark:border-indigo-900/10">
          AI can make mistakes. Verify important information.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black/20 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === "user" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
                }`}>
                {msg.type === "user" ? <User size={16} /> : <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.type === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none"
                  }`}
              >
                <div className="leading-relaxed">{msg.content}</div>
                <span className={`text-[10px] block mt-1 text-right ${msg.type === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(s)}
                className="whitespace-nowrap px-3 py-1.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm flex-shrink-0"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 sticky bottom-0">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for advice..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopilotWidget;
