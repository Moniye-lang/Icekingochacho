import SideGalleryCarousel from '../components/SideGalleryCarousel';
import { galleryMoments } from '../data/gallery';

export default function AboutPage() {
  return (
    <div>
      {/* About Hero Banner with artist photo bg */}
      <div className="page-hero-banner about-hero-banner">
        <img
          src="/assets/iceking5.webp"
          alt="Ice King Ochacho"
          className="about-hero-bg-img"
          loading="lazy"
        />
        <div className="about-hero-scrim" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero-sub">ORIGINS &amp; CULTURAL CHRONICLES</div>
          <h1 className="page-hero-title">ABOUT ICE KING OCHACHO</h1>
          <p className="body-copy" style={{ fontSize: '0.9375rem', maxWidth: '650px' }}>
            The journey of Otukpo's Wonder Kid &mdash; from spontaneous age-7 freestyles
            to national Afrobeats stages.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Bio Grid */}
        <div className="about-bio-grid">
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
              }}
            >
              ORIGIN &amp; MUSICAL FOUNDATION
            </h2>
            <p className="body-copy" style={{ marginBottom: '1.25rem' }}>
              Born and raised in Otukpo, Benue State, Nigeria, Ice King Ochacho earned the
              moniker <strong>"Wonder Kid"</strong> at the age of 7 when his spontaneous
              lyrical delivery and rhythmic intuition first drew widespread community acclaim.
            </p>
            <p className="body-copy" style={{ marginBottom: '1.25rem' }}>
              Rather than following standard genre boundaries, his music merges sharp hip-hop
              phrasing with vibrant Afrobeat percussive roots and dancehall energy. The balance
              between cold precision (&quot;Ice&quot;) and commanding authority (&quot;King&quot;) forms
              his core identity.
            </p>
            <p className="body-copy" style={{ marginBottom: '2rem' }}>
              Backed by Ochacho Music Group and family stewardship rooted in Otukpo's
              cultural heritage, he represents the rising voice of North-Central Nigeria on
              national and international stages.
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                marginTop: '2rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              CAREER MILESTONES
            </h3>
            <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  AGE 7 &mdash; FREESTYLE PRODIGY
                </div>
                <p className="body-copy" style={{ marginTop: '0.2rem' }}>
                  Discovered in Otukpo; earned the title &quot;Wonder Kid&quot; through viral grassroots freestyles.
                </p>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  2023 &mdash; LANDMARK CULTURAL PERFORMANCES
                </div>
                <p className="body-copy" style={{ marginTop: '0.2rem' }}>
                  Landmark homecoming showcase performances at the annual Ochacho Carnival in Otukpo.
                </p>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  2024 &mdash; COLLABORATION &amp; HIT SINGLES
                </div>
                <p className="body-copy" style={{ marginTop: '0.2rem' }}>
                  Released &quot;No Competition&quot; and teamed up on landmark collaborative anthems like &quot;Oh Papa&quot;.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  2026 &mdash; LABEL CAMPAIGN &amp; EXPANSION
                </div>
                <p className="body-copy" style={{ marginTop: '0.2rem' }}>
                  High-production video shoot, international tour schedule, and full discography expansion.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  marginBottom: '1rem',
                  color: 'var(--accent-gold)',
                }}
              >
                ARTIST SPECIFICATION
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Hometown
                    </td>
                    <td style={{ padding: '0.65rem 0', color: 'var(--text-secondary)' }}>
                      Otukpo, Benue State, Nigeria
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Moniker
                    </td>
                    <td style={{ padding: '0.65rem 0', color: 'var(--text-secondary)' }}>
                      Wonder Kid (Discovered Age 7)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.65rem 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Genres
                    </td>
                    <td style={{ padding: '0.65rem 0', color: 'var(--text-secondary)' }}>
                      Afrobeat, Hip-Hop, Dancehall
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.65rem 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Management
                    </td>
                    <td style={{ padding: '0.65rem 0', color: 'var(--text-secondary)' }}>
                      Ochacho Music Group
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <img
              src="/assets/iceking3.jpg"
              alt="Ice King Ochacho portrait"
              style={{
                border: '1px solid var(--border-color)',
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        {/* Side-to-Side Gallery Section with Rich Writeups & Lightbox */}
        <SideGalleryCarousel
          tag="VISUAL CHRONICLES &bull; ARCHIVAL PRESS"
          title="OFFICIAL PHOTO GALLERY &amp; STORIES"
          lead="Swipe side-to-side to explore live stage moments, studio archives, and Otukpo roots"
          items={galleryMoments}
        />
      </div>
    </div>
  );
}
