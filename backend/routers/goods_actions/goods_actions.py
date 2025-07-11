from fastapi import APIRouter, Body,Depends, HTTPException, Query, Path
from pydantic import BaseModel, Field
from ...database import SessionLocal
from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Annotated
from ...routers.auth import get_current_user
from starlette import status
from ...models import Goods, Basket, OrderItem, Orders, Users, Smartphones, Laptops, GoodsImage, BestSellers, GoodsRating, GoodsRelatives 
from ...routers.email_actions.email_verification import send_verification_email
from ...routers.auth import check_if_user_enter_email_or_phone_num
from ...routers.email_actions.email_mailing import send_order_details, send_cancel_order_notification
from sqlalchemy import asc, desc


router = APIRouter(
    prefix = "/goods",
    tags=["goods"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependancy = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

CATEGORY_TO_MODEL = {
    "laptops": Laptops,
    "smartphones": Smartphones
}

@router.get("/bestsellers", status_code=status.HTTP_200_OK)
async def show_bestsellers(db: db_dependancy):
    listOfGoods =  db.query(BestSellers).all()
    goodsToReturn = []
    for good in listOfGoods:
        goodsToReturn.append(db.query(Goods).filter(Goods.id == good.goods_id).first())
    return goodsToReturn



@router.get("/", status_code = status.HTTP_200_OK)
async def show_goods_categories(db: db_dependancy):
    all_categories = db.query(Goods.category).distinct().all()
    return [category[0] for category in all_categories]

from fastapi import Query

from fastapi import Query
from sqlalchemy import asc, desc

@router.get("/{category}", status_code=status.HTTP_200_OK)
async def show_category_goods(
    category: str,
    db: db_dependancy,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    sort: str = Query("rating_desc", description="Sort by field and direction, e.g. price_asc, price_desc, rating_desc")
):
    query = db.query(Goods).filter(Goods.category == category)

    if sort == "price_asc":
        query = query.order_by(asc(Goods.price))
    elif sort == "price_desc":
        query = query.order_by(desc(Goods.price))
    elif sort == "rating_desc":
        query = query.order_by(desc(Goods.rating))
    elif sort == "rating_asc":
        query = query.order_by(asc(Goods.rating))
    else:
        raise HTTPException(status_code=400, detail="Invalid sort option")

    total = query.count()

    category_goods = (
        query.offset(skip).limit(limit).all()
    )

    if not category_goods:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such category")

    return {
        "total": total,
        "items": category_goods
    }


@router.get("/base-info/{goods_id}", status_code=status.HTTP_200_OK)
async def get_goods_base_info(db: db_dependancy, goods_id: int):
    return db.query(Goods).filter(Goods.id == goods_id).first()


@router.get("/{category}/{goods_id}", status_code=status.HTTP_200_OK)
async def get_goods_info(db: db_dependancy, category: str, goods_id: int):
    model = CATEGORY_TO_MODEL.get(category.lower())

    if model is None:
        raise HTTPException(status_code=400, detail="Invalid category")

    goods_base_info = db.query(Goods).filter(Goods.id == goods_id).first()

    if goods_base_info is None:
        raise HTTPException(status_code=404, detail="Goods not found")

    goods_details_model = db.query(model).filter(model.goods_id == goods_id).first()

    if goods_details_model is None:
        raise HTTPException(status_code=404, detail="Goods details not found")

        
    goods_images = db.query(GoodsImage).filter(GoodsImage.good_id == goods_base_info.id).all()

    if goods_images is None:    
        goods_images = "https://media.tenor.com/7vW_xoioKbIAAAAM/anime-girl-shrugging-and-looking-away.gif"


    goods_relatives = db.query(GoodsRelatives).filter(GoodsRelatives.good_one == goods_base_info.id).all()

    return goods_base_info, goods_details_model, goods_images, goods_relatives


@router.get("/{category}/{id}/reviews", status_code=status.HTTP_200_OK)
async def get_goods_reviews(
    db: db_dependancy,
    id: int = Path(gt=0), 
    page: int = Query(1, ge=1), 
    page_size: int = Query(10, ge=1)
    ):
    goods_id = id

    reviews = []

    relative_goods_id = set()
    relative_goods_id.add(goods_id)
    relative_goods = db.query(GoodsRelatives).filter(GoodsRelatives.good_one == goods_id).all()

    for good in relative_goods.copy():
        extra_relatives = db.query(GoodsRelatives).filter(GoodsRelatives.good_two == good.good_two).all()
        relative_goods.extend(extra_relatives)

    for good in relative_goods:
        relative_goods_id.add(good.good_one)
        relative_goods_id.add(good.good_two)


    reviews = (
        db.query(GoodsRating)
        .filter(GoodsRating.good_id.in_(relative_goods_id))
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    response = []
    for review in reviews:
        author = db.query(Users).filter(Users.id == review.author_id).first()
        review_data = {
            "id": review.id,
            "good_id": review.good_id,
            "author_id": review.author_id,
            "rating": review.rate,
            "comment": review.comment,
            "author_name": author.first_name if author else "User"
        }
        response.append(review_data)

    return response


