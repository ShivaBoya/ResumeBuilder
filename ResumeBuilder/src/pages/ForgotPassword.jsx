import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../utils/contants";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineKey } from "react-icons/hi";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetToken, setResetToken] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/users/forget-password`, { email });
            toast.success(res.data.message);

            // For dev/demo only: Log OTP if returned
            if (res.data.mockOtp) {
                console.log("Mock OTP:", res.data.mockOtp);
                toast.info(`Dev Mode: OTP is ${res.data.mockOtp}`, { autoClose: 10000 });
            }

            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/users/verify-otp`, { email, otp });
            toast.success(res.data.message);
            setResetToken(res.data.resetToken);
            setStep(3);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/users/reset-password`, {
                token: resetToken,
                newPassword
            });
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 pl-12 mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-slate-900 dark:text-white placeholder:text-gray-400 font-medium";
    const labelIconClasses = "absolute top-4 left-4 text-gray-400 text-xl pointer-events-none";

    return (
        <div className="flex justify-center items-center min-h-screen bg-background text-foreground transition-colors duration-300 px-4 relative overflow-hidden mesh-gradient">

            <ToastContainer position="top-center" theme="colored" />

            <div className="glass-card p-8 md:p-10 w-full max-w-lg backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 transition-all duration-500 animate-fade-in-up border border-white/20 shadow-2xl rounded-3xl relative z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {step === 1 ? "Forgot Password?" : step === 2 ? "Verify OTP" : "Reset Password"}
                    </h2>
                    <p className="text-slate-600 dark:text-gray-300 text-sm">
                        {step === 1 ? "Enter your email to receive a verification code." :
                            step === 2 ? `Enter the 6-digit code sent to ${email}` :
                                "Create a strong new password for your account."}
                    </p>
                </div>

                {/* Form Steps */}
                <div className="relative">

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="animate-fade-in">
                            <div className="relative mb-6">
                                <HiOutlineMail className={labelIconClasses} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={inputClasses}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending OTP..." : "Generate OTP"}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="animate-fade-in">
                            <div className="relative mb-6">
                                <HiOutlineLockClosed className={labelIconClasses} />
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    className={`${inputClasses} tracking-[0.5em] text-center font-bold text-2xl`}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-slate-500 hover:text-primary transition-colors"
                                >
                                    Change Email
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="animate-fade-in">
                            <div className="relative mb-4">
                                <HiOutlineKey className={labelIconClasses} />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className={inputClasses}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="relative mb-6">
                                <HiOutlineKey className={labelIconClasses} />
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className={inputClasses}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Resetting..." : "Set New Password"}
                            </button>
                        </form>
                    )}

                </div>

                {/* Back to Login */}
                <div className="mt-8 text-center border-t border-gray-200 dark:border-white/10 pt-6">
                    <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center gap-2">
                        ← Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
