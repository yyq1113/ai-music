import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Wand2, Settings2, Loader2, Music, Mic2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeneratorStore, usePlayerStore, useAuthStore } from '../store';
import { Track } from '../types';

const STYLES = ['流行', '电子', '低保真', '古典', '嘻哈', '摇滚', '环境音', '爵士'];
const VOCALS = ['纯伴奏', '女声', '男声', '合唱'];

const Studio: React.FC = () => {
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || '';
  
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedStyle, setSelectedStyle] = useState('电子');
  const [selectedVocal, setSelectedVocal] = useState('纯伴奏');
  const [duration, setDuration] = useState<'short' | 'full'>('short');

  const { isGenerating, progress, startGeneration, updateProgress, finishGeneration } = useGeneratorStore();
  const { playTrack, setTrack } = usePlayerStore();
  const { user, setLoginModalOpen } = useAuthStore();

  const getTitle = (): string => {
    if (prompt.includes('都市')) return '城市夜景';
    if (prompt.includes('学习')) return '放松学习';
    if (prompt.includes('赛博') || prompt.includes('朋克')) return '霓虹之夜';
    if (prompt.includes('钢琴')) return '月光奏鸣';
    if (prompt.includes('雨')) return '窗外的雨';
    if (prompt.includes('海') || prompt.includes('浪')) return '夏日海边';
    if (prompt.includes('安静') || prompt.includes('放松')) return '宁静时光';
    return '即兴创作';
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    startGeneration();
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 3 + 0.5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        finishGeneration();
        const title = getTitle();
        const newTrack: Track = {
          id: Date.now().toString(),
          title,
          prompt,
          style: selectedStyle,
          audioUrl: title === '城市夜景' ? `${import.meta.env.BASE_URL}WeChat_20260626134120.mp4` : '',
          coverUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400&h=400',
          durationMs: duration === 'short' ? 30000 : 180000,
          createdAt: new Date().toISOString()
        };
        setTrack(newTrack);
      } else {
        updateProgress(Math.min(currentProgress, 99));
      }
    }, 500);
  };

  if (!user) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-textMain mb-4">创作台</h2>
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-12 text-center shadow-sm">
          <Mic2 className="w-14 h-14 mx-auto mb-3 text-surfaceHighlight" />
          <h2 className="text-lg font-bold text-textMain mb-1">未登录</h2>
          <p className="text-textMuted text-sm mb-5">登录后即可使用创作台生成专属音乐。</p>
          <button 
            onClick={() => setLoginModalOpen(true)}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-textMain">创作台</h2>
        
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-5 flex-1 flex flex-col shadow-sm">
          <label className="text-sm font-semibold text-textMain mb-1.5">提示词 / 歌词</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想创作的歌曲...（例如：一首轻松的钢琴曲，带有雨声）"
            className="w-full h-40 bg-background/40 border border-surfaceHighlight rounded-lg p-3 text-textMain text-sm resize-none outline-none focus:border-primary transition-colors"
          />

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setDuration('short')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${duration === 'short' ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background text-textMuted border border-surfaceHighlight hover:text-textMain'}`}
              >
                短片段 (30秒)
              </button>
              <button 
                onClick={() => setDuration('full')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${duration === 'full' ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-background text-textMuted border border-surfaceHighlight hover:text-textMain'}`}
              >
                完整版 (3分钟)
              </button>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap transition-all text-sm"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" />生成中...</>
              ) : (
                <><Wand2 className="w-4 h-4" />开始生成</>
              )}
            </button>
          </div>

          <AnimatePresence>
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="flex justify-between text-sm text-primary font-medium mb-1.5">
                  <span>处理音频中...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-surfaceHighlight/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 h-10">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary/40 rounded-full"
                      animate={{ height: ['20%', '100%', '20%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-72 flex flex-col gap-5">
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Settings2 className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-textMain text-sm">生成设置</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-textMain mb-2 block">音乐流派</label>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                      selectedStyle === style 
                        ? 'bg-primary/10 text-primary border border-primary/30 font-medium' 
                        : 'bg-background text-textMuted border border-surfaceHighlight hover:text-textMain'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-textMain mb-2 block">人声类型</label>
              <div className="grid grid-cols-2 gap-1.5">
                {VOCALS.map(vocal => (
                  <button
                    key={vocal}
                    onClick={() => setSelectedVocal(vocal)}
                    className={`px-2.5 py-1.5 rounded-md text-xs text-center transition-all ${
                      selectedVocal === vocal 
                        ? 'bg-primary/10 text-primary border border-primary/30 font-medium' 
                        : 'bg-background text-textMuted border border-surfaceHighlight hover:text-textMain'
                    }`}
                  >
                    {vocal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-5 flex-1 flex flex-col items-center justify-center text-center shadow-sm">
          <Music className="w-10 h-10 text-surfaceHighlight mb-3" />
          <p className="text-xs text-textMuted">生成的曲目将立即出现在全局播放器中。</p>
        </div>
      </div>
    </div>
  );
};

export default Studio;