import React from 'react';
import { Users, Search, MoreVertical } from 'lucide-react';

const MOCK_USERS = [
  { id: '1', name: '音乐爱好者', email: 'user@example.com', joinedAt: '2026-06-20', tracks: 12, status: '正常' },
  { id: '2', name: '创作大师', email: 'creator@example.com', joinedAt: '2026-06-18', tracks: 33, status: '正常' },
  { id: '3', name: '新用户', email: 'newbie@example.com', joinedAt: '2026-06-25', tracks: 2, status: '正常' },
  { id: '4', name: 'spam_bot', email: 'spam@fake.com', joinedAt: '2026-06-24', tracks: 0, status: '已禁用' },
];

const AdminUsers: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2.5 mb-8">
        <Users className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-textMain">用户管理</h1>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-textMuted" />
          </div>
          <input
            type="text"
            placeholder="搜索用户..."
            className="w-full pl-10 pr-3 py-2 border border-surfaceHighlight rounded-lg bg-white text-textMain text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white border border-surfaceHighlight/60 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surfaceHighlight/60 text-textMuted text-xs bg-background/50">
              <th className="font-semibold p-3">用户名</th>
              <th className="font-semibold p-3 hidden md:table-cell">邮箱</th>
              <th className="font-semibold p-3 hidden lg:table-cell">注册时间</th>
              <th className="font-semibold p-3">生成数</th>
              <th className="font-semibold p-3">状态</th>
              <th className="font-semibold p-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="border-b border-surfaceHighlight/40 hover:bg-surfaceHighlight/20 text-sm">
                <td className="p-3 font-semibold text-textMain">{u.name}</td>
                <td className="p-3 text-textMuted hidden md:table-cell">{u.email}</td>
                <td className="p-3 text-textMuted hidden lg:table-cell">{u.joinedAt}</td>
                <td className="p-3 text-textMuted">{u.tracks}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.status === '正常' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="text-textMuted hover:text-textMain transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;