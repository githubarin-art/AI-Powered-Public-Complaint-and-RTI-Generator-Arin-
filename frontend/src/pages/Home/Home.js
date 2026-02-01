import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Zap, ArrowRight, ShieldCheck, Github, Lock } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container home-page">
      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Public Complaint & RTI Generator</h1>
        <p className="subtitle">
          Empowering citizens to file effective Right to Information applications and public complaints using AI.
        </p>
      </div>

      <div className="mode-selection">
        <div className="mode-card guided">
          <div className="card-content">
            <div className="icon-wrapper primary-icon">
              <ClipboardList size={40} />
            </div>
            <h2>Guided Mode</h2>
            <p>Best for beginners. Answer simple questions step-by-step to generate your document.</p>
            <ul className="features-list">
              <li>Step-by-step questionnaire</li>
              <li>No legal knowledge required</li>
              <li>Auto-formatting included</li>
            </ul>
          </div>
          <button 
            className="btn btn-primary btn-block action-btn"
            onClick={() => navigate('/guided')}
          >
            Start Guided Mode <ArrowRight size={18} />
          </button>
        </div>

        <div className="mode-card assisted">
          <div className="card-content">
             <div className="icon-wrapper warning-icon">
              <Zap size={40} />
            </div>
            <h2>Assisted Mode</h2>
            <p>For advanced users. Write freely and let AI format and refine your draft.</p>
            <ul className="features-list">
              <li>Free-text input method</li>
              <li>Real-time drafting feedback</li>
              <li>Smart legal suggestions</li>
            </ul>
          </div>
          <button 
            className="btn btn-secondary btn-block action-btn"
            onClick={() => navigate('/assisted')}
          >
            Start Assisted Mode <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-item">
          <ShieldCheck size={24} className="trust-icon" />
          <div>
            <h4>Secure Data</h4>
            <p>Your data stays local and private</p>
          </div>
        </div>
        <div className="trust-item">
          <Github size={24} className="trust-icon" />
          <div>
            <h4>Open Source</h4>
            <p>Transparent and community driven</p>
          </div>
        </div>
        <div className="trust-item">
          <Lock size={24} className="trust-icon" />
          <div>
            <h4>Privacy Focused</h4>
            <p>No personal tracking or storage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
