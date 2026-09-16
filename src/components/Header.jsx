import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=ice+king+ochacho';

const navItems = [
  { to: '/',      label: 'Home',           end: true },
  { to: '/music', label: 'Music & Videos'            },
  { to: '/about', label: 'About & Story'             },
  { to: '/tour',  label: 'Tour & Bookings'           },
  { to: '/merch', label: 'Merch Store'               },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const closeNav = () => setNavOpen(false);

  const handleNavClick = (to) => {
    closeNav();
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="site-header" role="banner">
      <div className="container nav-wrap">
        {/* Brand */}
        <button
          className="brand-logo"
          onClick={() => handleNavClick('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          aria-label="Ice King Ochacho Home"
        >
          <svg className="brand-crown-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
          <div>
            <span className="brand-title">ICE KING OCHACHO</span>
            <span className="brand-tag">OTUKPO • AFROBEAT</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation">
          <ul className={`main-nav${navOpen ? ' open' : ''}`} id="mainNavList">
            {navItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={() => handleNavClick(to)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link nav-link-ext"
                onClick={closeNav}
              >
                YouTube ↗
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button
            className={`mobile-toggle${navOpen ? ' active' : ''}`}
            id="mobileNavToggle"
            aria-label={navOpen ? 'Close Navigation' : 'Open Navigation'}
            aria-expanded={navOpen}
            aria-controls="mainNavList"
            onClick={() => setNavOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {navOpen && (
        <div
          className="nav-backdrop open"
          aria-hidden="true"
          onClick={closeNav}
        />
      )}
    </header>
  );
}
