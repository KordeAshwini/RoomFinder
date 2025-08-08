import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('Profile');

  const bookings = [
    { id: 1, pgName: 'Sunrise PG', status: 'Pending' },
    { id: 2, pgName: 'Elite PG', status: 'Accepted' },
  ];

  const visits = [
    { id: 1, pgName: 'Sunrise PG', date: '2025-08-05', time: '11:00 AM', address: 'Baner, Pune' },
    { id: 2, pgName: 'Elite PG', date: '2025-08-08', time: '02:00 PM', address: 'Kothrud, Pune' },
  ];

  const profileInfo = {
    name: 'Srushti Kange',
    email: 'srushti@example.com',
    phone: '+91 9876543210', 
  };

  return (
      <div className="pt-24 px-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-xl border-r">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">User Profile</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('Profile')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
              activeSection === 'Profile' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-orange-50'
            }`}
          >
            <FaUser /> Profile
          </button>
          <button
            onClick={() => setActiveSection('Bookings')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
              activeSection === 'Bookings' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-orange-50'
            }`}
          >
            <FaClipboardList /> Bookings
          </button>
          <button
            onClick={() => setActiveSection('Visits')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
              activeSection === 'Visits' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-orange-50'
            }`}
          >
            <FaCalendarAlt /> Visits
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {activeSection === 'Profile' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-orange-500">Profile Details</h3>
              <p><strong>Name:</strong> {profileInfo.name}</p>
              <p><strong>Email:</strong> {profileInfo.email}</p>
              <p><strong>Phone:</strong> {profileInfo.phone}</p>
            </div>
          )}

          {activeSection === 'Bookings' && (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-orange-500">Your Bookings</h3>
    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 rounded-lg bg-orange-50 shadow-sm">
          <p><strong>PG Name:</strong> {booking.pgName}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          
          {/* Show Pay Now for every booking */}
          <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all">
            Pay Now
          </button>
        </div>
      ))}
    </div>
  </div>
)}


          {activeSection === 'Visits' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-orange-500">Scheduled Visits</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {visits.map((visit) => (
                  <div key={visit.id} className="p-4 rounded-lg bg-orange-50 shadow-sm">
                    <p><strong>PG Name:</strong> {visit.pgName}</p>
                    <p><strong>Date:</strong> {visit.date}</p>
                    <p><strong>Time:</strong> {visit.time}</p>
                    <p><strong>Address:</strong> {visit.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
