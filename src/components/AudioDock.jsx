import { useAudio } from '../context/AudioContext';

function formatTime(seconds) {
  const s = Math.floor(seconds || 0);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

export default function AudioDock() {
  const {
    track,
    isPlaying,
    isShuffle,
    toggleShuffle,
    currentTime,
    duration,
    togglePlay,
    prevTrack,
    nextTrack,
    seekTo,
    primaryStreamingUrl,
  } = useAudio();

  if (!track) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio);
  };

  return (
    <aside className="audio-player-dock" aria-label="Audio Track Preview Player">
      <div className="container audio-dock-inner">
        {/* Track Info (Clicking opens streaming platform directly) */}
        <a
          href={primaryStreamingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="audio-track-info"
          title={`Click to open "${track.title}" on Streaming Platform ↗`}
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <img
            src={track.artwork}
            alt={track.title}
            className="audio-thumb"
            id="dockTrackThumb"
          />
          <div style={{ minWidth: 0 }}>
            <h4
              className="audio-title"
              id="dockTrackTitle"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{track.title}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent-cyan)',
                  opacity: 0.85,
                }}
              >
                ↗
              </span>
            </h4>
            <p className="audio-artist" id="dockTrackArtist">
              {track.featuring ? `Ice King Ochacho ft. ${track.featuring}` : 'Ice King Ochacho'}
              {' '}&bull;{' '}
              <span style={{ color: 'var(--accent-gold)' }}>Stream</span>
            </p>
          </div>
        </a>

        {/* Player Controls */}
        <div className="audio-controls">
          {/* Shuffle Toggle Button */}
          <button
            className="audio-btn-prev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isShuffle ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontSize: '1.05rem',
              transition: 'color 0.15s ease',
              marginRight: '0.2rem',
            }}
            onClick={toggleShuffle}
            title={isShuffle ? 'Shuffle is ON (Click to turn off)' : 'Shuffle is OFF (Click to turn on)'}
            aria-label="Toggle Shuffle"
          >
            🔀
          </button>

          <button
            className="audio-btn-prev"
            id="dockPrevBtn"
            onClick={prevTrack}
            aria-label="Previous Track"
          >
            &#9664;&#9664;
          </button>
          <button
            className={`audio-btn-main${isPlaying ? ' playing' : ''}`}
            id="dockPlayBtn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Track' : 'Play Track'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button
            className="audio-btn-next"
            id="dockNextBtn"
            onClick={nextTrack}
            aria-label="Next Track"
          >
            &#9654;&#9654;
          </button>

          <div className="audio-scrubber-wrap">
            <span className="audio-time" id="dockCurrentTime">
              {formatTime(currentTime)}
            </span>
            <div
              className="audio-progress-bar"
              id="dockProgressBar"
              role="slider"
              aria-label="Audio playback scrubber"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(progressPercent)}
              onClick={handleProgressBarClick}
            >
              <div
                className="audio-progress-fill"
                id="dockProgressFill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="audio-time" id="dockDuration">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Streaming Platform Direct Link */}
        <div className="audio-external-links">
          <a
            href={primaryStreamingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid-cyan btn-sm"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            title="Open track on Spotify / Streaming"
          >
            Stream ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
