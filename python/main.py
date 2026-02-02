import sys
from pathlib import Path

from pydot import List

# Add parent directory to path
parent_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(parent_dir))

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from db import models
from db import database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://meta-tier.vercel.app"],
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
    tier_lists = db.query(models.TierList) \
        .options(joinedload(models.TierList.template)) \
        .filter(models.TierList.user_id == user_id) \
        .all()
    
    return [
        {
            "id": tl.id,
            "user_id": tl.user_id,
            "template_id": tl.template_id,
            "template_name": tl.template.name
        }
        for tl in tier_lists
    ]

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
                # TODO there is a more efficient way to do this with a join
                "item_name": db.query(models.Item).filter(models.Item.id == ranking.item_id).first().name,
                "tier": ranking.tier,
                "position": ranking.position
            }
            for ranking in item_rankings
        ]
    }

@app.get("/global/{template_id}")
def get_global_tier_list(template_id: int, db: Session = Depends(database.get_db)):
    results = db.query(
            models.ItemRanking.item_id,
            models.Item.name.label('item_name'),
            models.ItemRanking.tier,
            models.ItemRanking.position
        ).select_from(models.ItemRanking) \
        .join(models.Item, models.ItemRanking.item_id == models.Item.id) \
        .join(models.TierList, models.ItemRanking.tier_list_id == models.TierList.id) \
        .join(models.User, models.TierList.user_id == models.User.id) \
        .join(models.Template, models.TierList.template_id == models.Template.id) \
        .filter(models.Template.id == template_id) \
        .order_by(
            models.ItemRanking.tier_list_id,
            models.ItemRanking.tier,
            models.ItemRanking.position
        ).all()

    # Get unique item IDs
    item_id_set = set([result.item_id for result in results])

    # Find average tier for each item
    avg_item_rankings = {}
    for item_id in item_id_set:
        tiers = [r.tier for r in results if r.item_id == item_id]
        avg_tier = average_tier(tiers)
        avg_item_rankings[item_id] = avg_tier

    return { 
        "template_id": template_id,
        "item_rankings": [
            {
                "item_id": item_id,
                "item_name": db.query(models.Item).filter(models.Item.id == item_id).first().name,
                "average_tier": avg_item_rankings[item_id]
            }
            for item_id in item_id_set
        ]
    }

def average_tier(tiers: List[str]) -> str:
    tier_values = {'S': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1}

    if not tiers:
        return 'F'

    average = sum(tier_values[tier] for tier in tiers) / len(tiers)
    if average >= 5.5:
        return 'S'
    elif average >= 4.5:
        return 'A'
    elif average >= 3.5:
        return 'B'
    elif average >= 2.5:
        return 'C'
    elif average >= 1.5:
        return 'D'
    else:
        return 'F'

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

@app.post("/create/user")
def get_or_create_user(user_data: models.UserCreateSchema, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if user:
        return user
    
    new_user = models.User(
        username=user_data.username,
        email=user_data.email or None
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user