import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  FileCheck, 
  Scale,
  CheckCircle2,
  ArrowRight,
  Layers,
  GitBranch,
  Users,
  Lock,
  AlertTriangle,
  BookOpen,
  ClipboardList,
  Sparkles,
  XCircle
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="system-badge">
              <Shield size={14} />
              <span>Rule-Based Civic Drafting System</span>
            </div>
            
            <h1 className="hero-title">
              Draft RTI Applications Using<br />
              Enforced Legal Structure
            </h1>
            
            <p className="hero-subtitle">
              CivicDraft generates legally compliant RTI applications and public complaints 
              through deterministic rule validation — not generative AI guesswork. 
              Every draft follows the structure mandated by the RTI Act, 2005.
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/guided')}
              >
                <ClipboardList size={18} />
                Start Guided Draft
              </button>
              <Link to="/templates" className="btn btn-secondary">
                <BookOpen size={18} />
                View RTI Structure
              </Link>
            </div>

            <div className="hero-guarantees">
              <div className="guarantee-item">
                <CheckCircle2 size={16} />
                <span>Section 6(1) Compliant</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} />
                <span>Authority Auto-Resolved</span>
              </div>
              <div className="guarantee-item">
                <CheckCircle2 size={16} />
                <span>No Data Stored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TWO-LAYER SYSTEM ===== */}
      <section className="system-section">
        <div className="container">
          <div className="section-header">
            <h2>How This System Works</h2>
            <p className="section-description">
              CivicDraft operates on a two-layer architecture. The rule engine is authoritative; 
              AI assistance is optional and subordinate.
            </p>
          </div>

          <div className="two-layer-grid">
            {/* Rule Engine Layer */}
            <div className="layer-card layer-primary">
              <div className="layer-badge">Core Layer</div>
              <div className="layer-icon">
                <Scale size={28} />
              </div>
              <h3>Rule-Based Engine</h3>
              <p>
                All legal structure, authority mapping, and compliance checks are enforced 
                by deterministic rules — not learned from data.
              </p>
              <ul className="layer-features">
                <li>
                  <FileCheck size={16} />
                  <span>Validates against RTI Act Section 6(1) requirements</span>
                </li>
                <li>
                  <GitBranch size={16} />
                  <span>Maps issues to correct Public Information Officers</span>
                </li>
                <li>
                  <Shield size={16} />
                  <span>Enforces canonical document structure</span>
                </li>
              </ul>
              <div className="layer-status">
                <span className="status-dot active"></span>
                Always Active
              </div>
            </div>

            {/* AI Layer */}
            <div className="layer-card layer-secondary">
              <div className="layer-badge">Support Layer</div>
              <div className="layer-icon">
                <Sparkles size={28} />
              </div>
              <h3>AI Assistance (Optional)</h3>
              <p>
                Language model suggestions for clarity and tone. 
                AI cannot modify legal structure or override rule decisions.
              </p>
              <ul className="layer-features">
                <li>
                  <CheckCircle2 size={16} />
                  <span>Improves grammar and readability</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Suggests formal tone adjustments</span>
                </li>
                <li>
                  <XCircle size={16} className="text-muted" />
                  <span className="text-muted">Cannot change legal sections or authority</span>
                </li>
              </ul>
              <div className="layer-status">
                <span className="status-dot optional"></span>
                User-Controlled
              </div>
            </div>
          </div>

          <div className="system-note">
            <AlertTriangle size={16} />
            <span>
              <strong>Important:</strong> AI suggestions pass through rule-based revalidation 
              before being included in any draft. The system rejects changes that violate compliance.
            </span>
          </div>
        </div>
      </section>

      {/* ===== DETERMINISTIC FLOW ===== */}
      <section className="flow-section">
        <div className="container">
          <div className="section-header">
            <h2>The Drafting Process</h2>
            <p className="section-description">
              A transparent, step-by-step process with no hidden logic.
            </p>
          </div>

          <div className="flow-steps">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Input</h4>
                <p>You describe your issue in plain language</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Validation</h4>
                <p>Rules check completeness and classify intent</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Canonical Draft</h4>
                <p>System generates compliant structure</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            
            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>AI Polish</h4>
                <p>Optional language enhancement</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            
            <div className="flow-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Revalidation</h4>
                <p>Final compliance check before output</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODES OF USE ===== */}
      <section className="modes-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Drafting Mode</h2>
            <p className="section-description">
              Both modes use the same rule engine. The difference is input method and AI involvement.
            </p>
          </div>

          <div className="modes-grid">
            <div className="mode-card" onClick={() => navigate('/guided')}>
              <div className="mode-header">
                <div className="mode-icon">
                  <ClipboardList size={24} />
                </div>
                <div className="mode-tag">Recommended</div>
              </div>
              <h3>Guided Mode</h3>
              <p className="mode-description">
                Answer structured questions. The system builds your draft from validated inputs. 
                No AI involved — pure rule-based generation.
              </p>
              <ul className="mode-details">
                <li>Step-by-step questionnaire</li>
                <li>Explicit field validation</li>
                <li>100% deterministic output</li>
                <li>Best for first-time users</li>
              </ul>
              <div className="mode-action">
                <span>Start Guided Draft</span>
                <ArrowRight size={16} />
              </div>
            </div>

            <div className="mode-card" onClick={() => navigate('/assisted')}>
              <div className="mode-header">
                <div className="mode-icon">
                  <Layers size={24} />
                </div>
                <div className="mode-tag secondary">Advanced</div>
              </div>
              <h3>Assisted Mode</h3>
              <p className="mode-description">
                Write freely, and the system extracts structured data. 
                Optional AI enhancement for language polish only.
              </p>
              <ul className="mode-details">
                <li>Free-text input</li>
                <li>Auto-extraction of entities</li>
                <li>Optional AI language polish</li>
                <li>For users who know what to say</li>
              </ul>
              <div className="mode-action">
                <span>Start Assisted Draft</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIMITATIONS ===== */}
      <section className="limitations-section">
        <div className="container">
          <div className="section-header">
            <h2>What This Platform Does Not Do</h2>
            <p className="section-description">
              Transparency about limitations builds trust.
            </p>
          </div>

          <div className="limitations-grid">
            <div className="limitation-item">
              <XCircle size={20} />
              <div>
                <strong>Does not provide legal advice</strong>
                <p>This is a drafting tool, not a lawyer. Consult legal counsel for complex matters.</p>
              </div>
            </div>
            <div className="limitation-item">
              <XCircle size={20} />
              <div>
                <strong>Does not file applications for you</strong>
                <p>You must submit the generated draft to the appropriate authority yourself.</p>
              </div>
            </div>
            <div className="limitation-item">
              <XCircle size={20} />
              <div>
                <strong>Does not guarantee response from authorities</strong>
                <p>Compliance with format does not guarantee government action.</p>
              </div>
            </div>
            <div className="limitation-item">
              <XCircle size={20} />
              <div>
                <strong>Does not use AI for legal decisions</strong>
                <p>AI assists with language only. All legal structure is rule-determined.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO THIS IS FOR ===== */}
      <section className="audience-section">
        <div className="container">
          <div className="section-header">
            <h2>Who This Is For</h2>
          </div>

          <div className="audience-grid">
            <div className="audience-item">
              <Users size={20} />
              <h4>Citizens</h4>
              <p>File RTI applications without needing legal expertise or expensive consultants.</p>
            </div>
            <div className="audience-item">
              <BookOpen size={20} />
              <h4>Journalists</h4>
              <p>Quickly draft information requests for investigative work.</p>
            </div>
            <div className="audience-item">
              <Scale size={20} />
              <h4>Legal Aid Organizations</h4>
              <p>Help clients draft compliant applications at scale.</p>
            </div>
            <div className="audience-item">
              <GitBranch size={20} />
              <h4>Civic Technologists</h4>
              <p>Study or extend a transparent, rule-based civic system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST & TRANSPARENCY ===== */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <Scale size={24} />
              </div>
              <h4>Explainable Decisions</h4>
              <p>
                Every authority mapping and document structure decision can be traced 
                to specific rules — not opaque model weights.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <Lock size={24} />
              </div>
              <h4>Privacy-First Design</h4>
              <p>
                No account required. No data stored after session. 
                Your civic actions remain private.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <Shield size={24} />
              </div>
              <h4>Open Rule Logic</h4>
              <p>
                The rule engine logic is auditable. 
                No hidden prompt engineering or unexplainable AI behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Draft Your Application?</h2>
            <p>
              Start with Guided Mode for a structured, step-by-step experience. 
              No account needed.
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/guided')}
            >
              <ClipboardList size={20} />
              Begin Guided Draft
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
