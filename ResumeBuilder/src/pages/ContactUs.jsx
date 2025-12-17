import React from "react";
import { Mail, MapPin, Clock, Globe, User } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="glass-card p-8 md:p-12 max-w-4xl w-full rounded-3xl shadow-xl border border-border/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent border-b pb-4 border-gray-200 dark:border-gray-700">
                    Contact Us
                </h1>

                <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-lg">
                        If you have any questions, feedback, or support requests, feel free to reach out.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Name</h3>
                                    <p>Boya Shiva</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                                    <a href="mailto:shivasiddu80@gmail.com" className="hover:underline hover:text-green-500 transition-colors">
                                        shivasiddu80@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Website</h3>
                                    <a href="https://resume-builder-krvx.vercel.app/" className="hover:underline hover:text-purple-500 transition-colors break-all">
                                        https://resume-builder-krvx.vercel.app/
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Address</h3>
                                    <p>Kurnool, Andhra Pradesh</p>
                                    <p>India – 518462</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Response Time</h3>
                                    <p>Within 24–48 business hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
