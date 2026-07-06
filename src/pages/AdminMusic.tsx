import React from 'react';
import { Music, Trash2, ExternalLink } from 'lucide-react';

const MOCK_TRACKS = [
  { id: '1', title: '城市夜景', author: '音乐爱好者', style: '电子', plays: 28, status: '已发布' },
  { id: '2', title: '霓虹之夜', author: '创作大师', style: '合成器波', plays: 16, status: '已发布' },
  { id: '3', title: '违规内容示例', author: 'spam_bot', style: '电子', plays: 3, status: '已下架' },
  { id: '4', title: '空灵森林', author: '创作大师', style: '环境音乐', plays: 21, status: '已发布' },
  { id: '5', title: '放松学习', author: '音乐爱好者', style: '低保真', plays: 35, status: '已发布' },
];

const AdminMusic: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2.5 mb-8">
        <Music className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-textMain">音乐管理</h1>
      </div>

      <div className="bg-white border border-surfaceHighlight/60 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surfaceHighlight/60 text-textMuted text-xs bg-background/50">
              <th className="font-semibold p-3">曲目</th>
              <th className="font-semibold p-3 hidden md:table-cell">作者</th>
              <th className="font-semibold p-3 hidden md:table-cell">流派</th>
              <th className="font-semibold p-3">播放量</th>
              <th className="font-semibold p-3">状态</th>
              <th className="font-semibold p-3 w-24 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRACKS.map((t) => (
              <tr key={t.id} className="border-b border-surfaceHighlight/40 hover:bg-surfaceHighlight/20 text-sm">
                <td className="p-3 font-semibold text-textMain">{t.title}</td>
                <td className="p-3 text-textMuted hidden md:table-cell">{t.author}</td>
                <td className="p-3 text-textMuted hidden md:table-cell">{t.style}</td>
                <td className="p-3 text-textMuted">{t.plays.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.status === '已发布' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="text-textMuted hover:text-primary transition-colors p-1" title="查看">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="text-textMuted hover:text-red-400 transition-colors p-1" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMusic;