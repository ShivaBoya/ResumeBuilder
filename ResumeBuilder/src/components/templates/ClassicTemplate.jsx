import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ClassicTemplate = ({ data, theme }) => {
    // Helper to format dates
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const { personal, summary, experience, education, skills, projects, languages, declaration } = data;

    // Determine if there are skills to show (handle array vs object)
    const hasSkills = skills && (
        Array.isArray(skills)
            ? skills.filter(s => s && s.trim()).length > 0
            : Object.values(skills).some(arr => arr && arr.filter(s => s && s.trim()).length > 0)
    );

    return (
        <div className="bg-white min-h-[1123px] w-full mx-auto p-8 font-serif text-gray-900" style={{ color: theme.text }}>
            {/* Header */}
            <header className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-2 tracking-wide uppercase" style={{ color: theme.primary }}>
                    {personal.name || 'Your Name'}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium" style={{ color: theme.secondary }}>
                    {personal.phone && (
                        <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            <span>{personal.phone}</span>
                        </div>
                    )}
                    {personal.email && (
                        <>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                <span>{personal.email}</span>
                            </div>
                        </>
                    )}
                    {personal.linkedin && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={personal.linkedin} className="flex items-center hover:underline">
                                <Linkedin className="w-3 h-3 mr-1" />
                                <span>LinkedIn</span>
                            </a>
                        </>
                    )}
                    {personal.github && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={personal.github} className="flex items-center hover:underline">
                                <Github className="w-3 h-3 mr-1" />
                                <span>GitHub</span>
                            </a>
                        </>
                    )}
                    {personal.portfolio && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={personal.portfolio} className="flex items-center hover:underline">
                                <Globe className="w-3 h-3 mr-1" />
                                <span>Portfolio</span>
                            </a>
                        </>
                    )}
                </div>

                {/* Divider */}
                <div className="h-0.5 w-full mt-3 mb-4" style={{ backgroundColor: theme.secondary }}></div>
            </header>

            {/* Summary */}
            {(summary || (data.coverLetter && data.coverLetter.content)) && (
                <section className="mb-6">
                    <div className="flex items-baseline mb-2">
                        <h2 className="text-lg font-bold w-32 shrink-0 uppercase" style={{ color: theme.primary }}>Summary</h2>
                        <span className="mx-2" style={{ color: theme.secondary }}>—</span>
                        <p className="text-sm leading-relaxed text-justify">
                            {summary || data.coverLetter.content}
                        </p>
                    </div>
                </section>
            )}

            {/* Skills */}
            {hasSkills && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: theme.secondary }}>
                    <div className="flex">
                        <h2 className="text-lg font-bold w-32 shrink-0 uppercase" style={{ color: theme.primary }}>Skills</h2>
                        <div className="flex-1 space-y-2">
                            {Array.isArray(skills) ? (
                                <div className="text-sm">
                                    <span className="font-semibold mr-2">Technical Skills:</span>
                                    <span>{skills.join(', ')}</span>
                                </div>
                            ) : (
                                Object.entries(skills).map(([category, items]) => {
                                    if (!items || items.length === 0) return null;
                                    return (
                                        <div key={category} className="text-sm">
                                            <span className="font-semibold mr-2 capitalize">{category}:</span>
                                            <span>{items.join(', ')}</span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience && experience.some(exp => exp.company) && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: theme.secondary }}>
                    <h2 className="text-lg font-bold mb-4 uppercase" style={{ color: theme.primary }}>Experience</h2>
                    <div className="space-y-5">
                        {experience.filter(exp => exp.company).map((exp, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4">
                                <div className="sm:w-32 shrink-0 text-sm font-bold opacity-80">
                                    {exp.startDate} — {exp.endDate}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base" style={{ color: theme.text }}>{exp.position}</h3>
                                    <div className="text-sm italic mb-1" style={{ color: theme.secondary }}>{exp.company}</div>
                                    <p className="text-sm text-justify leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.some(edu => edu.institution) && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: theme.secondary }}>
                    <h2 className="text-lg font-bold mb-4 uppercase" style={{ color: theme.primary }}>Education</h2>
                    <div className="space-y-4">
                        {education.filter(edu => edu.institution).map((edu, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4">
                                <div className="sm:w-32 shrink-0 text-sm font-bold opacity-80">
                                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base" style={{ color: theme.text }}>{edu.degree}</h3>
                                    <div className="text-sm italic" style={{ color: theme.secondary }}>{edu.institution}</div>
                                    {edu.grade && <div className="text-sm mt-1">Grade: {edu.grade}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.some(proj => proj.title) && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: theme.secondary }}>
                    <h2 className="text-lg font-bold mb-4 uppercase" style={{ color: theme.primary }}>Projects</h2>
                    <div className="space-y-4">
                        {projects.filter(proj => proj.title).map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base" style={{ color: theme.text }}>
                                        {proj.title}
                                    </h3>
                                    {proj.githubLink && (
                                        <a href={proj.githubLink} className="text-sm hover:underline flex items-center gap-1" style={{ color: theme.primary }}>
                                            <Github size={12} /> Repo
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-justify">
                                    {proj.description}
                                </p>
                                {proj.techStack && proj.techStack.length > 0 && (
                                    <div className="text-xs mt-1 opacity-75">
                                        <span className="font-semibold">Tech:</span> {proj.techStack.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Declaration */}
            {declaration && declaration.trim() !== "" && (
                <section className="mt-8 border-t pt-4" style={{ borderColor: theme.secondary }}>
                    <h2 className="text-lg font-bold mb-2 uppercase" style={{ color: theme.primary }}>Declaration</h2>
                    <p className="text-sm italic">
                        {declaration}
                    </p>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
