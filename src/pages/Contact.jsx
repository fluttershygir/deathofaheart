import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="layout" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      paddingTop: '100px',
      paddingLeft: 'max(1.5rem, env(safe-area-inset-left, 0px))',
      paddingRight: 'max(1.5rem, env(safe-area-inset-right, 0px))',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      backgroundColor: '#050505',
      color: '#fff'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          maxWidth: '800px', 
          width: '100%', 
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}
        className="contact-container"
      >
        <div>
            <h1 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: '4rem', 
                lineHeight: '1',
                marginBottom: '2rem',
                color: '#fff'
            }}>
                Let's<br/>
                <span style={{ fontStyle: 'italic', color: '#666' }}>create.</span>
            </h1>
            <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '2rem' }}>
                Available for touring, festivals, and portrait sessions worldwide.
                Drop me a line and let's discuss your vision.
            </p>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <p>Based in:</p>
                <p style={{ color: '#fff', marginBottom: '1rem' }}>Los Angeles, CA</p>
                
                <p>Email:</p>
                <a href="mailto:shay7storey@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>shay7storey@gmail.com</a>
            </div>
        </div>

        <form action="https://formsubmit.co/shay7storey@gmail.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
          <div className="input-group">
              <input 
                name="name"
                type="text" 
                placeholder="Name" 
                style={{ 
                  width: '100%',
                  padding: '1rem 0', 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = '#fff'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
          </div>
          <div className="input-group">
              <input 
                name="email"
                type="email" 
                placeholder="Email" 
                style={{ 
                  width: '100%',
                  padding: '1rem 0', 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = '#fff'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
          </div>
          <div className="input-group">
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows="4" 
                style={{ 
                  width: '100%',
                  padding: '1rem 0', 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem',
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = '#fff'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              ></textarea>
          </div>
          <button 
            type="submit" 
            style={{ 
              alignSelf: 'flex-start',
              background: 'transparent',
              color: '#fff', 
              padding: '1rem 0', 
              border: 'none', 
              fontSize: '1rem', 
              fontWeight: '500', 
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              borderBottom: '1px solid transparent',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.letterSpacing = '4px'; e.target.style.color = '#ff3333'; }}
            onMouseLeave={(e) => { e.target.style.letterSpacing = '2px'; e.target.style.color = '#fff'; }}
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
