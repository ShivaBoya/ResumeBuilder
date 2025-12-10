import React from 'react';

const InterestsSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1 opacity-80"
                style={{ borderColor: theme?.vars?.['--secondary'] }}>
                Interests
            </h3>
            <div className="flex flex-wrap gap-2">
                {data.map((item, i) => (
                    <span key={i} className="text-sm bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InterestsSection;
