"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

const CopilotWidget = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you're asking: "${userMessage.content}". For full capabilities, open in a new tab.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenCopilotWeb = () => {
    window.open(
      "https://github.com/features/copilot",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className={`fixed top-16 right-0 h-[calc(100%-4rem)] w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-l border-gray-200 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
        <div>
          <h3 className="text-lg font-semibold">AI Assistant</h3>
          <p className="text-xs opacity-75">Powered by AI</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-indigo-500 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages / Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Connecting to AI Assistant...</p>
          </div>
        ) : messages.length === 0 ? (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Ask me anything
            </h3>
            <p className="text-gray-600 mb-4">Here are some ideas:</p>
            <div className="space-y-2">
              {[
                "How can I improve my resume for a software developer role?",
                "Generate a professional summary for my resume",
                "Suggest skills to add for a data analyst position",
                "What are the best resume templates for freshers?",
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(text)}
                  className="w-full text-left bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg shadow-sm text-gray-800 transition"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.type === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="p-2 border-t text-center">
        <button
          onClick={handleOpenCopilotWeb}
          className="text-indigo-600 hover:underline text-sm"
        >
          Open in new tab
        </button>
      </div>
    </div>
  );
};

export default CopilotWidget;
