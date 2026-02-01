import React from 'react';
import { FileText, Edit3 } from 'lucide-react';
import './DraftPreview.css';

const DraftPreview = ({ draftText, onEdit }) => {
  return (
    <div className="draft-preview">
      <div className="preview-header">
        <h3><FileText size={20} /> Document Preview</h3>
        <span className="text-sm text-muted flex items-center gap-2">
          <Edit3 size={14} /> Editable Mode
        </span>
      </div>
      
      <div className="preview-text-container">
        <textarea
          value={draftText}
          onChange={(e) => onEdit(e.target.value)}
          className="form-textarea draft-paper"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default DraftPreview;
