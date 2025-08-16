import React, { useEffect, useState } from "react";

const BookingFormModal = ({ onClose, pgName, gender }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const [formData, setFormData] = useState({
    moveInDate: "",
    stayDuration: "",
    sharingPreference: "",
    message: "",
    gender: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {
      name: "Ashwini Korde",
      email: "ashwini@example.com",
      phone: "9876543210",
    };
    setUser(userData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      ...user,
      pgName,
      ...formData,
    });
    alert("Booking request submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
          Book Stay at <span className="text-black">{pgName}</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full bg-gray-100 border p-2 rounded-md text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-gray-100 border p-2 rounded-md text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={user.phone}
              readOnly
              className="w-full bg-gray-100 border p-2 rounded-md text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">
              PG is for: <span className="text-orange-600">{gender}</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border bg-gray-100 p-2 rounded-md text-sm mt-1 text-gray-700"
            >
              <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Family</option>
            </select>
          </div>

          {/* Move-in Date with Calendar Icon */}
          <div className="relative">
            <label className="text-sm text-gray-700">Move-in Date</label>
            <input
              type="date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 border p-2 rounded-md text-sm text-gray-700"
            />
            <div className="absolute right-3 bottom-2.5 text-black pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
                    00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Stay Duration</label>
            <select
              name="stayDuration"
              value={formData.stayDuration}
              onChange={handleChange}
              required
              className="w-full border p-2 bg-gray-100 rounded-md text-sm text-gray-700"
            >
              <option value="">Select</option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">1 Year</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700">Sharing Preference</label>
            <select
              name="sharingPreference"
              value={formData.sharingPreference}
              onChange={handleChange}
              required
              className="w-full border p-2 bg-gray-100 rounded-md text-sm text-gray-700"
            >
              <option value="">Select sharing</option>
              <option value="single">Single</option>
              <option value="double">2 Sharing</option>
              <option value="triple">3 Sharing</option>
            </select>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md text-sm transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;
