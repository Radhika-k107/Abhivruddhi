import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Loader from './components/Loader';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Domains from './components/Domains';
import Aftermovie from './components/Aftermovie';
import About from './pages/About';
// import Team from './pages/Team';
import Events from './pages/Events';
import EngineeringUnplugged from './pages/EngineeringUnplugged';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';

// Clear navigated flag on page reload so loader shows again
if (window.performance?.navigation?.type === 1 || performance.getEntriesByType?.('navigation')[0]?.type === 'reload') {
  sessionStorage.removeItem('ab-navigated');
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    sessionStorage.setItem('ab-navigated', '1');
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Domains />
      <Aftermovie />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const showLoader = !sessionStorage.getItem('ab-loaded') || sessionStorage.getItem('ab-navigated') !== '1';

  useEffect(() => {
    if (!showLoader) document.body.classList.add('loaded');
  }, []);
  const handleLoaderDone = useCallback(() => {
    sessionStorage.setItem('ab-loaded', '1');
    sessionStorage.setItem('ab-navigated', '1');
    setLoaded(true);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageLoader />
      {showLoader && !loaded && <Loader onDone={handleLoaderDone} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/team" element={<Team />} /> */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/engineering-unplugged" element={<EngineeringUnplugged />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
