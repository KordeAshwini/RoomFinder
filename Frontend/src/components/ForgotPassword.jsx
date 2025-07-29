// import React, { useEffect, useState } from "react";

// const ForgotPassword = ({ onClose, onBackToLogin }) => {
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     setTimeout(() => setShow(true), 100);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Password reset link has been sent to ${email}`);
//     setEmail("");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div
//         className={`bg-white rounded-xl shadow-xl transform transition-all duration-300 ease-out p-6 w-full max-w-sm ${
//           show ? "scale-100 opacity-100" : "scale-75 opacity-0"
//         }`}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-xl font-bold text-gray-600 hover:text-red-500"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
//           Reset Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
//               Enter your registered email
//             </label>
//             <input
//               type="email"
//               id="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
//           >
//             Send Reset Link
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           <button
//             onClick={onBackToLogin}
//             className="text-orange-500 hover:underline focus:outline-none"
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useEffect, useState } from "react";
import ResetPassword from "./ResetPassword"; // 👈 Make sure you have this component

const ForgotPassword = ({ onClose, onBackToLogin }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [goToResetPassword, setGoToResetPassword] = useState(false); // 👈 To switch form

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link has been sent to ${email}`);
    setEmail("");
    setGoToResetPassword(true); // 👈 Switch to reset password UI
  };

  if (goToResetPassword) {
    return (
      <ResetPassword
        onClose={onClose}
        onBackToLogin={onBackToLogin}
        email={email} // Optional: pass email if needed
      />
    );
  }

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
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              Enter your registered email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <button
            onClick={onBackToLogin}
            className="text-orange-500 hover:underline focus:outline-none"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
