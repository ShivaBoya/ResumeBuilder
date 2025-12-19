import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import {
  MessageSquare,
  Brain,
  FileSearch,
  Send,
  Bot,
  User,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Lightbulb
} from "lucide-react";
import SkillAssessment from "../components/SkillAssessment";

const Ai = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI Career Coach. I can help you optimize your resume, suggest skills, or prepare for interviews. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: "assistant",
          content: "Please log in to use the AI Assistant.",
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/ai/chat`,
        { message: userMsg.content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: `Bearer ${refreshToken}`
          }
        }
      );

      const aiResponse = res.data.response;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage = error.response?.status === 401
        ? "Session expired. Please log in again."
        : "Sorry, I encountered an error. Please try again.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: errorMessage,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === "assistant" ? "bg-gradient-to-br from-indigo-500 to-purple-500" : "bg-gray-200 dark:bg-slate-700"
                    }`}>
                    {msg.type === "assistant" ? <Bot size={20} className="text-white" /> : <User size={20} className="text-gray-600 dark:text-gray-300" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.type === "assistant"
                    ? "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700"
                    : "bg-indigo-600 text-white rounded-tr-none"
                    }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <span className={`text-xs mt-2 block ${msg.type === "assistant" ? "text-gray-400" : "text-indigo-200"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="max-w-[80%] p-4 rounded-2xl shadow-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
              <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for resume advice, interview tips, or skill suggestions..."
                  className="w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-slate-700 transition-all shadow-inner"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="p-8 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                <Brain size={48} />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Skill Assessment & Validation</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Take our AI-powered quizzes to validate your expertise and get a "Verified" badge on your resume.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-8 border-l-4 border-green-500 hover:shadow-xl transition-all group">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="text-green-500" /> Technical Skills
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Validate your knowledge in React, Node.js, Python, and more. Get personalized learning paths.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "Node.js", "Python", "AWS"].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowSkillModal(true)}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all transform group-hover:-translate-y-1"
                >
                  Start Assessment
                </button>
              </div>

              <div className="glass-card p-8 border-l-4 border-purple-500 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Brain className="text-purple-500" /> Soft Skills
                  </h3>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs font-bold rounded uppercase">Coming Soon</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Assess leadership, communication, and problem-solving abilities through scenario-based questions.
                </p>
                <button disabled className="w-full py-3 bg-gray-200 dark:bg-slate-700 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                  Available Soon
                </button>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="p-8 max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <FileSearch size={48} />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI Resume Review</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
                Upload your existing resume (PDF/Docx) and let our AI analyze it for ATS compatibility, grammar, and impact scoring.
              </p>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all transform hover:scale-105">
                Upload Resume
              </button>
              <p className="mt-4 text-sm text-gray-400">Supported formats: PDF, DOCX (Max 5MB)</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background text-foreground transition-colors duration-300 overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar navigation */}
      <aside className={`
        fixed lg:static top-16 left-0 h-full w-72 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 z-30 transition-transform duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Bot /> AI Coach
          </h2>
          <p className="text-xs text-gray-500 mt-1">Your personal career assistant</p>
        </div>

        <nav className="px-4 space-y-2">
          {[
            { id: "chat", label: "Chat Assistant", icon: MessageSquare },
            { id: "skills", label: "Skill Assessment", icon: Brain },
            { id: "review", label: "Resume Review", icon: FileSearch },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left
                        ${activeTab === item.id
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }
                    `}
            >
              <item.icon size={20} />
              {item.label}
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-20 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="flex items-start gap-3">
            <Lightbulb size={24} className="flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Did you know?</h4>
              <p className="text-xs opacity-90 mt-1">Resumes with quantified achievements get 3x more interviews.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-slate-900 relative">

        {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 dark:text-gray-300">
            <Menu size={24} />
          </button>
          <span className="font-bold capitalize">{activeTab.replace("-", " ")}</span>
          <div className="w-8" /> {/* spacer */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>

      </main>

      {/* Skill Modal */}
      {showSkillModal && (
        <SkillAssessment
          onClose={() => setShowSkillModal(false)}
          onSkillsSelected={(skills) => {
            setShowSkillModal(false);
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              type: "assistant",
              content: `Great job completing the assessment! I've confirmed your proficiency in: ${skills.join(", ")}. Would you like me to add these to your resume draft?`,
              timestamp: new Date()
            }]);
            setActiveTab("chat");
          }}
        />
      )}
    </div>
  );
};

export default Ai;
