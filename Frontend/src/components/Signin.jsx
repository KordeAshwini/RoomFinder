// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Signin = ({ isOpen, onClose }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
//           {/* Modal Container */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-lg relative"
//           >
//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
//               onClick={onClose}
//             >
//               ×
//             </button>

//             {/* Form */}
//             <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Sign In to RoomFinder</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-600 mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-600 mb-1">Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Enter your password"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//               >
//                 Sign In
//               </button>
//             </form>

//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline">Sign Up</span>
//             </p>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Signin;

// import React, { useEffect, useState } from "react";

// const Signin = ({ onClose, onSwitchToSignup }) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setShow(true), 100); // trigger animation after mount
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Login submitted");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div
//         className={`bg-white rounded-xl shadow-xl transform transition-all duration-300 ease-out p-6 w-full max-w-sm ${
//           show ? "scale-100 opacity-100" : "scale-75 opacity-0"
//         }`}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-xl font-bold text-gray-600 hover:text-red-500"
//         >
//           &times;
//         </button>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Welcome Back!</h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               required
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               required
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Links Below */}
//         <div className="mt-4 text-center text-sm text-gray-600">
//           <a
//             href="#"
//             className="text-orange-500 hover:underline"
//             onClick={(e) => {
//               e.preventDefault();
//               alert("Forgot password clicked!");
//             }}
//           >
//             Forgot Password?
//           </a>
//           <span className="mx-2">|</span>
//           <button
//             onClick={onSwitchToSignup}
//             className="text-orange-500 hover:underline focus:outline-none"
//           >
//             Don’t have an account?
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { useEffect, useState } from "react";

const Signin = ({ onClose, onSwitchToSignup, onForgotPassword }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
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
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <a
            href="#"
            className="text-orange-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
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
