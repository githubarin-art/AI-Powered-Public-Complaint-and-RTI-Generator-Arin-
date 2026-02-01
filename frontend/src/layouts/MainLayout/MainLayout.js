import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Home, ClipboardList, Zap, Heart } from 'lucide-react';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="main-layout">
      <header className="app-header">
        <div className="container header-content">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-wrapper">
               <Scale size={24} color="white" />
            </div>
            <h1>CivicDraft</h1>
          </Link>
          <nav className="main-nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
               <Home size={18} /> Home
            </Link>
            <Link to="/guided" className={`nav-link ${isActive('/guided')}`}>
               <ClipboardList size={18} /> Guided Mode
            </Link>
            <Link to="/assisted" className={`nav-link ${isActive('/assisted')}`}>
               <Zap size={18} /> Assisted Mode
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-content">
        {children}
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <div className="footer-brand">
             <h3>CivicDraft</h3>
             <p>AI-Powered Citizen Empowerment Tool</p>
          </div>
          <div className="footer-links">
             <p className="copyright">
                &copy; {new Date().getFullYear()} Open Source Project. 
             </p>
             <p className="made-with">
                Made with <Heart size={14} fill="currentColor" /> for India
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
