import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Mic2, Compass, Library, Zap, Settings, LogOut, Heart, Download, Shield, Server, Users, Music } from 'lucide-react';
import Player from './Player';
import LoginModal from './LoginModal';
import { useAuthStore } from '../store';

const Layout: React.FC = () => {
  const { user, setLoginModalOpen, logout, isAdmin } = useAuthStore();
  const admin = isAdmin();
  
  const navItems = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: '首页' },
    { to: '/studio', icon: <Mic2 className="w-5 h-5" />, label: '创作台' },
    { to: '/explore', icon: <Compass className="w-5 h-5" />, label: '广场' },
    { to: '/favorites', icon: <Heart className="w-5 h-5" />, label: '收藏列表' },
    { to: '/downloads', icon: <Download className="w-5 h-5" />, label: '已下载' },
    { to: '/library', icon: <Library className="w-5 h-5" />, label: '作品库' },
    { to: '/settings', icon: <Settings className="w-5 h-5" />, label: '设置' },
  ];

  const adminNavItems = [
    { to: '/admin/system', icon: <Server className="w-5 h-5" />, label: '系统管理' },
    { to: '/admin/users', icon: <Users className="w-5 h-5" />, label: '用户管理' },
    { to: '/admin/music', icon: <Music className="w-5 h-5" />, label: '音乐管理' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-20 md:w-60 border-r border-surfaceHighlight/60 flex flex-col items-center md:items-start py-6 bg-white z-10 transition-all duration-300">
        <div className="flex items-center gap-3 px-0 md:px-5 mb-10">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block text-lg font-bold text-textMain">
            AI音乐
          </span>
        </div>

        <nav className="flex-1 w-full px-3 md:px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-textMuted hover:text-textMain hover:bg-surfaceHighlight/30'
                }`
              }
            >
              {item.icon}
              <span className="hidden md:block text-sm">{item.label}</span>
            </NavLink>
          ))}

          {admin && (
            <>
              <div className="pt-3 pb-1 mt-2 border-t border-surfaceHighlight/60">
                <span className="hidden md:block px-3 text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">管理面板</span>
              </div>
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-500 font-semibold'
                        : 'text-textMuted hover:text-blue-500 hover:bg-blue-50/50'
                    }`
                  }
                >
                  {item.icon}
                  <span className="hidden md:block text-sm">{item.label}</span>
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="mt-auto w-full px-3 pb-4 space-y-2">
          {user ? (
            <>
              <div className={`w-10 h-10 md:w-full md:h-auto rounded-lg border flex items-center md:p-2.5 gap-2.5 overflow-hidden ${admin ? 'bg-blue-50 border-blue-200' : 'bg-surfaceHighlight/30 border-surfaceHighlight/60'}`}>
                <img 
                  src={user.avatar} 
                  alt="头像" 
                  className="w-9 h-9 rounded-full bg-surfaceHighlight border border-surfaceHighlight flex-shrink-0"
                />
                <div className="hidden md:block overflow-hidden">
                  <p className="text-sm font-semibold text-textMain truncate flex items-center gap-1.5">
                    {user.name}
                    {admin && <Shield className="w-3 h-3 text-blue-500" />}
                  </p>
                  <p className={`text-xs ${admin ? 'text-blue-500 font-medium' : 'text-textMuted'}`}>
                    {admin ? '管理员' : '创作者'}
                  </p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-10 h-10 md:w-full md:h-auto flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-textMuted hover:text-red-500 hover:bg-red-50 transition-all text-sm font-medium"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="hidden md:block">退出登录</span>
              </button>
            </>
          ) : (
            <div 
              onClick={() => setLoginModalOpen(true)}
              className="w-10 h-10 md:w-full md:h-auto rounded-lg bg-surfaceHighlight/20 border border-dashed border-surfaceHighlight flex items-center md:p-2.5 gap-2.5 cursor-pointer hover:bg-surfaceHighlight/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-surfaceHighlight/50 flex items-center justify-center flex-shrink-0">
                <span className="text-textMuted text-sm font-bold">?</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-textMain">未登录</p>
                <p className="text-xs text-primary">点击登录</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="min-h-full pb-24">
          <Outlet />
        </div>
      </main>

      <Player />
      <LoginModal />
    </div>
  );
};

export default Layout;