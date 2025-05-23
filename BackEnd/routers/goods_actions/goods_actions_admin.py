from typing import Annotated, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from starlette import status
from sqlalchemy.orm import Session
from ...database import SessionLocal
from ...models import Users, Orders, Smartphones, Laptops, Goods, GoodsImage, BestSellers
from ...routers.auth import get_current_user
from ...routers.goods_actions.request_models.smartphone import AddEditSmartphoneRequest, add_smartphones_model, edit_smartphone_model
from ...routers.goods_actions.request_models.laptop import AddEditLaptopRequest, add_laptop_model, edit_laptop_model
from typing import List

router = APIRouter(
    prefix = "/admin-panel",
    tags=["good_actions_admin"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependancy = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class AddEditGoodsRequest(BaseModel):
    name: str
    price: float
    old_price: float
    description: str
    category: str
    quantity: int = 0
    characteristics_table: str
    image_url: str
    image_urls: List[str]

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Samsung Galaxy S23 Ultra",
                "old_price": 1599, 
                "price": 1199,
                "description": "Топовый флагман Samsung с 200MP камерой.",
                "category": "Smartphones", 
                "quantity": 35,
                "characteristics_table": "Samsung Galaxy S23 Ultra, 12GB RAM, 256GB Storage",
                "image_url": "https://example.com/samsung_s23_1.jpg",
                "image_urls": [
                    "https://example.com/samsung_s23_2.jpg",
                    "https://example.com/samsung_s23_3.jpg"
                ]
            }
        }
    }

def add_goods_model(goods_request: AddEditGoodsRequest) -> Goods:
    good = Goods(
        name=goods_request.name,
        price=goods_request.price,
        old_price=goods_request.old_price,
        description=goods_request.description,
        category=goods_request.category,
        quantity=goods_request.quantity,
        characteristics_table=goods_request.characteristics_table,
        image_url = goods_request.image_url,
    )

    good.images = [GoodsImage(url=url) for url in goods_request.image_urls]

    return good


def edit_goods_model(goods_request: AddEditGoodsRequest, old_good: Goods) -> Goods:
    update_fields = {
        "name": "Empty",
        "price": -1,
        "old_price": -2,
        "description": "Empty",
        "category": "Empty",
        "quantity": -1,
        "characteristics_table": "Empty",
    }

    for field, empty_value in update_fields.items():
        new_value = getattr(goods_request, field, empty_value)
        if new_value != empty_value:
            setattr(old_good, field, new_value)

    if goods_request.image_urls:
        old_good.images.clear()
        for url in goods_request.image_urls:
            old_good.images.append(GoodsImage(url=url))

    return old_good







##################################################################
#                                                                # 
#                          ADD & EDIT                            # 
#                           DIFFERETN                            # 
#                             GOODS                              # 
#                            SECTION                             # 
#                                                                # 
##################################################################



#############################################################################################################
#                                                                                                           #
#                                                Smartphones                                                #
#                                                                                                           #
#############################################################################################################
@router.post("/add-goods/smartphone", status_code=status.HTTP_201_CREATED)
async def add_smartphone_to_the_db(
    db: db_dependancy,
    user: user_dependency,
    characteristics_request: AddEditSmartphoneRequest,
    goods_request: AddEditGoodsRequest
):
    if user is None or user.get('role') != 'admin':
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    add_goods = add_goods_model(goods_request)
    db.add(add_goods)
    db.commit()
    db.refresh(add_goods)

    add_smartphone_model = add_smartphones_model(characteristics_request, add_goods.id)
    db.add(add_smartphone_model)

    # for url in goods_request.image_urls:
    #     db.add(GoodsImage(url=url, good_id=add_goods.id))

    db.commit()
    return {"message": "Good created", "id": add_goods.id}



@router.put("/edit-goods/smartphone", status_code=status.HTTP_200_OK)
async def edit_smartphone_in_db(
    db: db_dependancy,
    user: user_dependency,
    characteristics_request: AddEditSmartphoneRequest,
    goods_request: AddEditGoodsRequest,
    goods_id: int
):
    if user is None or user.get('role') != 'admin':
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    old_good = db.query(Goods).filter(Goods.id == goods_id).first()
    if old_good is None:
        raise HTTPException(status_code=404, detail='Good not found')

    edit_goods_model(goods_request, old_good)
    
    db.query(GoodsImage).filter(GoodsImage.good_id == goods_id).delete()

    # for url in goods_request.image_urls:
    #     db.add(GoodsImage(url=url, good_id=goods_id))

    old_smartphone = db.query(Smartphones).filter(Smartphones.goods_id == goods_id).first()
    if old_smartphone is None:
        raise HTTPException(status_code=404, detail='Smartphone not found')
    
    edit_smartphone_model(characteristics_request, old_smartphone)

    db.commit()
    return {"message": "Good updated", "id": goods_id}


#############################################################################################################
#                                                                                                           #
#                                                Laptops                                                    #
#                                                                                                           #
#############################################################################################################
@router.post("/add-goods/laptop", status_code=status.HTTP_201_CREATED)
async def add_laptop_to_the_db(
    db: db_dependancy,
    user: user_dependency,
    characteristics_request: AddEditLaptopRequest,
    goods_request: AddEditGoodsRequest
):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Authentication Failed")
    
    add_goods = add_goods_model(goods_request)
    db.add(add_goods)
    db.commit()
    db.refresh(add_goods)

    add_laptop = add_laptop_model(characteristics_request, add_goods.id)
    db.add(add_laptop)

    # for url in goods_request.image_urls:
    #     db.add(GoodsImage(url=url, good_id=add_goods.id))

    db.commit()
    return {"message": "Laptop added", "id": add_goods.id}


@router.put("/edit-goods/laptop", status_code=status.HTTP_200_OK)
async def edit_laptop_in_db(
    db: db_dependancy,
    user: user_dependency,
    characteristics_request: AddEditLaptopRequest,
    goods_request: AddEditGoodsRequest,
    goods_id: int
):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Authentication Failed")

    old_good = db.query(Goods).filter(Goods.id == goods_id).first()
    if old_good is None:
        raise HTTPException(status_code=404, detail="Good not found")

    edit_goods_model(goods_request, old_good)

    db.query(GoodsImage).filter(GoodsImage.good_id == goods_id).delete()

    for url in goods_request.image_urls:
        db.add(GoodsImage(url=url, good_id=goods_id))

    old_laptop = db.query(Laptops).filter(Laptops.goods_id == goods_id).first()
    if old_laptop is None:
        raise HTTPException(status_code=404, detail="Laptop not found")

    edit_laptop_model(characteristics_request, old_laptop)

    db.commit()
    return {"message": "Laptop updated", "id": goods_id}

@router.post("/add-bestseller/{id}", status_code=status.HTTP_201_CREATED)
async def add_bestseller_to_the_db(
    id: int,
    db: db_dependancy,
    user: user_dependency,
):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Authentication Failed")

    new_bestseller = BestSellers(goods_id=id)
    db.add(new_bestseller)
    db.commit()
    db.refresh(new_bestseller)

    return {"message": "Bestseller added", "bestseller": new_bestseller.id}


@router.delete("/delete-bestseller/{id}", status_code=status.HTTP_200_OK)
async def delete_bestseller_by_goods_id(
    id: int,
    db: db_dependancy,
    user: user_dependency,
):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Authentication Failed")
    
    bestseller = db.query(BestSellers).filter(BestSellers.goods_id == id).first()
    
    if bestseller is None:
        raise HTTPException(status_code=404, detail="Bestseller not found")
    
    db.delete(bestseller)
    db.commit()
    
    return {"message": f"Bestseller with id {id} has been deleted."}