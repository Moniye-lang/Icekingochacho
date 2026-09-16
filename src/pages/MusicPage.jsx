import { useAudio } from '../context/AudioContext';
import PlatformLinks from '../components/PlatformLinks';

const YOUTUBE_URL = 'https://www.youtube.com/results?search_query=ice+king+ochacho';

export default function MusicPage() {
  const { playTrackById } = useAudio();

  return (
    <div>
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-sub">OFFICIAL DISCOGRAPHY &amp; VISUALS</div>
          <h1 className="page-hero-title">MUSIC &amp; VIDEOS</h1>
          <p className="body-copy" style={{ fontSize: '0.9375rem', maxWidth: '600px' }}>
            Stream official singles on your favorite platform and watch video cuts on YouTube.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {/* YouTube Card */}
        <div
          className="reveal"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid #FF0000',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ color: '#FF0000', fontSize: '1.25rem' }}>&#9658;</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                YOUTUBE VIDEO HUB
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              OFFICIAL VIDEOS &amp; STAGE PERFORMANCES
            </h2>
            <p className="body-copy" style={{ fontSize: '0.875rem' }}>
              Promotional video shoots, festival stage cuts, and viral freestyles.
            </p>
          </div>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ whiteSpace: 'nowrap' }}
          >
            Open on YouTube &#8599;
          </a>
        </div>

        {/* Streaming Platforms */}
        <div className="linktree-container reveal reveal-delay-1">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-heading" style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              STREAMING PLATFORMS
            </h2>
            <p className="section-lead" style={{ marginBottom: '1.5rem' }}>
              Select your preferred streaming provider with official logos
            </p>
          </div>

          {/* E Choke */}
          <div className="linktree-release-box">
            <div className="linktree-track-card">
              <img
                src="/assets/single_echoke.jpg"
                alt="E Choke artwork"
                className="linktree-track-art"
              />
              <div>
                <h3 className="linktree-track-title">E CHOKE</h3>
                <span className="linktree-track-meta">
                  Ice King Ochacho &bull; Official Single (2024)
                </span>
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    className="btn btn-solid-cyan btn-sm"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    onClick={() => playTrackById('e-choke')}
                  >
                    &#9654; Preview Track
                  </button>
                </div>
              </div>
            </div>
            <PlatformLinks trackTitle="E Choke" />
          </div>

          {/* Ochacho Money Remix */}
          <div className="linktree-release-box">
            <div className="linktree-track-card">
              <img
                src="/assets/single_ochacho_money.jpg"
                alt="Ochacho Money Remix artwork"
                className="linktree-track-art"
              />
              <div>
                <h3 className="linktree-track-title">OCHACHO MONEY (REMIX)</h3>
                <span className="linktree-track-meta">
                  Ice King Ochacho feat. Teni (2024)
                </span>
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    className="btn btn-solid-cyan btn-sm"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    onClick={() => playTrackById('ochacho-money-remix')}
                  >
                    &#9654; Preview Track
                  </button>
                </div>
              </div>
            </div>
            <PlatformLinks trackTitle="Ochacho Money (Remix)" />
          </div>
        </div>

        {/* Video Archive */}
        <div className="reveal" style={{ marginTop: '3.5rem' }}>
          <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            VIDEO ARCHIVE &amp; LIVE CUTS
          </h3>
          <p className="body-copy" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Behind-the-scenes footage, studio rehearsals, and live concert reels
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1rem',
              }}
            >
              <img
                src="/assets/hero_poster.jpg"
                alt="Official promo video"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  marginBottom: '0.75rem',
                }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                PROMOTIONAL FILM (2026)
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  margin: '0.25rem 0 0.5rem 0',
                }}
              >
                Official Label Campaign Film
              </h4>
              <p className="body-copy" style={{ fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                Directed by Clarence Peters Studio. High fashion, crystalline lighting, Benue culture.
              </p>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark btn-sm"
                style={{ width: '100%' }}
              >
                Watch on YouTube &#8599;
              </a>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1rem',
              }}
            >
              <img
                src="/assets/images (5).jpg"
                alt="Concert stage showcase"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  marginBottom: '0.75rem',
                }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                FESTIVAL PERFORMANCE
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  margin: '0.25rem 0 0.5rem 0',
                }}
              >
                Live Festival Cut &mdash; Lagos Showcase
              </h4>
              <p className="body-copy" style={{ fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                Crowd energy, atmospheric cyan beams, and explosive live band arrangement.
              </p>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark btn-sm"
                style={{ width: '100%' }}
              >
                Watch on YouTube &#8599;
              </a>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '1rem',
              }}
            >
              <img
                src="/assets/iceking4.jpg"
                alt="Behind the scenes"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  marginBottom: '0.75rem',
                }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                BEHIND THE SCENES (2025)
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  margin: '0.25rem 0 0.5rem 0',
                }}
              >
                Studio Sessions &amp; Freestyles
              </h4>
              <p className="body-copy" style={{ fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                Raw studio moments, unreleased footage, and exclusive freestyle sessions.
              </p>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark btn-sm"
                style={{ width: '100%' }}
              >
                Watch on YouTube &#8599;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
