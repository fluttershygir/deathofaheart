import { motion } from 'framer-motion';

const Portraits = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050505', color: '#eee', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Animated Background Glows */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '15%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(140, 0, 0, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                style={{ position: 'absolute', bottom: '5%', left: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160, 15, 15, 0.25) 0%, transparent 70%)', filter: 'blur(100px)' }}
            />
        </div>

        <div className="layout" style={{ paddingTop: '150px', paddingBottom: '100px', position: 'relative', zIndex: 1, flex: 1 }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: "easeOut" }} 
                style={{ textAlign: 'center', marginBottom: '6rem' }}
            >
                <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: '#aaa', marginBottom: '1.5rem', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}>
                    Editorial & Personal
                </h3>
                <h1 style={{ 
                    fontSize: 'clamp(4rem, 8vw, 6rem)', 
                    fontFamily: "'Playfair Display', serif", 
                    color: '#fff', 
                    fontStyle: 'italic', 
                    textShadow: '0 4px 30px rgba(139,0,0,0.4)',
                    lineHeight: '1'
                }}>
                    Portraits
                </h1>
            </motion.div>

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}
            >
                {images.map((id) => (
                    <motion.div 
                        key={id}
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -10, borderColor: '#8b0000', boxShadow: '0 20px 40px rgba(139, 0, 0, 0.2)' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ 
                            height: '550px', // Taller for portraits
                            backgroundColor: '#0a0000', 
                            border: '1px solid #222',
                            borderRadius: '4px',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #2a0000 0%, #050505 100%)', opacity: 0.3 }}></div>
                        <span style={{ color: '#444', fontFamily: "'Inter', sans-serif", letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', zIndex: 1 }}>
                            Gallery {id}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>

        {/* Footer */}
        <footer style={{ width: '100%', padding: '2rem', textAlign: 'center', borderTop: '1px solid #111', position: 'relative', zIndex: 1 }}>
            <p style={{ color: '#555', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.5px' }}>
                © 2026 deathofaheart. All rights reserved.
            </p>
        </footer>
    </div>
  );
};

export default Portraits;
