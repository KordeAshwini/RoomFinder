import React, { useEffect, useState } from "react";

const OtpVerification = ({ email, onClose, onOtpVerified }) => {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP check (always accept for demo)
    if (otp === "123456") {
      alert("OTP Verified!");
      onOtpVerified(); 
    } else {
      alert("Invalid OTP. Try 123456 for demo.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        className={`bg-white rounded-xl shadow-xl transform transition-all duration-300 ease-out p-6 w-full max-w-sm ${
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
      </div>
    </div>
  );
};

export default OtpVerification;
