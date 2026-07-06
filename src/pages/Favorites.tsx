import React from 'react';
import { Play, Heart, Music } from 'lucide-react';
import { usePlayerStore, useAuthStore, useCollectStore } from '../store';

const Favorites: React.FC = () => {
  const { playTrack, currentTrack, isPlaying } = usePlayerStore();
  const { user, setLoginModalOpen } = useAuthStore();
  const { favorites, removeFavorite, isFavorited } = useCollectStore();

  if (!user) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2 text-textMain">收藏列表</h1>
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-12 text-center shadow-sm mt-4">
          <Heart className="w-14 h-14 mx-auto mb-3 text-surfaceHighlight" />
          <h2 className="text-lg font-bold text-textMain mb-1">未登录</h2>
          <p className="text-textMuted text-sm mb-5">登录后即可查看您的收藏列表。</p>
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
      <div className="flex items-center gap-2 mb-1">
        <Heart className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold text-textMain">收藏列表</h1>
      </div>
      <p className="text-textMuted text-sm mb-6">你收藏的曲目，随时回味。</p>

      {favorites.length === 0 ? (
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-12 text-center shadow-sm">
          <Music className="w-14 h-14 mx-auto mb-3 text-surfaceHighlight" />
          <p className="text-textMuted">还没有收藏任何曲目。去广场逛逛吧！</p>
        </div>
      ) : (
        <div className="bg-white border border-surfaceHighlight/60 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surfaceHighlight/60 text-textMuted text-xs bg-background/50">
                <th className="font-semibold p-3 w-10">#</th>
                <th className="font-semibold p-3">标题</th>
                <th className="font-semibold p-3 hidden md:table-cell">流派</th>
                <th className="font-semibold p-3 w-16 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((track, i) => {
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
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => removeFavorite(track.id)}
                        className="text-textMuted/60 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favorites;