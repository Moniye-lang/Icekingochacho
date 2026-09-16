import { NavLink } from 'react-router-dom';

const tabs = [
  {
    to: '/',
    label: 'Home',
    end: true,
    icon: (
      <svg className="app-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    to: '/music',
    label: 'Music',
    icon: (
      <svg className="app-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
  },
  {
    to: '/about',
    label: 'About',
    icon: (
      <svg className="app-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
      </svg>
    ),
  },
  {
    to: '/tour',
    label: 'Tour',
    icon: (
      <svg className="app-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
      </svg>
    ),
  },
  {
    to: '/merch',
    label: 'Merch',
    icon: (
      <svg className="app-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
      </svg>
    ),
  },
];

export default function MobileTabBar() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="mobile-app-bar" aria-label="Mobile Navigation Bar">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `app-tab-item${isActive ? ' active' : ''}`}
          onClick={handleClick}
        >
          {tab.icon}
          <span className="app-tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
