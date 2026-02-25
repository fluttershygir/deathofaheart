import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client, urlFor } from '../sanity/client';

const GalleryDetail = ({ category }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) { setLoading(false); return; }
    client
      .fetch(
        `*[_type == "gallery" && slug.current == $slug][0]{
          _id, title, description, date, category,
          coverImage, images
        }`,
        { slug }
      )
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const back = category === 'concerts' ? '/concerts' : '/portraits';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050505', color: '#eee', overflowX: 'hidden' }}>
      {/* Background glows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(140, 0, 0, 0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="layout" style={{ paddingTop: '140px', paddingBottom: '100px', position: 'relative', zIndex: 1 }}>
        <Link to={back} style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#cc2200'}
          onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >
          ← Back
        </Link>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', gap: '1.5rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #1a0000', borderTopColor: '#8b0000' }}
            />
            <p style={{ color: '#333', fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Loading</p>
          </div>
        ) : !gallery ? (
          <p style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>Gallery not found.</p>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
              <h3 style={{ fontSize: '0.85rem', letterSpacing: '0.3em', color: '#aaa', marginBottom: '1.5rem', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}>
                {gallery.category}
              </h3>
              <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#fff', textShadow: '0 4px 30px rgba(139,0,0,0.4)', lineHeight: 1 }}>
                {gallery.title}
              </h1>
              {gallery.description && (
                <p style={{ marginTop: '1.5rem', color: '#888', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', maxWidth: '500px', margin: '1.5rem auto 0' }}>
                  {gallery.description}
                </p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '1.5rem' }}
            >
              {gallery.images && gallery.images.length > 0 ? (
                gallery.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(139, 0, 0, 0.4)' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ flex: '0 0 calc(33.333% - 1rem)', minWidth: 0, borderRadius: '2px', overflow: 'hidden', backgroundColor: '#0a0000' }}
                  >
                    {img?.asset ? (
                      <img
                        src={urlFor(img).width(900).auto('format').quality(82).url()}
                        alt={img.caption || `Image ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                      />
                    ) : (
                      <div style={{ width: '100%', paddingBottom: '100%', background: 'radial-gradient(circle at center, #2a0000 0%, #050505 100%)', position: 'relative' }}>
                        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Image {i + 1}</span>
                      </div>
                    )}
                    {img.caption && (
                      <p style={{ margin: 0, padding: '0.6rem 0.75rem', fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#777', letterSpacing: '0.05em' }}>{img.caption}</p>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ width: '100%', textAlign: 'center', padding: '6rem 2rem', border: '1px solid #1a0000', borderRadius: '4px' }}
                >
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.8rem', color: '#444', marginBottom: '1rem' }}>No images yet.</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>Open Studio, find this gallery, and add photos to the "Portfolio Images" field.</p>
                  <a href="/studio" style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid #4a0000', color: '#cc3333', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a0000'; e.currentTarget.style.borderColor = '#cc3333'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#4a0000'; }}
                  >Open Studio →</a>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </div>

      <footer style={{ width: '100%', padding: '2rem', textAlign: 'center', borderTop: '1px solid #111', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#555', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.5px' }}>
          © 2026 deathofaheart. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default GalleryDetail;
