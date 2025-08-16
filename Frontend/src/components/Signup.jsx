import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import OtpVerification from "./EmailVerification";

const Signup = ({ onClose, onSwitchToSignin, defaultRole }) => {
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole || "");
  const [loading, setLoading] = useState(false);

  // ✅ Keep role synced with defaultRole prop
  useEffect(() => {
    setRole(defaultRole || "");
  }, [defaultRole]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const signupData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (res.ok) {
        setEmail(signupData.email);
        setShowVerifyPopup(true); // Show "Verify Email" message
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }

    setLoading(false);
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    alert("Email verified! You can now sign in.");
    onSwitchToSignin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-3xl p-8 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {/* Conditional: Verify Email Popup */}
        {showVerifyPopup ? (
          <div className="text-center py-12 px-4">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Verify Your Email
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              We have sent an OTP to your email.
              <br />
              Please enter it to verify your account.
            </p>
            <button
              onClick={() => setShowOtpModal(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Go to Verification
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
              Create Your Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Role */}
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={role}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 3: Passwords */}
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>

            {/* Switch to Sign In */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={onSwitchToSignin}
                  className="text-orange-500 hover:underline focus:outline-none"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* OTP Modal */}
      {showOtpModal && (
        <OtpVerification
          email={email}
          onClose={() => setShowOtpModal(false)}
          onOtpVerified={handleOtpVerified}
        />
      )}
    </div>
  );
};

export default Signup;
