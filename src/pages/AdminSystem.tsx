import React from 'react';
import { Shield, Users, Music, Server, Activity, HardDrive } from 'lucide-react';

const AdminSystem: React.FC = () => {
  const stats = [
    { icon: <Server className="w-5 h-5" />, label: '服务器状态', value: '运行中', color: 'text-green-500' },
    { icon: <Activity className="w-5 h-5" />, label: 'API 调用次数', value: '47', color: 'text-blue-500' },
    { icon: <HardDrive className="w-5 h-5" />, label: '存储使用', value: '128 MB / 2 GB', color: 'text-amber-500' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2.5 mb-8">
        <Shield className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-textMain">系统管理</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-surfaceHighlight/60 rounded-xl p-5 shadow-sm">
            <div className={`${s.color} mb-2`}>{s.icon}</div>
            <p className="text-xs text-textMuted mb-1">{s.label}</p>
            <p className="text-lg font-bold text-textMain">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-surfaceHighlight/60 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-textMain mb-4">系统日志</h2>
        <div className="space-y-3">
          {[
            { time: '10:32', text: '音乐生成任务 #4821 完成', type: 'info' },
            { time: '10:15', text: '新用户 Alex 注册成功', type: 'success' },
            { time: '09:48', text: '服务器自动备份完成', type: 'info' },
            { time: '09:30', text: 'API 速率限制触发预警', type: 'warn' },
            { time: '08:00', text: '系统例行维护开始', type: 'info' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-surfaceHighlight/40 last:border-none">
              <span className="text-textMuted text-xs font-mono w-12">{log.time}</span>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${log.type === 'warn' ? 'bg-amber-400' : log.type === 'success' ? 'bg-green-400' : 'bg-blue-400'}`} />
              <span className="text-textMain">{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSystem;