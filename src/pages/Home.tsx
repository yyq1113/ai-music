import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayerStore, useCollectStore } from '../store';

const MOCK_TRENDING = [
  {
    id: '1',
    title: '霓虹之夜',
    prompt: '城市夜景氛围，合成器贝斯，快节奏',
    style: '电子',
    audioUrl: '',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400&h=400',
    durationMs: 180000,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '空灵森林',
    prompt: '宁静的环境音，自然白噪音，轻柔钢琴，女声',
    style: '环境音乐',
    audioUrl: '',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=400',
    durationMs: 210000,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '都市漂流',
    prompt: 'Lo-Fi 嘻哈节奏，雨天，放松氛围',
    style: '低保真',
    audioUrl: '',
    coverUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400&h=400',
    durationMs: 150000,
    createdAt: new Date().toISOString()
  }
];

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();
  const playTrack = usePlayerStore(state => state.playTrack);
  const { toggleFavorite, isFavorited } = useCollectStore();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/studio', { state: { initialPrompt: prompt } });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight text-textMain">
            AI 音乐<br className="hidden md:block" />
            <span className="text-primary">生成器</span>
          </h1>
          <p className="text-textMuted text-base md:text-lg max-w-xl mx-auto mb-10">
            描述你想要的氛围、流派或感觉，AI 会在几秒钟内制作出高质量曲目。无需任何乐理知识。
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleGenerate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-2xl"
        >
          <div className="flex items-center bg-white border border-surfaceHighlight rounded-xl p-1.5 shadow-sm">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一首用于学习的轻松钢琴曲..."
              className="flex-1 bg-transparent border-none outline-none text-textMain px-4 py-3 text-sm placeholder:text-textMuted"
            />
            <button 
              type="submit"
              disabled={!prompt.trim()}
              className="bg-primary text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap text-sm"
            >
              立即生成
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-textMain">热门生成</h2>
          <button onClick={() => navigate('/explore')} className="text-primary hover:underline text-sm font-medium">查看全部</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_TRENDING.map((track) => {
            const favorited = isFavorited(track.id);
            return (
            <div key={track.id} className="bg-white border border-surfaceHighlight/60 rounded-xl p-3.5 group hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => playTrack(track)}
                    className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-textMain truncate pr-3">{track.title}</h3>
                <button 
                  onClick={() => toggleFavorite(track)}
                  className={`transition-colors flex-shrink-0 ${favorited ? 'text-red-400' : 'text-textMuted hover:text-primary'}`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-textMuted line-clamp-2 mb-2">{track.prompt}</p>
              <span className="px-2 py-0.5 rounded bg-background text-xs font-medium text-textMuted">{track.style}</span>
            </div>
          );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;