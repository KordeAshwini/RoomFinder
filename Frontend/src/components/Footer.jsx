import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div> 
          <h2 className="text-3xl font-bold text-orange-500 hover:scale-105 transition duration-300">RoomFinder</h2>
          <p className="text-sm">
            Helping students and professionals find their ideal PGs and roommates with comfort and convenience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
            <li><a href="/pg" className="hover:text-blue-600 transition">Search PG</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@roomfinder.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
          <p className="text-sm">Location: Pune, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-600 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-700 transition"><FaLinkedin /></a>
            <a href="mailto:support@roomfinder.com" className="hover:text-red-500 transition"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RoomFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
