import { pressData } from '../data/press.js';

export default function Ticker() {
  const stages = pressData.sharedStages || [];
  // Duplicate for seamless infinite marquee
  const displayList = [...stages, ...stages, ...stages, ...stages];

  return (
    <aside className="ticker-container" aria-label="Shared Stages Performance Roster">
      <div className="ticker-header">Shared Major Stages With</div>
      <div className="ticker-track" id="sharedStagesTrack">
        {displayList.map((artist, i) => (
          <span key={i} className="ticker-item">
            {artist}
            <span className="ticker-separator" aria-hidden="true">★</span>
          </span>
        ))}
      </div>
    </aside>
  );
}
