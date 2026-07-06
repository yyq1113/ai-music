import React from 'react';
import { Play, Heart, Download } from 'lucide-react';
import { usePlayerStore, useCollectStore } from '../store';
import { Track } from '../types';

const MOCK_EXPLORE: Track[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `exp-${i}`,
  title: `社区作品 ${i + 1}`,
  prompt: '这首美妙曲目的生成提示词...',
  style: ['电子', '低保真', '环境音', '爵士'][Math.floor(Math.random() * 4)],
  audioUrl: '',
  coverUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&q=80&w=400&h=400`,
  durationMs: 150000 + Math.random() * 60000,
  createdAt: new Date().toISOString()
}));

const Explore: React.FC = () => {
  const { playTrack } = usePlayerStore();
  const { toggleFavorite, addDownload, isFavorited, isDownloaded } = useCollectStore();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1 text-textMain">探索广场</h1>
        <p className="text-textMuted text-sm">发现社区中大家都在创作什么。</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['热门', '最新', '电子', '环境音', '低保真'].map((tag, i) => (
          <button 
            key={tag}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
              i === 0 ? 'bg-primary text-white' : 'bg-white border border-surfaceHighlight text-textMuted hover:text-textMain'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_EXPLORE.map((track) => {
          const favorited = isFavorited(track.id);
          return (
            <div key={track.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(track); }} 
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${favorited ? 'bg-red-400 text-white' : 'bg-white/80 text-textMain hover:bg-white'}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addDownload(track); }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isDownloaded(track.id) ? 'bg-blue-400 text-white' : 'bg-white/80 text-textMain hover:bg-white'}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button 
                    onClick={() => playTrack(track)}
                    className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-md self-center mb-3"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-textMain truncate">{track.title}</h3>
              <p className="text-xs text-textMuted truncate">{track.style}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;