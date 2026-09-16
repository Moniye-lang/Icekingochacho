import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function TourPage() {
  const { tourAvailable, shows } = useData();

  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingEvent, setBookingEvent] = useState('');
  const [bookingBudget, setBookingBudget] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [botTrap, setBotTrap] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSent, setBookingSent] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          eventType: bookingEvent,
          budget: bookingBudget,
          message: bookingMessage,
          bot_trap: botTrap,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setBookingSent(true);
        setBookingName('');
        setBookingEmail('');
        setBookingEvent('');
        setBookingBudget('');
        setBookingMessage('');
      } else {
        setBookingError(data.error || 'Failed to submit inquiry. Please check your fields and try again.');
      }
    } catch {
      setBookingError('Network issue connecting to server. Please email bookings@icekingochacho.com directly.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div>
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-sub">LIVE CONCERTS &amp; BOOKING PORTAL</div>
          <h1 className="page-hero-title">TOUR DATES &amp; BOOKINGS</h1>
          <p className="body-copy" style={{ fontSize: '0.9375rem', maxWidth: '650px' }}>
            Live performance updates, headline festival scheduling, and official management representation.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Studio Lockdown Notice · NOT AVAILABLE RIGHT NOW */}
        <div
          className="reveal"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-gold)',
            padding: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(242,169,59,0.15)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
            NOT AVAILABLE RIGHT NOW
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            PUBLIC TOUR DATES CURRENTLY PAUSED
          </h2>
          <p className="body-copy" style={{ fontSize: '0.875rem', maxWidth: '720px', marginBottom: 0 }}>
            Ice King Ochacho live concert dates and festival appearances are not available right now due to studio recording sessions. Promoter proposals, corporate endorsements, and private booking inquiries remain open through official Ochacho Music Group management below.
          </p>
        </div>

        {/* Active Tour Shows List (when tour is available) */}
        {tourAvailable && (
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2ecc71', display: 'inline-block' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2ecc71', letterSpacing: '0.05em' }}>
                  CONCERT SCHEDULE CONFIRMED &bull; PASSES ACTIVE
                </span>
              </div>
              <h2 className="section-heading" style={{ fontSize: '1.85rem' }}>
                UPCOMING TOUR SCHEDULE
              </h2>
              <p className="section-lead">
                Official show dates, venue details, and management passes
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              {shows.map((show, index) => (
                <div
                  key={show.id || index}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    borderBottom: index < shows.length - 1 ? '1px solid var(--border-color)' : 'none',
                    gap: '1rem',
                  }}
                >
                  <div style={{ minWidth: '160px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                      {show.date}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '0.2rem' }}>
                      {show.city}
                    </div>
                  </div>

                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                      {show.venue}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        backgroundColor: show.status === 'SOLD OUT' ? 'rgba(231,76,60,0.15)' : 'rgba(46,204,113,0.15)',
                        color: show.status === 'SOLD OUT' ? '#e74c3c' : '#2ecc71',
                        border: `1px solid ${show.status === 'SOLD OUT' ? '#e74c3c' : '#2ecc71'}`,
                      }}
                    >
                      {show.status}
                    </span>

                    <a
                      href={show.ticketLink || `mailto:bookings@icekingochacho.com?subject=Passes - ${show.city}`}
                      className="btn btn-ghost-cyan btn-sm"
                    >
                      {show.ticketLabel || (show.status === 'SOLD OUT' ? 'Waitlist' : 'Get Passes')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hardened Management Booking Portal Form */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              OFFICIAL MANAGEMENT REPRESENTATION
            </div>
            <h2 className="section-heading" style={{ fontSize: '1.6rem' }}>
              PROMOTER &amp; EVENT BOOKING INQUIRY
            </h2>
            <p className="body-copy" style={{ fontSize: '0.875rem', maxWidth: '650px' }}>
              For headline appearances, festival showcases, brand endorsements, and corporate events. Direct representation by Ochacho Music Group.
            </p>
          </div>

          {bookingSent ? (
            <div
              style={{
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                border: '1px solid #2ecc71',
                padding: '1.75rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#2ecc71', marginBottom: '0.5rem' }}>
                INQUIRY DELIVERED
              </h3>
              <p className="body-copy" style={{ fontSize: '0.875rem', maxWidth: '500px', margin: '0 auto 1rem' }}>
                Your booking request has been securely dispatched to Ochacho Music Group executive management. Our team will review the proposal and respond shortly.
              </p>
              <button
                onClick={() => setBookingSent(false)}
                className="btn btn-ghost-cyan btn-sm"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              {/* Anti-spam Honeypot Trap (hidden from real users, filled by bots) */}
              <input
                type="text"
                name="bot_trap"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {bookingError && (
                <div
                  style={{
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    border: '1px solid #e74c3c',
                    color: '#e74c3c',
                    padding: '0.85rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                  }}
                >
                  ⚠ {bookingError}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    YOUR NAME / AGENCY
                  </label>
                  <input
                    type="text"
                    className="fan-club-input"
                    placeholder="e.g. Lagos Festival Ltd"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    CONTACT EMAIL
                  </label>
                  <input
                    type="email"
                    className="fan-club-input"
                    placeholder="promoter@agency.com"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    EVENT NAME &amp; CITY
                  </label>
                  <input
                    type="text"
                    className="fan-club-input"
                    placeholder="e.g. Homecoming Festival, Otukpo"
                    value={bookingEvent}
                    onChange={(e) => setBookingEvent(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    BUDGET RANGE
                  </label>
                  <select
                    className="fan-club-input"
                    value={bookingBudget}
                    onChange={(e) => setBookingBudget(e.target.value)}
                  >
                    <option value="">Select Range</option>
                    <option value="NGN 5M - 10M">NGN 5M - 10M</option>
                    <option value="NGN 10M - 25M">NGN 10M - 25M</option>
                    <option value="NGN 25M+">NGN 25M+</option>
                    <option value="International / USD">International ($15k+ USD)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  EVENT DETAILS &amp; PROPOSED DATES
                </label>
                <textarea
                  className="fan-club-input"
                  rows="3"
                  placeholder="Specify proposed dates, venue capacity, technical rider expectations..."
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                  required
                />
              </div>

              <button type="submit" disabled={bookingLoading} className="btn btn-solid-cyan">
                {bookingLoading ? 'Submitting...' : 'Submit Management Booking Request'}
              </button>
            </form>
          )}
        </div>

        {/* Verified Past Stage Photos */}
        <div>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            PERFORMANCE SHOWCASE &amp; LANDMARKS
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <img
              src="/assets/images (5).jpg"
              alt="Ice King Ochacho live showcase"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                border: '1px solid var(--border-color)',
              }}
              loading="lazy"
            />
            <img
              src="/assets/iceking4.jpg"
              alt="Ice King Ochacho campaign"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                border: '1px solid var(--border-color)',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
