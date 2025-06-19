from fastapi import APIRouter,Depends, HTTPException, Query
from pydantic import BaseModel, Field, EmailStr
from ..database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import text, func
from typing import Annotated
from ..routers.auth import get_current_user
from starlette import status
from ..models import Goods, Basket, GoodsRelatives, OrderItem, Orders, Users, GoodsRating, RecentlyWatchedGoods
from ..routers.email_actions.email_verification import send_verification_email
from ..routers.auth import check_if_user_enter_email_or_phone_num
from ..routers.email_actions.email_mailing import send_order_details, send_cancel_order_notification
from passlib.context import CryptContext
from typing import Optional

router = APIRouter(
    prefix = "/user",
    tags=["user"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependancy = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
bcrypt_context = CryptContext(schemes=["bcrypt"],deprecated = "auto") 

class AddToTheBasketRequest(BaseModel):
    goods_id: int            
    quantity: int = Field(gt = 0)

class EditTheBasketRequest(BaseModel):
    goods_id: int            
    new_quantity: int = Field(gt = 0)

class CreateOrderRequest(BaseModel):
    reciever_name: str = Field(min_length = 2, max_length = 30)
    shipping_adress: str = Field(min_length = 2, max_length = 100)

    model_config = {
        "json_schema_extra" : {
            "example" : {
                "reciever_name" : "Tohru", 
                "shipping_adress" : "Miss Kobayashi's Home"
            }
        }
    }

class RecoverPasswordRequest(BaseModel):
    old_password: str
    new_password: str 

class EditUserRequest(BaseModel):
    first_name: Optional[str] = Field(default=None, min_length=2, max_length=30)
    last_name: Optional[str] = Field(default=None, min_length=2, max_length=50)
    phone_number: Optional[str] = Field(default=None)
    email: Optional[EmailStr] = Field(default=None)

    avatar_url: Optional[str] = Field(default=None, example="https://example.com/avatar.jpg")
    bio: Optional[str] = Field(default=None, max_length=500, example="I love shopping and good deals!")
    shipping_address: Optional[str] = Field(default=None, example="123 Main St, Springfield")
    billing_address: Optional[str] = Field(default=None, example="123 Main St, Springfield")
    preferred_payment: Optional[str] = Field(default=None, example="credit_card")

    model_config = {
        "json_schema_extra": {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "phone_number": "+123456789",
                "email": "john.doe@example.com",
                "avatar_url": "https://example.com/avatar.jpg",
                "bio": "I love shopping and good deals!",
                "shipping_address": "123 Main St, Springfield",
                "billing_address": "123 Main St, Springfield",
                "preferred_payment": "credit_card"
            }
        }
    }

class PostReviewRequest(BaseModel):
    good_id: int
    rate: float = Field(..., ge=1.0, le=5.0)
    comment: str = Field(max_length=300)


@router.get("/show-basket", status_code=status.HTTP_200_OK)
async def show_basket(db: db_dependancy, user: user_dependency):
    if user is None:
        return {
            "localStorage": True,
            "message": "User not authenticated. Use localStorage on the client side to store basket items."
        }

    goods_in_basket = db.query(Basket).filter(Basket.user_id == user.get("id")).all()
    
    result = []
    for item in goods_in_basket:
        good_info = db.query(Goods).filter(Goods.id == item.goods_id).first()
        result.append({
            "basket_id": item.id,
            "quantity": item.quantity,
            "goods": good_info
        })

    return result





@router.post("/add-to-basket", status_code = status.HTTP_201_CREATED)
async def add_to_the_basket(db: db_dependancy, user: user_dependency, request: AddToTheBasketRequest):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site
    goods_info = db.query(Goods).filter(Goods.id == request.goods_id).first()
    if goods_info is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "No goods with such ID")
    if goods_info.quantity < request.quantity:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"We don`t have enought goods. There is only {goods_info.quantity}")
    user_basket_info = db.query(Basket).filter(Basket.user_id == user.get("id")).filter(Basket.goods_id == request.goods_id).first()
    if user_basket_info is not None:
        user_basket_info.quantity += request.quantity
        db.add(user_basket_info)
        db.commit()
    else:
        add_to_basket_model = Basket(
            goods_id = goods_info.id,
            user_id = user.get("id"),
            quantity = request.quantity,
            price_for_the_one = goods_info.price
        )
        db.add(add_to_basket_model)
        db.commit()
        
    

@router.put("/basket-edit",status_code = status.HTTP_200_OK)
async def edit_basket(db: db_dependancy, user: user_dependency, request: EditTheBasketRequest ):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site
    edit_basket_model = db.query(Basket).filter(Basket.user_id == user.get("id")).filter(Basket.goods_id == request.goods_id).first()
    if edit_basket_model is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "No goods with such ID in your basket")
    
    model = db.query(Goods).filter(Goods.id == request.goods_id).first()
    if model.quantity < request.new_quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "We don`t have enough goods",
                "max_quantity": model.quantity
            }
        )

    edit_basket_model.quantity = request.new_quantity

    db.add(edit_basket_model)
    db.commit()



@router.delete("/basket-delete-good", status_code = status.HTTP_202_ACCEPTED)
async def delete_goods_from_basket(db: db_dependancy, user: user_dependency, goods_id: int):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site
    delete_model = db.query(Basket).filter(Basket.goods_id == goods_id).filter(Basket.user_id == user.get('id')).first()
    if delete_model is None:
        raise HTTPException(status_code=404, detail='Goods not found.')
    db.query(Basket).filter(Basket.goods_id == goods_id).filter(Basket.user_id == user.get('id')).delete()
    db.commit()


@router.post("/order", status_code = status.HTTP_200_OK)
async def create_order(db: db_dependancy, user: user_dependency, order: CreateOrderRequest):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site

    create_order_model = Orders(
        reciever_name = order.reciever_name,
        shipping_adress = order.shipping_adress,
        user_id = user.get("id"),
        total_price = 1
    )
    db.add(create_order_model)
    db.commit()

    total_price = 0

    goods_in_basket = []
    goods_in_basket = db.query(Basket).filter(Basket.user_id == user.get("id")).all()
    for good in goods_in_basket:
        goods_info = db.query(Goods).filter(Goods.id == good.goods_id).first()
        order_item = OrderItem(
            goods_id = good.goods_id,
            quantity = good.quantity,
            order_id = create_order_model.order_number,
            price_for_one = goods_info.price
        )
        total_price += good.quantity * (db.query(Goods).filter(Goods.id == good.goods_id).first()).price
        db.add(order_item)
        db.commit()
        change_goods_quantity_model = db.query(Goods).filter(Goods.id == order_item.goods_id).first()
        change_goods_quantity_model.quantity -= order_item.quantity
        db.add(change_goods_quantity_model)
        db.commit()


    create_order_model.total_price = total_price
    db.add(create_order_model)
    db.commit()
    

    user_info = db.query(Users).filter(Users.id == user.get("id")).first()
    if(user_info.email is not None):
        await send_order_details(user_info.email, create_order_model.order_number, db)
    
    #clear_basket
    for good in goods_in_basket:
        db.query(Basket).filter(Basket.user_id == user.get("id")).filter(good.goods_id == Basket.goods_id).delete()
        db.commit()


@router.put("/cancel-order", status_code = status.HTTP_200_OK)
async def cancel_order(db: db_dependancy, user: user_dependency, order_number: int):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site

    order_info = db.query(Orders).filter(Orders.order_number == order_number).filter(Orders.user_id == user.get("id")).first()

    if order_info is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "No such order")

    order_items_to_cancel = []
    order_items_to_cancel = db.query(OrderItem).filter(OrderItem.order_id == order_info.order_number).all()
    for item in order_items_to_cancel:
        add_back_to_goods = item.quantity
        good_model = db.query(Goods).filter(Goods.id == item.goods_id).first()
        good_model.quantity += add_back_to_goods
        db.add(good_model)
        db.commit()

        #db.query(OrderItem).filter(OrderItem.goods_id == item.goods_id).filter(OrderItem.order_id == item.order_id).delete()
        #db.commit()

    #db.query(Orders).filter(Orders.order_number == order_info.order_number).delete()
    order_info.status = "canceled"
    db.add(order_info)
    db.commit()
    user_info = db.query(Users).filter(Users.id == user.get("id")).first()
    if(user_info.email is not None):
        await send_cancel_order_notification(user_info.email, order_info.order_number)
    


@router.put("/edit-user-info", status_code = status.HTTP_202_ACCEPTED)
async def edit_user(db: db_dependancy, user: user_dependency, request: EditUserRequest):
    if user is None or user.get("username") is None:
        return {"message": "Sorry, but at this moment if you want to add good to the basket you need to create accout first"}
        #here I want to add LocalStorage so user can add goods to the basket without registration 
        #and list of the goods will be stored in the local storage even if user closed the site
    user_model = db.query(Users).filter(Users.id == user.get("id")).first()
    permission_to_change_email = False
    permission_to_change_number = False

    if request.first_name != "Empty":
        user_model.first_name = request.first_name

    if request.last_name != "Empty":
        user_model.last_name = request.last_name
    
    if request.shipping_address != "Empty":
        user_model.shipping_address = request.shipping_address


    if request.email != "Empty":
        if check_if_user_enter_email_or_phone_num(request.email) == "Email":
            is_user_with_such_email_exist = db.query(Users).filter(Users.email == request.email).first()
            if request.email == user_model.email or  is_user_with_such_email_exist is None:
                permission_to_change_email = True
            else:
                raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY, detail = "User with such email already exist")
            
    if request.phone_number != "Empty":
        if check_if_user_enter_email_or_phone_num(request.phone_number) == "Phone_number":
            is_user_with_such_number_exist = db.query(Users).filter(Users.phone_number == request.phone_number).first()
            if request.phone_number == user_model.phone_number or is_user_with_such_number_exist is None:
                permission_to_change_number = True
            else:
                raise HTTPException(status_code = status.HTTP_422_UNPROCESSABLE_ENTITY, detail = "User with such phone number already exist")

    
    if request.email and request.email != "Empty":
        if check_if_user_enter_email_or_phone_num(request.email) == "Something wrong with your email or phone number. Please, check if your information is correct":
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "Something wrong with your email. Please, check if your information is correct")
    if request.phone_number and request.phone_number != "Empty":
        if check_if_user_enter_email_or_phone_num(request.phone_number) == "Something wrong with your email or phone number. Please, check if your information is correct":
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "Something wrong with your phone number. Please, check if your information is correct")
    
    if permission_to_change_number == True:
        if request.phone_number != user_model.phone_number:
            user_model.phone_number = request.phone_number
        #need to send verefication SMS

    if permission_to_change_email == True:
        if request.email != user_model.email:
            user_model.email = request.email   
            user_model.is_active = False
            await send_verification_email(request.email)

    db.add(user_model)
    db.commit()

@router.put("/change-password", status_code=status.HTTP_200_OK)
async def change_password(
    user: user_dependency,
    db: db_dependancy,
    request: RecoverPasswordRequest
):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Log in first"
        )

    user_info = db.query(Users).filter(Users.id == user.get("id")).first()
    if user_info is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not bcrypt_context.verify(request.old_password, user_info.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Wrong password"
        )

    user_info.hashed_password = bcrypt_context.hash(request.new_password)
    db.add(user_info)
    db.commit()

    return {"detail": "Password changed successfully"}


@router.get("/search", status_code=status.HTTP_200_OK)
async def search( request: str, db: db_dependancy):
    return db.query(Goods).filter(Goods.name.ilike(f"%{request}%")).all()


@router.post("/post-review", status_code = status.HTTP_200_OK)
async def post_review(db: db_dependancy, user: user_dependency, request: PostReviewRequest):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to made a review you need to create accout first"}

    postRewiew = GoodsRating(
            good_id = request.good_id,
            author_id = user.get("id"),
            comment = request.comment,
            rate = request.rate
        )
    db.add(postRewiew)
    db.commit()


    relative_goods_id = set()
    relative_goods = db.query(GoodsRelatives).filter(GoodsRelatives.good_one == request.good_id).all()

    for good in relative_goods.copy():
        extra_relatives = db.query(GoodsRelatives).filter(GoodsRelatives.good_two == good.good_two).all()
        relative_goods.extend(extra_relatives)

    for good in relative_goods:
        relative_goods_id.add(good.good_one)
        relative_goods_id.add(good.good_two)

    avg_rating = 0
    goods_with_rate = 0
    total_voted = 0
    for id in relative_goods_id:
        rates = db.query(GoodsRating).filter(GoodsRating.good_id == id).all()
        if rates:
            for rate in rates:
                goods_with_rate+=1
                avg_rating+=rate.rate
                total_voted+=1

    avg_rating = avg_rating/total_voted

    for id in relative_goods_id:
        good = db.query(Goods).filter(Goods.id == id).first()
        good.rating = avg_rating
        good.voted = total_voted
        db.commit()

    return {"message":"posted"}
    

@router.get("/user-info", status_code = status.HTTP_200_OK)
async def get_current_user_info(db: db_dependancy, user: user_dependency):
    if user is None:
        return {"message": "Sorry, but at this moment if you want to made a review you need to create accout first"}

    
    user_info = db.query(Users).filter(Users.id == user.get("id")).first()
    return user_info

@router.get("/show-user-orders",status_code= status.HTTP_200_OK )
async def show_users_order(db: db_dependancy, user: user_dependency):
    if user is None :
        raise HTTPException(status_code=401, detail='Authentication Failed')
    order_info_to_return = []
    order_info_to_return = db.query(Orders).filter(Orders.user_id == user.get("id")).all()
    return order_info_to_return

@router.get("/show-order-info/{order_number}",status_code= status.HTTP_200_OK )
async def show_order_info(db: db_dependancy, order_number: int, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    order = db.query(Orders).filter(Orders.order_number == order_number, Orders.user_id == user.get("id")).first()
    if not order:
        raise HTTPException(status_code=404, detail='Order not found')

    order_items = db.query(OrderItem).filter(OrderItem.order_id == order_number).all()
    
    goods = []
    for item in order_items:
        good = db.query(Goods).filter(Goods.id == item.goods_id).first()
        if good:
            goods.append(good)

    return {
        "order": order,
        "order_items": order_items,
        "goods": goods
    }


@router.post("/add-good-to-recently-watched", status_code=status.HTTP_201_CREATED)
async def add_to_recently_watched(user:user_dependency, db: db_dependancy, good_id:Annotated[int, Query(ge=1)]):
    if user is None:

        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    goodInDB = db.query(RecentlyWatchedGoods).filter(RecentlyWatchedGoods.goods_id == good_id, RecentlyWatchedGoods.users_id == user.get("id")).first()

    if(goodInDB):
        # return{"message":"goods already in db"}
        db.delete(goodInDB)
    
    model = RecentlyWatchedGoods(
        goods_id=good_id,
        users_id=user.get("id") 
    )
    db.add(model)
    db.commit()
    return {"message":"Added succesfully"}

@router.get("/get-users-recently-watched-goods", status_code=status.HTTP_200_OK)
async def get_users_recently_watched_goods(user:user_dependency, db: db_dependancy):
    if user is None:

        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    goods = db.query(RecentlyWatchedGoods).filter(RecentlyWatchedGoods.users_id == user.get("id")).all()
    
    goods_ids = [g.goods_id for g in goods]
    
    if not goods_ids:
        return []  
    
    response = db.query(Goods).filter(Goods.id.in_(goods_ids)).all()

    return response