import React from 'react';

const ReferencesSection = ({ data, theme }) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1 opacity-80"
                style={{ borderColor: theme?.vars?.['--secondary'] }}>
                References
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {data.map((ref, i) => (
                    <div key={i} className="text-sm">
                        <div className="font-bold">{ref.name}</div>
                        <div className="opacity-80">{ref.company}</div>
                        <div className="text-xs opacity-70">{ref.email} | {ref.phone}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReferencesSection;
