from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from db.database import Base
from pydantic import BaseModel
from typing import List

class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    
    # Relationship
    items = relationship("Item", back_populates="template", cascade="all, delete-orphan")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    template_id = Column(Integer, ForeignKey("templates.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    image = Column(Text)
    
    # Relationship
    template = relationship("Template", back_populates="items")

# More complex models

class ItemSchema(BaseModel):
    id: int
    name: str
    
    class Config:
        from_attributes = True

class TemplateWithItemsSchema(BaseModel):
    template_name: str
    category: str
    items: List[ItemSchema]