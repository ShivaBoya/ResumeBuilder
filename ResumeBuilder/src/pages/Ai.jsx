import React, { useState } from "react";

function OpenCopilotButton() {
  const [showInfo, setShowInfo] = useState(false);

  const openCopilot = () => {
    // Open GitHub Copilot in a new tab
    window.open("https://github.com/features/copilot", "_blank", "width=1200,height=800");
  };

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={openCopilot}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        <span className="material-icons">smart_toy</span>
        Open Copilot
      </button>

      {/* Tooltip */}
      {showInfo && (
        <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 w-72 p-4 bg-white border border-gray-300 rounded-xl shadow-lg z-20 animate-fadeIn">
          <h3 className="font-semibold text-gray-800 mb-1 text-lg">Resume Builder + Copilot</h3>
          <p className="text-gray-700 text-sm mb-2">
            GitHub Copilot helps you write Resume Builder code faster with AI-powered suggestions, automation, and examples.
          </p>
          <p className="text-gray-500 text-xs">
            Click to open Copilot docs and integrate smart code suggestions into your project.
          </p>
        </div>
      )}

      {/* Tooltip Animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translate(-50%, 10px); }
            100% { opacity: 1; transform: translate(-50%, 0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

export default OpenCopilotButton;
