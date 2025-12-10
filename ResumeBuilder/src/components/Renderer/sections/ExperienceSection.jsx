import React from 'react';

const ExperienceSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data)) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1 opacity-80"
                style={{ borderColor: theme?.vars?.['--secondary'] }}>
                Professional Experience
            </h3>

            <div className="space-y-5">
                {data.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-md">{item.jobTitle || item.position}</h4>
                            <span className="text-xs opacity-70 font-mono whitespace-nowrap">
                                {item.startDate} {item.startDate && item.endDate ? ' - ' : ''} {item.isCurrent ? 'Present' : item.endDate}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-2 opacity-90">
                            <span className="font-semibold" style={{ color: theme?.vars?.['--secondary'] }}>{item.company}</span>
                            <span className="text-xs italic">{item.location}</span>
                        </div>

                        {/* Render Responsibilities (Bullet List) */}
                        {Array.isArray(item.responsibilities) && item.responsibilities.length > 0 ? (
                            <ul className="list-disc ml-4 text-sm opacity-80 leading-relaxed space-y-1">
                                {item.responsibilities.map((bull, bIdx) => (
                                    <li key={bIdx}>{bull}</li>
                                ))}
                            </ul>
                        ) : (
                            // Fallback for simple description string
                            item.description && <p className="text-sm opacity-80 leading-relaxed whitespace-pre-line">{item.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceSection;
