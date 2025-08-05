// import { useLocation, useNavigate } from "react-router-dom";
// import { ChevronLeft } from "lucide-react";
// import ScheduleVisitModal from "./ScheduleVisitModal";
// import React, { useState } from "react";

// const PGDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { pg } = location.state || {};
  
//   const [showVisitModal, setShowVisitModal] = useState(false);

//   if (!pg) {
//     return <div className="p-6">No PG details found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 pt-24 pb-12">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-4"
//       >
//         <ChevronLeft /> Back to Listings
//       </button>

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-orange-600 mb-2">{pg.name}</h1>
//       <p className="text-gray-600 text-sm mb-4">{pg.location}</p>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         {[...Array(5)].map((_, i) => (
//           <img
//             key={i}
//             src={`${pg.image}&sig=${i}`}
//             alt={`PG Image ${i + 1}`}
//             className="rounded-lg object-cover w-full h-48 shadow"
//           />
//         ))}
//       </div>

//       {/* PG Info Section */}
//       <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg">
//         {/* Left Info */}
//         <div className="space-y-3">
//           <div>
//             <strong className="text-gray-700">Property Type:</strong> {pg.accommodation}
//           </div>
//           <div>
//             <strong className="text-gray-700">Gender:</strong> {pg.gender}
//           </div>
//           <div>
//             <strong className="text-gray-700">Sharing:</strong> 2 / 3 / Single Sharing Available
//           </div>
//           <div>
//             <strong className="text-gray-700">Move-in Date:</strong> Immediate
//           </div>
//           <div>
//             <strong className="text-gray-700">Minimum Stay:</strong> 3 Months
//           </div>
//           <div>
//             <strong className="text-gray-700">Bathroom:</strong> {pg.bathroom}
//           </div>
//           <div>
//             <strong className="text-gray-700">Food:</strong> {pg.food}
//           </div>
//           <div>
//             <strong className="text-gray-700">Cooling:</strong> {pg.facility}
//           </div>
//         </div>

//         {/* Right Info */}
//         <div className="space-y-4">
//           <div>
//             <h2 className="font-semibold text-gray-700 mb-1">Overview</h2>
//             <p className="text-gray-600">
//               {pg.name} is located in {pg.location}. This property is well-maintained, secure, and offers ideal living conditions for students and professionals.
//             </p>
//           </div>
//           <div>
//             <h2 className="font-semibold text-gray-700 mb-1">Amenities</h2>
//             <p className="text-gray-600">{pg.amenities?.join(", ")}</p>
//           </div>
//           <div className="flex justify-between text-lg font-semibold">
//             <span className="text-green-700">Rent: ₹{pg.rent}/month</span>
//             <span className="text-blue-700">Deposit: ₹{pg.rent * 2}</span>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-8 flex flex-col sm:flex-row gap-4">
//         {/* <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition">
//           Book Now
//         </button> */}
//         <button
//         onClick={() => navigate("/book-now", { state: { pgName: pg.name, gender: pg.gender } })}
//         className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition"
//         >
//           Book Now
//         </button>
//         {/* <button className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-medium transition">
//           Schedule a Visit
//         </button> */}
//         <button
//           onClick={() => navigate("/schedule-visit", { state: { pgName: pg.name, gender: pg.gender } })}
//           className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-medium transition"
//         >
//           Schedule a Visit
//         </button>
//         {/* <button
//           onClick={() => setShowVisitModal(true)}
//           className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-medium transition"
//         >
//           Schedule a Visit
//         </button>

//         {showVisitModal && (
//           <ScheduleVisitModal
//             pgName={pg.name}
//             gender={pg.gender}
//             onClose={() => setShowVisitModal(false)}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default PGDetails;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BookingFormModal from "./BookingFormModal"; // Make sure path is correct
import ScheduleVisitModal from "./ScheduleVisitModal";

const PGDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pg } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);

  if (!pg) {
    return <div className="p-6">No PG details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 pt-24 pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-4">
        <ChevronLeft /> Back to Listings
      </button>

      <h1 className="text-3xl font-bold text-orange-600 mb-2">{pg.name}</h1>
      <p className="text-gray-600 text-sm mb-4">{pg.location}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <img key={i} src={`${pg.image}&sig=${i}`} alt={`PG Image ${i + 1}`} className="rounded-lg object-cover w-full h-48 shadow" />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg">
        <div className="space-y-3">
          <div><strong className="text-gray-700">Property Type:</strong> {pg.accommodation}</div>
          <div><strong className="text-gray-700">Gender:</strong> {pg.gender}</div>
          <div><strong className="text-gray-700">Sharing:</strong> 2 / 3 / Single Sharing Available</div>
          <div><strong className="text-gray-700">Move-in Date:</strong> Immediate</div>
          <div><strong className="text-gray-700">Minimum Stay:</strong> 3 Months</div>
          <div><strong className="text-gray-700">Bathroom:</strong> {pg.bathroom}</div>
          <div><strong className="text-gray-700">Food:</strong> {pg.food}</div>
          <div><strong className="text-gray-700">Cooling:</strong> {pg.facility}</div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Overview</h2>
            <p className="text-gray-600">{pg.name} is located in {pg.location}. This property is well-maintained, secure, and offers ideal living conditions for students and professionals.</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Amenities</h2>
            <p className="text-gray-600">{pg.amenities?.join(", ")}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-green-700">Rent: ₹{pg.rent}/month</span>
            <span className="text-blue-700">Deposit: ₹{pg.rent * 2}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Book Now
        </button>
         {/* Modal */}
      {showModal && (
        <BookingFormModal
          pgName={pg.name}
          gender={pg.gender}
          onClose={() => setShowModal(false)}
        />
      )}

        <button
        onClick={() => setShowVisitModal(true)}
        className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-medium transition"
        >
          Schedule a Visit
        </button>

      {showVisitModal && (
        <ScheduleVisitModal
          pgName={pg.name}
          gender={pg.gender}
          onClose={() => setShowVisitModal(false)}
        />
      )}

    </div>
    </div>
  );

};

export default PGDetails;
