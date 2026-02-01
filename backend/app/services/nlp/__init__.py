"""
NLP Services Package
Handles all NLP/ML operations following MODEL_USAGE_POLICY

Components:
- spacy_engine: Named Entity Recognition and phrase matching
- distilbert_semantic: Semantic similarity ranking (NOT generation)
- confidence_gate: Controls when AI predictions require user confirmation
"""

from .spacy_engine import (
    extract_entities,
    extract_entities_detailed,
    extract_key_phrases,
    extract_matched_phrases,
    analyze_sentiment_basic,
    analyze_urgency,
    full_analysis,
    preload_models as preload_spacy,
    get_nlp,
    NLPResult,
    ExtractedEntity,
    EntityType,
)

from .distilbert_semantic import (
    compute_similarity,
    rank_by_similarity,
    rank_by_similarity_detailed,
    batch_compute_similarities,
    classify_query_type,
    preload_model as preload_distilbert,
    get_embedding,
    is_model_loaded,
    clear_cache,
    get_cache_stats,
    SimilarityResult,
    SemanticAnalysisResult,
)

from .confidence_gate import (
    ConfidenceLevel,
    DecisionSource,
    GatedResult,
    GatingDecision,
    Thresholds,
    get_confidence_level,
    should_use_nlp,
    should_use_distilbert,
    make_gating_decision,
    gate_result,
    combine_confidences,
    should_ask_user,
    format_alternatives_for_user,
    log_gating_decision,
    get_audit_log,
)

__all__ = [
    # spaCy engine
    "extract_entities",
    "extract_entities_detailed",
    "extract_key_phrases",
    "extract_matched_phrases",
    "analyze_sentiment_basic",
    "analyze_urgency",
    "full_analysis",
    "preload_spacy",
    "get_nlp",
    "NLPResult",
    "ExtractedEntity",
    "EntityType",
    
    # DistilBERT semantic
    "compute_similarity",
    "rank_by_similarity",
    "rank_by_similarity_detailed",
    "batch_compute_similarities",
    "classify_query_type",
    "preload_distilbert",
    "get_embedding",
    "is_model_loaded",
    "clear_cache",
    "get_cache_stats",
    "SimilarityResult",
    "SemanticAnalysisResult",
    
    # Confidence gate
    "ConfidenceLevel",
    "DecisionSource",
    "GatedResult",
    "GatingDecision",
    "Thresholds",
    "get_confidence_level",
    "should_use_nlp",
    "should_use_distilbert",
    "make_gating_decision",
    "gate_result",
    "combine_confidences",
    "should_ask_user",
    "format_alternatives_for_user",
    "log_gating_decision",
    "get_audit_log",
]


def preload_all_models():
    """Preload all NLP models for faster inference"""
    import logging
    logger = logging.getLogger(__name__)
    
    logger.info("Preloading all NLP models...")
    
    try:
        preload_spacy()
        logger.info("✓ spaCy models loaded")
    except Exception as e:
        logger.error(f"✗ spaCy loading failed: {e}")
    
    try:
        preload_distilbert()
        logger.info("✓ DistilBERT model loaded")
    except Exception as e:
        logger.error(f"✗ DistilBERT loading failed: {e}")
    
    logger.info("NLP model preloading complete")
