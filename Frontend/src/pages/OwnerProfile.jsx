import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const OwnerProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const userData = localStorage.getItem("user");
  const userName = localStorage.getItem("name");
  const userEmail = userData ? JSON.parse(userData).email : null;
  const userPhone = userData ? JSON.parse(userData).phone : null;
  const [profileDetails, setProfileDetails] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
  });

  const [bookingTab, setBookingTab] = useState("Pending");
  const [properties, setProperties] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user?.id;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "Owner") {
      console.log("No owner user logged in");
      return;
    }

    // Correctly handle the fetch response to prevent errors
    fetch(`http://localhost:5000/api/properties/owner/${storedUser.id}`)
      .then((res) => {
        if (!res.ok) {
          // If response is not ok (e.g., 404), throw an error to trigger catch block
          if (res.status === 404) {
            return { properties: [] }; // Return an empty object with a properties array
          }
          throw new Error("Failed to fetch properties");
        }
        return res.json();
      })
      .then((data) => {
        const fetchedProperties = data.properties || data; // handle both array or object
        // Ensure fetchedProperties is an array before setting state
        if (Array.isArray(fetchedProperties)) {
          setProperties(fetchedProperties);
        } else {
          // If the response is not an array, set to an empty array to prevent the error
          setProperties([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setProperties([]); // Set to empty array on error
      });
  }, [ownerId]);

  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/getbookings");
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
          setPayments(data.payments || []);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
        );
        if (newStatus === "Accepted") setBookingTab("Accepted");
        alert(`Booking ${newStatus} successfully!`);
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating booking status");
    }
  };

  const [visits, setVisits] = useState([]);
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/visits/getVisits");
        const data = await res.json();
        if (data.success) {
          setVisits(data.visits);
        }
      } catch (err) {
        console.error("Error fetching visits:", err);
      }
    };
    fetchVisits();
  }, []);

  const [propertyType, setPropertyType] = useState("");
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    ownerId: ownerId || "",
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
      if (images.length > 0) {
        images.forEach((image) => {
          data.append("images", image);
        });
      }
      const res = await fetch("http://localhost:5000/api/properties/createproperties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
      setProperties((prev) => [...prev, result.property]);
      setActiveSection("My Properties");
      console.log(result);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload property");
    }
  };

  const fadeAnim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <div className="pt-20 px-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <div className="flex">
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

        <main className="flex-1 px-8 pb-10">
          <AnimatePresence mode="wait">
            {activeSection === "Profile" && (
              <motion.div
                {...fadeAnim}
                key="Profile"
                className="bg-white p-8 rounded-xl shadow-lg mt-4 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                  Owner Profile
                </h2>
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
              </motion.div>
            )}

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
                        {/* Use Link instead of window.location for better SPA navigation */}
                        <Link to={`/property-edit-form/${property._id}`} className="block">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={`http://localhost:5000/${property.images[0]}`}
                              alt={property.propertyName}
                              className="w-full h-40 object-cover rounded-md mb-2"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500">
                              No Image
                            </div>
                          )}
                          <h4 className="text-lg font-semibold">{property.propertyName}</h4>
                          <p className="text-sm text-gray-700">Location: {property.city}</p>
                        </Link>
                        <Link
                          to={`/property-edit-form/${property._id}`}
                          className="absolute top-3 right-3 text-orange-600 hover:text-orange-800 transition"
                          title="Edit Property"
                        >
                          ✏️
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2">No properties added yet.</p>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeSection === "Bookings" && (
              <motion.div {...fadeAnim} key="Bookings" className="bg-white p-8 rounded-xl shadow-lg mt-4">
                <h3 className="text-2xl font-bold mb-6 text-orange-500">Your Bookings</h3>
                <div className="flex gap-4 mb-6">
                  {["Pending", "Accepted", "Confirmed"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setBookingTab(tab)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        bookingTab === tab
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-6">
                  {bookings
                    .filter((b) => b.status.toLowerCase() === bookingTab.toLowerCase())
                    .map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-orange-50 p-6 rounded-xl shadow hover:shadow-md transition"
                      >
                        <p><strong>PG Name:</strong> {booking.property?.propertyName}</p>
                        <p><strong>Room Type:</strong> {booking.property?.propertyType}</p>
                        <p><strong>City:</strong> {booking.property?.city}</p>
                        <p><strong>Rent:</strong> {booking.property?.rent}</p>
                        <p><strong>Check-in Date:</strong> {new Date(booking.moveInDate).toLocaleDateString()}</p>
                        <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <div className="mt-4">
                          <p className="font-semibold text-gray-700">Booked By:</p>
                          <p><strong>Name:</strong> {booking.user?.name}</p>
                          <p><strong>Email:</strong> {booking.user?.email}</p>
                          <p><strong>Phone:</strong> {booking.user?.phone}</p>
                        </div>
                        {bookingTab === "Pending" && (
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() => handleStatusChange(booking._id, "Accepted")}
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking._id, "Rejected")}
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {bookingTab === "Accepted" && (
                          <>
                            <p className="mt-4"><strong>Payment Status:</strong> Pending</p>
                            {userData.role === "Tenant" && (
                              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Pay Now
                              </button>
                            )}
                          </>
                        )}

                        {bookingTab === "Confirmed" && payments.map((payment) => (
                          <div key = {payment._id}>
                          <>
                            <p className="mt-4"><strong>Payment Status:</strong> Paid</p>
                            <p><strong>Transaction ID:</strong> {payment.transactionId || "N/A"}</p>
                          </>
                          </div>
                        ))}

                      </div>
                    ))}
                  {bookings.filter((b) => b.status === bookingTab).length === 0 && (
                    <p className="text-gray-600 text-center mt-10">No {bookingTab} bookings found.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === "Visits" && (
              <motion.div {...fadeAnim} key="Visits" className="bg-white p-8 rounded-xl shadow-lg mt-4">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-500">Scheduled Visits</h3>
                <div className="space-y-4">
                  {visits.map((visit) => (
                    <div key={visit.id} className="p-4 rounded-lg bg-orange-50 shadow-sm hover:shadow-md transition">
                      <p><strong>PG Name:</strong> {visit.propertyName}</p>
                      <p><strong>Property Type:</strong> {visit.propertyId?.propertyType}</p>
                      <p><strong>Date:</strong> {visit.date}</p>
                      <p><strong>Time:</strong> {visit.slot}</p>
                      <p><strong>Address:</strong> {visit.propertyId?.address}</p>
                      <p><strong>City:</strong> {visit.propertyId?.city}</p>
                      <p><strong>Tenant Name:</strong> {visit.userId?.name}</p>
                      <p><strong>Tenant Email:</strong> {visit.userId?.email}</p>
                      <p><strong>Tenant Phone:</strong> {visit.userId?.phone}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

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
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      placeholder="Property Name"
                      className="input-style"
                      required
                    />
                    <input
                      type="text"
                      name="ownerName"
                      value={userName || ""}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                      required
                    />
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
                    <input
                      type="number"
                      name="sharing"
                      value={formData.sharing}
                      onChange={handleChange}
                      placeholder="No. of Sharing"
                      className="input-style"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="input-style"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="input-style"
                      required
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="input-style"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="input-style"
                    />
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
                    <input
                      type="text"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      placeholder="Rent Amount"
                      className="input-style"
                    />
                    <input
                      type="text"
                      name="deposit"
                      value={formData.deposit}
                      onChange={handleChange}
                      placeholder="Deposit Amount"
                      className="input-style"
                    />
                  </div>
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
                  <textarea
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Amenities (comma separated)"
                    className="input-style w-full h-24 resize-none"
                  ></textarea>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Property Images
                    </label>
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => setImages(Array.from(e.target.files))}
                      className="input-style w-full"
                    />
                  </div>
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