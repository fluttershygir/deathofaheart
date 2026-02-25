import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client, urlFor } from '../sanity/client';

const PLACEHOLDER_COUNT = 4;

const Concerts = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) { setLoading(false); return; }
    client
      .fetch(
        `*[_type == "gallery" && category == "concerts"] | order(_createdAt desc) {
          _id, title, slug, date,
          "imageCount": count(images),
          "coverImage": coalesce(coverImage, images[0]),
          "lqip": coalesce(coverImage.asset->metadata.lqip, images[0].asset->metadata.lqip)
        }`
      )
      .then((data) => {
        setGalleries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, []);

  const items = loading
    ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ _id: `ph-${i}`, placeholder: true }))
    : galleries;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050505', color: '#eee', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Animated Background Glows */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(140, 0, 0, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160, 15, 15, 0.25) 0%, transparent 70%)', filter: 'blur(100px)' }}
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
                    Live Music & Energy
                </h3>
                <h1 style={{ 
                    fontSize: 'clamp(4rem, 8vw, 6rem)', 
                    fontFamily: "'Playfair Display', serif", 
                    color: '#fff', 
                    fontStyle: 'italic', 
                    textShadow: '0 4px 30px rgba(139,0,0,0.4)',
                    lineHeight: '1'
                }}>
                    Concerts
                </h1>
            </motion.div>

            {loading ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', gap: '1.5rem' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #1a0000', borderTopColor: '#8b0000' }}
                />
                <p style={{ color: '#333', fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Loading</p>
              </div>
            ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '1.5rem' }}
            >
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ width: '100%', textAlign: 'center', padding: '6rem 2rem', border: '1px solid #1a0000', borderRadius: '4px' }}
                >
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.8rem', color: '#444', marginBottom: '1rem' }}>No galleries yet.</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>Add concert galleries in Sanity Studio to display them here.</p>
                  <a href="/studio" style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid #4a0000', color: '#cc3333', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a0000'; e.currentTarget.style.borderColor = '#cc3333'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#4a0000'; }}
                  >Open Studio →</a>
                </motion.div>
              ) : items.map((gallery, i) => {
                const inner = (
                  <div style={{ position: 'relative', display: 'block', backgroundColor: '#0a0000', borderRadius: '2px', overflow: 'hidden', cursor: gallery.placeholder ? 'default' : 'pointer' }}>
                    {!gallery.placeholder && gallery.coverImage ? (
                      <>
                        {gallery.lqip && (
                          <img
                            src={gallery.lqip}
                            aria-hidden="true"
                            style={{ display: 'block', width: '100%', height: 'auto', position: 'absolute', inset: 0, filter: 'blur(20px)', transform: 'scale(1.05)', transition: 'opacity 0.4s' }}
                          />
                        )}
                        <img
                          src={urlFor(gallery.coverImage).width(900).auto('format').quality(85).url()}
                          alt={gallery.title}
                          loading="lazy"
                          decoding="async"
                          onLoad={e => { if (e.target.previousSibling) e.target.previousSibling.style.opacity = '0'; }}
                          style={{ display: 'block', width: '100%', height: 'auto', position: 'relative' }}
                        />
                      </>
                    ) : (
                      <div style={{ width: '100%', paddingBottom: '100%', background: 'radial-gradient(circle at 40% 40%, #1a0000 0%, #050505 100%)' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1.5rem' }}>
                      {gallery.placeholder ? (
                        <span style={{ color: '#333', fontFamily: "'Inter', sans-serif", letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Gallery {i + 1}</span>
                      ) : (
                        <>
                          <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontStyle: 'italic', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{gallery.title}</p>
                          {gallery.imageCount > 0 && <p style={{ margin: '0.25rem 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: '#aaa', textTransform: 'uppercase' }}>{gallery.imageCount} {gallery.imageCount === 1 ? 'photo' : 'photos'}</p>}
                        </>
                      )}
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={gallery._id}
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.02, boxShadow: '0 24px 48px rgba(139, 0, 0, 0.45)' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ flex: '0 0 calc(33.333% - 1rem)', minWidth: 0 }}
                  >
                    {gallery.placeholder ? inner : (
                      <Link to={`/concerts/${gallery.slug?.current}`} style={{ textDecoration: 'none', display: 'block' }}>
                        {inner}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
            )}
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

export default Concerts;
