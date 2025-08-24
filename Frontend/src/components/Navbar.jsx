// import React, { useState, useEffect } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { Link, useNavigate } from "react-router-dom";
// import Signin from "./Signin";
// import Signup from "./Signup";
// import ForgotPassword from "./ForgotPassword";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [showSignin, setShowSignin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [role, setRole] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null); // store logged-in user

//   const navigate = useNavigate();
//   const isHomePage = location.pathname === "/";

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");  
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 cursor-pointer">
//             RoomFinder
//           </h1>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-orange-500 focus:outline-none"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex md:items-center space-x-6 text-gray-700 font-medium">
//             {isHomePage ? (
//               <ScrollLink to="home" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500">
//                 Home
//               </ScrollLink>
//             ) : (
//               <Link to="/" className="hover:text-orange-500">Home</Link>
//             )}
//             <ScrollLink to="services" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500">
//               Services
//             </ScrollLink>
//             <ScrollLink to="about" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500">
//               About Us
//             </ScrollLink>
//             <ScrollLink to="testimonials" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500">
//               Testimonials
//             </ScrollLink>
//             <Link to="/pg" className="hover:text-orange-500">Search PG</Link>
//           </div>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex space-x-4 items-center">
//             {user ? (
//               <>
//                 <span className="text-gray-700">Hello, {user.role}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => setShowSignin(true)}
//                   className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
//                 >
//                   Login
//                 </button>
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//                   >
//                     Sign Up
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                       <button
//                         onClick={() => { setRole("Tenant"); setShowSignup(true); setDropdownOpen(false); }}
//                         className="w-full text-left px-4 py-2 hover:bg-orange-50"
//                       >
//                         Register as Tenant
//                       </button>
//                       <button
//                         onClick={() => { setRole("Owner"); setShowSignup(true); setDropdownOpen(false); }}
//                         className="w-full text-left px-4 py-2 hover:bg-orange-50"
//                       >
//                         Register as Owner
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-inner text-gray-700 font-medium">
//             <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">Home</Link>
//             <ScrollLink to="services" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">Services</ScrollLink>
//             <ScrollLink to="about" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">About Us</ScrollLink>
//             <ScrollLink to="testimonials" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">Testimonials</ScrollLink>
//             <Link to="/pg" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">Search PG</Link>

//             {user ? (
//               <>
//                 <span className="block">Hello, {user.role}</span>
//                 <button
//                   onClick={() => { handleLogout(); setMenuOpen(false); }}
//                   className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => { setShowSignin(true); setMenuOpen(false); }}
//                   className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => { setShowSignup(true); setMenuOpen(false); }}
//                   className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Modals */}
//       {showSignin && (
//         <Signin
//           onClose={() => setShowSignin(false)}
//           onSwitchToSignup={() => { setShowSignin(false); setShowSignup(true); }}
//           onForgotPassword={() => { setShowSignin(false); setShowForgotPassword(true); }}
//           onLoginSuccess={(userData) => { // 👈 get user after login
//             localStorage.setItem("user", JSON.stringify(userData));
//             setUser(userData);
//             setShowSignin(false);
//           }}
//         />
//       )}

//       {showSignup && (
//         <Signup
//           onClose={() => setShowSignup(false)}
//           defaultRole={role}
//           onSwitchToSignin={() => { setShowSignup(false); setShowSignin(true); }}
//         />
//       )}

//       {showForgotPassword && (
//         <ForgotPassword
//           onClose={() => setShowForgotPassword(false)}
//           onBackToLogin={() => { setShowForgotPassword(false); setShowSignin(true); }}
//           onSubmitEmail={(userEmail) => { setEmail(userEmail); setShowForgotPassword(false); }}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [role, setRole] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // store logged-in user

  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1
            className="text-2xl sm:text-3xl font-bold text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            RoomFinder
          </h1>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-orange-500 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
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
              className="cursor-pointer hover:text-orange-500"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="about"
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-orange-500"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-orange-500"
            >
              Testimonials
            </ScrollLink>
            <Link to="/pg" className="hover:text-orange-500">
              Search PG
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                <span className="text-gray-700">Hello, {user.role}</span>

                {/* Go to Profile */}
                <button
                  onClick={() => {
                    if (user.role === "Tenant") {
                      navigate("/user-profile");
                    } else if (user.role === "Owner") {
                      navigate("/owner-profile");
                    }
                  }}
                  className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-50 transition"
                >
                  Go to Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSignin(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  Login
                </button>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
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

            {user ? (
              <>
                <span className="block">Hello, {user.role}</span>

                {/* Go to Profile (Mobile) */}
                <button
                  onClick={() => {
                    if (user.role === "Tenant") {
                      navigate("/user-profile");
                    } else if (user.role === "Owner") {
                      navigate("/owner-profile");
                    }
                    setMenuOpen(false);
                  }}
                  className="w-full border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition"
                >
                  Go to Profile
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
          onLoginSuccess={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setShowSignin(false);
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
