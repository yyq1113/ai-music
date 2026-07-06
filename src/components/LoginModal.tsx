import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Zap, User, Shield } from 'lucide-react';
import { useAuthStore } from '../store';
import { UserRole } from '../types';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login({
        id: role === 'admin' ? 'admin-1' : 'u-1',
        name: role === 'admin' ? '管理员' : (email.split('@')[0] || 'User'),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role
      });
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginModalOpen(false)}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-surfaceHighlight/40 overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-textMain">AI音乐</span>
                  </div>
                  <button 
                    onClick={() => setLoginModalOpen(false)}
                    className="text-textMuted hover:text-textMain transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-textMain mb-1">欢迎回来</h2>
                <p className="text-textMuted text-sm mb-6">
                  {role === 'admin' ? '管理员登录，管理平台内容。' : '登录以保存您的灵感与作品'}
                </p>

                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-surfaceHighlight text-textMuted hover:text-textMain'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    用户
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      role === 'admin'
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-surfaceHighlight text-textMuted hover:text-textMain'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    管理员
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1.5">邮箱</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-textMuted" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-surfaceHighlight rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/30 outline-none transition-all text-textMain text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-textMain mb-1.5">密码</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-textMuted" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-surfaceHighlight rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/30 outline-none transition-all text-textMain text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-2"
                  >
                    {role === 'admin' ? '管理员登录' : '登录'}
                  </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-textMuted">
                  还没有账号？ <a href="#" className="text-primary hover:underline font-medium">免费注册</a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;