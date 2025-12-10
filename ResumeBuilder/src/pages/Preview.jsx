import React from "react";

const Preview = ({ resumeData }) => {
  const { theme } = resumeData;
  const color = theme?.color || "#2563eb"; // proper fallback defaults
  const font = theme?.font || "Arial";
  const layout = theme?.layout?.toString() || "classic";

  // Common Section Components
  const Header = ({ centered = false }) => (
    <div className={`${centered ? "text-center border-b-2 pb-6 mb-6" : "mb-6"} border-opacity-50`} style={{ borderColor: color, fontFamily: font }}>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase mb-2" style={{ color: "black" }}>
        {resumeData.personalInfo.name || "Your Name"}
      </h1>
      <div className={`flex flex-wrap ${centered ? "justify-center" : ""} gap-3 text-sm md:text-base text-gray-700 font-medium`}>
        {resumeData.personalInfo.email && <span>✉️ {resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.phone && <span>📞 {resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.address && <span>📍 {resumeData.personalInfo.address}</span>}
      </div>
      <div className={`mt-3 flex ${centered ? "justify-center" : ""} gap-4 text-sm font-semibold`}>
        {resumeData.personalInfo.linkedin && (
          <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline" style={{ color }}>LinkedIn</a>
        )}
        {resumeData.personalInfo.github && (
          <a href={resumeData.personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline" style={{ color }}>GitHub</a>
        )}
      </div>
    </div>
  );

  const SectionTitle = ({ icon, title }) => (
    <h2 className="text-xl font-bold border-b mb-3 pb-1 uppercase tracking-wider flex items-center gap-2" style={{ borderColor: color, color: "black", fontFamily: font }}>
      <span style={{ color }}>{icon}</span> {title}
    </h2>
  );

  const ExperienceItem = ({ exp }) => (
    <div className="mb-4 relative pl-4 border-l-2 transition-colors duration-300" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {exp.startDate} – {exp.endDate || "Present"}
        </span>
      </div>
      <div className="text-base font-semibold mb-2" style={{ color }}>{exp.company}</div>
      <p className="text-gray-700 leading-relaxed text-sm text-justify whitespace-pre-line">{exp.description}</p>
    </div>
  );

  /** Layouts **/

  // 1. Classic (Single Column, Centered Header)
  const ClassicLayout = () => (
    <div className="p-8 md:p-12 bg-white min-h-[11in] shadow-2xl">
      <Header centered={true} />

      {/* Summary */}
      {resumeData.coverLetter?.content && (
        <section className="mb-6">
          <SectionTitle icon="📝" title="Professional Summary" />
          <div className="text-gray-800 leading-relaxed text-justify">{resumeData.coverLetter.content}</div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-6">
          <SectionTitle icon="🛠" title="Technical Skills" />
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.filter(s => s).map((skill, idx) => (
              <span key={idx} className="text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm" style={{ backgroundColor: color }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-8">
        {/* Experience */}
        {resumeData.workExperience.length > 0 && (
          <section>
            <SectionTitle icon="💼" title="Work Experience" />
            <div>{resumeData.workExperience.map((exp, idx) => <ExperienceItem key={idx} exp={exp} />)}</div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <SectionTitle icon="🚀" title="Projects" />
            <div className="grid gap-4">
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-transparent hover:border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{proj.title}</h3>
                    {proj.githubLink && (
                      <a href={proj.githubLink} className="text-xs bg-gray-200 px-2 py-1 rounded font-bold" target="_blank" rel="noreferrer">Code ↗</a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack?.map((t, i) => <span key={i} className="text-xs text-gray-600 bg-white border px-1 rounded">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.education.length > 0 && (
            <section>
              <SectionTitle icon="🎓" title="Education" />
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <div className="text-sm text-gray-600">{edu.degree}</div>
                  <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}
          {resumeData.certifications.length > 0 && (
            <section>
              <SectionTitle icon="🏆" title="Certifications" />
              <ul className="space-y-2">
                {resumeData.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-800">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-gray-500">({cert.year})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // 2. Modern Layout (Two Columns, Sidebar)
  const ModernLayout = () => (
    <div className="flex min-h-[11in] shadow-2xl bg-white">
      {/* Sidebar */}
      <div className="w-1/3 p-8 text-white min-h-full flex flex-col gap-6" style={{ backgroundColor: color }}>
        <div className="text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            {resumeData.personalInfo.name?.charAt(0) || "U"}
          </div>
          <h1 className="text-2xl font-bold uppercase leading-tight mb-2 break-words">{resumeData.personalInfo.name}</h1>
          <div className="text-sm opacity-90 space-y-2 text-left mt-4">
            {resumeData.personalInfo.email && <div className="break-all text-xs">✉️ {resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div>📞 {resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.address && <div>📍 {resumeData.personalInfo.address}</div>}
          </div>
        </div>

        {/* Skills in Sidebar */}
        {resumeData.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold border-b border-white/30 mb-3 uppercase">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.filter(s => s).map((s, i) => (
                <span key={i} className="text-xs bg-black/20 px-2 py-1 rounded">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {resumeData.education.length > 0 && (
          <div>
            <h3 className="text-lg font-bold border-b border-white/30 mb-3 uppercase">Education</h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-3 text-sm">
                <div className="font-bold">{edu.institution}</div>
                <div className="opacity-80">{edu.degree}</div>
                <div className="opacity-60 text-xs">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {resumeData.coverLetter?.content && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-2" style={{ color }}>Profile</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{resumeData.coverLetter.content}</p>
          </div>
        )}

        {resumeData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4" style={{ color }}>Make it Happen</h2>
            {resumeData.workExperience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                <div className="flex justify-between items-center text-sm font-semibold mb-2" style={{ color }}>
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                </div>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-4" style={{ color }}>Projects</h2>
            <div className="grid gap-4">
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="border-l-4 pl-4" style={{ borderColor: color }}>
                  <h3 className="font-bold text-gray-800">{proj.title}</h3>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );


  // Render based on Layout ID or Name
  const useModern = ["modern", "creative", "2", "4", "7"].includes(layout);

  return (
    <div className="relative w-full max-w-[210mm] mx-auto transition-all duration-500 font-sans">
      {useModern ? <ModernLayout /> : <ClassicLayout />}
    </div>
  );
};

export default Preview;
