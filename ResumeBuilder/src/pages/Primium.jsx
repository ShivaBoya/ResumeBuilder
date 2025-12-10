import axios from "axios";
import React from "react";

export default function Premium() {
  const handleBuyClick = async (type) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        alert("Please login first!");
        return;
      }

      // Create payment order
      const response = await axios.post(
        "https://fullstackbakend-8.onrender.com/paymentcreate",
        { membershipType: type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: `Bearer ${refreshToken}`, // send refresh token
          },
        }
      );

      // If middleware sent a new access token, store it
      const newAccessToken = response.headers["new-access-token"];
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }

      const { amount, keyId, currency, notes, orderId } = response.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "ResumeBuilder",
        description: "Build Professional Resumes Effortlessly",
        order_id: orderId,
        prefill: {
          name: notes.username || "",
          email: notes.email || "",
          contact: notes.contact || "",
        },
        theme: {
          color: "#2563EB", // ResumeBuilder theme color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err.response?.data || err);
      alert(
        err.response?.data?.error || "Failed to initiate payment. Try again!"
      );
    }
  };

  // Membership Plans (Dynamic)
  const plans = [
    {
      type: "silver",
      title: "Silver Membership",
      price: "$9.99/mo",
      color: "from-pink-500 to-rose-600",
      icon: "🥈",
      features: [
        "Build up to 5 resumes",
        "Access to 10 professional templates",
        "Basic customization options",
        "3 months validity",
        "Email Support",
      ],
      popular: false,
    },
    {
      type: "gold",
      title: "Gold Membership",
      price: "$19.99/mo",
      color: "from-indigo-500 to-purple-600",
      icon: "👑",
      features: [
        "Unlimited resume creation",
        "50+ premium templates",
        "AI-powered resume suggestions",
        "Priority customer support",
        "6 months validity",
        "LinkedIn Profile Review",
        "Cover Letter Generator",
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center justify-center p-6 relative overflow-hidden pt-24">

      <div className="text-center mb-16 relative z-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-600 to-rose-700 dark:from-pink-400 dark:to-rose-500 bg-clip-text text-transparent">
          Upgrade Your Career
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Unlock premium features and land your dream job faster with our advanced resume building tools.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 flex-wrap justify-center relative z-10 w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.type}
            className={`glass-card p-8 rounded-3xl shadow-xl flex flex-col justify-between transform transition-all duration-500 hover:scale-105 border border-border/50 relative overflow-hidden group min-w-[320px] max-w-[400px] bg-white dark:bg-slate-800/50 ${plan.popular ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            {plan.popular && (
              <div className="absolute top-6 right-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide animate-pulse">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl filter drop-shadow-md">{plan.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Monthly Plan</p>
                </div>
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-slate-100 dark:bg-black/30 backdrop-blur-sm">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
              </div>

              <ul className="mb-8 space-y-4 text-gray-700 dark:text-gray-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 p-1.5 rounded-full text-xs font-bold">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r ${plan.color} text-white hover:brightness-110`}
              onClick={() => handleBuyClick(plan.type)}
            >
              Get Started with {plan.title.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
