import React from 'react';
import { Link } from 'react-router-dom';
import {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Product",
            links: [
                { name: "Resume Builder", path: "/resume-builder" },
                { name: "Templates", path: "/templates" },
                { name: "AI Assistant", path: "/ai" },
                { name: "Premium Plans", path: "/premium" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Career Blog", path: "#" },
                { name: "Resume Examples", path: "#" },
                { name: "Cover Letter Tips", path: "#" },
                { name: "Help Center", path: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", path: "#" },
                { name: "Contact", path: "#" },
                { name: "Privacy Policy", path: "#" },
                { name: "Terms of Service", path: "#" },
            ]
        }
    ];

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ResumePro
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Empowering professionals to build career-defining resumes with AI-driven tools and premium templates.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        &copy; {currentYear} ResumePro. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>support@resumepro.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
