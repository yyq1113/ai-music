import { create } from 'zustand';
import { Track, User } from '../types';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setTrack: (track: Track) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  setTrack: (track) => set({ currentTrack: track, isPlaying: false }),
}));

interface GeneratorState {
  isGenerating: boolean;
  progress: number;
  startGeneration: () => void;
  updateProgress: (progress: number) => void;
  finishGeneration: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  isGenerating: false,
  progress: 0,
  startGeneration: () => set({ isGenerating: true, progress: 0 }),
  updateProgress: (progress) => set({ progress }),
  finishGeneration: () => set({ isGenerating: false, progress: 100 }),
}));

interface SettingsState {
  sunoModel: string;
  setSunoModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  sunoModel: 'v3.5',
  setSunoModel: (model) => set({ sunoModel: model }),
}));

interface AuthState {
  user: User | null;
  isLoginModalOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoginModalOpen: (isOpen: boolean) => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoginModalOpen: false,
  login: (user) => set({ user, isLoginModalOpen: false }),
  logout: () => set({ user: null }),
  setLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
  isAdmin: () => get().user?.role === 'admin',
}));

interface CollectState {
  favorites: Track[];
  downloads: Track[];
  toggleFavorite: (track: Track) => void;
  addDownload: (track: Track) => void;
  isFavorited: (id: string) => boolean;
  isDownloaded: (id: string) => boolean;
  removeFavorite: (id: string) => void;
}

export const useCollectStore = create<CollectState>((set, get) => ({
  favorites: [],
  downloads: [],
  toggleFavorite: (track) =>
    set((state) => {
      const exists = state.favorites.find((t) => t.id === track.id);
      if (exists) {
        return { favorites: state.favorites.filter((t) => t.id !== track.id) };
      }
      return { favorites: [...state.favorites, track] };
    }),
  addDownload: (track) =>
    set((state) => {
      const exists = state.downloads.find((t) => t.id === track.id);
      if (exists) return state;
      return { downloads: [...state.downloads, track] };
    }),
  isFavorited: (id) => !!get().favorites.find((t) => t.id === id),
  isDownloaded: (id) => !!get().downloads.find((t) => t.id === id),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((t) => t.id !== id),
    })),
}));