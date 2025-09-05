import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const OwnerProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");

  const userData = localStorage.getItem("user");
  const userName = localStorage.getItem("name");

  const userEmail = userData ? JSON.parse(userData).email : null;
  const userPhone = userData ? JSON.parse(userData).phone : null;
  const userId = userData ? JSON.parse(userData).id : null; // backend user id
  //console.log("User ID:", userId);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
  });

  const [editedProfile, setEditedProfile] = useState({ ...profileDetails });
  const [bookingTab, setBookingTab] = useState("Pending");

  // ---------------- Fetch Owner Properties ----------------
  const [properties, setProperties] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user?.id;  // the logged-in user's id
// console.log("Owner ID:", ownerId);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || storedUser.role !== "Owner") {
    console.log("No owner user logged in");
    return;
  }

  fetch(`http://localhost:5000/api/properties/owner/${storedUser.id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched Data:", data); // ✅ check API response shape
      const fetchedProperties = data.properties || data; // handle both array or object
      setProperties(fetchedProperties);
    })
    .catch((err) => console.error("Error fetching properties:", err));
}, []);

  // ---------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileDetails(editedProfile);
    setIsEditingProfile(false);
  };

  const fadeAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  // Dummy bookings & visits (keep as you had)
  const bookings = [
    {
      id: 1,
      pgName: "Sunrise PG",
      roomType: "Single",
      checkInDate: "2025-08-05",
      bookingDate: "2025-07-30",
      status: "pending",
      user: { name: "Srushti Kange", email: "srushti@example.com", phone: "9876543210" },
      transactionId: "TXN123456",
    },
  ];
  const visits = [
    { id: 1, pgName: "Green PG", type: "Boys PG", date: "2025-08-10", time: "4:00 PM", address: "Kothrud, Pune" },
    { id: 2, pgName: "Urban Stay", type: "Girls PG", date: "2025-08-15", time: "11:00 AM", address: "Viman Nagar, Pune" },
  ];

  // ---------------- Upload Property State + Handlers ----------------
  const [propertyType, setPropertyType] = useState("");
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    ownerId: ownerId || "", // Set ownerId from logged-in user
    ownerName: userName || "",
    propertyType: "",
    flatType: "",
    sharing: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    genderPreference: "",
    rent: "",
    deposit: "",
    pgRooms: "",
    amenities: "",
    foodPreference: "",
    propertyName: "",
    // image: null, // handled separately
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append("image", image);
      }

      const res = await fetch("http://localhost:5000/api/properties/createproperties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ don’t set "Content-Type", fetch + FormData handles it automatically
        },
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Server error:", errData);
        alert(errData.message || "Failed to upload property");
        return;
      }

      const result = await res.json();
      alert("Property uploaded successfully!");
      setProperties((prev) => [...prev, result.property]); // add new property to list
      setActiveSection("My Properties"); // switch to My Properties section
      // Reset form
      console.log(result);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload property");
    }
  };

  // ------------------------------------------------------------------

  return (
    <div className="pt-20 px-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 bg-white rounded-r-xl shadow-xl p-6 h-[calc(100vh-5rem)] sticky top-20 flex flex-col justify-start">
          <ul className="space-y-4 text-orange-600 font-medium">
            {["Profile", "My Properties", "Bookings", "Visits", "Upload Property"].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer hover:text-orange-800 transition-all duration-300 rounded-lg px-2 py-1 ${
                  activeSection === section && "text-orange-800 font-bold bg-orange-100"
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
            {/* Profile Section */}
            {activeSection === "Profile" && (
              <motion.div
                {...fadeAnim}
                key="Profile"
                className="bg-white p-8 rounded-xl shadow-lg mt-4 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                  Owner Profile
                </h2>

                {/* {!isEditingProfile ? (
                  <> */}
                    <div className="grid grid-cols-1 gap-4 text-gray-800">
                      <p>
                        <strong>Name:</strong> {profileDetails.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {profileDetails.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {profileDetails.phone}
                      </p>
                    </div>

                    {/* <div className="flex justify-center mt-6">
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
                )} */}
              </motion.div>
            )}


            {/* My Properties Section (fixed) */}
            {activeSection === "My Properties" && (
              <motion.div {...fadeAnim} key="MyProperties" className="bg-white p-8 rounded-xl shadow-lg mt-4">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">My Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties && properties.length > 0 ? (
                    properties.map((property) => (
                      <div
                        key={property._id}
                        className="bg-orange-50 rounded-lg shadow p-4 hover:shadow-md transition relative"
                      >
                        <img
                          src={`http://localhost:5000/${property.image}`}
                          alt={property.propertyName}
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <h4 className="text-lg font-semibold">{property.propertyName}</h4>
                        <p className="text-sm text-gray-700">Location: {property.city}</p>
                        <button
                          onClick={() => (window.location.href = `/property-edit-form/${property._id}`)}
                          className="absolute top-3 right-3 text-orange-600 hover:text-orange-800 transition"
                          title="Edit Property"
                        >
                          ✏️
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2">No properties added yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- keep your Profile, Bookings, Visits, Upload Property sections unchanged --- */}
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
          {activeSection === "Upload Property" && (
  <motion.div
    {...fadeAnim}
    className="bg-white p-10 rounded-xl shadow-lg mt-4 max-w-5xl mx-auto"
  >
    <h3 className="text-xl font-bold mb-6 text-orange-500 text-center">
      Upload Your Property
    </h3>
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-700"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Property Name */}
        <input
          type="text"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          placeholder="Property Name"
          className="input-style"
          required
        />

        {/* Owner Name */}
        <input
          type="text"
          name="ownerName"
          // value={formData.ownerName}
          // onChange={handleChange}
          // placeholder="Owner Name"
          // className="input-style"
          value={userName || ""}
          disabled
          className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"

          required
        />

        {/* Property Type Dropdown */}
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={(e) => {
            handleChange(e);
            setPropertyType(e.target.value);
          }}
          className="input-style text-gray-500"
          required
        >
          <option value="" disabled hidden>
            Type of Property
          </option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>

        {/* Flat Type Dropdown (only if Flat is selected) */}
        {propertyType === "Flat" && (
          <select
            name="flatType"
            value={formData.flatType}
            onChange={handleChange}
            className="input-style"
          >
            <option value="" disabled hidden>
              Select Flat Type
            </option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        )}

        {/* Sharing */}
        <input
          type="number"
          name="sharing"
          value={formData.sharing}
          onChange={handleChange}
          placeholder="No. of Sharing"
          className="input-style"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="input-style"
          required
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input-style"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input-style"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-style"
        />

        {/* Gender Preference */}
        <select
          name="genderPreference"
          value={formData.genderPreference}
          onChange={handleChange}
          className="input-style"
        >
          <option value="" disabled hidden>
            Gender Preference
          </option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="All">All</option>
        </select>

        {/* Food Preference */}
        <select
          name="foodPreference"
          value={formData.foodPreference}
          onChange={handleChange}
          className="input-style"
        >
          <option value="" disabled hidden>
            Food Preference
          </option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Both(Veg-Non-Veg)">Both(Veg-Non-Veg)</option>
        </select>

        {/* Rent */}
        <input
          type="text"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Rent Amount"
          className="input-style"
        />

        {/* Deposit */}
        <input
          type="text"
          name="deposit"
          value={formData.deposit}
          onChange={handleChange}
          placeholder="Deposit Amount"
          className="input-style"
        />
      </div>

      {/* PG Room Numbers Textarea */}
      {propertyType === "PG" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PG Room Numbers Available
          </label>
          <textarea
            name="pgRooms"
            value={formData.pgRooms}
            onChange={handleChange}
            className="input-style w-full h-24 resize-none"
            placeholder="Enter room numbers separated by commas (e.g. 101, 102, 103)"
          ></textarea>
        </div>
      )}

      {/* Amenities */}
      <textarea
        name="amenities"
        value={formData.amenities}
        onChange={handleChange}
        placeholder="Amenities (comma separated)"
        className="input-style w-full h-24 resize-none"
      ></textarea>

      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Property Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
          }
          className="input-style w-full"
        />
      </div>

      {/* Upload Image */}
{/* <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Upload Property Images
  </label>
  <input
    type="file"
    name="images"
    accept="image/*"
    multiple // ✅ allow multiple uploads
    onChange={(e) => setImages(Array.from(e.target.files))} // ✅ store multiple files
    className="input-style w-full"
  />
</div> */}



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
