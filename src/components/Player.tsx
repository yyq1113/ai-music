import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../store';

const Player: React.FC = () => {
  const { currentTrack, isPlaying, volume, togglePlay, setVolume } = usePlayerStore();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedBeforeRef = useRef<number>(0);
  const hasRealAudio = useRef(false);

  const updateFromAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    hasRealAudio.current = true;
    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(pct);
    setCurrentTime(audio.currentTime);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.addEventListener('timeupdate', updateFromAudio);
      audio.addEventListener('ended', () => {
        setProgress(100);
        togglePlay();
      });
      audioRef.current = audio;
    }
  }, [updateFromAudio, togglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrack) {
      hasRealAudio.current = false;
      setProgress(0);
      setCurrentTime(0);
      elapsedBeforeRef.current = 0;
      startTimeRef.current = 0;
      audio.src = currentTrack.audioUrl || '';
      audio.currentTime = 0;
      if (isPlaying && currentTrack.audioUrl) {
        audio.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      if (hasRealAudio.current && audio.duration && !isNaN(audio.duration)) {
        audio.play().catch(() => {});
      } else if (!hasRealAudio.current) {
        startTimeRef.current = Date.now();
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!isPlaying || !currentTrack || hasRealAudio.current) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const totalSec = currentTrack.durationMs / 1000;
      const pct = Math.min((elapsed / totalSec) * 100, 100);
      setProgress(pct);
      setCurrentTime(Math.min(elapsed, totalSec));
      if (pct >= 100) {
        togglePlay();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, togglePlay]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const totalSeconds = currentTrack ? currentTrack.durationMs / 1000 : 0;

  return (
    <AnimatePresence>
      {currentTrack && (
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
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
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
      )}
    </AnimatePresence>
  );
};

export default Player;