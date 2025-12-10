import React from 'react';

const SingleColumnLayout = ({ columns, renderSection, theme, order }) => {
    // Priority: User's dynamic order -> Template static order -> Empty list
    const sectionList = order && order.length > 0 ? order : (columns?.main || []);

    return (
        <div className="w-full h-full p-8" style={{ backgroundColor: theme?.vars?.['--bg'], color: theme?.vars?.['--text'], fontFamily: theme?.vars?.['--font-body'] }}>
            <div className="space-y-6">
                {sectionList.map(sectionId => (
                    <div key={sectionId}>
                        {renderSection(sectionId)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleColumnLayout;
