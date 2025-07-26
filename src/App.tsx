import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import SovranBuilders from './pages/SovranBuilders';
import SovranInteriors from './pages/SovranInteriors';
import SovranDesign from './pages/SovranDesign';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] overflow-x-hidden">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sovran-builders" element={<SovranBuilders />} />
            <Route path="/sovran-interiors" element={<SovranInteriors />} />
            <Route path="/sovran-design" element={<SovranDesign />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;