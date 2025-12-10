import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

const ClassicTealTemplate = ({ data, id }) => {
    // Helper to format dates
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    // Determine if there are skills to show (handle array vs object)
    // Determine if there are skills to show (handle array vs object)
    const hasSkills = data.skills && (
        Array.isArray(data.skills)
            ? data.skills.filter(s => s && s.trim()).length > 0
            : Object.values(data.skills).some(arr => arr && arr.filter(s => s && s.trim()).length > 0)
    );

    return (
        <div className="bg-white min-h-[297mm] w-full mx-auto p-8 font-serif text-gray-900" id={id || "resume-content"}>
            {/* Header */}
            <header className="text-center mb-4">
                <h1 className="text-4xl font-bold text-[#008080] mb-2 tracking-wide">
                    {data.personalInfo.name || 'Your Name'}
                </h1>

                <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-800 font-medium">
                    {data.personalInfo.phone && (
                        <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            <span>{data.personalInfo.phone}</span>
                        </div>
                    )}
                    {data.personalInfo.email && (
                        <>
                            <span className="text-gray-400">|</span>
                            <div className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                <span>{data.personalInfo.email}</span>
                            </div>
                        </>
                    )}
                    {data.personalInfo.linkedin && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={data.personalInfo.linkedin} className="flex items-center hover:text-[#008080]">
                                <Linkedin className="w-3 h-3 mr-1" />
                                <span>LinkedIn</span>
                            </a>
                        </>
                    )}
                    {data.personalInfo.github && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={data.personalInfo.github} className="flex items-center hover:text-[#008080]">
                                <Github className="w-3 h-3 mr-1" />
                                <span>GitHub</span>
                            </a>
                        </>
                    )}
                    {data.personalInfo.portfolio && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={data.personalInfo.portfolio} className="flex items-center hover:text-[#008080]">
                                <Globe className="w-3 h-3 mr-1" />
                                <span>Portfolio</span>
                            </a>
                        </>
                    )}
                </div>

                {/* Gold Divider */}
                <div className="h-0.5 bg-[#B8860B] w-full mt-3 mb-4"></div>
            </header>

            {/* Summary */}
            {(data.personalInfo.summary || (data.coverLetter && data.coverLetter.content)) && (
                <section className="mb-6">
                    <div className="flex items-baseline mb-2">
                        <h2 className="text-lg font-bold text-[#008080] w-32 shrink-0">Summary</h2>
                        <span className="text-[#B8860B] mx-2">—</span>
                        <p className="text-sm leading-relaxed text-gray-800 text-justify">
                            {data.personalInfo.summary || data.coverLetter.content}
                        </p>
                    </div>
                </section>
            )}

            {/* Skills */}
            {hasSkills && (
                <section className="mb-6 border-t border-[#B8860B] pt-4">
                    <h2 className="text-lg font-bold text-[#008080] mb-3">Skills</h2>

                    <div className="space-y-2">
                        {Array.isArray(data.skills) ? (
                            // Handle Array Skills
                            <div className="flex text-sm">
                                <span className="font-bold text-gray-800 w-32 shrink-0">Technical Skills</span>
                                <span className="text-gray-700">{data.skills.join(', ')}</span>
                            </div>
                        ) : (
                            // Handle Object Skills
                            Object.entries(data.skills).map(([category, skills]) => {
                                if (!skills || skills.length === 0) return null;
                                return (
                                    <div key={category} className="flex text-sm">
                                        <span className="font-bold text-gray-800 w-32 shrink-0 capitalize">{category}</span>
                                        <span className="text-gray-700">{skills.join(', ')}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <div className="mb-6">
                    <div className="flex text-sm">
                        <span className="font-bold text-gray-800 w-32 shrink-0">Languages</span>
                        <span className="text-gray-700">{data.languages.join(', ')}</span>
                    </div>
                </div>
            )}


            {/* Education */}
            {data.education && data.education.some(edu => edu.institution) && (
                <section className="mb-6 border-t border-[#B8860B] pt-4">
                    <h2 className="text-lg font-bold text-[#008080] mb-4">Education</h2>

                    <div className="space-y-4">
                        {data.education.filter(edu => edu.institution).map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">{edu.field ? `${edu.field}` : edu.degree}</h3>
                                    <div className="text-sm italic text-gray-700">{edu.institution}, {edu.location}</div>
                                    {edu.degree && edu.field && <div className="text-sm text-gray-600">{edu.degree}</div>}
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.some(proj => proj.title) && (
                <section className="mb-6 border-t border-[#B8860B] pt-4">
                    <h2 className="text-lg font-bold text-[#008080] mb-4">Projects</h2>

                    <div className="space-y-4">
                        {data.projects.filter(proj => proj.title).map((proj, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold italic text-gray-900 text-base">
                                        {proj.title}
                                    </h3>
                                    {proj.liveLink && (
                                        <a href={proj.liveLink} className="text-[#008080] text-sm font-bold hover:underline flex items-center">
                                            Live Link
                                        </a>
                                    )}
                                </div>

                                <div className="text-sm text-gray-800 text-justify">
                                    <ul className="list-disc space-y-1 pl-5">
                                        {proj.description && proj.description.split('.').map((sentence, i) => {
                                            if (!sentence.trim()) return null;
                                            return <li key={i}>{sentence.trim()}.</li>
                                        })}
                                        {(!proj.description) && <li>Description not provided.</li>}

                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <li className="mt-1 list-none -ml-5">
                                                <span className="font-semibold">Technologies:</span> {proj.techStack.join(', ')}
                                            </li>
                                        )}
                                    </ul>
                                    {proj.githubLink && (
                                        <div className="mt-1">
                                            <a href={proj.githubLink} className="text-gray-600 hover:text-[#008080] text-xs flex items-center gap-1">
                                                <Github className="w-3 h-3" /> Visit the GitHub repository
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Declaration */}
            {data.declaration && data.declaration.trim() !== "" && (
                <section className="mt-8 border-t border-[#B8860B] pt-4">
                    <h2 className="text-lg font-bold text-[#008080] mb-2">Declaration</h2>
                    <p className="text-sm italic text-gray-700">
                        {data.declaration}
                    </p>
                </section>
            )}

        </div>
    );
};

export default ClassicTealTemplate;
