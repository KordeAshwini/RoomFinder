import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PGListing from "./pages/PGListing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PGDetails from "./pages/PGDetails";
import OwnerProfile from "./pages/OwnerProfile";
import UserProfile from "./pages/UserProfile";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* PG Listing Page */}
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

        {/* PG Details Page */}
        <Route
          path="/pg-details"
          element={
            <>
              <Navbar />
              <PGDetails />
              <Footer />
            </>
          }
        />

        {/* Owner Profile */}
        <Route
          path="/owner-profile"
          element={
            <>
              <Navbar />
              <OwnerProfile />
              <Footer />
            </>
          }
        />

        {/* User Profile */}
        <Route
          path="/user-profile"
          element={
            <>
              <Navbar />
              <UserProfile />
              <Footer />
            </>
          }
        />

        {/* Property Details */}
        <Route
          path="/property-details/:id"
          element={
            <>
              <Navbar />
              <PropertyDetails />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
