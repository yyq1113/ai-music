import React from 'react';
import { Play, MoreVertical, Clock, Music } from 'lucide-react';
import { usePlayerStore, useAuthStore } from '../store';

const MOCK_LIBRARY = [
  {
    id: 'lib-1',
    title: '城市夜景',
    prompt: '合成器贝斯，快节奏，都市氛围',
    style: '电子',
    audioUrl: '',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=100&h=100',
    durationMs: 180000,
    createdAt: new Date().toISOString()
  },
  {
    id: 'lib-2',
    title: '放松学习',
    prompt: '适合学习的轻音乐，雨声',
    style: '低保真',
    audioUrl: '',
    coverUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=100&h=100',
    durationMs: 150000,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const Library: React.FC = () => {
  const { playTrack, currentTrack, isPlaying } = usePlayerStore();
  const { user, setLoginModalOpen } = useAuthStore();

  if (!user) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2 text-textMain">我的作品库</h1>
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-12 text-center shadow-sm mt-4">
          <Music className="w-14 h-14 mx-auto mb-3 text-surfaceHighlight" />
          <h2 className="text-lg font-bold text-textMain mb-1">未登录</h2>
          <p className="text-textMuted text-sm mb-5">登录后即可查看并管理您的生成作品。</p>
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-1 text-textMain">我的作品库</h1>
      <p className="text-textMuted text-sm mb-6">你生成的杰作。</p>

      <div className="bg-white border border-surfaceHighlight/60 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surfaceHighlight/60 text-textMuted text-xs bg-background/50">
              <th className="font-semibold p-3 w-10">#</th>
              <th className="font-semibold p-3">标题</th>
              <th className="font-semibold p-3 hidden md:table-cell">流派</th>
              <th className="font-semibold p-3 hidden lg:table-cell">日期</th>
              <th className="font-semibold p-3 w-20 text-right"><Clock className="w-3.5 h-3.5 inline-block" /></th>
              <th className="font-semibold p-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LIBRARY.map((track, i) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <tr 
                  key={track.id} 
                  className={`group border-b border-surfaceHighlight/40 hover:bg-surfaceHighlight/20 transition-colors ${isCurrent ? 'bg-primary/5' : ''}`}
                >
                  <td className="p-3 text-textMuted text-sm">
                    <div className="w-5 flex justify-center">
                      {isCurrent && isPlaying ? (
                        <Music className="w-3.5 h-3.5 text-primary animate-bounce" />
                      ) : (
                        <span className="group-hover:hidden">{i + 1}</span>
                      )}
                      <button 
                        className={`hidden group-hover:block ${isCurrent ? 'text-primary' : 'text-textMuted hover:text-primary'}`}
                        onClick={() => playTrack(track)}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={track.coverUrl} alt={track.title} className="w-9 h-9 rounded-md object-cover" />
                      <div>
                        <p className={`font-semibold text-sm ${isCurrent ? 'text-primary' : 'text-textMain'}`}>{track.title}</p>
                        <p className="text-xs text-textMuted line-clamp-1">{track.prompt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-sm text-textMuted">
                    <span className="px-2 py-0.5 bg-surfaceHighlight/30 rounded text-xs">{track.style}</span>
                  </td>
                  <td className="p-3 hidden lg:table-cell text-sm text-textMuted">
                    {new Date(track.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm text-textMuted text-right font-mono text-xs">
                    {Math.floor(track.durationMs / 60000)}:{String(Math.floor((track.durationMs % 60000) / 1000)).padStart(2, '0')}
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-textMuted/60 hover:text-textMain opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {MOCK_LIBRARY.length === 0 && (
          <div className="p-12 text-center text-textMuted">
            <Music className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">你的作品库是空的。开始生成一些曲目吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;