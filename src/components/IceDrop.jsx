import { useState, useEffect } from 'react';

const ICICLES = [
  { left: '3%', delay: 0, height: 140, width: 7 },
  { left: '8%', delay: 0.15, height: 200, width: 5 },
  { left: '13%', delay: 0.05, height: 110, width: 9 },
  { left: '18%', delay: 0.3, height: 170, width: 6 },
  { left: '23%', delay: 0.1, height: 240, width: 8 },
  { left: '28%', delay: 0.22, height: 130, width: 5 },
  { left: '33%', delay: 0.08, height: 190, width: 10 },
  { left: '38%', delay: 0.35, height: 155, width: 6 },
  { left: '43%', delay: 0.18, height: 210, width: 7 },
  { left: '48%', delay: 0.02, height: 260, width: 9 },
  { left: '53%', delay: 0.28, height: 145, width: 6 },
  { left: '58%', delay: 0.12, height: 220, width: 8 },
  { left: '63%', delay: 0.4, height: 170, width: 5 },
  { left: '68%', delay: 0.06, height: 195, width: 10 },
  { left: '73%', delay: 0.25, height: 135, width: 7 },
  { left: '78%', delay: 0.17, height: 230, width: 6 },
  { left: '83%', delay: 0.32, height: 160, width: 8 },
  { left: '88%', delay: 0.09, height: 185, width: 5 },
  { left: '93%', delay: 0.2, height: 120, width: 9 },
  { left: '97%', delay: 0.38, height: 200, width: 6 },
];

const SHARDS = Array.from({ length: 30 }, (_, i) => ({
  top: `${10 + (i * 2.7) % 50}%`,
  left: `${(i * 3.3) % 96}%`,
  size: 5 + (i % 8),
  clipPath: i % 3 === 0
    ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
    : i % 3 === 1
      ? 'polygon(0% 0%, 100% 30%, 70% 100%, 10% 80%)'
      : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  delay: ((i * 13) % 20) * 0.01,
  tx: `${((i * 41) % 240) - 120}px`,
  ty: `${60 + ((i * 19) % 150)}px`,
  rot: `${((i * 67) % 720) - 360}deg`,
}));

export default function IceDrop({ onDone }) {
  const [phase, setPhase] = useState('grow'); // grow → drop → shatter → done

  useEffect(() => {
    // 1. Icicles grow for 1.1s
    const t1 = setTimeout(() => setPhase('drop'), 1100);
    // 2. Icicles drop for 0.7s (all icicles completely clear screen)
    const t2 = setTimeout(() => setPhase('shatter'), 1800);
    // 3. Shatter fragments disperse & overlay dissolves, then call onDone
    const t3 = setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, 2500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps — intentionally runs once only

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: phase === 'shatter' ? 'none' : 'all',
        background: 'radial-gradient(ellipse at 50% 0%, #0d2d45 0%, #060f18 100%)',
        opacity: phase === 'shatter' ? 0 : 1,
        transition: phase === 'shatter' ? 'opacity 0.7s ease' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Center wordmark */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        opacity: phase === 'shatter' ? 0 : 1,
        transition: phase === 'shatter' ? 'opacity 0.5s ease' : 'none',
        userSelect: 'none',
      }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          color: 'rgba(111,211,232,0.7)',
          marginBottom: '0.5rem',
          fontFamily: 'system-ui',
        }}>
          WONDER KID OF NIGERIA
        </div>
        <div style={{
          fontFamily: '"Outfit", system-ui, sans-serif',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          textShadow: '0 0 60px rgba(111,211,232,0.4), 0 2px 40px rgba(0,0,0,0.8)',
          animation: 'iceTitlePop 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        }}>
          ICE KING<br />OCHACHO
        </div>
        <div style={{
          marginTop: '1rem',
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #6FD3E8, transparent)',
          margin: '1rem auto 0',
          animation: 'iceLineExpand 0.6s ease 0.8s both',
        }} />
      </div>

      {/* Icicle row at top — strictly only during grow & drop phases, unmounted on shatter */}
      {(phase === 'grow' || phase === 'drop') && ICICLES.map((ic, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: ic.left,
            width: ic.width,
            transformOrigin: 'top center',
            animation: phase === 'grow'
              ? `icicleGrow 0.9s cubic-bezier(0.16,1,0.3,1) ${ic.delay}s both`
              : `icicleDrop 0.55s cubic-bezier(0.55,0,1,0.45) ${ic.delay * 0.3}s forwards`,
          }}
        >
          {/* Icicle body */}
          <div style={{
            width: '100%',
            height: ic.height,
            background: `linear-gradient(
              180deg,
              rgba(180,240,255,0.95) 0%,
              rgba(111,211,232,0.8) 40%,
              rgba(60,170,200,0.6) 75%,
              rgba(111,211,232,0.2) 100%
            )`,
            clipPath: 'polygon(10% 0%, 90% 0%, 75% 85%, 50% 100%, 25% 85%)',
            boxShadow: '0 0 12px rgba(111,211,232,0.5), inset 2px 0 6px rgba(255,255,255,0.3)',
            filter: 'blur(0.2px)',
          }} />
          {/* Drip tip glow */}
          <div style={{
            position: 'absolute',
            bottom: -3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(180,240,255,0.9)',
            boxShadow: '0 0 8px 3px rgba(111,211,232,0.6)',
          }} />
        </div>
      ))}

      {/* Shatter fragments (appear only during shatter phase) */}
      {phase === 'shatter' && SHARDS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: 'rgba(111,211,232,0.8)',
            clipPath: s.clipPath,
            animation: `shardFly 0.7s cubic-bezier(0.16,1,0.3,1) ${s.delay}s forwards`,
            transformOrigin: 'center',
            '--tx': s.tx,
            '--ty': s.ty,
            '--rot': s.rot,
          }}
        />
      ))}

      <style>{`
        @keyframes icicleGrow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        @keyframes icicleDrop {
          from { transform: translateY(0) scaleY(1); opacity: 1; }
          to   { transform: translateY(110vh) scaleY(0.8); opacity: 0; }
        }
        @keyframes iceTitlePop {
          from { opacity: 0; transform: scale(0.85) translateY(12px); filter: blur(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes iceLineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 60px; opacity: 1; }
        }
        @keyframes shardFly {
          from { transform: translate(0,0) rotate(0deg); opacity: 0.9; }
          to   { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
