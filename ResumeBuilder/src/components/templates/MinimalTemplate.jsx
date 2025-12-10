import React from 'react';

const MinimalTemplate = ({ data, theme }) => {
    const { personal, summary, experience, education, skills, projects } = data;

    return (
        <div className="bg-white min-h-[1123px] w-full mx-auto p-12 font-sans text-gray-800" style={{ color: theme.text }}>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-light mb-2 tracking-tight" style={{ color: theme.primary }}>{personal.name}</h1>
                <p className="text-lg text-gray-500 mb-4">{personal.title}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.linkedin && <a href={personal.linkedin} className="hover:underline">LinkedIn</a>}
                    {personal.portfolio && <a href={personal.portfolio} className="hover:underline">Portfolio</a>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-8">
                    <p className="text-sm leading-7 text-gray-600 border-l-2 pl-4" style={{ borderColor: theme.secondary }}>
                        {summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-80" style={{ color: theme.secondary }}>Experience</h3>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-xs font-mono text-gray-400">
                                    {exp.startDate} - {exp.endDate}
                                </div>
                                <div className="md:col-span-3">
                                    <h4 className="font-bold">{exp.position}</h4>
                                    <div className="text-sm text-gray-500 mb-2">{exp.company}</div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-80" style={{ color: theme.secondary }}>Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((proj, i) => (
                            <div key={i} className='border-t pt-4' style={{ borderColor: theme.bg !== '#ffffff' ? theme.bg : '#f3f4f6' }}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-sm">{proj.title}</h4>
                                    {proj.githubLink && <a href={proj.githubLink} className="text-xs opacity-50 hover:opacity-100">Code</a>}
                                </div>
                                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{proj.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {proj.techStack.map((t, k) => (
                                        <span key={k} className="text-[10px] opacity-60">#{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education & Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-8" style={{ borderColor: '#f3f4f6' }}>

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: theme.secondary }}>Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <div className="font-bold text-sm">{edu.degree}</div>
                                    <div className="text-xs text-gray-500">{edu.institution}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: theme.secondary }}>Skills</h3>
                    <div className="space-y-4">
                        {Array.isArray(skills) ? (
                            <div className="text-sm text-gray-600">{skills.join(', ')}</div>
                        ) : (
                            Object.entries(skills).map(([cat, items]) => (
                                <div key={cat}>
                                    <span className="text-xs font-bold block mb-1 opacity-70">{cat}</span>
                                    <div className="text-sm text-gray-600">{items.join(', ')}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default MinimalTemplate;
