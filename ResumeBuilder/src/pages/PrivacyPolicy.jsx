import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="glass-card p-8 md:p-12 max-w-4xl w-full rounded-3xl shadow-xl border border-border/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent border-b pb-4 border-gray-200 dark:border-gray-700">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <p>At <strong>Resume Builder</strong>, your privacy is important to us.</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Name and email address</li>
                            <li>Resume content entered by users</li>
                            <li>Payment information (handled securely by third-party gateways)</li>
                            <li>Usage data and cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How We Use Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To provide resume-building services</li>
                            <li>To process payments</li>
                            <li>To improve website functionality and user experience</li>
                            <li>To provide customer support</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data Security</h2>
                        <p>We use standard security practices to protect your personal information. Your data is never sold or shared with unauthorized third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cookies</h2>
                        <p>We use cookies to improve site performance and user experience.</p>
                    </section>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-semibold">📧 Privacy Contact: <a href="mailto:shivasiddu80@gmail.com" className="text-green-500 hover:underline">shivasiddu80@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
