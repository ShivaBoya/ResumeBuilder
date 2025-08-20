import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CopilotWidget from "./CopilotWidget";

const Preview = ({ resumeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onAIAssistantClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-50 to-white shadow-2xl rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200">
      
      {/* ✅ AI Assistant Button */}
      <button
        onClick={onAIAssistantClick}
        className="absolute top-4 right-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105"
      >
        AI Assistant
      </button>

      {/* ✅ Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* ✅ CopilotWidget */}
        <div className="h-[calc(100%-64px)] overflow-hidden">
          <CopilotWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>

      {/* ✅ Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ✅ Resume Preview Section */}
      <div id="resume-content" className="p-6">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
          Resume Preview
        </h2>

        {/* Personal Info */}
        <div className="mb-6 border-b border-gray-300 pb-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            {resumeData.personalInfo.name}
          </h3>
          <p className="text-gray-600 mt-1">
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
          </p>
          <p className="text-gray-500">{resumeData.personalInfo.address}</p>
          <div className="mt-2 space-x-4">
            {resumeData.personalInfo.linkedin && (
              <a
                href={resumeData.personalInfo.linkedin}
                className="text-blue-500 hover:text-blue-700 font-semibold"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {resumeData.personalInfo.github && (
              <a
                href={resumeData.personalInfo.github}
                className="text-gray-800 hover:text-gray-900 font-semibold"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-indigo-600 border-b border-indigo-300 mb-3 pb-1">
            Work Experience
          </h3>
          {resumeData.workExperience.length > 0 ? (
            resumeData.workExperience.map((exp, idx) => (
              <div
                key={idx}
                className="mb-4 bg-indigo-50 p-4 rounded-lg hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">
                  {exp.position} at {exp.company}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No work experience added</p>
          )}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-indigo-600 border-b border-indigo-300 mb-3 pb-1">
            Education
          </h3>
          {resumeData.education.length > 0 ? (
            resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="mb-4 bg-green-50 p-4 rounded-lg hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.institution} | {edu.startDate} - {edu.endDate}
                </p>
                <p className="text-gray-700 mt-1">Grade: {edu.grade}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No education details added</p>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-indigo-600 border-b border-indigo-300 mb-3 pb-1">
            Skills
          </h3>
          {resumeData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills
                .filter((skill) => skill)
                .map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No skills added</p>
          )}
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-indigo-600 border-b border-indigo-300 mb-3 pb-1">
            Certifications
          </h3>
          {resumeData.certifications.length > 0 ? (
            resumeData.certifications.map((cert, idx) => (
              <p
                key={idx}
                className="bg-yellow-50 p-3 rounded-lg shadow-sm mb-2"
              >
                <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({cert.year})
              </p>
            ))
          ) : (
            <p className="text-gray-500 italic">No certifications added</p>
          )}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-indigo-600 border-b border-indigo-300 mb-3 pb-1">
            Projects
          </h3>
          {resumeData.projects.length > 0 ? (
            resumeData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="mb-4 bg-purple-50 p-4 rounded-lg hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">{proj.title}</p>
                <p className="text-gray-700 mt-1">{proj.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Tech: {proj.techStack.join(", ")}
                </p>
                {proj.githublink && (
                  <a
                    href={proj.githublink}
                    className="text-blue-500 hover:underline font-medium"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No projects added</p>
          )}
        </div>

        {/* Cover Letter */}
        {resumeData.coverLetter.content && (
          <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-pink-700 border-b border-pink-300 mb-2 pb-1">
              Cover Letter
            </h3>
            <h4 className="font-semibold text-gray-800">
              {resumeData.coverLetter.title}
            </h4>
            <p className="text-gray-700 mt-2">{resumeData.coverLetter.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
