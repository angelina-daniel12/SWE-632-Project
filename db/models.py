from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from db.database import Base
from pydantic import BaseModel
from typing import List, Optional

# Base Models (exactly matches database tables)
class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    
    # Relationship
    items = relationship("Item", back_populates="template", cascade="all, delete-orphan")
    tier_lists = relationship("TierList", back_populates="template")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    template_id = Column(Integer, ForeignKey("templates.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    image = Column(Text)
    
    # Relationship
    template = relationship("Template", back_populates="items")

class TierList(Base):
    __tablename__ = "tier_lists"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    template_id = Column(Integer, ForeignKey("templates.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP, default=lambda: datetime.now(timezone.utc), nullable=False)
    
    # Relationship
    template = relationship("Template", back_populates="tier_lists")
    item_rankings = relationship("ItemRanking", back_populates="tier_list", cascade="all, delete-orphan")

class ItemRanking(Base):
    __tablename__ = "item_rankings"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tier_list_id = Column(Integer, ForeignKey("tier_lists.id", ondelete="CASCADE"), nullable=False)
    item_id = Column(Integer, ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    tier = Column(String(2), nullable=False)  # e.g., 'S', 'A', 'B', 'C', 'D', 'F'
    position = Column(Integer, nullable=False)
    
    __table_args__ = (
        CheckConstraint(tier.in_(['S', 'A', 'B', 'C', 'D', 'F']), name='check_tier_valid'),
    )
    
    # Relationship
    tier_list = relationship("TierList", back_populates="item_rankings")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    created_at = Column(TIMESTAMP, default=lambda: datetime.now(timezone.utc), nullable=False)

# Pydantic Schemas (what we send to client via API)
class ItemSchema(BaseModel):
    id: int
    name: str
    
    class Config:
        from_attributes = True

class TemplateDetailSchema(BaseModel):
    template_name: str
    template_description: Optional[str] = None
    category: Optional[str] = None
    items: List[ItemSchema] = []

class ItemRankingSchema(BaseModel):
    item_id: int
    item_name: str
    tier: str # S A B C D F
    position: int

class TierListSchema(BaseModel):
    id: int
    user_id: int
    template_id: int
    template_name: str
    
    class Config:
        from_attributes = True

class TierListDetailSchema(BaseModel):
    id: int
    user_id: int
    template_id: int
    created_at: datetime
    item_rankings: List[ItemRankingSchema]
    
    class Config:
        from_attributes = True

class GlobalTierListAverageSchema(BaseModel):
    template_id: int
    item_rankings: List[ItemRankingSchema]

# Schemas for POST requests / responses

# Create Templates
class TemplateCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None

class TemplateCreateResponseSchema(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    items: List[ItemSchema] = []

# Create Items
class ItemCreateSchema(BaseModel):
    name: str
    template_id: int

class ItemCreateResponseSchema(BaseModel):
    id: int
    name: str
    template_id: int
    
    class Config:
        from_attributes = True

# Create Item Rankings
class ItemRankingCreateSchema(BaseModel):
    item_id: int
    tier: str  # 'S', 'A', 'B', 'C', 'D', 'F'
    position: int

# Create Tier Lists
class TierListCreateSchema(BaseModel):
    user_id: int
    template_id: int
    item_rankings: List[ItemRankingCreateSchema]

class TierListCreateResponseSchema(BaseModel):
    id: int
    user_id: int
    template_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Create User Schemas
class UserCreateSchema(BaseModel):
    username: str
    email: Optional[str] = None
