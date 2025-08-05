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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-orange-500 focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Main Nav Links - Desktop */}
          <div className="hidden md:flex md:items-center space-x-6 text-gray-700 font-medium">
            {/* <Link to="/" className="hover:text-orange-500 transition">Home</Link> */}
             {isHomePage ? (
        <ScrollLink to="home" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500">
          Home
        </ScrollLink>
      ) : (
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
      )}
            <ScrollLink to="services" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500 transition">
              Services
            </ScrollLink>
            <ScrollLink to="about" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500 transition">
              About Us
            </ScrollLink>
            <ScrollLink to="testimonials" spy smooth offset={-80} duration={500} className="cursor-pointer hover:text-orange-500 transition">
              Testimonials
            </ScrollLink>
            <Link to="/pg" className="hover:text-orange-500 transition">Search PG</Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setShowSignin(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-inner text-gray-700 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">Home</Link>
            <ScrollLink to="services" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">
              Services
            </ScrollLink>
            <ScrollLink to="about" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">
              About Us
            </ScrollLink>
            <ScrollLink to="testimonials" spy smooth offset={-80} duration={500} onClick={() => setMenuOpen(false)} className="block cursor-pointer hover:text-orange-500">
              Testimonials
            </ScrollLink>
            <Link to="/pg" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">Search PG</Link>

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

     

      
    </>
  );
};

export default Navbar;
