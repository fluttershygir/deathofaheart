import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun } from 'lucide-react';
import { client } from '../sanity/client';

const prefetch = (category) => {
  // Prefetching disabled to ensure fresh data
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContact = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home — just scroll
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // On another page — navigate to home with hash so intro is skipped
      navigate('/#contact');
      // After navigation, scroll once the DOM settles
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem 3rem',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      mixBlendMode: 'difference'
    }}>
      <div className="logo">
        <Link to="/" style={{ 
          fontSize: '1.1rem', 
          fontWeight: '400', 
          letterSpacing: '1px',
          fontFamily: "'Playfair Display', serif",
          textTransform: 'lowercase'
        }}>
          deathofaheart
        </Link>
      </div>
      <div className="links" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link to="/concerts" className="nav-link" style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', transition: 'color 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#ff3333'; prefetch('concerts'); }} onMouseLeave={(e) => e.target.style.color = '#ddd'}>CONCERTS</Link>
        <Link to="/portraits" className="nav-link" style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', transition: 'color 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#ff3333'; prefetch('portraits'); }} onMouseLeave={(e) => e.target.style.color = '#ddd'}>PORTRAITS</Link>
        <a 
          href="/#contact" 
          className="nav-link" 
          style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} 
          onMouseEnter={(e) => e.target.style.color = '#ff3333'} 
          onMouseLeave={(e) => e.target.style.color = '#ddd'}
          onClick={handleContact}
        >
          CONTACT
        </a>
        <Sun size={18} color="#ddd" style={{ cursor: 'pointer', marginLeft: '1rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ff3333'} onMouseLeave={(e) => e.target.style.color = '#ddd'} />
      </div>
    </nav>
  );
};

export default Navbar;
