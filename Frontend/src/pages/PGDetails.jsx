import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BookingFormModal from "./BookingFormModal";
import ScheduleVisitModal from "./ScheduleVisitModal";

const PGDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pg } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);

  // ✅ Get user info (example: from localStorage after login)
  const user = JSON.parse(localStorage.getItem("user")); 
  // Expected structure: { id, name, role: "Tenant" | "Owner" | "Admin", token }

  if (!pg) {
    return <div className="p-6">No PG details found.</div>;
  }

  const handleBookClick = () => {
    if (!user) {
      alert("Please log in first to book a PG.");
      return;
    }
    if (user.role !== "Tenant") {
      alert("Only Tenants can book a PG.");
      return;
    }
    setShowModal(true);
  };

  const handleVisitClick = () => {
    if (!user) {
      alert("Please log in first to schedule a visit.");
      return;
    }
    if (user.role !== "Tenant") {
      alert("Only Tenants can schedule a visit.");
      return;
    }
    setShowVisitModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 pt-24 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-4"
      >
        <ChevronLeft /> Back to Listings
      </button>

      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        {pg.propertyName}
      </h1>
      <p className="text-gray-600 text-sm mb-4">{pg.address}, {pg.city}</p>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
  {pg.images && pg.images.length > 0 ? (
    pg.images.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:5000/${img}`}   // ✅ Show each uploaded image
        alt={`PG Property ${index + 1}`}
        className="rounded-lg object-cover w-full h-48 shadow"
      />
    ))
  ) : (
    <p className="text-gray-500">No image available</p>
  )}
</div>


      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg">
        <div className="space-y-3">
          <div className="text-gray-700"><strong className="text-gray-700">Owner Name:</strong> {pg.ownerName}</div>
          <div className="text-gray-700"><strong className="text-gray-700">Property Type:</strong> {pg.propertyType}</div>
          {pg.propertyType === "PG" && (
            <>
            <div className="text-gray-700"><strong className="text-gray-700">PG Rooms:</strong> {pg.pgRooms || "N/A"}</div>
            </>
          )}
          {pg.propertyType === "Flat" && (
            <>
            <div className="text-gray-700"><strong className="text-gray-700">Flat Type:</strong> {pg.flatType || "N/A"}</div>
            </>
          )}
          {pg.typeOfTenant !== "Family" && pg.typeOfTenant !== "Single" && (
            <>
              <div className="text-gray-700"><strong className="text-gray-700">Sharing:</strong> {pg.sharing || "N/A"}</div>
             </>
          )}
           {pg.typeOfTenant !== "Family" && (
              <div className="text-gray-700"><strong className="text-gray-700">Gender Preference:</strong> {pg.genderPreference || "N/A"}</div>
            )}


              {pg.propertyType === "Flat" && (
              <div className="text-gray-700"><strong className="text-gray-700">Type of Tenant:</strong> {pg.typeOfTenant || "N/A"}</div>
            )}
              <div className="text-gray-700">
  <strong className="text-gray-700">Move-in Date:</strong>{" "}
  {pg.moveInDate
    ? new Date(pg.moveInDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "N/A"}
</div>
              <div className="text-gray-700"><strong className="text-gray-700">Food Preference:</strong> {pg.foodPreference || "N/A"}</div>


          <div className="text-gray-700"><strong className="text-gray-700">Phone:</strong> {pg.phone}</div>
          <div className="text-gray-700"><strong className="text-gray-700">Email:</strong> {pg.email}</div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Amenities</h2>
            <p className="text-gray-600">
              {pg.amenities ? pg.amenities.toString() : "Not specified"}
            </p>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-green-700">Rent: ₹{pg.rent}/month</span>
            <span className="text-blue-700">Deposit: ₹{pg.deposit}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* Book Now */}
        <button
          onClick={handleBookClick}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Book Now
        </button>
        {showModal && (
          <BookingFormModal
            pgId={pg._id}
            pgName={pg.propertyName}
            gender={pg.genderPreference}
            propertyType={pg.propertyType}
            sharing={pg.sharing}
            moveInDate={pg.moveInDate}
            typeOfTenant={pg.typeOfTenant}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Schedule Visit */}
        <button
          onClick={handleVisitClick}
          className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-medium transition"
        >
          Schedule a Visit
        </button>
        {showVisitModal && (
          <ScheduleVisitModal
            pgId={pg._id}
            pgName={pg.propertyName}
            gender={pg.genderPreference}
            typeOfTenant={pg.typeOfTenant}
            onClose={() => setShowVisitModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PGDetails;
