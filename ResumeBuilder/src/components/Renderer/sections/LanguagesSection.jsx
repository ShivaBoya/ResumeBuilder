import React from 'react';

const LanguagesSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1 opacity-80"
                style={{ borderColor: theme?.vars?.['--secondary'] }}>
                Languages
            </h3>
            <div className="flex flex-col gap-2">
                {data.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                        <span className="font-bold">{lang.name}</span>
                        <span className="opacity-70 text-xs">{lang.level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguagesSection;
