# AI-Powered Public Complaint & RTI Generator

## Project Documentation

**Author:** Anurag Mishra  
**Date:** February 1, 2026  
**Project:** GSoC - AI-Powered Public Complaint and RTI Generator

---

## Progress Tracker

### Session: February 1, 2026

---

### 1. Environment Setup & Python Compatibility Fix

**Problem:** Python 3.14 was incompatible with spaCy due to pydantic v1 dependency issues.

**Solution:**
- Discovered Python 3.13.6 was available on the system
- Created new virtual environment with Python 3.13.6:
  ```bash
  py -3.13 -m venv .venv
  ```
- Activated and installed all dependencies

**Status:** ✅ Completed

---

### 2. Dependency Installation

Installed all required packages:
- `spacy` 3.8.11 with `en_core_web_sm` model
- `transformers` + `torch` for DistilBERT
- `fastapi` + `uvicorn` for API server
- `python-docx`, `reportlab`, `openpyxl` for document generation
- `email-validator` for pydantic EmailStr validation
- `pytest` for testing

**Command:**
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

**Status:** ✅ Completed

---

### 3. Code Fixes

#### 3.1 Fixed `confidence_gate.py`
- **Issue:** Missing `Tuple` import from typing
- **File:** `backend/app/services/nlp/confidence_gate.py`
- **Fix:** Added `Tuple` to imports

#### 3.2 Fixed `services/__init__.py`
- **Issue:** Trying to import non-existent classes (`InferenceOrchestrator`, `AuthorityResolver`)
- **File:** `backend/app/services/__init__.py`
- **Fix:** Updated exports to match actual functions/classes

#### 3.3 Enabled Swagger Docs
- **Issue:** Swagger UI was disabled (DEBUG=False)
- **File:** `backend/app/main.py`
- **Fix:** Changed `docs_url` and `redoc_url` to always be enabled

**Status:** ✅ Completed

---

### 4. Unit Tests

Created comprehensive test suite with **130 tests** covering:

| Test File | Tests | Coverage |
|-----------|-------|----------|
| `test_text_sanitizer.py` | 15 | PII detection, input cleaning |
| `test_language_normalizer.py` | 12 | Language normalization |
| `test_tone.py` | 8 | Tone analysis |
| `test_intent_rules.py` | 20 | Intent classification rules |
| `test_issue_rules.py` | 18 | Issue categorization |
| `test_legal_triggers.py` | 15 | Legal citation detection |
| `test_confidence_gate.py` | 12 | Confidence thresholds |
| `test_spacy_engine.py` | 10 | NER entity extraction |
| `test_distilbert_semantic.py` | 10 | Semantic similarity |
| `test_schemas.py` | 10 | Pydantic validation |

**Command:**
```bash
pytest tests/ -v --tb=short
```

**Result:** All 130 tests passed ✅

---

### 5. ML Components Verification

#### 5.1 spaCy NLP Engine
```python
import spacy
nlp = spacy.load('en_core_web_sm')
doc = nlp("I filed a complaint with Delhi Police on January 15")
# Entities: Delhi (GPE), January 15 (DATE)
```
**Status:** ✅ Working

#### 5.2 Rule Engine - Intent Classification
```python
from app.services.rule_engine.intent_rules import classify_intent
result = classify_intent("I want to file an RTI application")
# Result: intent=rti, confidence=0.72
```
**Status:** ✅ Working

#### 5.3 Rule Engine - Issue Mapping
```python
from app.services.rule_engine.issue_rules import map_issue_to_department
result = map_issue_to_department("road construction problem")
# Result: category=roads, departments=[PWD, NHAI, ...], confidence=0.95
```
**Status:** ✅ Working

#### 5.4 Legal Triggers Detection
```python
from app.services.rule_engine.legal_triggers import detect_legal_triggers
result = detect_legal_triggers("Under Section 6 of RTI Act")
# Detects RTI Act Section 6 citation
```
**Status:** ✅ Working

#### 5.5 DistilBERT Semantic Similarity
```python
from app.services.nlp.distilbert_semantic import rank_by_similarity
result = rank_by_similarity("road construction", candidates, top_k=4)
# Returns ranked candidates with similarity scores
```
**Model:** `distilbert-base-uncased` (268MB, cached after first download)  
**Status:** ✅ Working

---

### 6. Backend API Server

Started FastAPI server:
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

**Server URL:** http://127.0.0.1:8000  
**Swagger UI:** http://127.0.0.1:8000/docs  
**ReDoc:** http://127.0.0.1:8000/redoc

**Status:** ✅ Running

---

### 7. API Endpoint Testing

#### 7.1 POST `/api/infer` - Intent Classification

**Test 1: RTI Request**
```json
{
  "text": "I want information about road construction expenses in my district under RTI Act",
  "language": "english"
}
```
**Response:**
- Intent: `rti`
- Document Type: `information_request`
- Confidence: 95% (High) - No confirmation needed
- Department: PWD, Municipal Corporation, NHAI
- Processing Time: ~760ms

**Test 2: Complaint**
```json
{
  "text": "The water supply has been irregular for the past 3 weeks in Sector 15",
  "language": "english"
}
```
**Response:**
- Intent: `complaint`
- Document Type: `grievance`
- Confidence: 64% (Low) - Requires confirmation
- DistilBERT boosted to 80%
- Department: Water Supply, Jal Board, PHED (94% confidence)

**Status:** ✅ Working

---

#### 7.2 POST `/api/draft` - Document Generation

**Test: RTI Information Request**
```json
{
  "document_type": "information_request",
  "applicant": {
    "name": "Rahul Sharma",
    "address": "123, Gandhi Nagar, Jaipur",
    "state": "Rajasthan"
  },
  "issue": {
    "description": "Road construction expenditure details",
    "specific_request": "Itemized expenditure and contractor details",
    "time_period": "Jan-Dec 2024"
  },
  "authority": {
    "department_name": "PWD",
    "designation": "PIO"
  }
}
```

**Generated Document:**
- Proper RTI format with legal citations (Section 6, 7, 8, 9)
- Fee information (Rs. 10)
- 30-day response timeline
- Word count: 225 words
- Template: `rti/information_request.txt`

**Status:** ✅ Working

---

#### 7.3 POST `/api/download` - Document Export

| Format | Status | File Size | Notes |
|--------|--------|-----------|-------|
| **PDF** | ✅ Working | 3,558 bytes | Official submission format |
| **DOCX** | ✅ Working | 37,713 bytes | Editable Word document |
| **XLSX** | ✅ Working | 7,438 bytes | Tracking spreadsheet |

**Privacy Feature:** Documents streamed directly, NOT stored on server.

**Status:** ✅ Working

---

### 8. Complete System Summary

#### Backend API Endpoints
| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/health` | GET | Health check | ✅ |
| `/api/infer` | POST | Classify intent & extract entities | ✅ |
| `/api/draft` | POST | Generate document from template | ✅ |
| `/api/download` | POST | Export as PDF/DOCX/XLSX | ✅ |
| `/api/authority` | GET | Get department info | ✅ |
| `/docs` | GET | Swagger UI | ✅ |

#### ML/NLP Components
| Component | Model/Library | Status |
|-----------|---------------|--------|
| NER Engine | spaCy 3.8.11 (`en_core_web_sm`) | ✅ |
| Intent Rules | Custom rule engine | ✅ |
| Issue Mapping | Custom rule engine | ✅ |
| Legal Triggers | Regex-based detection | ✅ |
| Semantic Similarity | DistilBERT (`distilbert-base-uncased`) | ✅ |
| Confidence Gate | Threshold-based gating | ✅ |

#### Design Principles Implemented
1. ✅ **Rules decide, AI assists** - Rule engine is primary, NLP only assists
2. ✅ **Human confirmation mandatory** - Low confidence requires user verification
3. ✅ **Privacy-first** - No database, stateless, nothing stored
4. ✅ **No AI-generated legal text** - Templates pre-written, AI fills placeholders

---

### 9. Project Structure

```
AI-Powered-Public-Complaint-and-RTI-Generat/
├── .venv/                      # Python 3.13 virtual environment
├── backend/
│   ├── app/
│   │   ├── api/                # FastAPI routers
│   │   │   ├── infer.py        # Intent classification
│   │   │   ├── draft.py        # Document generation
│   │   │   ├── download.py     # PDF/DOCX/XLSX export
│   │   │   └── authority.py    # Department info
│   │   ├── services/
│   │   │   ├── nlp/            # NLP components
│   │   │   │   ├── spacy_engine.py
│   │   │   │   ├── distilbert_semantic.py
│   │   │   │   └── confidence_gate.py
│   │   │   ├── rule_engine/    # Rule-based classification
│   │   │   │   ├── intent_rules.py
│   │   │   │   ├── issue_rules.py
│   │   │   │   └── legal_triggers.py
│   │   │   ├── draft_assembler.py
│   │   │   ├── document_generator.py
│   │   │   └── inference_orchestrator.py
│   │   ├── templates/          # Pre-written legal templates
│   │   │   ├── rti/
│   │   │   └── complaint/
│   │   ├── utils/
│   │   ├── schemas/
│   │   ├── config.py
│   │   └── main.py
│   ├── tests/                  # 130 unit tests
│   └── requirements.txt
├── frontend/                   # (To be built)
├── ml/
├── docs/
└── doc.md                      # This file
```

---

### 10. Next Steps

- [ ] Build frontend (React/Next.js)
- [ ] Add Hindi language support
- [ ] Dockerize for deployment
- [ ] Add user authentication (optional)
- [ ] Deploy to cloud (AWS/GCP/Azure)

---

## Quick Start Commands

```bash
# Activate environment
.\.venv\Scripts\Activate.ps1

# Run backend server
cd backend
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

# Run tests
pytest tests/ -v

# Access Swagger UI
# Open: http://127.0.0.1:8000/docs
```

---

**Last Updated:** February 1, 2026  
**Author:** Anurag Mishra
