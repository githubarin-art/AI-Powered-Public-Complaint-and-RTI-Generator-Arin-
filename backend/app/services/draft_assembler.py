"""
Draft Assembler
Fills legal templates with user data and extracted entities.
AI ONLY fills placeholders - NEVER generates legal language.
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
from pathlib import Path
import re
from loguru import logger

from app.services.inference_orchestrator import DocumentType, IntentType


# Template directory
TEMPLATE_DIR = Path(__file__).parent.parent / "templates"


class DraftAssembler:
    """
    Assembles document drafts using pre-approved templates.
    
    DESIGN PRINCIPLE:
    - Templates define structure, headings, and legal wording
    - This class ONLY fills placeholders
    - NO generative AI is used for legal content
    """
    
    # Map document types to template files
    TEMPLATE_MAP = {
        DocumentType.INFORMATION_REQUEST: "rti/information_request.txt",
        DocumentType.RECORDS_REQUEST: "rti/records_request.txt",
        DocumentType.INSPECTION_REQUEST: "rti/inspection_request.txt",
        DocumentType.GRIEVANCE: "complaint/grievance.txt",
        DocumentType.ESCALATION: "complaint/escalation.txt",
        DocumentType.FOLLOW_UP: "complaint/follow_up.txt",
    }
    
    # Default placeholders when user hasn't provided specific info
    DEFAULT_PLACEHOLDERS = {
        "TIME_PERIOD": "the relevant period",
        "PAYMENT_MODE": "Indian Postal Order / Demand Draft / Online Payment",
        "PROBLEM_DURATION": "a considerable period",
        "PREVIOUS_ATTEMPTS": "my earlier attempts to resolve this matter",
        "IMPACT_DESCRIPTION": "This issue is causing significant inconvenience.",
        "AFFECTED_LOCATION": "the concerned area",
        "START_DATE": "some time ago",
    }
    
    def __init__(self):
        self.templates: Dict[DocumentType, str] = {}
        self._load_templates()
    
    def _load_templates(self):
        """Load all templates from disk"""
        for doc_type, template_path in self.TEMPLATE_MAP.items():
            full_path = TEMPLATE_DIR / template_path
            try:
                if full_path.exists():
                    self.templates[doc_type] = full_path.read_text(encoding="utf-8")
                    logger.info(f"Loaded template: {template_path}")
                else:
                    logger.warning(f"Template not found: {template_path}")
            except Exception as e:
                logger.error(f"Failed to load template {template_path}: {e}")
    
    def _extract_placeholders(self, template: str) -> List[str]:
        """Extract all placeholder names from a template"""
        return re.findall(r'\{([A-Z_]+)\}', template)
    
    def _format_applicant_details(
        self,
        name: str,
        address: str,
        state: str,
        phone: Optional[str] = None,
        email: Optional[str] = None
    ) -> Dict[str, str]:
        """Format applicant details for template insertion"""
        contact_parts = []
        if phone:
            contact_parts.append(f"Phone: {phone}")
        if email:
            contact_parts.append(f"Email: {email}")
        
        # Format contact info, or provide placeholder if empty
        contact = "\n".join(contact_parts) if contact_parts else ""
        
        # Check if state is already in address to avoid duplication
        address_lower = address.lower() if address else ""
        state_lower = state.lower() if state else ""
        
        if state_lower and state_lower in address_lower:
            # State already in address, don't duplicate
            full_address = address
        else:
            # Append state to address
            full_address = f"{address}, {state}" if state else address
        
        return {
            "APPLICANT_NAME": name,
            "APPLICANT_ADDRESS": full_address,
            "APPLICANT_CONTACT": contact,
        }
    
    def _format_authority_details(
        self,
        department_name: str,
        department_address: str,
        authority_designation: Optional[str] = None
    ) -> Dict[str, str]:
        """Format authority details for template insertion"""
        return {
            "DEPARTMENT_NAME": department_name,
            "DEPARTMENT_ADDRESS": department_address,
            "AUTHORITY_DESIGNATION": authority_designation or "The Concerned Authority",
        }
    
    def _format_date_and_place(self, state: str) -> Dict[str, str]:
        """Format current date and place"""
        today = datetime.now()
        return {
            "DATE": today.strftime("%d %B %Y"),
            "PLACE": state,
        }
    
    def assemble_draft(
        self,
        document_type: DocumentType,
        applicant_name: str,
        applicant_address: str,
        applicant_state: str,
        issue_description: str,
        applicant_phone: Optional[str] = None,
        applicant_email: Optional[str] = None,
        department_name: str = "The Concerned Department",
        department_address: str = "[Department Address]",
        authority_designation: Optional[str] = None,
        specific_request: Optional[str] = None,
        time_period: Optional[str] = None,
        issue_category: Optional[str] = None,
        additional_context: Optional[Dict[str, str]] = None,
        tone: str = "neutral"
    ) -> Dict[str, Any]:
        """
        Assemble a complete draft by filling template placeholders.
        
        Returns:
            Dict containing:
            - draft_text: The filled template
            - template_used: Which template was used
            - placeholders_filled: Map of placeholder -> value
            - placeholders_missing: Placeholders that used defaults
            - word_count: Word count of draft
            - editable_sections: Sections user may want to edit
        """
        # Get template
        if document_type not in self.templates:
            logger.error(f"No template for document type: {document_type}")
            raise ValueError(f"Template not found for {document_type}")
        
        template = self.templates[document_type]
        
        # Build placeholder values
        placeholders = {}
        
        # Applicant details
        placeholders.update(self._format_applicant_details(
            applicant_name, applicant_address, applicant_state,
            applicant_phone, applicant_email
        ))
        
        # Authority details
        placeholders.update(self._format_authority_details(
            department_name, department_address, authority_designation
        ))
        
        # Date and place
        placeholders.update(self._format_date_and_place(applicant_state))
        
        # Issue-specific content
        if document_type in [DocumentType.INFORMATION_REQUEST, DocumentType.RECORDS_REQUEST, DocumentType.INSPECTION_REQUEST]:
            # RTI-specific placeholders
            placeholders["INFORMATION_REQUESTED"] = specific_request or issue_description
            placeholders["TIME_PERIOD"] = time_period or self.DEFAULT_PLACEHOLDERS["TIME_PERIOD"]
            placeholders["PAYMENT_MODE"] = self.DEFAULT_PLACEHOLDERS["PAYMENT_MODE"]
        else:
            # Complaint-specific placeholders
            placeholders["GRIEVANCE_DESCRIPTION"] = issue_description
            placeholders["ISSUE_CATEGORY"] = issue_category or "Public Service Issue"
            placeholders["AFFECTED_LOCATION"] = additional_context.get("location") if additional_context else self.DEFAULT_PLACEHOLDERS["AFFECTED_LOCATION"]
            placeholders["PROBLEM_DURATION"] = time_period or self.DEFAULT_PLACEHOLDERS["PROBLEM_DURATION"]
            placeholders["IMPACT_DESCRIPTION"] = additional_context.get("impact") if additional_context else self.DEFAULT_PLACEHOLDERS["IMPACT_DESCRIPTION"]
            placeholders["START_DATE"] = additional_context.get("start_date") if additional_context else self.DEFAULT_PLACEHOLDERS["START_DATE"]
            placeholders["PREVIOUS_ATTEMPTS"] = additional_context.get("previous_attempts") if additional_context else self.DEFAULT_PLACEHOLDERS["PREVIOUS_ATTEMPTS"]
        
        # Add any additional context
        if additional_context:
            for key, value in additional_context.items():
                placeholder_key = key.upper().replace(" ", "_")
                if placeholder_key not in placeholders:
                    placeholders[placeholder_key] = value
        
        # Track which placeholders were filled vs defaulted
        template_placeholders = self._extract_placeholders(template)
        placeholders_filled = {}
        placeholders_missing = []
        
        # Fill the template
        draft_text = template
        for placeholder in template_placeholders:
            if placeholder in placeholders and placeholders[placeholder]:
                draft_text = draft_text.replace(f"{{{placeholder}}}", placeholders[placeholder])
                placeholders_filled[placeholder] = placeholders[placeholder]
            elif placeholder in self.DEFAULT_PLACEHOLDERS:
                draft_text = draft_text.replace(f"{{{placeholder}}}", self.DEFAULT_PLACEHOLDERS[placeholder])
                placeholders_missing.append(placeholder)
            elif placeholder == "APPLICANT_CONTACT":
                # Remove empty contact placeholder entirely
                draft_text = draft_text.replace(f"{{{placeholder}}}\n", "")
                draft_text = draft_text.replace(f"{{{placeholder}}}", "")
            else:
                # Leave as is for user to fill
                placeholders_missing.append(placeholder)
        
        # Apply tone adjustments
        if tone != "neutral":
            from app.utils.tone import adjust_tone
            draft_text = adjust_tone(draft_text, tone)
        
        # Identify editable sections
        editable_sections = {
            "issue_description": issue_description,
            "specific_request": specific_request or "",
            "time_period": time_period or "",
        }
        
        return {
            "draft_text": draft_text,
            "document_type": document_type.value,
            "template_used": self.TEMPLATE_MAP[document_type],
            "placeholders_filled": placeholders_filled,
            "placeholders_missing": placeholders_missing,
            "word_count": len(draft_text.split()),
            "editable_sections": editable_sections,
            "generated_at": datetime.now().isoformat(),
        }
    
    def get_template_preview(self, document_type: DocumentType) -> Optional[str]:
        """Get a template preview for display"""
        return self.templates.get(document_type)
    
    def list_available_templates(self) -> List[str]:
        """List all available template types"""
        return [dt.value for dt in self.templates.keys()]


# Singleton instance
_assembler = None


def get_draft_assembler() -> DraftAssembler:
    """Get singleton draft assembler instance"""
    global _assembler
    if _assembler is None:
        _assembler = DraftAssembler()
    return _assembler
