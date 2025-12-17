import React from "react";

const CancellationRefund = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">
            <div className="glass-card p-8 md:p-12 max-w-4xl w-full rounded-3xl shadow-xl border border-border/50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent border-b pb-4 border-gray-200 dark:border-gray-700">
                    Cancellation and Refund Policy
                </h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cancellation</h2>
                        <p>Users may cancel their subscription or service request before the service is delivered or accessed.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Refund Policy</h2>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Refunds are provided only if the service was not delivered or if a technical issue occurred from our side.</li>
                            <li>Once the resume service or digital access is successfully delivered, refunds are not applicable.</li>
                            <li>Approved refunds will be processed within 5–7 business days.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Refund Request Process</h2>
                        <p>To request a refund, email <a href="mailto:shivasiddu80@gmail.com" className="text-red-500 hover:underline">shivasiddu80@gmail.com</a> with:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Registered email address</li>
                            <li>Payment transaction ID</li>
                            <li>Reason for refund</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CancellationRefund;
