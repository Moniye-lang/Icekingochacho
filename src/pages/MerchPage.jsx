import { useState } from 'react';

const CAPSULE_ITEMS = [
  {
    id: 'merch-hoodie',
    name: 'Wonder Kid Heavyweight Tour Hoodie',
    category: 'STREETWEAR CAPSULE',
    image: '/assets/merch_hoodie.jpg',
    status: 'NOT AVAILABLE RIGHT NOW',
    description: '450 GSM French terry cotton with crystalline puff-print graphics and bespoke ice-cyan drawcords.'
  },
  {
    id: 'merch-tee',
    name: 'Otukpo Renaissance Boxy Tee',
    category: 'LIMITED APPAREL',
    image: '/assets/merch_tee.jpg',
    status: 'NOT AVAILABLE RIGHT NOW',
    description: 'Heavyweight vintage-washed cotton featuring tour date typography and signature royal crown crest.'
  },
  {
    id: 'merch-vinyl',
    name: '180g Translucent Ice-Cyan Vinyl',
    category: 'PHYSICAL PRESSING',
    image: '/assets/merch_vinyl.jpg',
    status: 'NOT AVAILABLE RIGHT NOW',
    description: 'Mastered directly for physical audio playback on heavyweight custom-pressed ice-cyan translucent vinyl.'
  }
];

export default function MerchPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-sub">OFFICIAL MERCHANDISE &amp; PRESSINGS</div>
          <h1 className="page-hero-title">MERCH CAPSULE</h1>
          <p className="body-copy" style={{ fontSize: '0.9375rem', maxWidth: '650px' }}>
            Authentic heavyweight streetwear, limited capsule drops, and physical collector pressings under Ochacho Music Group stewardship.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Prominent Not Available Notice */}
        <div
          className="reveal"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-gold)',
            padding: '1.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(242,169,59,0.15)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
            NOT AVAILABLE RIGHT NOW
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            OFFICIAL MERCHANDISE CURRENTLY UNAVAILABLE
          </h2>
          <p className="body-copy" style={{ fontSize: '0.875rem', maxWidth: '720px', marginBottom: 0 }}>
            Official Ice King Ochacho merchandise, capsule collections, and physical pressings are currently not available for purchase while next-season manufacturing and fulfillment setup are underway. Join the VIP Dispatch below to receive an alert the moment orders go live.
          </p>
        </div>

        {/* Collection Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            CAPSULE PREVIEW (CURRENTLY NOT AVAILABLE)
          </div>
          <h2 className="section-heading" style={{ fontSize: '1.85rem' }}>
            UPCOMING STREETWEAR &amp; PHYSICAL PRESSINGS
          </h2>
          <p className="body-copy" style={{ maxWidth: '680px' }}>
            All items below are not available right now. Preview the upcoming line below and subscribe for priority release notifications.
          </p>
        </div>

        {/* Capsule Grid — Clean display, no checkout or multi-currency logic */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4rem',
          }}
        >
          {CAPSULE_ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ aspectRatio: '1', overflow: 'hidden', backgroundColor: '#000' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                  {item.category}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.name}
                </h3>
                <p className="body-copy" style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                  {item.description}
                </p>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(111,211,232,0.06)',
                  border: '1px solid rgba(111,211,232,0.2)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.06em',
                  textAlign: 'center',
                }}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single Restrained VIP Waitlist Form */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderTop: '3px solid var(--accent-cyan)',
            padding: 'clamp(2rem, 5vw, 3rem)',
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            VIP DISPATCH
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            RECEIVE PRIVATE DROP NOTIFICATIONS
          </h3>
          <p className="body-copy" style={{ fontSize: '0.875rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
            Enter your email to receive direct notification and early access the moment the official capsule releases.
          </p>

          {subscribed ? (
            <div style={{
              background: 'rgba(46, 204, 113, 0.1)',
              border: '1px solid #2ecc71',
              color: '#2ecc71',
              padding: '1rem',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}>
              ✓ You are on the priority dispatch list. We will notify you prior to public release.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                className="fan-club-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: '1 1 260px', maxWidth: '380px' }}
                required
              />
              <button type="submit" className="btn btn-solid-cyan">
                Join Priority List
              </button>
            </form>
          )}

          <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            For wholesale distribution, retail partnerships, or press inquiries:{' '}
            <a href="mailto:merch@icekingochacho.com" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
              merch@icekingochacho.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
