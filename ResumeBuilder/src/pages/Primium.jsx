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
      color: "bg-pink-500 hover:bg-pink-600",
      features: [
        "Build up to 5 resumes",
        "Access to 10 professional templates",
        "Basic customization options",
        "3 months validity",
      ],
    },
    {
      type: "gold",
      title: "Gold Membership",
      color: "bg-indigo-500 hover:bg-indigo-600",
      features: [
        "Unlimited resume creation",
        "50+ premium templates",
        "AI-powered resume suggestions",
        "Priority customer support",
        "6 months validity",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-10">Choose Your ResumeBuilder Membership</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 flex-wrap justify-center">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className="bg-gray-800 rounded-lg p-6 w-80 shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
            <ul className="mb-6 space-y-2 text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i}>- {f}</li>
              ))}
            </ul>
            <button
              className={`${plan.color} text-white px-6 py-2 rounded-md transition`}
              onClick={() => handleBuyClick(plan.type)}
            >
              Buy {plan.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
