import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Github, 
  Lock, 
  FileText,
  CheckCircle,
  Users,
  Globe,
  BookOpen,
  Scale,
  Clock
} from 'lucide-react';
import './Home.css';

const Home = () => {
  // Page refreshed
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scale size={24} />,
      title: 'Legal Compliance',
      description: 'All templates follow RTI Act 2005 guidelines'
    },
    {
      icon: <Clock size={24} />,
      title: 'Save Time',
      description: 'Generate professional documents in minutes'
    },
    {
      icon: <Globe size={24} />,
      title: 'Bilingual Support',
      description: 'Available in English and Hindi'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Educational',
      description: 'Learn RTI filing process step by step'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>Official Civic Tech Platform</span>
        </div>
        
        <h1 className="hero-title">
          Draft Your RTI Applications
          <br />& Public Complaints
        </h1>
        
        <p className="hero-subtitle">
          Empowering citizens to exercise their Right to Information. 
          Create legally-compliant documents in minutes.
        </p>

        <div className="hero-actions">
          <button 
            className="btn btn-hero-primary"
            onClick={() => navigate('/guided')}
          >
            <ClipboardList size={20} />
            Start Free Draft
            <ArrowRight size={18} />
          </button>
          <Link to="/templates" className="btn btn-hero-secondary">
            <FileText size={20} />
            View Templates
          </Link>
        </div>
      </section>

      {/* Mode Selection */}
      <section className="modes-section">
        <div className="section-header">
          <h2>Choose Your Mode</h2>
          <p>Select the approach that works best for you</p>
        </div>

        <div className="mode-cards">
          <div className="mode-card guided-card">
            <div className="mode-card-header">
              <div className="mode-icon guided-icon">
                <ClipboardList size={28} />
              </div>
              <span className="mode-badge recommended">Recommended</span>
            </div>
            
            <h3>Guided Mode</h3>
            <p className="mode-description">
              Perfect for first-time users. Answer simple questions and get a professionally formatted document.
            </p>
            
            <ul className="mode-features">
              <li><CheckCircle size={16} /> Step-by-step questionnaire</li>
              <li><CheckCircle size={16} /> No legal knowledge required</li>
              <li><CheckCircle size={16} /> Auto-fill department addresses</li>
              <li><CheckCircle size={16} /> Built-in validation</li>
            </ul>
            
            <button 
              className="btn btn-mode-primary"
              onClick={() => navigate('/guided')}
            >
              Start Guided Mode
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mode-card assisted-card">
            <div className="mode-card-header">
              <div className="mode-icon assisted-icon">
                <Zap size={28} />
              </div>
              <span className="mode-badge advanced">Advanced</span>
            </div>
            
            <h3>Assisted Mode</h3>
            <p className="mode-description">
              For experienced users. Write your complaint freely and let the system format it professionally.
            </p>
            
            <ul className="mode-features">
              <li><CheckCircle size={16} /> Free-text input</li>
              <li><CheckCircle size={16} /> Real-time suggestions</li>
              <li><CheckCircle size={16} /> Live preview</li>
              <li><CheckCircle size={16} /> Smart legal formatting</li>
            </ul>
            
            <button 
              className="btn btn-mode-secondary"
              onClick={() => navigate('/assisted')}
            >
              Start Assisted Mode
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Use This Tool?</h2>
          <p>Built for Indian citizens, by the community</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-card">
            <ShieldCheck size={32} className="trust-icon" />
            <h4>100% Secure</h4>
            <p>Your data never leaves your browser. No server storage.</p>
          </div>
          
          <div className="trust-card">
            <Github size={32} className="trust-icon" />
            <h4>Open Source</h4>
            <p>Fully transparent. Audit the code on GitHub.</p>
          </div>
          
          <div className="trust-card">
            <Lock size={32} className="trust-icon" />
            <h4>Privacy First</h4>
            <p>No tracking, no cookies, no personal data collection.</p>
          </div>
          
          <div className="trust-card">
            <Users size={32} className="trust-icon" />
            <h4>Community Driven</h4>
            <p>Built and maintained by civic tech enthusiasts.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to File Your RTI?</h2>
          <p>Join thousands of citizens exercising their Right to Information</p>
          <button 
            className="btn btn-cta"
            onClick={() => navigate('/guided')}
          >
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
