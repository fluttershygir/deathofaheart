import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Concerts from './pages/Concerts';
import Portraits from './pages/Portraits';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/portraits" element={<Portraits />} />
      </Routes>
    </Router>
  );
}

export default App;
