// Preview.jsx
import React from "react";

const Preview = ({ resumeData }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Resume Preview</h2>

      {/* Personal Info */}
      <div className="mb-4 border-b pb-2">
        <h3 className="text-xl font-semibold">{resumeData.personalInfo.name}</h3>
        <p>{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
        <p>{resumeData.personalInfo.address}</p>
        <p>
          {resumeData.personalInfo.linkedin && (
            <a href={resumeData.personalInfo.linkedin} className="text-blue-600" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {" | "}
          {resumeData.personalInfo.github && (
            <a href={resumeData.personalInfo.github} className="text-blue-600" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </p>
      </div>

      {/* Work Experience */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold border-b mb-2">Work Experience</h3>
        {resumeData.workExperience.map((exp, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold">{exp.position} at {exp.company}</p>
            <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold border-b mb-2">Education</h3>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold">{edu.degree}</p>
            <p>{edu.institution} | {edu.startDate} - {edu.endDate}</p>
            <p className="text-gray-600">Grade: {edu.grade}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold border-b mb-2">Skills</h3>
        <p>{resumeData.skills.filter(skill => skill).join(", ")}</p>
      </div>

      {/* Certifications */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold border-b mb-2">Certifications</h3>
        {resumeData.certifications.map((cert, idx) => (
          <p key={idx}>{cert.name} - {cert.issuer} ({cert.year})</p>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold border-b mb-2">Projects</h3>
        {resumeData.projects.map((proj, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-semibold">{proj.title}</p>
            <p>{proj.description}</p>
            <p className="text-sm">Tech: {proj.techStack.join(", ")}</p>
            {proj.githublink && (
              <a href={proj.githublink} className="text-blue-600" target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Cover Letter */}
      {resumeData.coverLetter.content && (
        <div>
          <h3 className="text-lg font-semibold border-b mb-2">Cover Letter</h3>
          <h4 className="font-semibold">{resumeData.coverLetter.title}</h4>
          <p>{resumeData.coverLetter.content}</p>
        </div>
      )}
    </div>
  );
};

export default Preview;
