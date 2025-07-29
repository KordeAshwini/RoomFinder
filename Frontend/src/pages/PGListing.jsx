// import { useState } from "react";
// import { X } from "lucide-react"; // Importing lucide-react for icons


// const PGListing = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     gender: [],
//     accommodation: [],
//     facility: [],
//     food: [],
//     bathroom: [],
//     amenities: [],
//   });

//   const dummyPGs = [
//     {
//       id: 1,
//       name: "Sunrise PG",
//       location: "Pune",
//       rent: 7000,
//       gender: "Girls",
//       accommodation: "PG",
//       facility: "AC",
//       food: "Vegetarian",
//       bathroom: "Attached",
//       amenities: ["Hot Water", "WiFi", "Balcony"],
//       image: "https://source.unsplash.com/300x200/?hostel",
//     },
//     {
//       id: 2,
//       name: "GreenView Flat",
//       location: "Mumbai",
//       rent: 10000,
//       gender: "Boys",
//       accommodation: "Flat",
//       facility: "Cooler",
//       food: "Non-Vegetarian",
//       bathroom: "Shared",
//       amenities: ["Gym", "Parking", "Terrace", "WiFi"],
//       image: "https://source.unsplash.com/300x200/?pg-room",
//     },
//   ];

//   const handleCheckbox = (category, value) => {
//     setFilters((prev) => {
//       const isChecked = prev[category].includes(value);
//       return {
//         ...prev,
//         [category]: isChecked
//           ? prev[category].filter((v) => v !== value)
//           : [...prev[category], value],
//       };
//     });
//   };

//   const filteredPGs = dummyPGs.filter((pg) => {
//     return (
//       (filters.gender.length === 0 || filters.gender.includes(pg.gender)) &&
//       (filters.accommodation.length === 0 || filters.accommodation.includes(pg.accommodation)) &&
//       (filters.facility.length === 0 || filters.facility.includes(pg.facility)) &&
//       (filters.food.length === 0 || filters.food.includes(pg.food)) &&
//       (filters.bathroom.length === 0 || filters.bathroom.includes(pg.bathroom)) &&
//       (filters.amenities.length === 0 ||
//         filters.amenities.every((item) => pg.amenities.includes(item)))
//     );
//   });

//   return (
//     <div className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
//        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-orange-500">Find Your PG</h1>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
//         >
//           Filters
//         </button>
//       </nav>

      
       
//       {/* PG Listings */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//         {filteredPGs.length > 0 ? (
//           filteredPGs.map((pg) => (
//             <div
//               key={pg.id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
//             >
//               <img
//                 src={pg.image}
//                 alt={pg.name}
//                 className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
//               />
//               <div className="p-4 flex flex-col flex-grow">
//                 <h2 className="text-xl font-bold text-gray-800 mb-1">{pg.name}</h2>
//                 <p className="text-sm text-gray-500 mb-1">{pg.location}</p>
//                 <p className="text-lg font-semibold text-orange-600 mb-1">₹{pg.rent}/month</p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   {pg.gender} • {pg.accommodation} • {pg.facility}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2 flex-1">
//                   <span className="font-medium">Amenities:</span> {pg.amenities.join(", ")}
//                 </p>
//                 <button className="mt-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium py-2 rounded-lg transition">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No PGs found.</p>
//         )}
//       </div>


//       {/* Right Filter Panel */}
//       {showFilters && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-end">
//           <div className="w-80 bg-white h-full shadow-xl p-6 overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Filters</h2>
//               <button onClick={() => setShowFilters(false)}>
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Gender */}
//             <FilterGroup title="Gender" category="gender" options={["Boys", "Girls", "Co-ed"]} filters={filters} onCheck={handleCheckbox} />
            
//             {/* Accommodation */}
//             <FilterGroup title="Accommodation Type" category="accommodation" options={["Hostel", "PG", "Flat", "House"]} filters={filters} onCheck={handleCheckbox} />
            
//             {/* Facility */}
//             <FilterGroup title="Facility" category="facility" options={["Regular", "Cooler", "AC"]} filters={filters} onCheck={handleCheckbox} />

//             {/* Food */}
//             <FilterGroup title="Food Options" category="food" options={["Food Available", "Vegetarian", "Non-Vegetarian"]} filters={filters} onCheck={handleCheckbox} />

//             {/* Bathroom */}
//             <FilterGroup title="Bathroom Type" category="bathroom" options={["Attached", "Shared"]} filters={filters} onCheck={handleCheckbox} />

//             {/* Amenities */}
//             <FilterGroup
//               title="Amenities"
//               category="amenities"
//               options={[
//                 "Hot Water", "Water Purifier", "WiFi", "Medical Support",
//                 "Gym", "Parking", "Terrace", "Garden", "Balcony"
//               ]}
//               filters={filters}
//               onCheck={handleCheckbox}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Reusable filter group
// const FilterGroup = ({ title, category, options, filters, onCheck }) => (
//   <div className="mb-4">
//     <h3 className="font-semibold text-gray-700">{title}</h3>
//     <div className="space-y-2 mt-2">
//       {options.map((option) => (
//         <label key={option} className="flex items-center">
//           <input
//             type="checkbox"
//             checked={filters[category]?.includes(option)}
//             onChange={() => onCheck(category, option)}
//             className="mr-2"
//           />
//           {option}
//         </label>
//       ))}
//     </div>
//   </div>
// );

// export default PGListing;



import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Add at the top

const PGListing = () => {
  const navigate = useNavigate(); // Inside PGListing component

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: [],
    accommodation: [],
    facility: [],
    food: [],
    bathroom: [],
    amenities: [],
  });

  const dummyPGs = [
    {
      id: 1,
      name: "Sunrise PG",
      location: "Pune",
      rent: 7000,
      gender: "Girls",
      accommodation: "PG",
      facility: "AC",
      food: "Vegetarian",
      bathroom: "Attached",
      amenities: ["Hot Water", "WiFi", "Balcony"],
      image: "https://source.unsplash.com/300x200/?hostel",
    },
    {
      id: 2,
      name: "GreenView Flat",
      location: "Mumbai",
      rent: 10000,
      gender: "Boys",
      accommodation: "Flat",
      facility: "Cooler",
      food: "Non-Vegetarian",
      bathroom: "Shared",
      amenities: ["Gym", "Parking", "Terrace", "WiFi"],
      image: "https://source.unsplash.com/300x200/?pg-room",
    },
  ];

  const handleCheckbox = (category, value) => {
    setFilters((prev) => {
      const isChecked = prev[category].includes(value);
      return {
        ...prev,
        [category]: isChecked
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  const clearCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      gender: [],
      accommodation: [],
      facility: [],
      food: [],
      bathroom: [],
      amenities: [],
    });
  };

  const filteredPGs = dummyPGs.filter((pg) => {
    return (
      (filters.gender.length === 0 || filters.gender.includes(pg.gender)) &&
      (filters.accommodation.length === 0 || filters.accommodation.includes(pg.accommodation)) &&
      (filters.facility.length === 0 || filters.facility.includes(pg.facility)) &&
      (filters.food.length === 0 || filters.food.includes(pg.food)) &&
      (filters.bathroom.length === 0 || filters.bathroom.includes(pg.bathroom)) &&
      (filters.amenities.length === 0 ||
        filters.amenities.every((item) => pg.amenities.includes(item)))
    );
  });

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Top Nav */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-500">Find Your PG</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Filters
        </button>
      </nav>

      {/* PG Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredPGs.length > 0 ? (
          filteredPGs.map((pg) => (
            <div
              key={pg.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              <img
                src={pg.image}
                alt={pg.name}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{pg.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{pg.location}</p>
                <p className="text-lg font-semibold text-orange-600 mb-1">₹{pg.rent}/month</p>
                <p className="text-sm text-gray-600 mb-1">
                  {pg.gender} • {pg.accommodation} • {pg.facility}
                </p>
                <p className="text-sm text-gray-600 mt-2 flex-1">
                  <span className="font-medium">Amenities:</span> {pg.amenities.join(", ")}
                </p>
                <button
                onClick={() => navigate("/pg-details", { state: { pg } })}
                className="mt-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium py-2 rounded-lg transition"
                >
                View Details
              </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No PGs found.</p>
        )}
      </div>

      {/* Right Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-end">
          <div className="w-80 bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Clear All Button */}
            <button
              onClick={clearAllFilters}
              className="w-full mb-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm"
            >
              Clear All
            </button>

            {/* Individual Filter Groups */}
            <FilterGroup title="Gender" category="gender" options={["Boys", "Girls", "Co-ed"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />

            <FilterGroup title="Accommodation Type" category="accommodation" options={["Hostel", "PG", "Flat", "House"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />

            <FilterGroup title="Facility" category="facility" options={["Regular", "Cooler", "AC"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />

            <FilterGroup title="Food Options" category="food" options={["Food Available", "Vegetarian", "Non-Vegetarian"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />

            <FilterGroup title="Bathroom Type" category="bathroom" options={["Attached", "Shared"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />

            <FilterGroup title="Amenities" category="amenities" options={["Hot Water", "Water Purifier", "WiFi", "Medical Support", "Gym", "Parking", "Terrace", "Garden", "Balcony"]} filters={filters} onCheck={handleCheckbox} onClearCategory={clearCategory} />
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Filter Group Component
const FilterGroup = ({ title, category, options, filters, onCheck, onClearCategory }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      {filters[category]?.length > 0 && (
        <button
          onClick={() => onClearCategory(category)}
          className="text-xs text-orange-500 hover:underline"
        >
          Clear
        </button>
      )}
    </div>
    <div className="space-y-2 mt-2">
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            checked={filters[category]?.includes(option)}
            onChange={() => onCheck(category, option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default PGListing;
