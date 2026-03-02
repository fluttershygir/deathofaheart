import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { client } from '../sanity/client';

const Home = () => {
    const skipIntro = typeof window !== 'undefined' && window.location.hash === '#contact';
    const [introComplete, setIntroComplete] = useState(skipIntro);
    const [selectedPerson, setSelectedPerson] = useState(() => sessionStorage.getItem('doh_person') || null);
    const [animatingPerson, setAnimatingPerson] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [profiles, setProfiles] = useState({});

    // Fetch photographer profiles from Sanity
    useEffect(() => {
        if (!client) return;
        client.fetch(`*[_type == "photographerProfile"]{ name, displayName, tagline, heroBio, contactSubtext, basedIn, email, instagramHandle }`)
            .then((data) => {
                const map = {};
                data.forEach((p) => { map[p.name] = p; });
                setProfiles(map);
            })
            .catch(() => {}); // silently fall back to defaults if Sanity is unavailable
    }, []);

    // Resolved profile for whoever is currently selected
    const activeProfile = profiles[selectedPerson] || {};

    const selectPerson = (p) => {
        sessionStorage.setItem('doh_person', p);
        setSelectedPerson(p);
        window.dispatchEvent(new Event('doh_person_changed'));
    };

    const handlePersonClick = (p) => {
        setAnimatingPerson(p);
        // Push a history entry so iOS back button returns to the person chooser
        window.history.pushState({ dohPerson: p }, '', '/');
        // Wait for button animation to finish (600ms), then start fading out the page
        setTimeout(() => {
            setIsTransitioning(true);
            // Wait for page to fade to black (500ms), then swap content and fade back in
            setTimeout(() => {
                selectPerson(p);
                setAnimatingPerson(null);
                setIsTransitioning(false);
            }, 500);
        }, 600);
    };

    // iOS back button: clear the person when the user presses back
    useEffect(() => {
        const onPopState = () => {
            const current = sessionStorage.getItem('doh_person');
            if (current) {
                sessionStorage.removeItem('doh_person');
                setSelectedPerson(null);
                setAnimatingPerson(null);
                window.dispatchEvent(new Event('doh_person_changed'));
                window.scrollTo({ top: 0 });
            }
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    // Sync selectedPerson when navbar logo clears it from sessionStorage
    useEffect(() => {
        const onPersonChange = () => {
            const p = sessionStorage.getItem('doh_person') || null;
            setSelectedPerson(p);
            if (!p) window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.addEventListener('doh_person_changed', onPersonChange);
        return () => window.removeEventListener('doh_person_changed', onPersonChange);
    }, []);

    // Lock scroll until a person is chosen
    useEffect(() => {
        if (!selectedPerson) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedPerson]);

    useEffect(() => {
        if (skipIntro) {
            // Skip intro and scroll straight to contact
            const timer = setTimeout(() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => {
            setIntroComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050505', color: '#eee' }}>

            {/* Full Page Transition Overlay - does NOT cover the floating title (z-index 10000) */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: '#050505',
                            zIndex: 9999,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>



            {/* Animated Background Glows */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                <motion.div
                    animate={{ 
                        x: [0, 40, 0], 
                        y: [0, -30, 0], 
                        opacity: selectedPerson ? [0.35, 0.55, 0.35] : [0.1, 0.2, 0.1] 
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-blob" style={{
                        position: 'absolute',
                        top: '15%',
                        left: '5%',
                        width: '700px', height: '700px',
                        borderRadius: '50%',
                        background: selectedPerson 
                            ? 'radial-gradient(circle, rgba(140, 0, 0, 0.45) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }}
                />
                <motion.div
                    animate={{ 
                        x: [0, -30, 0], 
                        y: [0, 40, 0], 
                        opacity: selectedPerson ? [0.2, 0.4, 0.2] : [0.05, 0.15, 0.05] 
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="bg-blob" style={{
                        position: 'absolute',
                        bottom: '5%',
                        right: '10%',
                        width: '500px', height: '500px',
                        borderRadius: '50%',
                        background: selectedPerson
                            ? 'radial-gradient(circle, rgba(160, 15, 15, 0.4) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                        filter: 'blur(100px)'
                    }}
                />
                <motion.div
                    animate={{ 
                        scaleX: [1, 1.3, 1], 
                        scaleY: [1, 0.8, 1], 
                        opacity: selectedPerson ? [0.1, 0.25, 0.1] : [0.02, 0.08, 0.02] 
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
                    className="bg-blob" style={{
                        position: 'absolute',
                        top: '45%',
                        left: '30%',
                        width: '900px', height: '250px',
                        borderRadius: '50%',
                        background: selectedPerson
                            ? 'radial-gradient(ellipse, rgba(120, 0, 0, 0.3) 0%, transparent 70%)'
                            : 'radial-gradient(ellipse, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
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
                            className="intro-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)',
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
                <div className="hero-section" style={{ 
                    position: 'relative',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                    padding: '2rem',
                    paddingTop: 'max(90px, calc(70px + env(safe-area-inset-top, 0px)))'
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
                            {selectedPerson
                                ? (activeProfile.tagline || `${selectedPerson.charAt(0).toUpperCase() + selectedPerson.slice(1)}'s Portfolio`)
                                : 'Concert & Portrait Photography'}
                        </motion.h3>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                            className="hero-title" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)',
                                lineHeight: '0.9',
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: '400',
                                letterSpacing: '-0.02em',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 30px rgba(220, 20, 20, 0.25))',
                                textAlign: 'center'
                            }}
                        >
                            {/* "death of" line — white fades out, red fades in */}
                            <div style={{ position: 'relative', display: 'block' }}>
                                <motion.span
                                    animate={{ opacity: animatingPerson || selectedPerson ? 0 : 1 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        color: '#ffffff',
                                        display: 'block',
                                        paddingRight: '0.2em'
                                    }}
                                >death of</motion.span>
                                <motion.span
                                    animate={{ opacity: animatingPerson || selectedPerson ? 1 : 0 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(135deg, #ff5555 0%, #8b0000 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        display: 'block',
                                        paddingRight: '0.2em'
                                    }}
                                >death of</motion.span>
                                <span style={{ visibility: 'hidden', display: 'block', paddingRight: '0.2em' }}>death of</span>
                            </div>
                            {/* "a heart" line — white fades out, red fades in */}
                            <div style={{ position: 'relative', display: 'block' }}>
                                <motion.span
                                    animate={{ opacity: animatingPerson || selectedPerson ? 0 : 1 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        color: '#ffffff',
                                        fontStyle: 'italic',
                                        display: 'block',
                                        paddingRight: '10px'
                                    }}
                                >a heart</motion.span>
                                <motion.span
                                    animate={{ opacity: animatingPerson || selectedPerson ? 1 : 0 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        fontStyle: 'italic',
                                        background: 'linear-gradient(135deg, #ff7777 0%, #aa0000 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        display: 'block',
                                        paddingRight: '10px'
                                    }}
                                >a heart</motion.span>
                                <span style={{ visibility: 'hidden', fontStyle: 'italic', display: 'block', paddingRight: '10px' }}>a heart</span>
                            </div>
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
                            {activeProfile.heroBio || 'Capturing the raw emotion of sound and silence.'}
                        </motion.p>

                        {/* Person Selector */}
                        <AnimatePresence mode="wait">
                            {introComplete && !selectedPerson && !animatingPerson && !isTransitioning && (
                                <motion.div
                                    key="person-selector"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="person-selector" style={{ }}
                                >
                                    {['shay', 'danica'].map((name) => {
                                        const isSelected = animatingPerson === name;
                                        const isOtherSelected = animatingPerson && animatingPerson !== name;

                                        return (
                                            <motion.button
                                                key={name}
                                                onClick={() => !animatingPerson && handlePersonClick(name)}
                                                animate={{
                                                    opacity: isOtherSelected ? 0 : 1,
                                                    scale: isSelected ? 1.05 : isOtherSelected ? 0.95 : 1,
                                                    borderColor: isSelected ? '#8b0000' : '#333',
                                                    color: isSelected ? '#ff5555' : '#eee',
                                                    boxShadow: isSelected ? '0 0 30px rgba(139,0,0,0.4)' : 'none',
                                                    letterSpacing: isSelected ? '0.15em' : '0.05em',
                                                    filter: isOtherSelected ? 'blur(4px)' : 'blur(0px)'
                                                }}
                                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                                whileHover={!animatingPerson ? { 
                                                    scale: 1.05, 
                                                    backgroundColor: 'rgba(139, 0, 0, 0.05)',
                                                    y: -2
                                                } : {}}
                                                whileTap={!animatingPerson ? { 
                                                    scale: 0.95, 
                                                    backgroundColor: 'rgba(139, 0, 0, 0.15)',
                                                    y: 2,
                                                    transition: { duration: 0.1 }
                                                } : {}}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #333',
                                                    color: '#eee',
                                                    padding: '1rem 3rem',
                                                    fontSize: '1.3rem',
                                                    fontFamily: "'Playfair Display', serif",
                                                    fontStyle: 'italic',
                                                    cursor: animatingPerson ? 'default' : 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.8rem',
                                                    borderRadius: '4px',
                                                    transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (animatingPerson) return;
                                                    e.currentTarget.style.borderColor = '#8b0000';
                                                    e.currentTarget.style.color = '#ff5555';
                                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(139,0,0,0.25)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (animatingPerson) return;
                                                    e.currentTarget.style.borderColor = '#333';
                                                    e.currentTarget.style.color = '#eee';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                {name.charAt(0).toUpperCase() + name.slice(1)} 
                                                <motion.div
                                                    animate={{ x: isSelected ? 10 : 0 }}
                                                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                                >
                                                    <ArrowRight size={16} />
                                                </motion.div>
                                            </motion.button>
                                        );
                                    })}
                                </motion.div>
                            )}
                            {introComplete && selectedPerson && (
                                <motion.div
                                    key="switch-person"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    style={{ marginTop: '1.5rem', marginBottom: '5rem' }}
                                >
                                    <button
                                        onClick={() => {
                                            sessionStorage.removeItem('doh_person');
                                            setSelectedPerson(null);
                                            window.dispatchEvent(new Event('doh_person_changed'));
                                        }}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#3a3a3a',
                                            fontSize: '0.7rem',
                                            fontFamily: "'Inter', sans-serif",
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#777'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#3a3a3a'}
                                    >
                                        ← switch portfolio
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {/* Scroll Indicator - only visible once a person is selected */}
                    {selectedPerson && <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: introComplete ? 1 : 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="hero-scroll-indicator"
                    >
                        <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#666' }}>Scroll</span>
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: '1px', height: '40px', backgroundColor: '#8b0000' }}
                        ></motion.div>
                    </motion.div>}
                </div>

                {/* Navigation Buttons Section — only after person selected */}
                {selectedPerson && <>
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
                <div id="contact" className="contact-container" style={{ width: '100%', maxWidth: '900px', padding: '4rem 2rem 6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            lineHeight: '1',
                            marginBottom: '1.5rem',
                            color: '#fff',
                            fontWeight: '400'
                        }}>
                            {activeProfile.contactHeading || "Let's"}<br />
                            <span style={{ fontStyle: 'italic', color: '#555' }}>{activeProfile.contactHeadingItalic || 'create.'}</span>
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
                            gap: '3rem',
                            alignItems: 'start'
                        }}
                        className="contact-grid"
                    >
                        <div>
                            <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '0', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                                {activeProfile.contactSubtext || "Whether it's the energy of a live show or the quiet intimacy of a portrait, I'd love to help bring your vision to life."}
                            </p>
                        </div>

                        <form
                            action={`https://formsubmit.co/${activeProfile.email || 'hello@deathofaheart.com'}`}
                            method="POST"
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            {/* FormSubmit config */}
                            <input type="hidden" name="_subject" value="New inquiry from deathofaheart.com" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={activeProfile.namePlaceholder || 'Name'}
                                    required
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
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={activeProfile.emailPlaceholder || 'Email'}
                                    required
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
                            <div>
                                <textarea
                                    placeholder={activeProfile.messagePlaceholder || 'Tell me about your project...'}
                                    name="message"
                                    required
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
                                {activeProfile.sendButtonText || 'Send Message'}
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
                            href={`mailto:${activeProfile.email || 'hello@deathofaheart.com'}`} 
                            className="social-pill-btn"
                            style={{ 
                                color: '#fff', 
                                textDecoration: 'none', 
                                textTransform: 'uppercase', 
                                letterSpacing: '4px', 
                                fontSize: '1.2rem',
                                padding: '1.5rem 4rem',
                                border: '1px solid #444',
                                borderRadius: '50px',
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
                            href={`https://www.instagram.com/${activeProfile.instagramHandle || 'suchislifeisuppose'}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-pill-btn"
                            style={{ 
                                color: '#fff', 
                                textDecoration: 'none', 
                                textTransform: 'uppercase', 
                                letterSpacing: '4px', 
                                fontSize: '1.2rem',
                                padding: '1.5rem 4rem',
                                border: '1px solid #444',
                                borderRadius: '50px',
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
                </> /* end selectedPerson block */}

            </motion.div>
        </div>
    );
};

export default Home;



