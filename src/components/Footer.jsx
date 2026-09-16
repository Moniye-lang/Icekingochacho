import { NavLink } from 'react-router-dom';

const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=ice+king+ochacho';

export default function Footer() {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-ice-trim" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              ICE KING OCHACHO
            </div>
            <p
              style={{
                maxWidth: '320px',
                fontSize: '0.8125rem',
                lineHeight: 1.5,
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              Official promotional platform for Ice King Ochacho (Wonder Kid). Otukpo,
              Benue State, Nigeria.
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              OCHACHO MUSIC GROUP
            </div>
          </div>

          <div>
            <div className="footer-col-title">PAGES</div>
            <ul className="footer-nav">
              <li>
                <NavLink to="/" onClick={handleNavClick}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/music" onClick={handleNavClick}>
                  Music &amp; Videos
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={handleNavClick}>
                  About &amp; Story
                </NavLink>
              </li>
              <li>
                <NavLink to="/tour" onClick={handleNavClick}>
                  Tour &amp; Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/merch" onClick={handleNavClick}>
                  Merch Store
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">STREAM &amp; WATCH</div>
            <ul className="footer-nav">
              <li>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  YouTube Channel &#8599;
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/artist/icekingochacho" target="_blank" rel="noopener noreferrer">
                  Spotify &#8599;
                </a>
              </li>
              <li>
                <a href="https://music.apple.com/artist/ice-king-ochacho" target="_blank" rel="noopener noreferrer">
                  Apple Music &#8599;
                </a>
              </li>
              <li>
                <a href="https://audiomack.com/icekingochacho" target="_blank" rel="noopener noreferrer">
                  Audiomack &#8599;
                </a>
              </li>
              <li>
                <a href="https://www.boomplay.com" target="_blank" rel="noopener noreferrer">
                  Boomplay &#8599;
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">CONTACT &amp; BOOKINGS</div>
            <ul className="footer-nav">
              <li>
                <a href="mailto:bookings@icekingochacho.com">bookings@icekingochacho.com</a>
              </li>
              <li>
                <a href="mailto:press@icekingochacho.com">press@icekingochacho.com</a>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)' }}>
                  Otukpo, Benue / Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Ice King Ochacho. All Rights Reserved. Managed by
            Ochacho Music Group.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.75rem' }}>
              Otukpo &bull; Benue State &bull; Nigeria
            </span>
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                opacity: 0.6,
                textDecoration: 'none',
              }}
              title="Management Backstage Portal"
            >
              Backstage 🔒
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
