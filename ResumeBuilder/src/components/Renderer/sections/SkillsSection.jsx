import React from 'react';

const SkillsSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data)) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold tracking-widest mb-3 border-b pb-1"
                style={{
                    borderColor: theme?.vars?.['--divider-color'] || '#000',
                    color: theme?.vars?.['--primary'] || '#000',
                    textTransform: theme?.vars?.['--heading-transform'] || 'uppercase',
                    fontFamily: theme?.vars?.['--heading-font']
                }}>
                Skills
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {data.map((item, i) => {
                    // Safety check
                    if (!item) return null;
                    const hasCategory = item.category && item.category.trim().length > 0;
                    const hasSkills = item.skillName && (Array.isArray(item.skillName) ? item.skillName.length > 0 : item.skillName.trim().length > 0);

                    if (!hasCategory && !hasSkills) return null;

                    return (
                        <div key={i} className="text-sm leading-relaxed">
                            {hasCategory && (
                                <span className="font-bold mr-2 text-md block sm:inline" style={{ color: theme?.vars?.['--text'] }}>
                                    {item.category}:
                                </span>
                            )}
                            <span className="opacity-90" style={{ color: theme?.vars?.['--text'] }}>
                                {Array.isArray(item.skillName) ? item.skillName.join(", ") : item.skillName}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsSection;
