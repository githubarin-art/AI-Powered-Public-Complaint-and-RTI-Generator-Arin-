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
               Home
            </Link>
            <Link to="/guided" className={`nav-link ${isActive('/guided')}`}>
               Guided Mode
            </Link>
            <Link to="/assisted" className={`nav-link ${isActive('/assisted')}`}>
               Assisted Mode
            </Link>
            <Link to="/templates" className={`nav-link ${isActive('/templates')}`}>
               Templates
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
                &copy; {new Date().getFullYear()} CivicDraft. Secure & Open Source.
             </p>
          </div>
        </div>
        <div className="container footer-disclaimer">
            <p><strong>Disclaimer:</strong> CivicDraft is an automated document generation tool and does not provide legal advice. We are not a law firm or a government agency. The generated documents are based on standard templates and user input. Users are responsible for verifying the accuracy and legality of the content before submission to any authority.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
