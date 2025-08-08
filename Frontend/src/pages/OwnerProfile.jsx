import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OwnerProfile = () => {
  const [activeSection, setActiveSection] = useState('Profile');


  const [isEditingProfile, setIsEditingProfile] = useState(false);
const [profileDetails, setProfileDetails] = useState({
  name: "Srushti Kange",
  email: "srushti@example.com",
  phone: "9876543210",
  location: "Pune",
  gender: "Female",
  dob: "2000-01-01",
  idProof: "Aadhaar: XXXX-XXXX-XXXX"
});

const [editedProfile, setEditedProfile] = useState({ ...profileDetails });

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedProfile((prev) => ({ ...prev, [name]: value }));
};

const handleProfileSave = (e) => {
  e.preventDefault();
  setProfileDetails(editedProfile);
  setIsEditingProfile(false);
};


  // const bookings = [
  //   { id: 1, pgName: 'Green PG', status: 'Pending' },
  //   { id: 2, pgName: 'Urban Stay', status: 'Accepted' },
  //   { id: 3, pgName: 'City PG', status: 'Confirmed' },
  //   { id: 4, pgName: 'Metro Hostel', status: 'Accepted' },
  // ];
  const [bookingTab, setBookingTab] = useState('Pending');

// Example booking structure (replace with real fetched data)
const bookings = [
  {
    id: 1,
    pgName: 'Sunrise PG',
    roomType: 'Single',
    checkInDate: '2025-08-05',
    bookingDate: '2025-07-30',
    status: 'pending', // accepted / confirmed
    user: {
      name: 'Srushti Kange',
      email: 'srushti@example.com',
      phone: '9876543210'
    },
    transactionId: 'TXN123456' // only for confirmed
  },
  // Add more entries here
];


  const visits = [
    { id: 1, pgName: 'Green PG', type: 'Boys PG', date: '2025-08-10', time: '4:00 PM', address: 'Kothrud, Pune' },
    { id: 2, pgName: 'Urban Stay', type: 'Girls PG', date: '2025-08-15', time: '11:00 AM', address: 'Viman Nagar, Pune' },
  ];

  const fadeAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const [propertyType, setPropertyType] = useState('');

  return (
    <div className="pt-20 px-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 bg-white rounded-r-xl shadow-xl p-6 h-[calc(100vh-5rem)] sticky top-20 flex flex-col justify-start">
          <ul className="space-y-4 text-orange-600 font-medium">
            {['Profile', 'My Properties', 'Bookings', 'Visits', 'Upload Property'].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer hover:text-orange-800 transition-all duration-300 rounded-lg px-2 py-1 ${
                  activeSection === section && 'text-orange-800 font-bold bg-orange-100'
                }`}
              >
                {section}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-8 pb-10">
          <AnimatePresence mode="wait">
            {/* {activeSection === 'Profile' && (
              <motion.div {...fadeAnim} key="Profile" className="bg-white p-8 rounded-xl shadow-lg mt-4">
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Owner Profile</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  <p><strong>Name:</strong> {profileDetails.name}</p>
                  <p><strong>Email:</strong> {profileDetails.email}</p>
                  <p><strong>Phone:</strong> {profileDetails.phone}</p>
                  <p><strong>Location:</strong> {profileDetails.location}</p>
                  <p><strong>Gender:</strong>Female</p>
                </div>
                <button className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">
                  Edit Profile
                </button>
              </motion.div>
            )} */}
             {activeSection === 'Profile' && (
  <motion.div {...fadeAnim} key="Profile" className="bg-white p-8 rounded-xl shadow-lg mt-4 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Owner Profile</h2>

    {!isEditingProfile ? (
      <>
        <div className="grid grid-cols-2 gap-4 text-gray-800">
          <p><strong>Name:</strong> {profileDetails.name}</p>
          <p><strong>Email:</strong> {profileDetails.email}</p>
          <p><strong>Phone:</strong> {profileDetails.phone}</p>
          <p><strong>Location:</strong> {profileDetails.location}</p>
          <p><strong>Gender:</strong> {profileDetails.gender}</p>
          <p><strong>Date of Birth:</strong> {profileDetails.dob}</p>
          <p><strong>ID Proof:</strong> {profileDetails.idProof}</p>
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
          <input
            type="text"
            name="name"
            value={editedProfile.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={editedProfile.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="phone"
            value={editedProfile.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="location"
            value={editedProfile.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="gender"
            value={editedProfile.gender}
            onChange={handleInputChange}
            placeholder="Gender"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            name="dob"
            value={editedProfile.dob}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="idProof"
            value={editedProfile.idProof}
            onChange={handleInputChange}
            placeholder="ID Proof (e.g. Aadhaar, PAN)"
            className="border rounded-lg px-4 py-2 col-span-2"
          />
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

            

          {activeSection === 'My Properties' && (
  <motion.div {...fadeAnim} key="MyProperties" className="bg-white p-8 rounded-xl shadow-lg mt-4">
    <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">My Properties</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Property Card */}
      {[
        { id: 1, name: 'Urban Stay', location: 'Koregaon Park, Pune', img: '/pg1.jpg' },
        { id: 2, name: 'Green PG', location: 'Kothrud, Pune', img: '/pg2.jpg' },
      ].map((property) => (
        <div key={property.id} className="bg-orange-50 rounded-lg shadow p-4 hover:shadow-md transition relative">
          <img src={property.img} alt={property.name} className="w-full h-40 object-cover rounded-md mb-2" />
          <h4 className="text-lg font-semibold">{property.name}</h4>
          <p className="text-sm text-gray-700">Location: {property.location}</p>

          {/* Edit Icon/Button */}
          <button
            onClick={() => window.location.href = `/property-details/${property.id}`}
            className="absolute top-3 right-3 text-orange-600 hover:text-orange-800 transition"
            title="Edit Property"
          >
            ✏️
          </button>
        </div>
      ))}

    </div>
  </motion.div>
)}



           {activeSection === 'Bookings' && (
  <motion.div {...fadeAnim} key="Bookings" className="bg-white p-8 rounded-xl shadow-lg mt-4">
    <h3 className="text-2xl font-bold mb-6 text-orange-500">Your Bookings</h3>

    {/* Tab buttons */}
    <div className="flex gap-4 mb-6">
      {['Pending', 'Accepted', 'Confirmed'].map(tab => (
        <button
          key={tab}
          onClick={() => setBookingTab(tab)}
          className={`px-4 py-2 rounded-lg font-medium ${
            bookingTab === tab
              ? 'bg-orange-500 text-white'
              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Booking Lists */}
    <div className="space-y-6">
      {bookings
        .filter(b => b.status === bookingTab.toLowerCase())
        .map(booking => (
          <div
            key={booking.id}
            className="bg-orange-50 p-6 rounded-xl shadow hover:shadow-md transition"
          >
            {/* Common Info */}
            <p><strong>PG Name:</strong> {booking.pgName}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
            <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
            <p><strong>Status:</strong> {booking.status}</p>

            {/* Pending View */}
            {bookingTab === 'Pending' && (
              <>
                <p className="mt-4 font-semibold text-gray-700">User Details:</p>
                <p><strong>Name:</strong> {booking.user.name}</p>
                <p><strong>Email:</strong> {booking.user.email}</p>
                <p><strong>Phone:</strong> {booking.user.phone}</p>

                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </>
            )}

            {/* Accepted View */}
            {bookingTab === 'Accepted' && (
              <>
                <p className="mt-4"><strong>Payment Status:</strong> Pending</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Pay Now
                </button>
              </>
            )}

            {/* Confirmed View */}
            {bookingTab === 'Confirmed' && (
              <>
                <p className="mt-4"><strong>Payment Status:</strong> Paid</p>
                <p><strong>Transaction ID:</strong> {booking.transactionId}</p>
              </>
            )}
          </div>
        ))}

      {/* No Bookings Message */}
      {bookings.filter(b => b.status === bookingTab.toLowerCase()).length === 0 && (
        <p className="text-gray-600 text-center mt-10">No {bookingTab} bookings found.</p>
      )}
    </div>
  </motion.div>
)}


            {activeSection === 'Visits' && (
              <motion.div {...fadeAnim} key="Visits" className="bg-white p-8 rounded-xl shadow-lg mt-4">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">Scheduled Visits</h3>
                <div className="space-y-4">
                  {visits.map((visit) => (
                    <div key={visit.id} className="p-4 rounded-lg bg-orange-50 shadow-sm hover:shadow-md transition">
                      <p><strong>PG Name:</strong> {visit.pgName}</p>
                      <p><strong>Property Type:</strong> {visit.type}</p>
                      <p><strong>Date:</strong> {visit.date}</p>
                      <p><strong>Time:</strong> {visit.time}</p>
                      <p><strong>Address:</strong> {visit.address}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

               {/* Upload Property Section */}
      {activeSection === 'Upload Property' && (
  <motion.div {...fadeAnim} className="bg-white p-10 rounded-xl shadow-lg mt-4 max-w-5xl mx-auto">
    <h3 className="text-xl font-bold mb-6 text-orange-500 text-center">Upload Your Property</h3>
    <form className="space-y-6 text-gray-700">
      <div className="grid grid-cols-2 gap-6">
        <input type="text" placeholder="Owner Name" className="input-style" />

        {/* Property Type Dropdown */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="input-style text-gray-500"
        >
          <option value="" disabled hidden>
            Type of Property
          </option>
         
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>

        {/* Flat Type Dropdown (only if Flat is selected) */}
        {propertyType === 'Flat' && (
          <select className="input-style">
            <option value="" disabled hidden>
              Select Flat Type
            </option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        )}

        <input type="number" placeholder="No. of Sharing" className="input-style" />
        <input type="text" placeholder="City" className="input-style" />
        <input type="text" placeholder="Address" className="input-style" />
        <input type="text" placeholder="Phone Number" className="input-style" />
        <input type="email" placeholder="Email" className="input-style" />

        <select className="input-style">
          <option value="" disabled hidden>
            Gender Preference
          </option>
          <option>Boys</option>
          <option>Girls</option>
          <option>All</option>
        </select>

        <input type="text" placeholder="Rent Amount" className="input-style" />
        <input type="text" placeholder="Deposit Amount" className="input-style" />
      </div>

      {/* PG Room Numbers Textarea */}
      {propertyType === 'PG' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PG Room Numbers Available</label>
          <textarea
            className="input-style w-full h-24 resize-none"
            placeholder="Enter room numbers separated by commas (e.g. 101, 102, 103)"
          ></textarea>
        </div>
      )}

      <textarea
        placeholder="Amenities (comma separated)"
        className="input-style w-full h-24 resize-none"
      ></textarea>

      <input type="file" className="input-style" />

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  </motion.div>
)}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default OwnerProfile;
