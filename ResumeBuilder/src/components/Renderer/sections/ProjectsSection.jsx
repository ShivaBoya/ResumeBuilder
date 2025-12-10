import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold tracking-widest mb-3 border-b pb-1"
                style={{
                    borderColor: theme?.vars?.['--divider-color'] || '#000',
                    color: theme?.vars?.['--primary'] || '#000',
                    textTransform: theme?.vars?.['--heading-transform'] || 'uppercase',
                    fontFamily: theme?.vars?.['--heading-font']
                }}>
                Projects
            </h3>

            <div className="space-y-5">
                {data.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-md" style={{ color: theme?.vars?.['--text'] }}>{item.title}</h4>
                            <div className="flex gap-3">
                                {item.liveLink && (
                                    <a href={item.liveLink} target="_blank" rel="noreferrer" className="text-xs font-bold flex items-center gap-1 hover:underline" style={{ color: theme?.vars?.['--primary'] }}>
                                        Live Link <ExternalLink size={10} />
                                    </a>
                                )}
                                {item.githubLink && (
                                    <a href={item.githubLink} target="_blank" rel="noreferrer" className="text-xs font-bold flex items-center gap-1 hover:underline" style={{ color: theme?.vars?.['--primary'] }}>
                                        GitHub <Github size={10} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack - Robust Check */}
                        {item.techStack && (Array.isArray(item.techStack) ? item.techStack.length > 0 : item.techStack.trim().length > 0) && (
                            <div className="text-sm mb-2 opacity-90" style={{ color: theme?.vars?.['--secondary'] }}>
                                <span className="font-bold">Stack: </span>
                                <span className="italic">
                                    {Array.isArray(item.techStack) ? item.techStack.join(", ") : item.techStack}
                                </span>
                            </div>
                        )}

                        {/* Description Bullets - Improved Formatting */}
                        {item.descriptionBullets && Array.isArray(item.descriptionBullets) && item.descriptionBullets.length > 0 && (
                            <ul className="list-disc ml-5 text-sm opacity-90 leading-relaxed marker:text-gray-500">
                                {item.descriptionBullets.map((bull, bIdx) => (
                                    <li key={bIdx} className="mb-1 pl-1" style={{ color: theme?.vars?.['--text'] }}>{bull}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
