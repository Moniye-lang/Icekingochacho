import { NavLink } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';
import SideGalleryCarousel from '../components/SideGalleryCarousel';
import { galleryMoments } from '../data/gallery';

const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=ice+king+ochacho';

export default function HomePage() {
  const { playTrackById } = useAudio();
  // ✅ Real-time data from admin panel
  const { tourAvailable, shows, merchAvailable } = useData();

  // Get next upcoming show if tour is active
  const nextShow = tourAvailable && shows.length > 0 ? shows[0] : null;

  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="hero-video-section">
        <video
          className="hero-video-bg"
          src="/assets/Screen Recording 2026-09-15 192416.mp4"
          poster="/assets/iceking5.webp"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-video-scrim" />

        {/* Ambient floating ice particles */}
        {[
          { size: 4, left: '8%', bottom: '15%', dur: '9s', delay: '0s' },
          { size: 3, left: '18%', bottom: '28%', dur: '12s', delay: '1.5s' },
          { size: 5, left: '35%', bottom: '10%', dur: '8s', delay: '3s' },
          { size: 3, left: '52%', bottom: '20%', dur: '14s', delay: '0.8s' },
          { size: 4, left: '68%', bottom: '8%', dur: '10s', delay: '2s' },
          { size: 6, left: '80%', bottom: '22%', dur: '11s', delay: '4s' },
          { size: 3, left: '90%', bottom: '14%', dur: '9s', delay: '1s' },
          { size: 5, left: '24%', bottom: '5%', dur: '13s', delay: '5s' },
        ].map((p, i) => (
          <div key={i} className="hero-particle" style={{
            width: p.size, height: p.size,
            left: p.left, bottom: p.bottom,
            background: i % 2 === 0 ? 'rgba(111,211,232,0.7)' : 'rgba(242,169,59,0.6)',
            animationDuration: p.dur, animationDelay: p.delay,
          }} />
        ))}

        <div className="container hero-content-wrap">
          <div className="hero-content">
            <span className="hero-label-tag">WONDER KID OF NIGERIA</span>
            <h1 className="hero-heading">ICE KING<br />OCHACHO</h1>
            <p className="hero-subhead">
              Afrobeat &amp; hip-hop artist from Otukpo, Benue State.
            </p>
            <p className="hero-desc">
              Cold lyrical precision meets commanding Afrobeats energy. Backed by
              high-budget visual campaigns, landmark festival appearances, and national collaborators.
            </p>
            <div className="hero-cta-row">
              <NavLink to="/music" className="btn btn-hero-primary">
                Stream All Music ↗
              </NavLink>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-hero-ghost">
                Watch on YouTube
              </a>
              <NavLink to="/tour" className="btn btn-hero-ghost">
                Tour &amp; Bookings
              </NavLink>
            </div>

            {/* ✅ Real-time tour status pill */}
            <div className="hero-show-pill">
              <span className={`dot ${tourAvailable ? 'dot-live' : ''}`} aria-hidden="true" />
              <span>
                Live Tour &amp; Bookings:{' '}
                {tourAvailable && nextShow ? (
                  <strong>
                    Next: {nextShow.date} — {nextShow.city}
                  </strong>
                ) : tourAvailable ? (
                  <strong>Active — Check Schedule</strong>
                ) : (
                  <strong>Not Available Right Now (Studio Lockdown)</strong>
                )}
              </span>
              {tourAvailable && (
                <NavLink to="/tour" style={{ marginLeft: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700 }}>
                  View Dates →
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED RELEASES ===================== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">WONDER KID SONIC CATALOGUE</div>
            <h2 className="section-heading">FEATURED RELEASES &amp; HIGHLIGHTS</h2>
            <p className="section-lead">Explore the official Wonder Kid sonic and visual catalogue</p>
          </div>

          <div className="premium-cards-grid">
            {/* E Choke */}
            <div className="premium-release-card reveal reveal-delay-1">
              <div className="premium-card-img-wrap">
                <img src="/assets/Screenshot 2026-09-15 211029.png" alt="No Competition" />
                <div className="premium-card-overlay">
                  <button className="btn btn-solid-cyan btn-sm" onClick={() => playTrackById('e-choke')}>
                    ▶ Play Preview
                  </button>
                </div>
              </div>
              <div className="premium-card-body">
                <div className="premium-card-tag">LATEST VIRAL SINGLE</div>
                <h3 className="premium-card-title">No Competition</h3>
                <p className="premium-card-desc">
                  High-octane Afrobeat rhythm with cold lyrical delivery that sparked dance trends across North-Central Nigeria.
                </p>
                <div className="premium-card-actions">
                  <NavLink to="/music" className="btn btn-ghost-dark btn-sm">All Platforms</NavLink>
                </div>
              </div>
            </div>

            {/* Oh Papa */}
            <div className="premium-release-card reveal reveal-delay-2">
              <div className="premium-card-img-wrap">
                <img src="/assets/iceking3.jpg" alt="Oh Papa artwork" />
                <div className="premium-card-overlay">
                  <button className="btn btn-solid-cyan btn-sm" onClick={() => playTrackById('ochacho-money-remix')}>
                    ▶ Play Preview
                  </button>
                </div>
              </div>
              <div className="premium-card-body">
                <div className="premium-card-tag" style={{ color: 'var(--accent-gold)' }}>ANOTHER RISING HIT</div>
                <h3 className="premium-card-title">Oh Papa</h3>
                <p className="premium-card-desc">
                  Ice King Ochacho teams up with Teni the Entertainer on an anthemic brass-driven celebration.
                </p>
                <div className="premium-card-actions">
                  <NavLink to="/music" className="btn btn-ghost-dark btn-sm">All Platforms</NavLink>
                </div>
              </div>
            </div>

            {/* ✅ Real-time Tour / Bookings card */}
            <div className="premium-release-card reveal reveal-delay-3">
              <div className="premium-card-img-wrap">
                <img src="/assets/images (5).jpg" alt="Live concert" />
                <div className="premium-card-overlay">
                  <NavLink to="/tour" className="btn btn-gold btn-sm">View Schedule</NavLink>
                </div>
              </div>
              <div className="premium-card-body">
                <div className="premium-card-tag" style={{ color: tourAvailable ? '#2ecc71' : 'var(--accent-gold)' }}>
                  {tourAvailable ? '🟢 LIVE STAGES • DATES ACTIVE' : 'LIVE STAGES • NOT AVAILABLE RIGHT NOW'}
                </div>
                <h3 className="premium-card-title">TOUR &amp; BOOKINGS</h3>
                <p className="premium-card-desc">
                  {tourAvailable
                    ? `${shows.length} show${shows.length !== 1 ? 's' : ''} confirmed. Tickets and passes now available.`
                    : 'Live tour dates and booking requests are temporarily paused during studio production. Next dates TBA.'}
                </p>
                <div className="premium-card-actions">
                  <NavLink to="/tour" className={`btn btn-sm ${tourAvailable ? 'btn-solid-cyan' : 'btn-gold'}`}>
                    {tourAvailable ? 'Get Tickets' : 'Check Status'}
                  </NavLink>
                  <NavLink to="/about" className="btn btn-ghost-dark btn-sm">Read Story</NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Real-time merch status bar */}
          {!merchAvailable && (
            <div className="reveal premium-notice-bar">
              <span>🛍️ Merch Store is currently being restocked —</span>
              <NavLink to="/merch">Join the waitlist</NavLink>
            </div>
          )}

          {/* Gallery Carousel */}
          <div className="reveal">
            <SideGalleryCarousel
              tag="OFFICIAL PRESS & ARCHIVAL GALLERY"
              title="VISUAL CHRONICLES & MOMENTS"
              lead="Swipe side-to-side to explore live stage moments, studio archives, and Otukpo roots"
              items={galleryMoments}
            />
          </div>

          {/* YouTube Banner */}
          <div className="reveal reveal-delay-1 premium-yt-banner">
            <div>
              <span className="premium-yt-label">OFFICIAL YOUTUBE CHANNEL</span>
              <h3 className="premium-yt-title">WATCH OFFICIAL MUSIC VIDEOS &amp; FREESTYLES</h3>
              <p className="body-copy" style={{ fontSize: '0.875rem' }}>
                Stream high-production promotional videos, studio freestyle sessions, live festival cuts, and behind-the-scenes footage on YouTube.
              </p>
            </div>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid-cyan" style={{ alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>
              Go to YouTube Channel ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
