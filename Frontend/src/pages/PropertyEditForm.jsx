import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

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
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        setFormData(data);
        setExistingImages(data.images);
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

  const handleNewImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleRemoveImage = (imageToRemove) => {
    setImagesToRemove([...imagesToRemove, imageToRemove]);
    setExistingImages(existingImages.filter(img => img !== imageToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (newImages.length > 0) {
      newImages.forEach(img => {
        formDataToSend.append("images", img);
      });
    }

    if (imagesToRemove.length > 0) {
      formDataToSend.append("imagesToRemove", JSON.stringify(imagesToRemove));
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "PUT",
        body: formDataToSend,
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
      navigate(-1);
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
            <div className="space-y-4">
              <FormField label="Property Name" name="propertyName" value={formData.propertyName} onChange={handleChange} />
              <FormField label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <FormField label="Property Type" name="propertyType" value={formData.propertyType} onChange={handleChange} />
              <FormField label="Flat Type" name="flatType" value={formData.flatType} onChange={handleChange} />
              <FormField label="Sharing" type="number" name="sharing" value={formData.sharing} onChange={handleChange} />
              <FormField label="City" name="city" value={formData.city} onChange={handleChange} />
              <FormField label="Address" name="address" value={formData.address} onChange={handleChange} textarea />
            </div>

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

            <div className="col-span-2 mt-4">
              <p className="font-semibold mb-2">Current Images:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {existingImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={`http://localhost:5000/${img}`}
                      alt={`Property Image ${index + 1}`}
                      className="h-48 w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add New Images
              </label>
              <input
                type="file"
                multiple
                name="images"
                accept="image/*"
                onChange={handleNewImageChange}
                className="input-style w-full"
              />
            </div>

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