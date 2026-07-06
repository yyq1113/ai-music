import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import Downloads from './pages/Downloads';
import Library from './pages/Library';
import Settings from './pages/Settings';
import AdminSystem from './pages/AdminSystem';
import AdminUsers from './pages/AdminUsers';
import AdminMusic from './pages/AdminMusic';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin/system" element={<AdminSystem />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/music" element={<AdminMusic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;