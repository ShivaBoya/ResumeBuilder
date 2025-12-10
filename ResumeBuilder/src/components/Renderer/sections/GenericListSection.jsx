import React from 'react';

// Reusable component for simple list-based sections
const GenericListSection = ({ data, theme, title, icon }) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1 opacity-80"
                style={{ borderColor: theme?.vars?.['--secondary'] }}>
                {title}
            </h3>

            <div className="space-y-4">
                {data.map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold">{item.title || item.name}</h4>
                            <span className="text-xs opacity-70">{item.date || item.year}</span>
                        </div>
                        {(item.issuer || item.institution || item.publisher) && (
                            <div className="text-sm opacity-80 mb-1 italic">
                                {item.issuer || item.institution || item.publisher}
                            </div>
                        )}
                        {item.description && (
                            <div className="text-sm opacity-80 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenericListSection;
