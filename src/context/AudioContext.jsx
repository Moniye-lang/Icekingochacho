import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { releases } from '../data/releases.js';

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(168);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioCtxRef = useRef(null);
  const synthRef = useRef(null);
  const timeRef = useRef(0);
  const isShuffleRef = useRef(isShuffle);

  const tracks = releases;

  // Sync timeRef & isShuffleRef with state
  useEffect(() => { timeRef.current = currentTime; }, [currentTime]);
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);

  const initSynth = useCallback(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtxRef.current = new AC();
    }
  }, []);

  const playBeat = useCallback(() => {}, []);

  const stopInterval = useCallback(() => {
    if (synthRef.current) { clearInterval(synthRef.current); synthRef.current = null; }
  }, []);

  const pause = useCallback(() => {
    stopInterval();
    setIsPlaying(false);
  }, [stopInterval]);

  const play = useCallback(() => {
    // Audio playback disabled on site; all song listening directs to /music & external platforms
  }, []);

  const togglePlay = useCallback(() => {}, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const prevTrack = useCallback(() => {
    let idx;
    if (isShuffle && tracks.length > 1) {
      const pool = tracks.map((_, i) => i).filter(i => i !== currentIdx);
      idx = pool[Math.floor(Math.random() * pool.length)];
    } else {
      idx = (currentIdx - 1 + tracks.length) % tracks.length;
    }
    play(idx);
  }, [currentIdx, tracks, isShuffle, play]);

  const nextTrack = useCallback(() => {
    let idx;
    if (isShuffle && tracks.length > 1) {
      const pool = tracks.map((_, i) => i).filter(i => i !== currentIdx);
      idx = pool[Math.floor(Math.random() * pool.length)];
    } else {
      idx = (currentIdx + 1) % tracks.length;
    }
    play(idx);
  }, [currentIdx, tracks, isShuffle, play]);

  const seekTo = useCallback((ratio) => {
    const t = ratio * duration;
    timeRef.current = t;
    setCurrentTime(t);
  }, [duration]);

  const playTrackById = useCallback((id) => {
    const idx = tracks.findIndex(t => t.id === id);
    if (idx !== -1) play(idx);
  }, [tracks, play]);

  const currentTrack = tracks[currentIdx];
  const primaryStreamingUrl = currentTrack?.platforms?.[0]?.url || 'https://open.spotify.com/artist/icekingochacho';

  return (
    <AudioCtx.Provider value={{
      track: currentTrack,
      tracks,
      currentIdx,
      isPlaying,
      isShuffle,
      toggleShuffle,
      currentTime,
      duration,
      togglePlay,
      prevTrack,
      nextTrack,
      seekTo,
      playTrackById,
      primaryStreamingUrl,
    }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
