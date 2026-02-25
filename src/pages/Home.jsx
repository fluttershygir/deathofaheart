import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroComplete(true);
        }, 2000); // Intro duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050505', color: '#eee', overflowX: 'hidden' }}>

            {/* Animated Background Glows */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.35, 0.55, 0.35] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '5%',
                        width: '700px',
                        height: '700px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(140, 0, 0, 0.45) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }}
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                        right: '10%',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(160, 15, 15, 0.4) 0%, transparent 70%)',
                        filter: 'blur(100px)'
                    }}
                />
                <motion.div
                    animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 0.8, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '30%',
                        width: '900px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(120, 0, 0, 0.3) 0%, transparent 70%)',
                        filter: 'blur(120px)'
                    }}
                />
            </div>

            <AnimatePresence mode="wait">
                {!introComplete && (
                    <motion.div
                        className="intro-overlay"
                        key="intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#050505',
                            zIndex: 100
                        }}
                    >
                        <motion.h1
                            style={{ 
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                letterSpacing: '0.1em',
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic',
                                color: '#eee',
                                display: 'flex'
                            }}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, transition: { duration: 0.5 } }} // Text fades out before overlay
                            variants={{
                                hidden: { opacity: 1 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {"deathofaheart.com".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} // Fades in smoothly after intro
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Hero Section */}
                <div style={{ 
                    position: 'relative',
                    height: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                    padding: '2rem'
                }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <motion.h3 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
                            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                            style={{ 
                                fontSize: '1.1rem', 
                                letterSpacing: '0.3em', 
                                color: '#aaa', 
                                marginBottom: '1.5rem',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '500',
                                textTransform: 'uppercase'
                            }}
                        >
                            Concert & Portrait Photography
                        </motion.h3>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ 
                                opacity: introComplete ? 1 : 0, 
                                y: introComplete ? 0 : 15,
                            }}
                            transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
                            style={{ 
                                fontSize: 'clamp(5rem, 12vw, 9rem)', 
                                lineHeight: '0.9',
                                fontFamily: "'Playfair Display', serif",
                                marginBottom: '2rem',
                                fontWeight: '400',
                                letterSpacing: '-0.02em',
                                position: 'relative',
                                filter: 'drop-shadow(0 0 30px rgba(220, 20, 20, 0.35))' // Stunning soft red glow
                            }}
                        >
                            <span style={{
                                background: 'linear-gradient(135deg, #ff5555 0%, #8b0000 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block'
                            }}>
                                death of
                            </span>
                            <br />
                            <span 
                                style={{ 
                                    fontStyle: 'italic', 
                                    background: 'linear-gradient(135deg, #ff7777 0%, #aa0000 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    display: 'inline-block',
                                    paddingRight: '10px' // Prevents italic clipping
                                }}
                            >
                                a heart
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
                            transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
                            style={{
                                fontSize: '1.3rem',
                                color: '#888',
                                maxWidth: '500px',
                                lineHeight: '1.6',
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic'
                            }}
                        >
                            Capturing the raw emotion of sound and silence.
                        </motion.p>
                    </div>
                    
                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: introComplete ? 1 : 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '10vh', // Moved up to be visible on screen
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#666' }}>Scroll</span>
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: '1px', height: '40px', backgroundColor: '#8b0000' }}
                        ></motion.div>
                    </motion.div>
                </div>

                {/* Navigation Buttons Section */}
                <div style={{ width: '100%', maxWidth: '1400px', padding: '0 2rem 8rem 2rem' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        <Link to="/concerts" style={{ textDecoration: 'none' }}>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="nav-card" style={{
                                position: 'relative',
                                height: '500px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#0a0000',
                                border: '1px solid #330000',
                                borderRadius: '4px',
                            }}>
                                <div className="nav-card-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at center, #3a0000 0%, #050505 100%)',
                                    opacity: 0.4,
                                }}></div>
                                <div style={{ zIndex: 1, textAlign: 'center' }}>
                                    <h2 style={{ 
                                        fontFamily: "'Playfair Display', serif", 
                                        fontSize: '4rem', 
                                        color: '#fff', 
                                        fontStyle: 'italic',
                                        marginBottom: '1.5rem',
                                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                    }}>Concerts</h2>
                                    <span className="nav-card-link" style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '3px', 
                                        fontSize: '1rem',
                                        color: '#ff4444',
                                        fontWeight: '500'
                                    }}>
                                        View Gallery <ArrowRight size={20} />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>

                        <Link to="/portraits" style={{ textDecoration: 'none' }}>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="nav-card" style={{
                                position: 'relative',
                                height: '500px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#0a0000',
                                border: '1px solid #330000',
                                borderRadius: '4px',
                            }}>
                                <div className="nav-card-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at center, #3a0000 0%, #050505 100%)',
                                    opacity: 0.4,
                                }}></div>
                                <div style={{ zIndex: 1, textAlign: 'center' }}>
                                    <h2 style={{ 
                                        fontFamily: "'Playfair Display', serif", 
                                        fontSize: '4rem', 
                                        color: '#fff', 
                                        fontStyle: 'italic',
                                        marginBottom: '1.5rem',
                                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                    }}>Portraits</h2>
                                    <span className="nav-card-link" style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '3px', 
                                        fontSize: '1rem',
                                        color: '#ff4444',
                                        fontWeight: '500'
                                    }}>
                                        View Gallery <ArrowRight size={20} />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                </div>

                {/* Contact Form Section */}
                <div id="contact" style={{ width: '100%', maxWidth: '900px', padding: '8rem 2rem 10rem 2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            lineHeight: '1',
                            marginBottom: '4rem',
                            color: '#fff',
                            fontWeight: '400'
                        }}>
                            Let's<br />
                            <span style={{ fontStyle: 'italic', color: '#555' }}>create.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr',
                            gap: '6rem',
                            alignItems: 'start'
                        }}
                        className="contact-grid"
                    >
                        <div>
                            <p style={{ color: '#aaa', fontSize: '1.8rem', lineHeight: '1.6', marginBottom: '2.5rem', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                                Whether it's the energy of a live show or the quiet intimacy of a portrait, I'd love to help bring your vision to life.
                            </p>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {['Name', 'Email'].map((field) => (
                                <div key={field}>
                                    <input
                                        type={field === 'Email' ? 'email' : 'text'}
                                        placeholder={field}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 0',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '1.2rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#8b0000'}
                                        onBlur={(e) => e.target.style.borderColor = '#333'}
                                    />
                                </div>
                            ))}
                            <div>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 0',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #333',
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        resize: 'none',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#8b0000'}
                                    onBlur={(e) => e.target.style.borderColor = '#333'}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    alignSelf: 'flex-start',
                                    background: 'transparent',
                                    color: '#fff',
                                    padding: '1rem 0',
                                    border: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    borderBottom: '1px solid #555',
                                    transition: 'all 0.4s ease',
                                    fontFamily: 'inherit'
                                }}
                                onMouseEnter={(e) => { e.target.style.letterSpacing = '5px'; e.target.style.borderColor = '#8b0000'; e.target.style.color = '#ff4444'; }}
                                onMouseLeave={(e) => { e.target.style.letterSpacing = '3px'; e.target.style.borderColor = '#555'; e.target.style.color = '#fff'; }}
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ 
                            display: 'flex', 
                            gap: '2rem', 
                            marginTop: '6rem',
                            paddingTop: '4rem',
                            borderTop: '1px solid #222',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <a 
                            href="mailto:hello@deathofaheart.com" 
                            style={{ 
                                color: '#fff', 
                                textDecoration: 'none', 
                                textTransform: 'uppercase', 
                                letterSpacing: '4px', 
                                fontSize: '1.2rem',
                                padding: '1.5rem 4rem',
                                border: '1px solid #444',
                                borderRadius: '50px', // Pill shape makes it more inviting
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                                minWidth: '250px',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#8b0000';
                                e.currentTarget.style.backgroundColor = '#8b0000';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(139, 0, 0, 0.3)';
                                e.currentTarget.style.letterSpacing = '6px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#444';
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.letterSpacing = '4px';
                            }}
                        >
                            Email
                        </a>
                        <a 
                            href="https://www.instagram.com/suchislifeisuppose" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                                color: '#fff', 
                                textDecoration: 'none', 
                                textTransform: 'uppercase', 
                                letterSpacing: '4px', 
                                fontSize: '1.2rem',
                                padding: '1.5rem 4rem',
                                border: '1px solid #444',
                                borderRadius: '50px', // Pill shape
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                                minWidth: '250px',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#8b0000';
                                e.currentTarget.style.backgroundColor = '#8b0000';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(139, 0, 0, 0.3)';
                                e.currentTarget.style.letterSpacing = '6px';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#444';
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.letterSpacing = '4px';
                            }}
                        >
                            Instagram
                        </a>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer style={{
                    width: '100%',
                    padding: '2rem',
                    textAlign: 'center',
                    borderTop: '1px solid #111',
                    marginTop: 'auto'
                }}>
                    <p style={{ 
                        color: '#555', 
                        fontSize: '0.8rem', 
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.5px'
                    }}>
                        © 2026 deathofaheart. All rights reserved.
                    </p>
                </footer>

            </motion.div>
        </div>
    );
};

export default Home;