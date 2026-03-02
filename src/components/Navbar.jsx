import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { client } from '../sanity/client';

const prefetch = (category) => {
  // Prefetching disabled to ensure fresh data
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPerson, setSelectedPerson] = useState(() => sessionStorage.getItem('doh_person') || null);

  useEffect(() => {
    const onPersonChange = () => setSelectedPerson(sessionStorage.getItem('doh_person') || null);
    window.addEventListener('doh_person_changed', onPersonChange);
    return () => window.removeEventListener('doh_person_changed', onPersonChange);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('doh_person');
    setSelectedPerson(null);
    window.dispatchEvent(new Event('doh_person_changed'));
    navigate('/');
  };

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
    <nav className="nav-container" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'max(1.5rem, env(safe-area-inset-top, 1.5rem)) 3rem 1.5rem',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      boxSizing: 'border-box',
      zIndex: 50
    }}>
      <div className="logo">
        <a href="/" onClick={handleLogoClick} style={{ 
          fontSize: '1.1rem', 
          fontWeight: '400', 
          letterSpacing: '1px',
          fontFamily: "'Playfair Display', serif",
          textTransform: 'lowercase',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer'
        }}>
          deathofaheart
        </a>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {selectedPerson && (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

