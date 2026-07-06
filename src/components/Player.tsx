import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../store';

const Player: React.FC = () => {
  const { currentTrack, isPlaying, volume, togglePlay, setVolume } = usePlayerStore();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startAtRef = useRef<number>(0);
  const isSimulatedRef = useRef(true);
  const rafRef = useRef<number>(0);

  const hasAudio = !!currentTrack?.audioUrl;

  const tick = useCallback(() => {
    const el = audioRef.current;
    if (!el || !isSimulatedRef.current) return;

    const elapsed = (Date.now() - startAtRef.current) / 1000;
    const totalSec = currentTrack?.durationMs ? currentTrack.durationMs / 1000 : 180;
    const pct = Math.min((elapsed / totalSec) * 100, 100);
    setProgress(pct);
    setCurrentTime(Math.min(elapsed, totalSec));

    if (pct >= 100) {
      togglePlay();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [currentTrack?.durationMs, togglePlay]);

  const startTick = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    isSimulatedRef.current = true;
    startAtRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopTick = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (!el || isNaN(el.duration)) return;
    isSimulatedRef.current = false;
    cancelAnimationFrame(rafRef.current);
    const pct = (el.currentTime / el.duration) * 100;
    setProgress(pct);
    setCurrentTime(el.currentTime);
  }, []);

  const handleEnded = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setProgress(100);
    togglePlay();
  }, [togglePlay]);

  const handleLoadedData = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.play().then(() => {
        isSimulatedRef.current = false;
        cancelAnimationFrame(rafRef.current);
      }).catch(() => {});
    }
  }, [isPlaying]);

  const handleError = useCallback(() => {
    if (audioRef.current) audioRef.current.src = '';
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !currentTrack) return;

    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setCurrentTime(0);
    isSimulatedRef.current = true;
    startAtRef.current = 0;

    if (currentTrack.audioUrl) {
      el.src = currentTrack.audioUrl;
      el.load();
    } else {
      el.src = '';
    }
  }, [currentTrack?.id]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      if (!currentTrack?.audioUrl) {
        startTick();
      } else if (el.readyState >= 2 && el.duration && !isNaN(el.duration)) {
        el.play().catch(() => {
          startTick();
        });
      } else {
        startTick();
      }
    } else {
      stopTick();
      el.pause();
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const totalSeconds = currentTrack ? currentTrack.durationMs / 1000 : 0;

  return (
    <AnimatePresence>
      {currentTrack && (
        <>
          <audio
            ref={audioRef}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onLoadedData={handleLoadedData}
            onError={handleError}
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[700px] bg-white border border-surfaceHighlight/60 rounded-2xl p-3 flex items-center gap-3 z-50 shadow-lg"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src={currentTrack.coverUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200&h=200"} alt="封面" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="truncate">
                  <h4 className="text-textMain font-semibold text-sm truncate">{currentTrack.title}</h4>
                  <p className="text-xs text-textMuted truncate">{currentTrack.style}</p>
                </div>
                <span className="text-[10px] text-textMuted font-mono ml-2">
                  {formatTime(currentTime)} / {formatTime(totalSeconds)}
                </span>
              </div>
              <div className="h-1 w-full bg-surfaceHighlight/50 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-textMuted hover:text-primary transition-colors"><SkipBack className="w-4 h-4" /></button>
              <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <button className="text-textMuted hover:text-primary transition-colors"><SkipForward className="w-4 h-4" /></button>
            </div>

            <div className="hidden md:flex items-center gap-1.5 w-20">
              <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-textMuted hover:text-primary">
                {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="h-1 flex-1 bg-surfaceHighlight/50 rounded-full cursor-pointer">
                <div className="h-full bg-primary rounded-full" style={{ width: `${volume * 100}%` }} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Player;