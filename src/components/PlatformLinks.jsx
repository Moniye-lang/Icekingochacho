const platformList = [
  {
    name: 'Spotify',
    color: '#1DB954',
    badge: 'Play',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.586 14.424a.625.625 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.627.627 0 1 1-.279-1.214c3.808-.87 7.076-.506 9.714 1.114a.625.625 0 0 1 .207.857zm1.224-2.719a.782.782 0 0 1-1.074.256c-2.687-1.652-6.785-2.131-9.965-1.166a.782.782 0 1 1-.456-1.494c3.633-1.102 8.147-.568 11.239 1.33.367.226.482.707.256 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.938.938 0 1 1-.545-1.791c3.532-1.072 9.404-.87 13.114 1.332a.938.938 0 0 1-.326 1.282c-.445.264-.838.15-1.282-.326z"/>
      </svg>
    ),
    url: 'https://open.spotify.com/artist/icekingochacho',
  },
  {
    name: 'Apple Music',
    color: '#FC3C44',
    badge: 'Play',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm3.7 13.1a2.3 2.3 0 0 1-2.3 2.3c-1.27 0-2.3-1.03-2.3-2.3 0-1.27 1.03-2.3 2.3-2.3.43 0 .84.12 1.19.33V7.83L9.7 9.2v5.9a2.3 2.3 0 0 1-2.3 2.3c-1.27 0-2.3-1.03-2.3-2.3 0-1.27 1.03-2.3 2.3-2.3.43 0 .84.12 1.19.33V8.14c0-.5.35-.93.84-1.03l5.3-1.45c.61-.17 1.21.28 1.21.91v8.53h-.24z"/>
      </svg>
    ),
    url: 'https://music.apple.com/artist/ice-king-ochacho',
  },
  {
    name: 'Audiomack',
    color: '#FFA200',
    badge: 'Stream',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 17.5h3.2l3.5-6-3.5-6H4.5l3.5 6-3.5 6zm6.2 0h3.2l3.5-6-3.5-6h-3.2l3.5 6-3.5 6zm6.2 0h3.2l3.5-6-3.5-6h-3.2l3.5 6-3.5 6z" transform="translate(-1, 0)"/>
      </svg>
    ),
    url: 'https://audiomack.com/icekingochacho',
  },
  {
    name: 'YouTube Music',
    color: '#FF0000',
    badge: 'Watch',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10S17.523 2 12 2zm0 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm-1.8-6.3v3.6l3.15-1.8-3.15-1.8z"/>
      </svg>
    ),
    url: 'https://www.youtube.com/results?search_query=ice+king+ochacho',
  },
  {
    name: 'Boomplay',
    color: '#00ADEF',
    badge: 'Play',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm-1.8 14.5v-9l7 4.5-7 4.5zm8.3-4.5c0-3.59-2.91-6.5-6.5-6.5-.41 0-.75-.34-.75-.75s.34-.75.75-.75c4.42 0 8 3.58 8 8 0 .41-.34.75-.75.75s-.75-.34-.75-.75z"/>
      </svg>
    ),
    url: 'https://www.boomplay.com',
  },
  {
    name: 'TIDAL',
    color: '#FFFFFF',
    badge: 'Hi-Res',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7.5L8.25 3.75 4.5 7.5 8.25 11.25 12 7.5zm0 7.5l-3.75-3.75L4.5 15l3.75 3.75L12 15zm7.5-7.5l-3.75-3.75L12 7.5l3.75 3.75L19.5 7.5zm-7.5 0L8.25 11.25 12 15l3.75-3.75L12 7.5zm7.5 7.5l-3.75-3.75L12 15l3.75 3.75L19.5 15z"/>
      </svg>
    ),
    url: 'https://tidal.com',
  },
  {
    name: 'Deezer',
    color: '#A238FF',
    badge: 'Listen',
    icon: (
      <svg className="platform-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 15h3v4H3v-4zm4-3h3v7H7v-7zm4-3h3v10h-3V9zm4-3h3v13h-3V6zm4-3h3v16h-3V3z"/>
      </svg>
    ),
    url: 'https://www.deezer.com',
  },
];

export default function PlatformLinks({ trackTitle = '' }) {
  return (
    <div className="linktree-platforms-list">
      {platformList.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="linktree-platform-row"
          title={`Stream ${trackTitle || 'Ice King Ochacho'} on ${platform.name}`}
        >
          <div className="platform-left">
            <span className="platform-icon-box" style={{ color: platform.color }}>
              {platform.icon}
            </span>
            <span style={{ fontWeight: 600 }}>{platform.name}</span>
          </div>
          <span className="platform-action-badge">{platform.badge}</span>
        </a>
      ))}
    </div>
  );
}
