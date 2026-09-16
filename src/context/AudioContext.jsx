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

  const playBeat = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const kick = ctx.createOscillator();
      const kg = ctx.createGain();
      kick.frequency.setValueAtTime(120, t);
      kick.frequency.exponentialRampToValueAtTime(30, t + 0.12);
      kg.gain.setValueAtTime(0.25, t);
      kg.gain.linearRampToValueAtTime(0.001, t + 0.12);
      kick.connect(kg); kg.connect(ctx.destination);
      kick.start(t); kick.stop(t + 0.13);
    } catch (_) {}
  }, []);

  const stopInterval = useCallback(() => {
    if (synthRef.current) { clearInterval(synthRef.current); synthRef.current = null; }
  }, []);

  const pause = useCallback(() => {
    stopInterval();
    setIsPlaying(false);
  }, [stopInterval]);

  const play = useCallback((idx = null) => {
    const targetIdx = idx !== null ? idx : currentIdx;
    initSynth();
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();

    if (idx !== null && idx !== currentIdx) {
      setCurrentIdx(idx);
      const t = tracks[idx];
      if (t) {
        const parts = t.duration.split(':');
        const d = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        setDuration(d);
      }
      setCurrentTime(0);
      timeRef.current = 0;
    }

    stopInterval();
    setIsPlaying(true);

    synthRef.current = setInterval(() => {
      timeRef.current += 0.5;
      const d = tracks[targetIdx] ? (() => {
        const p = tracks[targetIdx].duration.split(':');
        return parseInt(p[0]) * 60 + parseInt(p[1]);
      })() : duration;

      if (timeRef.current >= d) {
        let next;
        if (isShuffleRef.current && tracks.length > 1) {
          const pool = tracks.map((_, i) => i).filter(i => i !== targetIdx);
          next = pool[Math.floor(Math.random() * pool.length)];
        } else {
          next = (targetIdx + 1) % tracks.length;
        }
        setCurrentIdx(next);
        timeRef.current = 0;
        setCurrentTime(0);
        const p2 = tracks[next]?.duration.split(':') || ['2','48'];
        setDuration(parseInt(p2[0]) * 60 + parseInt(p2[1]));
        return;
      }
      setCurrentTime(t => t + 0.5);
      if (Math.floor(timeRef.current * 2) % 2 === 0) playBeat();
    }, 500);
  }, [currentIdx, tracks, duration, initSynth, stopInterval, playBeat]);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause(); else play();
  }, [isPlaying, play, pause]);

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
