import sys
from pathlib import Path

from pydot import List

# Add parent directory to path
parent_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(parent_dir))

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import models
from db import database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# allow cors for localhost 3000 (react dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="../db/images"), name="static")

# GET methods
@app.get("/")
def hello_world():
    return {"Hello" : "World!"}

@app.get("/templates")
def get_templates(db: Session = Depends(database.get_db)):
    templates = db.query(models.Template).all()
    return templates

@app.get("/templates/{template_id}", response_model=models.TemplateDetailSchema)
def get_template_with_items(template_id: int, db: Session = Depends(database.get_db)):
    template = db.query(models.Template).filter(models.Template.id == template_id).first()
    
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    items = db.query(models.Item).filter(models.Item.template_id == template_id).order_by(models.Item.id).all()
    
    # Manually build nested response
    return {
        "template_name": template.name,
        "template_description": template.description or None,
        "category": template.category,
        "items": [{"id": item.id, "name": item.name} for item in items]
    }

@app.get("/tier-lists/{user_id}", response_model=List[models.TierListSchema])
def get_tier_lists_by_user(user_id: int, db: Session = Depends(database.get_db)):
    tier_lists = db.query(models.TierList).filter(models.TierList.user_id == user_id).all()
    return tier_lists

@app.get("/tier-list/{tier_list_id}", response_model=models.TierListDetailSchema)
def get_tier_list_detail(tier_list_id: int, db: Session = Depends(database.get_db)):
    tier_list = db.query(models.TierList).filter(models.TierList.id == tier_list_id).first()
    
    if not tier_list:
        raise HTTPException(status_code=404, detail="Tier List not found")
    
    item_rankings = db.query(models.ItemRanking) \
        .filter(models.ItemRanking.tier_list_id == tier_list_id) \
        .order_by(models.ItemRanking.tier, models.ItemRanking.position).all()
    
    # Manually build nested response
    return {
        "id": tier_list.id,
        "user_id": tier_list.user_id,
        "template_id": tier_list.template_id,
        "created_at": tier_list.created_at,
        "item_rankings": [
            {
                "item_id": ranking.item_id,
                "tier": ranking.tier,
                "position": ranking.position
            }
            for ranking in item_rankings
        ]
    }

# POST methods
@app.post("/create/template", response_model=models.TemplateCreateResponseSchema)
def create_template(template: models.TemplateCreateSchema, db: Session = Depends(database.get_db)):
    new_template = models.Template(
        name=template.name,
        description=template.description or None,
        category=template.category or None
    )
    db.add(new_template)
    db.commit()
    db.refresh(new_template)

    return new_template

@app.post("/create/item", response_model=models.ItemCreateResponseSchema)
def create_item(item: models.ItemCreateSchema, db: Session = Depends(database.get_db)):
    new_item = models.Item(
        name=item.name,
        template_id=item.template_id
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item

@app.post("/create/tier-list", response_model=models.TierListCreateResponseSchema)
def create_tier_list(tier_list_data: models.TierListCreateSchema, db: Session = Depends(database.get_db)):
    # 1. Create the tier_list entry
    new_tier_list = models.TierList(
        user_id=tier_list_data.user_id,
        template_id=tier_list_data.template_id
    )
    db.add(new_tier_list)
    db.flush()
    
    # 2. Create all item_rankings entries
    new_item_rankings = [
        models.ItemRanking(
            tier_list_id=new_tier_list.id,
            item_id=ranking.item_id,
            tier=ranking.tier,
            position=ranking.position
        )
        for ranking in tier_list_data.item_rankings
    ]
    
    db.add_all(new_item_rankings)
    
    # 3. Commit everything together
    db.commit()
    db.refresh(new_tier_list)
    
    return new_tier_list
