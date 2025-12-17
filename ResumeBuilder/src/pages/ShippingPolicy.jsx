import React from "react";

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="glass-card p-8 md:p-12 max-w-4xl w-full rounded-3xl shadow-xl border border-border/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent border-b pb-4 border-gray-200 dark:border-gray-700">
                    Shipping Policy
                </h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Digital Delivery</h2>
                        <p>Resume Builder provides digital services only.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>No physical products are shipped.</li>
                            <li>Access to services and digital content is delivered electronically via the website immediately upon subscription or purchase.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Issues</h2>
                        <p>For any service delivery issues, please contact us.</p>
                    </section>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-semibold">📧 Support Email: <a href="mailto:shivasiddu80@gmail.com" className="text-orange-500 hover:underline">shivasiddu80@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
