import React, { useState } from 'react';

const PropertyDetails = () => {

  const [property, setProperty] = useState({
    name: 'GreenView Flat',
    type: 'Flat',
    gender: 'Boys',
    sharing: '2 / 3 / Single Sharing Available',
    moveInDate: 'Immediate',
    minStay: '3 Months',
    bathroom: 'Shared',
    food: 'Non-Vegetarian',
    cooling: 'Cooler',
    overview:
      'GreenView Flat is located in Mumbai. This property is well-maintained, secure, and offers ideal living conditions for students and professionals.',
    amenities: 'Gym, Parking, Terrace, WiFi',
    rent: 10000,
    deposit: 20000,
    vacancies: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    // delete logic here
    alert('Property deleted!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 pt-24 pb-12">
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-8">
       
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Property Details</h2>

        {/* Property Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img src="https://source.unsplash.com/600x400/?room" alt="Property" className="rounded-lg shadow" />
          <img src="https://source.unsplash.com/600x400/?apartment" alt="Property" className="rounded-lg shadow" />
        </div>

        {/* Editable Form */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
    <input name="name" value={property.name} onChange={handleChange} className="input-style" placeholder="Property Name" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
    <input name="type" value={property.type} onChange={handleChange} className="input-style" placeholder="Flat / PG / Hostel" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Gender Preference</label>
    <input name="gender" value={property.gender} onChange={handleChange} className="input-style" placeholder="Boys / Girls / Co-ed" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Sharing</label>
    <input name="sharing" value={property.sharing} onChange={handleChange} className="input-style" placeholder="2 / 3 / Single Sharing" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
    <input name="moveInDate" value={property.moveInDate} onChange={handleChange} className="input-style" placeholder="Immediate / Date" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stay</label>
    <input name="minStay" value={property.minStay} onChange={handleChange} className="input-style" placeholder="3 Months / 6 Months" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Bathroom Type</label>
    <input name="bathroom" value={property.bathroom} onChange={handleChange} className="input-style" placeholder="Shared / Attached" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference</label>
    <input name="food" value={property.food} onChange={handleChange} className="input-style" placeholder="Veg / Non-Veg" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
    <input name="cooling" value={property.cooling} onChange={handleChange} className="input-style" placeholder="Cooler / AC / Fan" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Rent (₹/month)</label>
    <input name="rent" value={property.rent} onChange={handleChange} className="input-style" placeholder="e.g. 10000" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Deposit (₹)</label>
    <input name="deposit" value={property.deposit} onChange={handleChange} className="input-style" placeholder="e.g. 20000" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies Available</label>
    <input name="vacancies" value={property.vacancies} onChange={handleChange} className="input-style" placeholder="e.g. 3" />
  </div>
</div>


        <textarea
          name="overview"
          value={property.overview}
          onChange={handleChange}
          className="input-style w-full mt-4"
          rows="3"
          placeholder="Overview"
        />

        

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all">
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            Delete Property
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyDetails;
