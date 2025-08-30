import React, { useEffect, useState } from "react";

const Signin = ({ onClose, onSwitchToSignup, onForgotPassword, onLoginSuccess }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Save token & role locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(data.user);
      }

      // Redirect based on role
      if (data.user.role === "Tenant") {
        window.location.href = "/";
      } else if (data.user.role === "Owner") {
        window.location.href = "/owner-profile";
      } else {
        window.location.href = "/";
      }
    } else {
      // 🚀 Show backend validation messages
      alert(data.message || "Login failed. Please check your details.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("⚠️ Server not responding. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value.trim();
  //   const password = e.target.password.value.trim();

  //   if (!email || !password) {
  //     alert("Please fill in both fields.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const res = await fetch("http://localhost:5000/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password })
  //     });

  //     const data = await res.json();
  //     console.log("Logged in user:", data.user.role);

  //     if (res.ok) {
  //       // Save token & role locally
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("role", data.user.role);
  //       localStorage.setItem("name", data.user.name);

  //       console.log("Logged in user:", data.user);

  //       // Notify parent so Navbar/UI updates instantly
  //       if (typeof onLoginSuccess === "function") {
  //         onLoginSuccess(data.user);
  //       }

  //       // Redirect based on role
  //       if (data.user.role === "Tenant") {
  //         window.location.href = "/";
  //       } else if (data.user.role === "Owner") {
  //         window.location.href = "/owner-profile";
  //       } else {
  //         window.location.href = "/";
  //       }
  //     } else {
  //       alert(data.message || "Login failed");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     alert("Something went wrong, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <a
            href="#"
            className="text-orange-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              if (onForgotPassword) onForgotPassword();
            }}
          >
            Forgot Password?
          </a>
          <span className="mx-2">|</span>
          <button
            onClick={onSwitchToSignup}
            className="text-orange-500 hover:underline focus:outline-none"
          >
            Don’t have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
