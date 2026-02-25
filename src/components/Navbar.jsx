import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';

const Navbar = () => {
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
          fontFamily: "'Playfair Display', serif"
        }}>
          deathofaheart
        </Link>
      </div>
      <div className="links" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link to="/concerts" className="nav-link" style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ff3333'} onMouseLeave={(e) => e.target.style.color = '#ddd'}>CONCERTS</Link>
        <Link to="/portraits" className="nav-link" style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ff3333'} onMouseLeave={(e) => e.target.style.color = '#ddd'}>PORTRAITS</Link>
        <a 
          href="/#contact" 
          className="nav-link" 
          style={{ fontSize: '0.9rem', color: '#ddd', letterSpacing: '2px', textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer' }} 
          onMouseEnter={(e) => e.target.style.color = '#ff3333'} 
          onMouseLeave={(e) => e.target.style.color = '#ddd'}
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
          }}
        >
          CONTACT
        </a>
        <Sun size={18} color="#ddd" style={{ cursor: 'pointer', marginLeft: '1rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ff3333'} onMouseLeave={(e) => e.target.style.color = '#ddd'} />
      </div>
    </nav>
  );
};

export default Navbar;
