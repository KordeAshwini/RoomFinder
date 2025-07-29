import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-blue-50">
      <h2 className="text-4xl font-bold mb-4">Find Your Perfect PG or Hostel</h2>
      <p className="text-gray-600 max-w-xl mb-6">Search PGs by location, budget, preferences, and more. Get started now!</p>
      <Link to="/pg">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Search PGs</button>
      </Link>
    </section>
  );
};

export default Hero;
