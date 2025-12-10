import React from 'react';

const EducationSection = ({ data, theme }) => {
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
                Education
            </h3>

            <div className="space-y-4">
                {data.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-md" style={{ color: theme?.vars?.['--text'] }}>{item.degree || item.courseName}</h4>
                            <span className="text-xs font-mono font-bold whitespace-nowrap opacity-80" style={{ color: theme?.vars?.['--text'] }}>
                                {item.startDate} — {item.endDate}
                            </span>
                        </div>
                        <div className="text-sm italic opacity-90" style={{ color: theme?.vars?.['--secondary'] }}>
                            {item.institution} {item.location ? `, ${item.location}` : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationSection;
