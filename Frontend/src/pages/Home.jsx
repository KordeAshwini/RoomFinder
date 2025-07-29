import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import bgImage from "../assets/home.jpg";
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";

const services = [
  {
    id: 1,
    icon: "🏠",
    title: "Verified PG Listings",
    description: "Browse trusted PG accommodations with verified owner details and photos.",
  },
  {
    id: 2,
    icon: "👥",
    title: "Roommate Matching",
    description: "Find compatible roommates based on your preferences and lifestyle.",
  },
  {
    id: 3,
    icon: "🔍",
    title: "Smart Filters",
    description: "Filter listings by budget, location, amenities, and room type.",
  },
  {
    id: 3,
    icon: "📍",
    title: "Location-Based Search",
    description: "Easily search PGs by location, college proximity, and transport access.",
  },
];


const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      
      <section id="home"
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-500 text-transparent bg-clip-text mb-4 drop-shadow-lg">
            The Perfect Room For You
          </h1>
          <p className="text-lg text-gray-200 mb-6 max-w-xl mx-auto">
            Save Time, Energy & Money — Find & Book Your New Room 100% Online
          </p>
          <Link to="/pg">
            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Search PG Rooms
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
<section id="services" className="py-20 bg-gradient-to-b from-orange-50 to-white">
  <h2 className="text-4xl font-bold text-center text-orange-600 mb-16 tracking-wider animate-fade-in-down">
    OUR SERVICES
  </h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
    {services.map((svc, index) => (
      <motion.div
        key={svc.id}
        className="bg-orange-100 border border-orange-200 rounded-2xl p-6 shadow-md text-center hover:shadow-2xl hover:scale-105 hover:border-orange-500 transition-all duration-500 ease-in-out group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div className="text-5xl text-orange-500 mb-4 group-hover:animate-bounce">
          {svc.icon}
        </div>
        <h3 className="text-xl font-bold text-orange-700 mb-2">
          {svc.title}
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {svc.description || "We provide reliable and well-curated services to help you find your ideal PG hassle-free."}
        </p>
      </motion.div>
    ))}
  </div>
</section>




    {/* ABOUT US SECTION */}
<section id="about" className="py-20 bg-orange-50">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
    
    {/* Image Left */}
    <motion.img
      src={room1}
      alt="About Us"
      className="w-full rounded-3xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />

    {/* Text Right */}
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-orange-600 mb-4">About RoomFinder</h2>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        At RoomFinder, we aim to make your PG or hostel search experience fast,
        simple, and stress-free. Whether you're a student, fresher, or working professional,
        we provide verified listings, modern amenities, and roommate-matching features
        — all from the comfort of your screen.
      </p>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        With 24/7 customer support, secure bookings, and tailored search options,
        we bring convenience and trust into your hands. Join thousands who’ve found their perfect stay with RoomFinder.
      </p>
      <Link to="/about">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition">
          Learn More →
        </button>
      </Link>
    </motion.div>
  </div>

  {/* SECOND ROW - Text Left, Image Right */}
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    {/* Text Left */}
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-orange-600 mb-4">Why Choose Us?</h2>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        RoomFinder is more than a listing site — it's your housing partner. Our platform offers
        personalized recommendations, roommate compatibility tools, and verified property photos
        so you can make informed decisions.
      </p>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        Whether you're new to the city or relocating for a job, we’re here to make your move smooth,
        affordable, and hassle-free.
      </p>
      <Link to="/services">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition">
          Explore Services →
        </button>
      </Link>
    </motion.div>

    {/* Image Right */}
    <motion.img
      src={room2}
      alt="Why Choose Us"
      className="w-full rounded-3xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />
  </div>
</section>


   {/* TESTIMONIALS SECTION */}
<section id="testimonials" className="bg-orange-100 py-16 overflow-hidden">
  <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">What Our Users Say</h2>

  <div className="relative w-full overflow-x-hidden">
    <motion.div
      className="flex gap-8 animate-slide"
      initial={{ x: 0 }}
      animate={{ x: ['0%', '-100%'] }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 20,
        ease: 'linear',
      }}
    >
      {[...Array(2)].map((_, repeatIndex) => (
        <div className="flex gap-8" key={repeatIndex}>
          {[
            {
              name: 'Amit Shah',
              review: 'I found my PG within a day. The RoomFinder platform is very helpful!',
            },
            {
              name: 'Sneha Kulkarni',
              review: 'Loved the roommate matching feature. I now live with someone who shares my hobbies!',
            },
            {
              name: 'Rohan Verma',
              review: 'Booking a flat online was super easy. Great experience!',
            },
            {
              name: 'Anjali Mehta',
              review: 'The PG images and filters were really accurate. Felt confident booking from home.',
            },
            {
              name: 'Harshil Patil',
              review: 'Support team helped me quickly when I had payment issues. Highly recommend!',
            },
            {
              name: 'Pooja Desai',
              review: 'I liked how I could find a pet-friendly PG near my college. Thank you RoomFinder!',
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-white text-gray-700 p-6 rounded-2xl shadow-md w-72 h-72 flex flex-col justify-between transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg italic">“{testimonial.review}”</p>
              <div className="text-right mt-4">
                <h3 className="font-bold text-orange-600">{testimonial.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
</section>



      <Footer />
    </div>
  );
};

export default Home;
