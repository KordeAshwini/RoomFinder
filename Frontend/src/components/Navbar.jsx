// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
//       <h1 className="text-2xl font-bold text-blue-600">RoomFinder</h1>
//       <div className="space-x-8">
      
//         <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
//         <Link to="/about" className="text-gray-700 hover:text-blue-500">About Us</Link>
//         <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact Us</Link>
//         <Link to="/faq" className="text-gray-700 hover:text-blue-500">Testimonials</Link>
//         <Link to="/pg" className="text-gray-700 hover:text-blue-500">Search PG</Link>
//       </div>
//       <div className="space-x-4">
      
//         <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
//         <Link to="/signup" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Sign Up</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import Signin from "./Signin";
// import Signup from "./Signup";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [showSignin, setShowSignin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           {/* Logo */}
//           <h1 className="text-3xl font-bold text-orange-500 hover:scale-105 transition duration-300 cursor-pointer">
//             RoomFinder
//           </h1>

//           {/* Nav Links */}
//           <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
//             {/* <ScrollLink to="home" spy={true} smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-orange-400 transition">
//               Home
//             </ScrollLink> */}
//             <Link to="/" className="space-x-6 hidden md:block text-gray-700 hover:text-orange-400 transition">
//               Home
//           </Link>
//             <ScrollLink to="services" spy={true} smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-orange-400 transition">
//               Services
//             </ScrollLink>
//             <ScrollLink to="about" spy={true} smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-orange-400 transition">
//               About Us
//             </ScrollLink>
//             <ScrollLink to="testimonials" spy={true} smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-orange-400 transition">
//               Testimonials
//             </ScrollLink>
           
//             <Link to="/pg" className="space-x-6 hidden md:block text-gray-700 hover:text-orange-400 transition">
//             Search PG
//           </Link> {/* Closing Link tag added here */}
            
//           </div>
//           {/* Search PG */}
         
        
//           {/* Login/Signup */}
//           <div className="space-x-4 hidden md:flex">
//             <button
//               onClick={() => setShowSignin(true)}
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setShowSignup(true)}
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </nav>

//        {/* Signin Popup */}
//       {showSignin && (
//         <Signin
//           onClose={() => setShowSignin(false)}
//           onSwitchToSignup={() => {
//             setShowSignin(false);
//             setShowSignup(true); // 👈 switch to Signup form
//           }}
//         />
//       )}

//       {/* Signup Popup */}
//       {showSignup && (
//         <Signup
//           onClose={() => setShowSignup(false)}
//           onSwitchToSignin={() => {
//             setShowSignup(false);
//             setShowSignin(true); // 👈 switch to Signin form
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { Link } from "react-router-dom";
// import Signin from "./Signin";
// import Signup from "./Signup";
// import ForgotPassword from "./ForgotPassword";
// import ResetPassword from "./ResetPassword";
// import OtpVerification from "./EmailVerification";

// const Navbar = () => {
//   const [showSignin, setShowSignin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [showReset, setShowReset] = useState(false);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-orange-500 hover:scale-105 transition duration-300 cursor-pointer">
//             RoomFinder
//           </h1>

//           <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-orange-400 transition"
//             >
//               Home
//             </Link>
//             <ScrollLink
//               to="services"
//               spy={true}
//               smooth={true}
//               duration={500}
//               offset={-80}
//               className="cursor-pointer hover:text-orange-400 transition"
//             >
//               Services
//             </ScrollLink>
//             <ScrollLink
//               to="about"
//               spy={true}
//               smooth={true}
//               duration={500}
//               offset={-80}
//               className="cursor-pointer hover:text-orange-400 transition"
//             >
//               About Us
//             </ScrollLink>
//             <ScrollLink
//               to="testimonials"
//               spy={true}
//               smooth={true}
//               duration={500}
//               offset={-80}
//               className="cursor-pointer hover:text-orange-400 transition"
//             >
//               Testimonials
//             </ScrollLink>
//             <Link
//               to="/pg"
//               className="text-gray-700 hover:text-orange-400 transition"
//             >
//               Search PG
//             </Link>
//           </div>

//           <div className="space-x-4 hidden md:flex">
//             <button
//               onClick={() => setShowSignin(true)}
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setShowSignup(true)}
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Modals */}
//       {showSignin && (
//         <Signin
//           onClose={() => setShowSignin(false)}
//           onSwitchToSignup={() => {
//             setShowSignin(false);
//             setShowSignup(true);
//           }}
//           onForgotPassword={() => {
//             setShowSignin(false);
//             setShowForgotPassword(true);
//           }}
//         />
//       )}

//       {showSignup && (
//         <Signup
//           onClose={() => setShowSignup(false)}
//           onSwitchToSignin={() => {
//             setShowSignup(false);
//             setShowSignin(true);
//           }}
//         />
//       )}

//       {showForgotPassword && (
//         <ForgotPassword
//           onClose={() => setShowForgotPassword(false)}
//           onBackToLogin={() => {
//             setShowForgotPassword(false);
//             setShowSignin(true);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import OtpVerification from "./EmailVerification";

const Navbar = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-500 hover:scale-105 transition duration-300 cursor-pointer">
            RoomFinder
          </h1>

          <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
            {/* <ScrollLink to="home" spy={true} smooth={true} duration={500} offset={-80} className="cursor-pointer hover:text-orange-400 transition">
           Home
            </ScrollLink> */}
            <Link to="/" className="hover:text-orange-400 transition">
              Home
            </Link>
            <ScrollLink
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-orange-400 transition"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-orange-400 transition"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              spy={true}
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer hover:text-orange-400 transition"
            >
              Testimonials
            </ScrollLink>
            <Link to="/pg" className="hover:text-orange-400 transition">
              Search PG
            </Link>
          </div>

          <div className="space-x-4 hidden md:flex">
            <button
              onClick={() => setShowSignin(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Modals - Conditional Rendering */}
      {showSignin && (
        <Signin
          onClose={() => setShowSignin(false)}
          onSwitchToSignup={() => {
            setShowSignin(false);
            setShowSignup(true);
          }}
          onForgotPassword={() => {
            setShowSignin(false);
            setShowForgotPassword(true);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToSignin={() => {
            setShowSignup(false);
            setShowSignin(true);
          }}
        />
      )}

      {showForgotPassword && (
        <ForgotPassword
          onClose={() => setShowForgotPassword(false)}
          onBackToLogin={() => {
            setShowForgotPassword(false);
            setShowSignin(true);
          }}
          onSubmitEmail={(userEmail) => {
            setEmail(userEmail);
            setShowForgotPassword(false);
            setShowOtp(true);
          }}
        />
      )}

      {showOtp && (
        <OtpVerification
          email={email}
          onClose={() => setShowOtp(false)}
          onOtpVerified={() => {
            setShowOtp(false);
            setShowReset(true);
          }}
        />
      )}

      {showReset && (
        <ResetPassword
          email={email}
          onClose={() => setShowReset(false)}
          onSuccess={() => {
            setShowReset(false);
            setShowSignin(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
