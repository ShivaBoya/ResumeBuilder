import React from 'react';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import SingleColumnLayout from './layouts/SingleColumnLayout';

// Core Sections
import PersonalSection from './sections/PersonalSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import LanguagesSection from './sections/LanguagesSection';
import InterestsSection from './sections/InterestsSection';
import DeclarationSection from './sections/DeclarationSection';
import ReferencesSection from './sections/ReferencesSection';

// Registry Wrappers
import {
    AwardsSection,
    CoursesSection,
    CertificationsSection,
    OrganisationsSection,
    PublicationsSection,
    CustomSection
} from './sections/wrappers';

// Fallback Registries (if API fails)
const DefaultTemplateRegistry = {
    modern: {
        id: "modern",
        name: "Modern Two Column",
        layout: "two-column",
        columns: { left: ["personal", "skills", "languages"], right: ["summary", "experience", "projects", "education"] }
    }
};

const DefaultThemeRegistry = {
    blue: { vars: { '--primary': '#2563eb', '--secondary': '#1e40af', '--bg': '#ffffff', '--text': '#0f172a' } }
};

const LayoutComponents = {
    'two-column': TwoColumnLayout,
    'single-column': SingleColumnLayout,
    // Add more layout types if created
};

const SectionComponents = {
    'personal': PersonalSection,
    'summary': SummarySection,
    'experience': ExperienceSection,
    'education': EducationSection,
    'skills': SkillsSection,
    'projects': ProjectsSection,
    'languages': LanguagesSection,
    'interests': InterestsSection,
    'declaration': DeclarationSection,
    'references': ReferencesSection,
    'awards': AwardsSection,
    'courses': CoursesSection,
    'certifications': CertificationsSection,
    'organisations': OrganisationsSection,
    'publications': PublicationsSection,
    'custom': CustomSection
};

const ResumeRenderer = ({ templateId, themeId, data, templatesConfig, themesConfig }) => {

    // 1. Resolve Configs (Prefer props, fallback to defaults)
    const activeTemplates = (templatesConfig && Object.keys(templatesConfig).length > 0) ? templatesConfig : DefaultTemplateRegistry;
    const activeThemes = (themesConfig && Object.keys(themesConfig).length > 0) ? themesConfig : DefaultThemeRegistry;

    const templateConfig = activeTemplates[templateId] || activeTemplates[Object.keys(activeTemplates)[0]]; // Fallback to first available
    const themeConfig = activeThemes[themeId] || activeThemes[Object.keys(activeThemes)[0]];

    // 2. Resolve Layout Engine
    // Safety check: templateConfig might be undefined if registry is empty activeTemplates is empty
    if (!templateConfig) return <div>Loading Template...</div>;

    const LayoutComponent = LayoutComponents[templateConfig.layout] || SingleColumnLayout;

    // 3. Section Renderer Callback
    const renderSection = (sectionId) => {
        const SectionComponent = SectionComponents[sectionId] || SectionComponents['custom']; // Fallback to Custom if unknown

        // Find Data: Check normalized 'sectionsData', fallback to legacy root keys
        const sectionData = data.sectionsData?.[sectionId] || data[sectionId];

        // Do not render empty sections (unless it's personal info which usually has *some* fields or we want to show placeholders in editor?)
        // For final preview, usually hide empty. For now, let component decide or pass strict check.
        if (!SectionComponent || !sectionData) return null;

        return (
            <SectionComponent
                key={sectionId}
                data={sectionData}
                theme={themeConfig}
            />
        );
    };

    return (
        <div
            className="resume-container w-full min-h-[297mm] h-auto bg-white shadow-2xl relative text-left"
            style={{
                ...themeConfig?.vars,
                fontFamily: themeConfig?.fontFamily || 'sans-serif',
                lineHeight: themeConfig?.lineHeight || 1.5
            }}
        >
            <LayoutComponent
                columns={templateConfig.columns}
                renderSection={renderSection}
                theme={themeConfig}
                order={data.sectionsOrder} // Pass dynamic order from user state
            />
        </div>
    );
};

export default ResumeRenderer;
