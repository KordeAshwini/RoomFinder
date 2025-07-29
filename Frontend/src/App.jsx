import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PGListing from "./pages/PGListing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


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
      </Routes>
    </Router>
  );
}

export default App;
