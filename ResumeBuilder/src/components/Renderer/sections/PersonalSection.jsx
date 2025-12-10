import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const PersonalSection = ({ data, theme }) => {
    const { fullName, jobTitle, email, phone, location, linkedin, github, portfolio } = data;

    return (
        <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-wide mb-1"
                style={{
                    color: theme?.vars?.['--primary'], // Text color matches primary
                    textTransform: theme?.vars?.['--heading-transform'] || 'none',
                    fontFamily: theme?.vars?.['--heading-font']
                }}>
                {fullName}
            </h1>

            {jobTitle && (
                <h2 className="text-lg font-medium opacity-80 mb-3" style={{ color: theme?.vars?.['--secondary'] }}>
                    {jobTitle}
                </h2>
            )}

            {/* Divider Line (as seen in Image 1 under the name/contact block, but usually specific to template. 
          Here we will use a subtle border or just spacing as per 'Modern' vs 'Classic' flow.
          The images show contact info in a single line mostly and a line UNDER it for Classic.
      */}

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm justify-center md:justify-start items-center opacity-80 mb-4"
                style={{ color: theme?.vars?.['--text'] }}>

                {phone && <div className="flex items-center gap-1"><Phone size={12} /> {phone}</div>}
                {email && <div className="flex items-center gap-1"><Mail size={12} /> {email}</div>}
                {location && <div className="flex items-center gap-1"><MapPin size={12} /> {location}</div>}

                {linkedin && <a href={linkedin} className="flex items-center gap-1 hover:underline"><Linkedin size={12} /> LinkedIn</a>}
                {github && <a href={github} className="flex items-center gap-1 hover:underline"><Github size={12} /> GitHub</a>}
                {portfolio && <a href={portfolio} className="flex items-center gap-1 hover:underline"><Globe size={12} /> Portfolio</a>}
            </div>

            {/* Decorative Divider for Classic look could go here if needed, but the section headers usually handle the lines. */}
        </div>
    );
};

export default PersonalSection;
