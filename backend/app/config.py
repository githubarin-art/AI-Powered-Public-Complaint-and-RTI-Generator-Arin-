"""
Application Configuration
Production-grade settings loaded from environment variables.
All sensitive values must come from environment, not hardcoded.
"""

from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional, List
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment.
    
    Usage:
        from app.config import get_settings
        settings = get_settings()
    """
    
    # ===================
    # Server Configuration
    # ===================
    APP_NAME: str = "RTI & Complaint Generator API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", description="development, staging, production")
    DEBUG: bool = Field(default=False, description="Enable debug mode")
    BACKEND_HOST: str = Field(default="0.0.0.0", description="Server host")
    BACKEND_PORT: int = Field(default=8000, description="Server port")
    
    # ===================
    # CORS Configuration
    # ===================
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        description="Allowed CORS origins"
    )
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["GET", "POST", "OPTIONS"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    
    # ===================
    # NLP Configuration
    # ===================
    SPACY_MODEL: str = Field(default="en_core_web_sm", description="spaCy model to use")
    ENABLE_DISTILBERT: bool = Field(default=True, description="Enable DistilBERT for semantic analysis")
    DISTILBERT_MODEL: str = Field(default="distilbert-base-uncased", description="DistilBERT model")
    
    # ===================
    # Confidence Thresholds
    # ===================
    CONFIDENCE_HIGH: float = Field(default=0.9, description="High confidence threshold - auto proceed")
    CONFIDENCE_MEDIUM: float = Field(default=0.7, description="Medium confidence - suggest with highlight")
    CONFIDENCE_LOW: float = Field(default=0.5, description="Low confidence - show alternatives")
    
    # ===================
    # Rate Limiting
    # ===================
    RATE_LIMIT_ENABLED: bool = Field(default=True, description="Enable rate limiting")
    RATE_LIMIT_REQUESTS: int = Field(default=100, description="Max requests per window")
    RATE_LIMIT_WINDOW_SECONDS: int = Field(default=60, description="Rate limit window in seconds")
    
    # ===================
    # Logging
    # ===================
    LOG_LEVEL: str = Field(default="INFO", description="Logging level")
    LOG_FORMAT: str = Field(
        default="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} | {message}",
        description="Log format"
    )
    LOG_TO_FILE: bool = Field(default=False, description="Also log to file")
    LOG_FILE_PATH: str = Field(default="logs/app.log", description="Log file path")
    
    # ===================
    # Document Generation
    # ===================
    MAX_DOCUMENT_SIZE_MB: int = Field(default=10, description="Max generated document size in MB")
    PDF_FONT: str = Field(default="Helvetica", description="PDF font family")
    PDF_FONT_SIZE: int = Field(default=11, description="PDF base font size")
    
    # ===================
    # Security
    # ===================
    API_KEY_ENABLED: bool = Field(default=False, description="Require API key for requests")
    API_KEY_HEADER: str = Field(default="X-API-Key", description="API key header name")
    API_KEYS: List[str] = Field(default=[], description="Valid API keys")
    
    # ===================
    # Feature Flags
    # ===================
    FEATURE_HINDI_SUPPORT: bool = Field(default=False, description="Enable Hindi language support")
    FEATURE_XLSX_EXPORT: bool = Field(default=True, description="Enable XLSX export")
    FEATURE_AUDIT_LOG: bool = Field(default=True, description="Enable audit logging")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        
    def is_production(self) -> bool:
        """Check if running in production"""
        return self.ENVIRONMENT == "production"
    
    def is_development(self) -> bool:
        """Check if running in development"""
        return self.ENVIRONMENT == "development"


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to avoid re-reading env vars on every call.
    """
    return Settings()


# For backward compatibility
settings = get_settings()
