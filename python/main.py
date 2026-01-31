import sys
from pathlib import Path

# Add parent directory to path
parent_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(parent_dir))

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import models
from db import database

app = FastAPI()

@app.get("/")
def hello_world():
    return {"Hello" : "World!"}

@app.get("/templates")
def get_templates(db: Session = Depends(database.get_db)):
    templates = db.query(models.Template).all()
    return templates

@app.get("/templates/{template_id}", response_model=models.TemplateWithItemsSchema)
def get_template_with_items(template_id: int, db: Session = Depends(database.get_db)):
    # Get template
    template = db.query(models.Template).filter(models.Template.id == template_id).first()
    
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Get items for this template
    items = db.query(models.Item).filter(models.Item.template_id == template_id).order_by(models.Item.id).all()
    
    # Build nested response
    return {
        "template_name": template.name,
        "category": template.category,
        "items": [{"id": item.id, "name": item.name} for item in items]
    }