import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="glass-card p-8 md:p-12 max-w-4xl w-full rounded-3xl shadow-xl border border-border/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b pb-4 border-gray-200 dark:border-gray-700">
                    Terms and Conditions
                </h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Welcome to <strong>Resume Builder</strong>, operated by <strong>Boya Shiva</strong>.
                        By accessing or using our website <a href="https://resume-builder-krvx.vercel.app/" className="text-blue-500 hover:underline">https://resume-builder-krvx.vercel.app/</a>, you agree to be bound by these Terms and Conditions.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Use of Website</h2>
                        <p>You agree to use this website only for lawful purposes and not for any activity that violates applicable laws or regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. User Accounts</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials and all activities performed under your account.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Payments</h2>
                        <p>All payments are securely processed through trusted third-party payment gateways. We do not store or process your card or banking details directly.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Intellectual Property</h2>
                        <p>All content, designs, logos, templates, and materials available on this website are the intellectual property of Boya Shiva and may not be copied, reproduced, or redistributed without permission.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">5. Limitation of Liability</h2>
                        <p>Resume Builder shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">6. Changes to Terms</h2>
                        <p>We reserve the right to update these Terms at any time. Continued use of the website indicates acceptance of the updated Terms.</p>
                    </section>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-semibold">📧 Contact Email: <a href="mailto:shivasiddu80@gmail.com" className="text-blue-500 hover:underline">shivasiddu80@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
