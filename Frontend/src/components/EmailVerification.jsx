import React, { useEffect, useState } from "react";

const OtpVerification = ({ email, onClose, onOtpVerified }) => {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  // Cooldown timer countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP Verified!");
        onOtpVerified();
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP resent successfully!");
        setResendCooldown(60); // 60 seconds cooldown
      } else {
        alert(data.message || "Could not resend OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error resending OTP");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        className={`bg-white rounded-xl shadow-xl transform transition-all duration-300 ease-out p-6 w-full max-w-sm relative ${
          show ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          Enter the OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-center tracking-widest"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Verify
          </button>
        </form>

        {/* Resend OTP section */}
        <div className="mt-4 text-center">
          {resendCooldown > 0 ? (
            <p className="text-gray-500 text-sm">
              Resend available in {resendCooldown}s
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="text-orange-500 hover:underline text-sm"
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
