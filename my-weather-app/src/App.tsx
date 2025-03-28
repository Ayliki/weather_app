import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Header from './components/Header';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </Router>
);

export default App;
