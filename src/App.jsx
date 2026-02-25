import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Concerts from './pages/Concerts';
import Portraits from './pages/Portraits';
import GalleryDetail from './pages/GalleryDetail';
import StudioPage from './pages/Studio';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Studio — full screen, no Navbar */}
        <Route path="/studio/*" element={<StudioPage />} />

        {/* Main site with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/concerts/:slug" element={<GalleryDetail category="concerts" />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/portraits/:slug" element={<GalleryDetail category="portraits" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
