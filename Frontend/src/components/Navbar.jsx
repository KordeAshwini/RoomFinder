
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
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [role, setRole] = useState(""); // role for signup
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 cursor-pointer">
            RoomFinder
          </h1>

          {/* Hamburger icon - mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-orange-500 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Main Nav Links - Desktop */}
          <div className="hidden md:flex md:items-center space-x-6 text-gray-700 font-medium">
            {isHomePage ? (
              <ScrollLink
                to="home"
                spy
                smooth
                offset={-80}
                duration={500}
                className="cursor-pointer hover:text-orange-500"
              >
                Home
              </ScrollLink>
            ) : (
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            )}
            <ScrollLink
              to="services"
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-orange-500 transition"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="about"
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-orange-500 transition"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-orange-500 transition"
            >
              Testimonials
            </ScrollLink>
            <Link to="/pg" className="hover:text-orange-500 transition">
              Search PG
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            {/* Login Button */}
            <button
              onClick={() => setShowSignin(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Login
            </button>

            {/* Sign Up Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Sign Up
              </button>

              {dropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setRole("Tenant");
                      setShowSignup(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50"
                  >
                    Register as Tenant
                  </button>
                  <button
                    onClick={() => {
                      setRole("Owner");
                      setShowSignup(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50"
                  >
                    Register as Owner
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-inner text-gray-700 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-orange-500"
            >
              Home
            </Link>
            <ScrollLink
              to="services"
              spy
              smooth
              offset={-80}
              duration={500}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-orange-500"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="about"
              spy
              smooth
              offset={-80}
              duration={500}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-orange-500"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              spy
              smooth
              offset={-80}
              duration={500}
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer hover:text-orange-500"
            >
              Testimonials
            </ScrollLink>
            <Link
              to="/pg"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-orange-500"
            >
              Search PG
            </Link>

            <button
              onClick={() => {
                setShowSignin(true);
                setMenuOpen(false);
              }}
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowSignup(true);
                setMenuOpen(false);
              }}
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Modals */}
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
          defaultRole={role}
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
          }}
        />
      )}
    </>
  );
};

export default Navbar;
