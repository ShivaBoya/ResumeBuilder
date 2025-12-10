import React from 'react';

const SummarySection = ({ data, theme }) => {
    const content = data.summaryText || data.content;
    if (!content) return null;

    return (
        <div className="mb-6">
            <h3 className="section-title text-sm font-bold tracking-widest mb-2 border-b pb-1 inline-block pr-4"
                style={{
                    borderColor: theme?.vars?.['--divider-color'] || '#000',
                    borderBottomWidth: '1px',
                    width: '100%',
                    color: theme?.vars?.['--primary'] || '#000',
                    textTransform: theme?.vars?.['--heading-transform'] || 'uppercase',
                    fontFamily: theme?.vars?.['--heading-font']
                }}>
                {theme?.vars?.['--heading-transform'] === 'uppercase' ? 'Summary' : 'Professional Summary'}
            </h3>
            <p className="text-sm leading-relaxed opacity-90 text-justify" style={{ fontFamily: theme?.vars?.['--body-font'], color: theme?.vars?.['--text'] }}>
                {content}
            </p>
        </div>
    );
};

export default SummarySection;
