import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { releases } from '../data/releases';

export default function AdminPage() {
  const {
    tourAvailable,
    setTourAvailable,
    shows,
    addShow,
    updateShow,
    deleteShow,
    merchAvailable,
    setMerchAvailable,
    merchItems,
    addMerchItem,
    updateMerchItem,
    deleteMerchItem,
    resetToDefaults,
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [loginShake, setLoginShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tour'); // 'tour' | 'merch' | 'settings' | 'streaming'

  // Verify existing session token on mount
  useEffect(() => {
    const token = sessionStorage.getItem('iko_admin_jwt');
    if (token) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('iko_admin_jwt');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          sessionStorage.removeItem('iko_admin_jwt');
          setIsAuthenticated(false);
        });
    }
  }, []);

  // Form states for new show
  const [showDate, setShowDate] = useState('');
  const [showCity, setShowCity] = useState('');
  const [showVenue, setShowVenue] = useState('');
  const [showStatus, setShowStatus] = useState('CONFIRMED');
  const [showTicketLink, setShowTicketLink] = useState('');
  const [showSuccess, setShowSuccess] = useState('');

  // Form states for new merch
  const [merchName, setMerchName] = useState('');
  const [merchCategory, setMerchCategory] = useState('Apparel');
  const [merchNgn, setMerchNgn] = useState('₦35,000');
  const [merchUsd, setMerchUsd] = useState('$50.00');
  const [merchGbp, setMerchGbp] = useState('£40.00');
  const [merchImg, setMerchImg] = useState('/assets/merch_hoodie.jpg');
  const [merchDesc, setMerchDesc] = useState('');
  const [merchSuccess, setMerchSuccess] = useState('');

  // Streaming URL editor state — seeded from releases data
  const [streamingEdits, setStreamingEdits] = useState(() => {
    const saved = localStorage.getItem('iko_streaming_urls');
    if (saved) return JSON.parse(saved);
    const initial = {};
    releases.forEach(track => {
      initial[track.id] = {};
      track.platforms.forEach(p => { initial[track.id][p.name] = p.url; });
    });
    return initial;
  });
  const [streamingMsg, setStreamingMsg] = useState('');

  // Server-Side Authentication Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setPinError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pinInput }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setIsAuthenticated(true);
        sessionStorage.setItem('iko_admin_jwt', data.token);
        setPinError('');
      } else {
        setPinError(data.error || 'Incorrect passcode. Please try again.');
        setLoginShake(true);
        setTimeout(() => setLoginShake(false), 600);
      }
    } catch {
      setPinError('Network error connecting to management authentication server.');
    } finally {
      setLoading(false);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('iko_admin_jwt');
    setIsAuthenticated(false);
  };

  const handleSaveStreaming = () => {
    localStorage.setItem('iko_streaming_urls', JSON.stringify(streamingEdits));
    setStreamingMsg('Streaming links updated! Refresh the Music page to see changes.');
    setTimeout(() => setStreamingMsg(''), 5000);
  };

  // Add Show Submit
  const handleAddShow = (e) => {
    e.preventDefault();
    if (!showDate.trim() || !showCity.trim() || !showVenue.trim()) return;
    addShow({
      date: showDate.toUpperCase(),
      city: showCity,
      venue: showVenue,
      status: showStatus,
      ticketLink: showTicketLink.trim() || `mailto:bookings@icekingochacho.com?subject=Ticket Inquiry - ${showCity} (${showDate})`,
      ticketLabel: showStatus === 'SOLD OUT' ? 'Sold Out' : 'Get Passes',
    });
    setShowDate('');
    setShowCity('');
    setShowVenue('');
    setShowTicketLink('');
    setShowSuccess('New show date successfully added to the roster!');
    setTimeout(() => setShowSuccess(''), 4000);
  };

  // Add Merch Submit
  const handleAddMerch = (e) => {
    e.preventDefault();
    if (!merchName.trim()) return;
    addMerchItem({
      name: merchName,
      category: merchCategory,
      prices: {
        NGN: merchNgn,
        USD: merchUsd,
        GBP: merchGbp,
      },
      image: merchImg,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      description: merchDesc || 'Official Ice King Ochacho merchandise collection drop.',
    });
    setMerchName('');
    setMerchDesc('');
    setMerchSuccess('New merchandise item added to the collection!');
    setTimeout(() => setMerchSuccess(''), 4000);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(ellipse at 60% 40%, #0e2436 0%, #06121b 60%, #030d14 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(111,211,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(111,211,232,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '420px', width: '100%',
          backgroundColor: 'rgba(14,36,54,0.92)',
          border: '1px solid rgba(111,211,232,0.2)',
          borderTop: '3px solid var(--accent-gold)',
          padding: 'clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(111,211,232,0.05)',
          animation: loginShake ? 'adminShake 0.5s ease' : 'none',
        }}>
          {/* Security lock badge (replaces decorative crown) */}
          <div style={{
            width: '56px', height: '56px', margin: '0 auto 1.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(111,211,232,0.08)',
            border: '1px solid rgba(111,211,232,0.3)',
            fontSize: '1.5rem',
          }}>
            🔒
          </div>

          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
            RESTRICTED ACCESS
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            BACKSTAGE PORTAL
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.5 }}>
            Authorized management access only. Protected by server-side authentication.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>
                ADMIN PASSCODE
              </label>
              <input
                type="password"
                className="fan-club-input"
                style={{
                  width: '100%', fontSize: '1.3rem',
                  letterSpacing: '0.3em', textAlign: 'center',
                  border: pinError ? '1px solid #ff4d4d' : '1px solid var(--border-color)',
                  transition: 'border-color 0.2s ease',
                }}
                placeholder="••••••••"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                disabled={loading}
                autoFocus
                required
              />
            </div>

            {pinError && (
              <div style={{
                color: '#ff4d4d', fontSize: '0.78rem', fontWeight: 600,
                marginBottom: '1rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.35rem',
              }}>
                <span>⚠</span> {pinError}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-solid-cyan" style={{ width: '100%', fontSize: '0.9rem', letterSpacing: '0.04em' }}>
              {loading ? 'Verifying Credentials...' : '🔓 Unlock Dashboard'}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', borderTop: '1px solid rgba(111,211,232,0.1)', paddingTop: '1.25rem' }}>
            <NavLink to="/" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              ← Return to Main Site
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Admin Top Banner */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
              MANAGEMENT CONTROL PANEL
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', margin: '0.2rem 0 0' }}>
              ICE KING OCHACHO BACKSTAGE
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <NavLink to="/" className="btn btn-ghost-dark btn-sm">
              Live Site ↗
            </NavLink>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm"
              style={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0' }}>
          {[
            { id: 'tour', label: `🎫 Tour & Bookings`, count: shows.length },
            { id: 'merch', label: `🛍️ Merch Store`, count: merchItems.length },
            { id: 'streaming', label: '🎵 Streaming Links', count: null },
            { id: 'settings', label: '⚙️ Settings', count: null },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.7rem 1.1rem',
                fontWeight: 700,
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {tab.label}{tab.count !== null ? ` (${tab.count})` : ''}
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: TOUR & BOOKINGS */}
        {/* ========================================================= */}
        {activeTab === 'tour' && (
          <div>
            {/* Master Availability Toggle Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderLeft: tourAvailable ? '4px solid #2ecc71' : '4px solid var(--accent-gold)',
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: tourAvailable ? '#2ecc71' : 'var(--accent-gold)', letterSpacing: '0.05em' }}>
                  PUBLIC TOUR PAGE STATUS: {tourAvailable ? 'ACTIVE / OPEN' : 'NOT AVAILABLE RIGHT NOW (STUDIO LOCKDOWN)'}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                  {tourAvailable
                    ? 'Public Tour & Booking schedule is LIVE and visible on the website.'
                    : 'Public Tour & Booking schedule is PAUSED and displaying "Not Available Right Now".'}
                </h3>
                <p className="body-copy" style={{ fontSize: '0.85rem' }}>
                  Toggle this switch whenever you want to open ticket sales or pause booking requests during recording sessions.
                </p>
              </div>

              <button
                onClick={() => setTourAvailable(!tourAvailable)}
                className={tourAvailable ? 'btn btn-gold' : 'btn btn-solid-cyan'}
              >
                {tourAvailable ? 'Pause Tour & Bookings' : 'Activate Live Tour Dates'}
              </button>
            </div>

            {/* Add New Show Form */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                ➕ ADD NEW SHOW / CONCERT
              </h3>

              {showSuccess && (
                <div style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '1px solid #2ecc71', color: '#2ecc71', padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                  ✓ {showSuccess}
                </div>
              )}

              <form onSubmit={handleAddShow}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      DATE (e.g. DEC 24, 2026)
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="e.g. DEC 24, 2026"
                      value={showDate}
                      onChange={(e) => setShowDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      CITY &amp; STATE
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="e.g. Otukpo, Benue State"
                      value={showCity}
                      onChange={(e) => setShowCity(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      VENUE / FESTIVAL NAME
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="e.g. Ochacho Carnival Grand Stage"
                      value={showVenue}
                      onChange={(e) => setShowVenue(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      TICKET STATUS
                    </label>
                    <select
                      className="fan-club-input"
                      value={showStatus}
                      onChange={(e) => setShowStatus(e.target.value)}
                    >
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="TICKETS ON SALE">TICKETS ON SALE</option>
                      <option value="COMING SOON">COMING SOON</option>
                      <option value="SOLD OUT">SOLD OUT</option>
                      <option value="TBA">TBA</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    TICKET / BOOKING LINK URL <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional — leave blank to use default email)</span>
                  </label>
                  <input
                    type="url"
                    className="fan-club-input"
                    placeholder="https://tickets.example.com/ice-king-ochacho-abuja"
                    value={showTicketLink}
                    onChange={(e) => setShowTicketLink(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-solid-cyan">
                  Save Show to Schedule
                </button>
              </form>
            </div>

            {/* Current Shows List */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                CURRENT CONCERT ROSTER ({shows.length})
              </h3>

              {shows.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  No shows in the schedule. Use the form above to add a new show.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {shows.map((show) => (
                    <div
                      key={show.id}
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                          {show.date} &mdash; <span style={{ color: 'var(--accent-cyan)' }}>{show.city}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {show.venue}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <select
                          className="fan-club-input"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}
                          value={show.status}
                          onChange={(e) => updateShow(show.id, { status: e.target.value })}
                        >
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="TICKETS ON SALE">TICKETS ON SALE</option>
                          <option value="COMING SOON">COMING SOON</option>
                          <option value="SOLD OUT">SOLD OUT</option>
                          <option value="TBA">TBA</option>
                        </select>

                        <button
                          onClick={() => deleteShow(show.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}
                          title="Delete show"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MERCH STORE */}
        {/* ========================================================= */}
        {activeTab === 'merch' && (
          <div>
            {/* Master Availability Toggle Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderLeft: merchAvailable ? '4px solid #2ecc71' : '4px solid var(--accent-gold)',
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: merchAvailable ? '#2ecc71' : 'var(--accent-gold)', letterSpacing: '0.05em' }}>
                  PUBLIC MERCH STORE STATUS: {merchAvailable ? 'ACTIVE / OPEN' : 'NOT AVAILABLE RIGHT NOW (ARCHIVED)'}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                  {merchAvailable
                    ? 'Public Merch Store is LIVE and purchases are active.'
                    : 'Public Merch Store is PAUSED and displaying "Not Available Right Now".'}
                </h3>
                <p className="body-copy" style={{ fontSize: '0.85rem' }}>
                  Toggle this switch to launch or pause merchandise capsule drops and pre-orders.
                </p>
              </div>

              <button
                onClick={() => setMerchAvailable(!merchAvailable)}
                className={merchAvailable ? 'btn btn-gold' : 'btn btn-solid-cyan'}
              >
                {merchAvailable ? 'Pause Merch Store' : 'Activate Live Merch Store'}
              </button>
            </div>

            {/* Add New Merch Form */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                ➕ ADD NEW MERCH PRODUCT
              </h3>

              {merchSuccess && (
                <div style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '1px solid #2ecc71', color: '#2ecc71', padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                  ✓ {merchSuccess}
                </div>
              )}

              <form onSubmit={handleAddMerch}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      PRODUCT NAME
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="e.g. Wonder Kid Limited Windbreaker"
                      value={merchName}
                      onChange={(e) => setMerchName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      CATEGORY
                    </label>
                    <select
                      className="fan-club-input"
                      value={merchCategory}
                      onChange={(e) => setMerchCategory(e.target.value)}
                    >
                      <option value="Apparel">Apparel</option>
                      <option value="Music Physical">Music Physical</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Headwear">Headwear</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      PRICE (NGN)
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="₦35,000"
                      value={merchNgn}
                      onChange={(e) => setMerchNgn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      PRICE (USD)
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="$50.00"
                      value={merchUsd}
                      onChange={(e) => setMerchUsd(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      PRICE (GBP)
                    </label>
                    <input
                      type="text"
                      className="fan-club-input"
                      placeholder="£40.00"
                      value={merchGbp}
                      onChange={(e) => setMerchGbp(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      IMAGE ASSET
                    </label>
                    <select
                      className="fan-club-input"
                      value={merchImg}
                      onChange={(e) => setMerchImg(e.target.value)}
                    >
                      <option value="/assets/merch_hoodie.jpg">Tour Hoodie (/assets/merch_hoodie.jpg)</option>
                      <option value="/assets/merch_tee.jpg">Boxy Tee (/assets/merch_tee.jpg)</option>
                      <option value="/assets/merch_vinyl.jpg">Vinyl (/assets/merch_vinyl.jpg)</option>
                      <option value="/assets/single_echoke.jpg">E Choke Artwork</option>
                      <option value="/assets/single_ochacho_money.jpg">Ochacho Money Artwork</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    className="fan-club-input"
                    rows="2"
                    placeholder="Short product description and materials..."
                    value={merchDesc}
                    onChange={(e) => setMerchDesc(e.target.value)}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-solid-cyan">
                  Save Product to Merch Store
                </button>
              </form>
            </div>

            {/* Current Merch List */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                CURRENT MERCH PRODUCTS ({merchItems.length})
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {merchItems.map((item) => (
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {item.category}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0.25rem 0 0.5rem' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                        {item.prices?.NGN || '₦35,000'} / {item.prices?.USD || '$50.00'}
                      </div>
                      <p className="body-copy" style={{ fontSize: '0.8rem', marginBottom: '1rem', flex: 1 }}>
                        {item.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                        <button
                          onClick={() => updateMerchItem(item.id, { inStock: !item.inStock })}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: item.inStock ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                            color: item.inStock ? '#2ecc71' : '#e74c3c',
                            border: `1px solid ${item.inStock ? '#2ecc71' : '#e74c3c'}`,
                            fontSize: '0.75rem',
                          }}
                        >
                          {item.inStock ? 'In Stock ✓' : 'Sold Out ✕'}
                        </button>

                        <button
                          onClick={() => deleteMerchItem(item.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: '#ff6b6b', borderColor: '#ff6b6b', fontSize: '0.75rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: STREAMING LINKS */}
        {/* ========================================================= */}
        {activeTab === 'streaming' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                STREAMING PLATFORM LINKS
              </h3>
              <p className="body-copy" style={{ fontSize: '0.875rem' }}>
                Update the direct streaming URLs for each track and platform. Changes are saved to your browser and applied immediately.
              </p>
            </div>

            {streamingMsg && (
              <div style={{ backgroundColor: 'rgba(46,204,113,0.12)', border: '1px solid #2ecc71', color: '#2ecc71', padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✓ {streamingMsg}
              </div>
            )}

            {releases.map(track => (
              <div key={track.id} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <img
                    src={track.artwork}
                    alt={track.title}
                    style={{ width: '56px', height: '56px', objectFit: 'cover', border: '1px solid var(--border-color)', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{track.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>{track.type} · {track.year}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {track.platforms.map(platform => (
                    <div key={platform.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '0.75rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {platform.name}
                      </label>
                      <input
                        type="url"
                        className="fan-club-input"
                        style={{ fontSize: '0.8rem' }}
                        placeholder={`https://...`}
                        value={streamingEdits[track.id]?.[platform.name] || ''}
                        onChange={e => {
                          setStreamingEdits(prev => ({
                            ...prev,
                            [track.id]: { ...(prev[track.id] || {}), [platform.name]: e.target.value }
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button className="btn btn-solid-cyan" onClick={handleSaveStreaming}>
              💾 Save All Streaming Links
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                SERVER-SIDE AUTHENTICATION SECURITY
              </h3>
              <p className="body-copy" style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                Management access credentials are strictly managed server-side via the secure environment variable <code>ADMIN_PASSWORD</code>. Passcodes are hashed with SHA-256, verified using timing-safe comparisons, and protected by automatic IP rate limiting.
              </p>
              <div style={{ background: 'rgba(111,211,232,0.06)', border: '1px solid rgba(111,211,232,0.2)', padding: '0.85rem', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                🔒 <strong>Status:</strong> Server Authentication Active. No passcodes or management secrets exist in the public client bundle.
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid #ff4d4d', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ff4d4d', marginBottom: '0.5rem' }}>
                RESET FACTORY DEFAULTS
              </h3>
              <p className="body-copy" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Restore all original shows, merchandise items, and availability statuses. This cannot be undone.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all data to default?')) {
                    resetToDefaults();
                    alert('Data restored to defaults.');
                  }
                }}
                className="btn btn-ghost btn-sm"
                style={{ color: '#ff4d4d', borderColor: '#ff4d4d' }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

