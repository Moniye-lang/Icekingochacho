import { useState, useRef, useEffect } from 'react';

export default function SideGalleryCarousel({
  tag = 'OFFICIAL PRESS GALLERY',
  title = 'VISUAL CHRONICLES & MOMENTS',
  lead = 'Swipe side-to-side to explore live stage moments, studio archives, and Otukpo roots',
  items = [],
}) {
  const trackRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('.side-gallery-card')?.clientWidth || 320;
    const scrollAmount = (cardWidth + 20) * 1.5;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (activePhoto && items.length > 0) {
        const currentIndex = items.findIndex((i) => i.id === activePhoto.id);
        if (e.key === 'ArrowRight') {
          const nextIndex = (currentIndex + 1) % items.length;
          setActivePhoto(items[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          setActivePhoto(items[prevIndex]);
        }
      }
    };
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto, items]);

  return (
    <div className="side-gallery-section">
      {/* Header & Controls */}
      <div className="side-gallery-header">
        <div>
          <span className="caption-text">{tag}</span>
          <h2 className="section-heading" style={{ fontSize: '1.65rem', marginTop: '0.2rem', marginBottom: '0.25rem' }}>
            {title}
          </h2>
          <p className="side-gallery-hint">
            <span>👈 Swipe side-to-side or use arrows 👉</span>
          </p>
        </div>

        <div className="side-gallery-controls" aria-label="Gallery slide controls">
          <button
            className="side-gallery-nav-btn"
            onClick={() => scroll('left')}
            aria-label="Previous photos"
            title="Scroll left"
          >
            &#8592;
          </button>
          <button
            className="side-gallery-nav-btn"
            onClick={() => scroll('right')}
            aria-label="Next photos"
            title="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Horizontal Side-to-Side Track */}
      <div className="side-gallery-track" ref={trackRef}>
        {items.map((item) => (
          <div
            key={item.id}
            className="side-gallery-card"
            onClick={() => setActivePhoto(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActivePhoto(item)}
            title="Click to expand photo & story"
          >
            <div className="side-gallery-img-wrap">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                    e.currentTarget.src = item.fallbackImage;
                  }
                }}
              />
              <span className="gallery-card-expand-badge">
                🔍 View Full
              </span>
            </div>

            <div className="side-gallery-body">
              <div className="side-gallery-tag">{item.tag}</div>
              <h3 className="side-gallery-title">{item.title}</h3>
              <p className="side-gallery-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="modal-backdrop open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sideGalleryLightboxTitle"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="modal-content"
            style={{ maxWidth: '820px', padding: '1.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Close Lightbox"
            >
              &times;
            </button>

            <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#000', marginBottom: '1.25rem' }}>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  if (activePhoto.fallbackImage && e.currentTarget.src !== activePhoto.fallbackImage) {
                    e.currentTarget.src = activePhoto.fallbackImage;
                  }
                }}
              />
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
              {activePhoto.tag}
            </div>

            <h3
              id="sideGalleryLightboxTitle"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
            >
              {activePhoto.title}
            </h3>

            <p className="body-copy" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
              {activePhoto.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button
                className="btn btn-ghost-dark btn-sm"
                onClick={() => {
                  const curr = items.findIndex((i) => i.id === activePhoto.id);
                  const prev = (curr - 1 + items.length) % items.length;
                  setActivePhoto(items[prev]);
                }}
              >
                &#8592; Previous Photo
              </button>
              <button
                className="btn btn-ghost-dark btn-sm"
                onClick={() => {
                  const curr = items.findIndex((i) => i.id === activePhoto.id);
                  const next = (curr + 1) % items.length;
                  setActivePhoto(items[next]);
                }}
              >
                Next Photo &#8594;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
