import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PGListing = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: [],
    accommodation: [],
    facility: [],
    food: [],
    bathroom: [],
    amenities: [],
  });

  const [pgs, setPgs] = useState([]); // fetched PGs
  const [loading, setLoading] = useState(true);

  // ✅ Fetch PGs from backend
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/allproperties");
        const data = await res.json();

        // 🔹 Normalize amenities to always be an array
        const normalized = data.map((pg) => ({
          ...pg,
          amenities: Array.isArray(pg.amenities)
            ? pg.amenities
            : typeof pg.amenities === "string"
            ? pg.amenities.split(",").map((a) => a.trim())
            : [],
        }));

        setPgs(normalized);
      } catch (err) {
        console.error("Error fetching PGs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

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

  // ✅ Apply filters to fetched PGs
  const filteredPGs = pgs.filter((pg) => {
    return (
      (filters.gender.length === 0 || filters.gender.includes(pg.genderPreference)) &&
      (filters.accommodation.length === 0 || filters.accommodation.includes(pg.propertyType)) &&
      (filters.food.length === 0 || filters.food.includes(pg.foodPreference)) &&
      (filters.amenities.length === 0 ||
        filters.amenities.every((item) => pg.amenities?.includes(item)))
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
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading PGs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredPGs.length > 0 ? (
            filteredPGs.map((pg) => (
              <div
                key={pg._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
              >
                <img
                  src={`http://localhost:5000/${pg.images[0]}`} // ✅ load from backend
                  alt={pg.propertyName}
                  className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200?text=No+Image")
                  }
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{pg.propertyName}</h2>
                  <p className="text-sm text-gray-500 mb-1">{pg.city}</p>
                  <p className="text-lg font-semibold text-orange-600 mb-1">₹{pg.rent}/month</p>
                  <p className="text-sm text-gray-600 mb-1">
                    {pg.genderPreference} • {pg.propertyType}  • {pg.foodPreference || ""} • {pg.flatType || ""}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 flex-1">
                    <span className="font-medium">Amenities:</span>{" "}
                    {pg.amenities?.length > 0 ? pg.amenities.join(", ") : "Not specified"}
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
      )}

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
            <FilterGroup
              title="Gender"
              category="gender"
              options={["Boys", "Girls", "All"]}
              filters={filters}
              onCheck={handleCheckbox}
              onClearCategory={clearCategory}
            />

            <FilterGroup
              title="Accommodation Type"
              category="accommodation"
              options={["PG", "Flat"]}
              filters={filters}
              onCheck={handleCheckbox}
              onClearCategory={clearCategory}
            />

            <FilterGroup
              title="Food Options"
              category="food"
              options={["Veg", "Non-Veg", "Both(Veg-Non-Veg)"]}
              filters={filters}
              onCheck={handleCheckbox}
              onClearCategory={clearCategory}
            />

            <FilterGroup
              title="Amenities"
              category="amenities"
              options={["WiFi", "Balcony", "Parking", "Terrace", "Garden", "Power Backup", "Geyser", "CCTV", "RO Water","Washing Machine"]}
              filters={filters}
              onCheck={handleCheckbox}
              onClearCategory={clearCategory}
            />
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
