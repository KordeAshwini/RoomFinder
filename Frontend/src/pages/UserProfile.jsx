import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const userData = localStorage.getItem("user");
  const userName = userData ? JSON.parse(userData).email : null;
  const userEmail = userData ? JSON.parse(userData).email : null;
  const userPhone = userData ? JSON.parse(userData).phone : null;
  const userId = userData ? JSON.parse(userData).id : null; 

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    location: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    employment: "",
    idProof: "",
  });

  const [editedProfile, setEditedProfile] = useState({ ...profileDetails });

  // Add a new state to handle the payment confirmation UI
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tenant-profile/${userId}`);
        if (!res.ok) {
          console.log("No existing profile, new user.");
          return;
        }
        const data = await res.json();
        if (data) {
          setProfileDetails(data);
          setEditedProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const totalFields = 6;
  const filledFields = [
    profileDetails.location,
    profileDetails.dob,
    profileDetails.gender,
    profileDetails.maritalStatus,
    profileDetails.employment,
    profileDetails.idProof,
  ].filter((val) => val && val.trim() !== "").length;
  const completion = Math.round((filledFields / totalFields) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/tenant-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...editedProfile,
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const data = await res.json();
      setProfileDetails(data);
      setIsEditingProfile(false);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  const [bookings, setBookings] = useState([]);

  // Check URL for payment success and update booking status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatusParam = params.get('payment');
    const bookingId = params.get('bookingId');
    const sessionId = params.get('sessionId');

    if (paymentStatusParam === 'success' && bookingId && sessionId) {
      const confirmPayment = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/payments/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, sessionId }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to confirm payment on the server.');
          }

          setPaymentStatus('success');
          fetchBookings();
        } catch (error) {
          console.error('Payment confirmation error:', error);
          setPaymentStatus('error');
        } finally {
          // Clear URL parameters immediately after processing
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      };
      confirmPayment();
    }
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/visits/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setVisits(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    if (userId) fetchVisits();
  }, [userId]);
  
  const handlePayNow = async (bookingId) => {
      try {
        const res = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingId }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to create payment session.');
        }

        const { url } = await res.json();
        window.location.href = url;
      } catch (error) {
        console.error('Payment Error:', error);
        alert(error.message);
      }
  };

  const fadeAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="pt-24 px-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white p-6 shadow-xl border-r">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">
            User Profile
          </h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveSection("Profile")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === "Profile"
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-600 hover:bg-orange-50"
              }`}
            >
              <FaUser /> Profile
            </button>
            <button
              onClick={() => setActiveSection("Bookings")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === "Bookings"
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-600 hover:bg-orange-50"
              }`}
            >
              <FaClipboardList /> Bookings
            </button>
            <button
              onClick={() => setActiveSection("Visits")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === "Visits"
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-600 hover:bg-orange-50"
              }`}
            >
              <FaCalendarAlt /> Visits
            </button>
          </nav>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {paymentStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">Payment successful! Your booking is confirmed.</span>
              </div>
            )}
            {paymentStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">Payment failed. Please try again.</span>
              </div>
            )}

            {activeSection === "Profile" && (
              <motion.div
                {...fadeAnim}
                key="Profile"
                className="bg-white p-8 rounded-xl shadow-lg mt-4 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                  Tenant Profile
                </h2>

                <div className="mb-6">
                  <p className="text-gray-600 text-sm">
                    Profile Completion: {completion}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                {!isEditingProfile ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 text-gray-800">
                      <p>
                        <strong>Name:</strong> {profileDetails.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {profileDetails.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {profileDetails.phone}
                      </p>
                      {profileDetails.location && (
                        <p>
                          <strong>Location:</strong> {profileDetails.location}
                        </p>
                      )}
                      {profileDetails.dob && (
                        <p>
                          <strong>DOB:</strong> {profileDetails.dob}
                        </p>
                      )}
                      {profileDetails.gender && (
                        <p>
                          <strong>Gender:</strong> {profileDetails.gender}
                        </p>
                      )}
                      {profileDetails.maritalStatus && (
                        <p>
                          <strong>Marital Status:</strong>{" "}
                          {profileDetails.maritalStatus}
                        </p>
                      )}
                      {profileDetails.employment && (
                        <p>
                          <strong>Employment:</strong>{" "}
                          {profileDetails.employment}
                        </p>
                      )}
                      {profileDetails.idProof && (
                        <p>
                          <strong>ID Proof:</strong> {profileDetails.idProof}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name}
                           disabled
                          className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={profileDetails.email}
                          disabled
                          className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                          type="text" 
                          name="phone"
                          value={editedProfile.phone}
                          disabled
                          className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={editedProfile.location}
                          onChange={handleInputChange}
                          placeholder="Enter your location"
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={editedProfile.dob}
                          onChange={handleInputChange}
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={editedProfile.gender}
                          onChange={handleInputChange}
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Marital Status</label>
                        <select
                          name="maritalStatus"
                          value={editedProfile.maritalStatus}
                          onChange={handleInputChange}
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        >
                          <option value="">Select Marital Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Employment</label>
                        <input
                          type="text"
                          name="employment"
                          value={editedProfile.employment}
                          onChange={handleInputChange}
                          placeholder="Enter your employment details"
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">ID Proof</label>
                        <input
                          type="text"
                          name="idProof"
                          value={editedProfile.idProof}
                          onChange={handleInputChange}
                          placeholder="Enter ID proof (Aadhaar No.)"
                          className="border rounded-lg px-4 py-2 w-full bg-gray-200 text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {activeSection === "Bookings" && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-orange-500">
                  Your Bookings
                </h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="p-4 rounded-lg bg-orange-50 shadow-sm"
                      >
                        <p>
                          <strong>PG/Flat Name:</strong> {booking.property?.propertyName}
                        </p>
                        <p>
                          <strong>City:</strong> {booking.property?.city}
                        </p>
                        <p>
                          <strong>Property Type:</strong> {booking.property?.propertyType}
                        </p>
                        <p>
                          <strong>Status:</strong> {booking.status}
                        </p>
                        {booking.status === "Accepted" && (
                          <button
                            onClick={() => handlePayNow(booking._id)} // Call the new handler
                            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all">
                            Pay Now
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No bookings found.</p>
                  )}
              </div>
            </div>
            )}

            {activeSection === "Visits" && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-orange-500">
                  Scheduled Visits
                </h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {visits.map((visit) => (
                    <div
                      key={visit._id}
                      className="p-4 rounded-lg bg-orange-50 shadow-sm"
                    >
                      <p>
                        <strong>PG Name:</strong> {visit.propertyName}
                      </p>
                      <p>
                        <strong>Date:</strong> {visit.date}
                      </p>
                      <p>
                        <strong>Time:</strong> {visit.slot}
                      </p>
                      <p>
                        <strong>Address:</strong> {visit.propertyId?.address}
                      </p>
                      <p>
                        <strong>City:</strong> {visit.propertyId?.city}
                      </p>
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