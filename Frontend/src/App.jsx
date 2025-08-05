import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PGListing from "./pages/PGListing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PGDetails from "./pages/PGDetails";
//import BookingForm from "./pages/BookingForm";
//import ScheduleVisit from "./pages/ScheduleVisit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pg"
          element={
            <>
              
              <Navbar />
              <PGListing />
              <Footer />  
              
            </>
          }
        />
        <Route path="/pg-details" element={
           <>
           <Navbar />
           <PGDetails />
           <Footer />  
           </>} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
