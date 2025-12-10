import React from 'react';

const TwoColumnLayout = ({ columns, renderSection, theme }) => {
    return (
        <div className="w-full min-h-screen flex" style={{ backgroundColor: theme?.vars?.['--bg'], fontFamily: theme?.vars?.['--font-body'] }}>

            {/* Left Sidebar */}
            <div
                className="w-[35%] p-8 space-y-6 text-white"
                style={{ backgroundColor: theme?.vars?.['--primary'], color: '#ffffff' }}
            >
                {columns.left.map(sectionId => (
                    <div key={sectionId}>
                        {renderSection(sectionId)}
                    </div>
                ))}
            </div>

            {/* Right Content */}
            <div
                className="w-[65%] p-8 space-y-6"
                style={{ color: theme?.vars?.['--text'] }}
            >
                {columns.right.map(sectionId => (
                    <div key={sectionId}>
                        {renderSection(sectionId)}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TwoColumnLayout;
