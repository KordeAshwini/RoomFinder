// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const PropertyEditForm = () => {
//   const { id } = useParams();   // 👈 grab property id from URL
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     ownerId: "",
//     propertyName: "",
//     ownerName: "",
//     propertyType: "",
//     flatType: "",
//     sharing: "",
//     city: "",
//     address: "",
//     phone: "",
//     email: "",
//     genderPreference: "",
//     foodPreference: "",
//     rent: "",
//     deposit: "",
//     pgRooms: "",
//     amenities: "",
//     image: ""
//   });

//   // Fetch property details by ID
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/properties/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch property");
//         const data = await res.json();
//         setFormData(data);
//       } catch (error) {
//         console.error("Error fetching property:", error);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to update property");

//       alert("Property updated successfully!");
//       navigate(-1); // 👈 go back to previous page after saving
//     } catch (error) {
//       console.error("Error updating property:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Edit Property</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} placeholder="Property Name" className="border p-2 rounded" />
//         <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Owner Name" className="border p-2 rounded" />
//         <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Property Type" className="border p-2 rounded" />
//         <input type="text" name="flatType" value={formData.flatType} onChange={handleChange} placeholder="Flat Type" className="border p-2 rounded" />
//         <input type="number" name="sharing" value={formData.sharing} onChange={handleChange} placeholder="Sharing" className="border p-2 rounded" />
//         <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
//         <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded col-span-2" />
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
//         <input type="text" name="genderPreference" value={formData.genderPreference} onChange={handleChange} placeholder="Gender Preference" className="border p-2 rounded" />
//         <input type="text" name="foodPreference" value={formData.foodPreference} onChange={handleChange} placeholder="Food Preference" className="border p-2 rounded" />
//         <input type="text" name="rent" value={formData.rent} onChange={handleChange} placeholder="Rent" className="border p-2 rounded" />
//         <input type="text" name="deposit" value={formData.deposit} onChange={handleChange} placeholder="Deposit" className="border p-2 rounded" />
//         <input type="text" name="pgRooms" value={formData.pgRooms} onChange={handleChange} placeholder="PG Rooms" className="border p-2 rounded" />
//         <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities" className="border p-2 rounded col-span-2" />

//         {formData.image && (
//           <div className="col-span-2">
//             <p className="mb-2 font-semibold">Current Image:</p>
//             <img src={`http://localhost:5000/${formData.image}`} alt="Property" className="h-40 object-cover rounded" />
//           </div>
//         )}

//         <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PropertyEditForm;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PropertyEditForm = () => {
  const { id } = useParams();   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerId: "",
    propertyName: "",
    ownerName: "",
    propertyType: "",
    flatType: "",
    sharing: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    genderPreference: "",
    foodPreference: "",
    rent: "",
    deposit: "",
    pgRooms: "",
    amenities: "",
    image: ""
  });

  // Fetch property details by ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update property");

      alert("Property updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this property?")) return;
  try {
    const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete property");
    alert("Property deleted successfully!");
    navigate(-1); // go back after deletion
  } catch (error) {
    console.error("Error deleting property:", error);
  }
};


  return (
     <div className="pt-20 px-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Edit Property Details</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField label="Property Name" name="propertyName" value={formData.propertyName} onChange={handleChange} />
            <FormField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
            <FormField label="Property Type" name="propertyType" value={formData.propertyType} onChange={handleChange} />
            <FormField label="Flat Type" name="flatType" value={formData.flatType} onChange={handleChange} />
            <FormField label="Sharing" type="number" name="sharing" value={formData.sharing} onChange={handleChange} />
            <FormField label="City" name="city" value={formData.city} onChange={handleChange} />
            <FormField label="Address" name="address" value={formData.address} onChange={handleChange} textarea />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <FormField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <FormField label="Gender Preference" name="genderPreference" value={formData.genderPreference} onChange={handleChange} />
            <FormField label="Food Preference" name="foodPreference" value={formData.foodPreference} onChange={handleChange} />
            <FormField label="Rent (₹)" name="rent" value={formData.rent} onChange={handleChange} />
            <FormField label="Deposit (₹)" name="deposit" value={formData.deposit} onChange={handleChange} />
            <FormField label="PG Rooms" name="pgRooms" value={formData.pgRooms} onChange={handleChange} />
            <FormField label="Amenities" name="amenities" value={formData.amenities} onChange={handleChange} textarea />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="col-span-2 mt-4">
              <p className="font-semibold mb-2">Current Image:</p>
              <img src={`http://localhost:5000/${formData.image}`} alt="Property" className="h-48 w-full object-cover rounded" />
            </div>
          )}

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-6">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              Delete Property
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>

  );
};

// Reusable Form Field Component
const FormField = ({ label, name, value, onChange, type = "text", textarea = false }) => {
  if (textarea) {
    return (
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
    </div>
  );
};

export default PropertyEditForm;
