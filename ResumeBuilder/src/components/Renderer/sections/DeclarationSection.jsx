import React from 'react';

const DeclarationSection = ({ data, theme }) => {
    // data can be Object { content: "..." } or string
    const content = typeof data === 'string' ? data : data?.content;
    if (!content) return null;

    return (
        <div className="mt-8 pt-4 border-t opacity-80" style={{ borderColor: theme?.vars?.['--secondary'] }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Declaration</h3>
            <p className="text-xs italic leading-relaxed text-justify">
                {content}
            </p>
        </div>
    );
};

export default DeclarationSection;
