import React from 'react';
import GenericListSection from './GenericListSection';

export const AwardsSection = (props) => <GenericListSection {...props} title="Awards" />;
export const CoursesSection = (props) => <GenericListSection {...props} title="Courses" />;
export const CertificationsSection = (props) => <GenericListSection {...props} title="Certifications" />;
export const OrganisationsSection = (props) => <GenericListSection {...props} title="Organisations" />;
export const PublicationsSection = (props) => <GenericListSection {...props} title="Publications" />;
export const CustomSection = (props) => <GenericListSection {...props} title={props.title || "Custom Section"} />; // Title might be dynamic in real app
