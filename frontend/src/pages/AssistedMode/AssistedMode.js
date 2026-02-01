import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FileText, Globe, MessageSquare, RefreshCw, 
  ArrowLeft, Zap, CheckCircle, AlertCircle, PenTool
} from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';
import { generateDraft } from '../../services/draftService';
import ApplicantForm from '../../components/ApplicantForm/ApplicantForm';
import DraftPreview from '../../components/DraftPreview/DraftPreview';
import DownloadPanel from '../../components/DownloadPanel/DownloadPanel';
import ConfidenceNotice from '../../components/ConfidenceNotice/ConfidenceNotice';
import './AssistedMode.css';

const AssistedMode = () => {
  const location = useLocation();
  const prefillData = location.state || {};

  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_address: '',
    applicant_state: '',
    applicant_phone: '',
    applicant_email: '',
    issue_description: prefillData.prefillDescription || '',
    document_type: prefillData.documentType || 'information_request',
    language: prefillData.language || 'english',
    tone: 'neutral'
  });

  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the entire form data to prevent too many API calls
  const debouncedData = useDebounce(formData, 1500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Only generate if we have all minimum required fields
    const hasName = debouncedData.applicant_name && debouncedData.applicant_name.length >= 2;
    const hasAddress = debouncedData.applicant_address && debouncedData.applicant_address.length >= 10;
    const hasState = debouncedData.applicant_state && debouncedData.applicant_state.length >= 2;
    const hasDescription = debouncedData.issue_description && debouncedData.issue_description.length >= 20;
    
    if (hasName && hasAddress && hasState && hasDescription) {
      handleGenerateDraft(debouncedData);
    }
  }, [debouncedData]);

  const handleGenerateDraft = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateDraft(data);
      setDraft(result);
    } catch (err) {
      console.error(err);
      // Handle validation errors differently
      if (err.isValidationError) {
        setError(`Please fill required fields: ${err.validationErrors.join(', ')}`);
      } else {
        setError("Could not update draft. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualRegenerate = () => {
     if (!formData.issue_description) {
        toast.warning("Please describe your issue first.");
        return;
     }
     handleGenerateDraft(formData);
  };

  const handleDraftEdit = (newText) => {
    setDraft(prev => ({ ...prev, draft_text: newText }));
  };

  // Calculate progress
  const getProgress = () => {
    let filled = 0;
    if (formData.applicant_name?.length >= 2) filled++;
    if (formData.applicant_address?.length >= 10) filled++;
    if (formData.applicant_state?.length >= 2) filled++;
    if (formData.issue_description?.length >= 20) filled++;
    return filled;
  };

  const progress = getProgress();
  const progressPercent = (progress / 4) * 100;

  return (
    <div className="assisted-mode-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="header-title-area">
            <div className="header-icon">
              <PenTool size={24} />
            </div>
            <div>
              <h1>Assisted Drafting</h1>
              <p>Write freely in your own words — we format it professionally</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-label">
            <CheckCircle size={16} />
            Completion Progress
          </span>
          <span className="progress-text">{progress}/4 required fields</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {progress === 4 && (
          <div className="progress-complete">
            <CheckCircle size={16} />
            <span>Ready to generate!</span>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="split-view">
          {/* Input Panel */}
          <div className="input-panel">
            <div className="panel-section">
              <div className="section-header-inline">
                <h2>Your Information</h2>
                <span className="section-badge">Step 1</span>
              </div>
              <ApplicantForm 
                data={formData} 
                onChange={(newData) => setFormData(newData)} 
              />
            </div>
            
            <div className="panel-section">
              <div className="section-header-inline">
                <h2>Issue Details</h2>
                <span className="section-badge">Step 2</span>
              </div>
              
              <div className="issue-input-card">
                <label className="input-label-large">
                  <PenTool size={18} className="label-icon" />
                  Describe your issue or request
                  <span className="required-star">*</span>
                </label>
                <p className="input-hint">
                  Include specific details: dates, names, locations, and expected outcome
                </p>
                <div className="ai-textarea-wrapper">
                  <textarea
                    className="form-textarea ai-input"
                    rows="8"
                    placeholder="Example: On 15th March 2024, I visited the Municipal Office to submit my property tax payment. The clerk demanded ₹500 extra for processing despite having an official receipt. I want to report this irregularity and request information about the official fee structure..."
                    value={formData.issue_description}
                    onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
                  />
                  <div className="textarea-footer">
                    <div className={`char-indicator ${formData.issue_description.length >= 20 ? 'valid' : ''}`}>
                      {formData.issue_description.length >= 20 ? (
                        <CheckCircle size={14} />
                      ) : (
                        <AlertCircle size={14} />
                      )}
                      <span>{formData.issue_description.length}/20 min chars</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="controls-grid">
                <div className="control-card">
                  <label className="control-label">
                    <FileText size={16} />
                    Document Type
                  </label>
                  <select 
                    className="form-select-modern"
                    value={formData.document_type}
                    onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                  >
                    <option value="information_request">RTI - Information Request</option>
                    <option value="records_request">RTI - Records Access</option>
                    <option value="inspection_request">RTI - Inspection Request</option>
                    <option value="grievance">Complaint - Grievance</option>
                  </select>
                </div>

                <div className="control-card">
                  <label className="control-label">
                    <Globe size={16} />
                    Language
                  </label>
                  <select 
                    className="form-select-modern"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>

                <div className="control-card">
                  <label className="control-label">
                    <MessageSquare size={16} />
                    Writing Tone
                  </label>
                  <select 
                    className="form-select-modern"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  >
                    <option value="neutral">Neutral</option>
                    <option value="formal">Formal</option>
                    <option value="assertive">Assertive</option>
                  </select>
                </div>
              </div>

              <button 
                className={`generate-btn ${loading ? 'loading' : ''}`} 
                onClick={handleManualRegenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="spin" size={20} />
                    <span>Generating Draft...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Generate Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="preview-panel">
            <div className="preview-header">
              <h2>
                <FileText size={20} />
                Live Preview
              </h2>
              {draft && <span className="preview-badge">Auto-updating</span>}
            </div>

            {error && (
              <div className="error-card">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
            
            {draft ? (
              <div className="draft-content">
                {draft.confidence && (
                  <ConfidenceNotice 
                    level={draft.confidence.level} 
                    explanation={draft.confidence.explanation}
                  />
                )}
                <DraftPreview 
                  draftText={draft.draft_text} 
                  onEdit={handleDraftEdit}
                />
                <div className="download-section">
                  <DownloadPanel draftData={{ ...formData, draft_text: draft.draft_text }} />
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={48} />
                </div>
                <h3>Your Draft Preview</h3>
                <p>Fill in the required fields and your professionally formatted draft will appear here automatically.</p>
                <div className="empty-checklist">
                  <div className={`checklist-item ${formData.applicant_name?.length >= 2 ? 'done' : ''}`}>
                    {formData.applicant_name?.length >= 2 ? <CheckCircle size={16} /> : <span className="bullet" />}
                    Your name
                  </div>
                  <div className={`checklist-item ${formData.applicant_address?.length >= 10 ? 'done' : ''}`}>
                    {formData.applicant_address?.length >= 10 ? <CheckCircle size={16} /> : <span className="bullet" />}
                    Full address
                  </div>
                  <div className={`checklist-item ${formData.applicant_state?.length >= 2 ? 'done' : ''}`}>
                    {formData.applicant_state?.length >= 2 ? <CheckCircle size={16} /> : <span className="bullet" />}
                    State
                  </div>
                  <div className={`checklist-item ${formData.issue_description?.length >= 20 ? 'done' : ''}`}>
                    {formData.issue_description?.length >= 20 ? <CheckCircle size={16} /> : <span className="bullet" />}
                    Issue description (20+ chars)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistedMode;
