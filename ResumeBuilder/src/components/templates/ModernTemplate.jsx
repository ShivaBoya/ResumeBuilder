import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ModernTemplate = ({ data, theme }) => {
    const { personal, summary, experience, education, skills, projects, certifications } = data;

    return (
        <div className="w-full bg-white min-h-[1123px] font-sans text-slate-800">
            {/* Header / Sidebar Layout */}
            <div className="flex h-full">

                {/* Left Sidebar */}
                <div className="w-1/3 min-h-full p-8 text-white space-y-6" style={{ backgroundColor: theme.primary }}>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold border-b border-white/30 pb-2 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            {personal.email && (
                                <li className="flex items-center gap-2 break-all">
                                    <Mail size={16} /> <span>{personal.email}</span>
                                </li>
                            )}
                            {personal.phone && (
                                <li className="flex items-center gap-2">
                                    <Phone size={16} /> <span>{personal.phone}</span>
                                </li>
                            )}
                            {personal.address && (
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} /> <span>{personal.address}</span>
                                </li>
                            )}
                            {personal.linkedin && (
                                <li className="flex items-center gap-2 break-all">
                                    <Linkedin size={16} /> <a href={personal.linkedin} className="hover:underline">LinkedIn</a>
                                </li>
                            )}
                            {personal.github && (
                                <li className="flex items-center gap-2 break-all">
                                    <Github size={16} /> <a href={personal.github} className="hover:underline">GitHub</a>
                                </li>
                            )}
                            {personal.portfolio && (
                                <li className="flex items-center gap-2 break-all">
                                    <Globe size={16} /> <a href={personal.portfolio} className="hover:underline">Portfolio</a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Education */}
                    {education.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b border-white/30 pb-2 uppercase tracking-wider">Education</h3>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h4 className="font-bold text-lg">{edu.degree}</h4>
                                        <p className="text-white/90">{edu.institution}</p>
                                        <p className="text-xs text-white/70">{edu.startDate} - {edu.endDate}</p>
                                        {edu.grade && <p className="text-xs mt-1">Grade: {edu.grade}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {Object.keys(skills).length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b border-white/30 pb-2 uppercase tracking-wider">Skills</h3>
                            <div className="space-y-4">
                                {/* Check if skills is array (legacy) or object (new) */}
                                {Array.isArray(skills) ? (
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, i) => (
                                            <span key={i} className="bg-white/20 px-2 py-1 rounded text-sm">{skill}</span>
                                        ))}
                                    </div>
                                ) : (
                                    Object.entries(skills).map(([category, items]) => (
                                        <div key={category}>
                                            <h5 className="font-bold text-sm mb-2 opacity-90">{category}</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((skill, i) => (
                                                    <span key={i} className="bg-white/20 px-2 py-1 rounded text-xs">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="w-2/3 p-8 space-y-6">

                    {/* Name & Title */}
                    <div className="border-b-2 border-gray-200 pb-6">
                        <h1 className="text-5xl font-bold uppercase tracking-tight" style={{ color: theme.primary }}>{personal.name}</h1>
                        <h2 className="text-xl mt-2 font-medium text-gray-500 tracking-widest uppercase">{personal.title || "Career Title"}</h2>
                    </div>

                    {/* Summary */}
                    {summary && (
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: theme.secondary }}>
                                Profile
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {summary}
                                {/* Fallback to coverLetter if summary empty for migration */}
                                {!summary && data.coverLetter?.content}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: theme.secondary }}>
                                Experience
                            </h3>
                            <div className="space-y-6">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.primary }}>
                                        <h4 className="text-lg font-bold text-gray-800">{exp.position}</h4>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-gray-600">{exp.company}</span>
                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: theme.secondary }}>
                                Projects
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map(proj => (
                                    <div key={proj.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800">{proj.title}</h4>
                                            {proj.githubLink && (
                                                <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                                                    View Code
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1 mb-2">{proj.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {proj.techStack.map((tech, i) => (
                                                <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
