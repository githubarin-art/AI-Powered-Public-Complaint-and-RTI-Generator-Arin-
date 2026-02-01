import React, { useRef } from 'react';
import { FileText, Edit3 } from 'lucide-react';
import './DraftPreview.css';

const DraftPreview = ({ draftText, onEdit }) => {
  const textareaRef = useRef(null);

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="draft-preview">
      <div className="preview-header">
        <h3><FileText size={20} /> Document Preview</h3>
        <button 
          className="btn-text-action flex items-center gap-2"
          onClick={handleFocus}
          title="Click to edit document"
        >
          <Edit3 size={14} /> 
          <span className="text-sm">Editing Enabled</span>
        </button>
      </div>
      
      <div className="preview-text-container">
        <textarea
          ref={textareaRef}
          value={draftText || ''}
          onChange={(e) => onEdit(e.target.value)}
          className="form-textarea draft-paper"
          placeholder="Your document content will appear here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default DraftPreview;
