from backend.database import Base
from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey, DateTime, CheckConstraint
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import relationship

utc_plus_2 = timezone(timedelta(hours=2))

class Users(Base):
    __tablename__ = 'users'

    id              = Column(Integer, primary_key=True, index=True)
    email           = Column(String, unique=True)
    phone_number    = Column(String, unique=True)
    first_name      = Column(String)
    last_name       = Column(String)
    hashed_password = Column(String)
    is_active       = Column(Boolean, default=True)
    role            = Column(String)
    created_at      = Column(DateTime, default=datetime.now(utc_plus_2))  
    updated_at      = Column(DateTime, default=datetime.now(utc_plus_2), onupdate=datetime.now(utc_plus_2)) 
    avatar_url      = Column(String, nullable=True)
    bio             = Column(String, nullable=True)
    last_login      = Column(DateTime, nullable=True)
    is_verified     = Column(Boolean, default=False)
    shipping_address  = Column(String, nullable=True) 
    billing_address   = Column(String, nullable=True)
    loyalty_points    = Column(Integer, default=0)
    preferred_payment = Column(String, nullable=True) 

class Goods(Base):
    __tablename__ = 'goods'

    id                      = Column(Integer, primary_key=True, index=True)
    name                    = Column(String)
    price                   = Column(Float)
    old_price               = Column(Float)
    description             = Column(String)
    category                = Column(String)
    quantity                = Column(Integer, default=0)
    image_url               = Column(String)
    characteristics_table   = Column(String)
    rating                  = Column(Float, default=0)
    voted                   = Column(Integer, default=0)

    images = relationship("GoodsImage", back_populates="good", cascade="all, delete")
    ratings = relationship("GoodsRating", back_populates="good2", cascade="all, delete")


class GoodsImage(Base):
    __tablename__ = 'goods_images'

    id       = Column(Integer, primary_key=True, index=True)
    url      = Column(String, nullable=False)
    good_id  = Column(Integer, ForeignKey('goods.id'))

    good = relationship("Goods", back_populates="images")

class GoodsRating(Base):
    __tablename__ = 'goods_rating'

    id        = Column(Integer, primary_key=True, index=True)
    rate      = Column(Float, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    comment   = Column(String(300))
    good_id   = Column(Integer, ForeignKey('goods.id'), nullable=False)
    
    good2 = relationship("Goods", back_populates="ratings")


class Smartphones(Base):
    __tablename__ = "smartphones"

    id                      = Column(Integer, primary_key=True, index=True)
    goods_id                = Column(Integer, ForeignKey("goods.id"))
    Display_diagonal        = Column(Float)
    Screen_resolution       = Column(String)
    Screen_type             = Column(String, default=None)
    Screen_refresh_rate     = Column(String, default=None)
    Communication_standards = Column(String)
    Number_of_SIM_cards     = Column(Integer)
    SIM_card_size           = Column(String)
    e_SIM_support           = Column(Boolean)
    Processor_Model         = Column(String, default=None)
    Number_of_Cores         = Column(Integer, default=None)
    RAM                     = Column(String, default=None)
    Built_in_Memory         = Column(String)
    Expandable_Memory       = Column(String, default=None)
    Main_camera             = Column(String, default=None)
    Front_camera            = Column(String, default=None)
    Maximum_video_resolution= Column(String, default=None)
    Stabilization           = Column(String, default=None)
    Wi_Fi_Standards         = Column(String, default=None)
    Bluetooth               = Column(String, default=None)
    Navigation_System       = Column(String, default=None)
    NFC                     = Column(Boolean, default=None)
    USB_Interface           = Column(String, default=None)
    Battery_capacity        = Column(String, default=None)
    Height                  = Column(Float)
    Width                   = Column(Float)
    Depth                   = Column(Float)
    Weight                  = Column(Integer)
    Manufacturer_color      = Column(String)
    Warranty_period         = Column(String) 
    Country_of_manufacture  = Column(String)
    Brand = Column(String)

class Laptops(Base):
    __tablename__ = "laptops"

    id                      = Column(Integer, primary_key=True, index=True)
    goods_id                = Column(Integer, ForeignKey("goods.id"))
    Display_diagonal        = Column(Float)
    Screen_resolution       = Column(String)
    Screen_type             = Column(String, default=None)
    Screen_refresh_rate     = Column(String, default=None)
    Processor_Model         = Column(String)
    Number_of_Cores         = Column(Integer)
    RAM                     = Column(String)
    Built_in_Memory         = Column(String)
    Expandable_Memory       = Column(String, default=None)
    GPU_Model               = Column(String, default=None)
    VRAM                    = Column(String, default=None)
    Main_camera             = Column(String, default=None)
    Front_camera            = Column(String, default=None)
    Maximum_video_resolution= Column(String, default=None)
    Wi_Fi_Standards         = Column(String, default=None)
    Bluetooth               = Column(String, default=None)
    USB_Ports               = Column(String, default=None)
    HDMI_Port               = Column(Boolean, default=None)
    Thunderbolt_Support     = Column(Boolean, default=None)
    Battery_capacity        = Column(String, default=None)
    Battery_life            = Column(String, default=None)
    Height                  = Column(Float)
    Width                   = Column(Float)
    Depth                   = Column(Float)
    Weight                  = Column(Float)
    Manufacturer_color      = Column(String)
    Warranty_period         = Column(String) 
    Country_of_manufacture  = Column(String)
    Brand                   = Column(String)

class Basket(Base):
    __tablename__ = "basket"
    id                      = Column(Integer, primary_key=True, index=True)  
    goods_id                = Column(Integer, ForeignKey("goods.id"))
    user_id                 = Column(Integer, ForeignKey("users.id"))
    quantity                = Column(Integer)
    price_for_the_one       = Column(Float)

class Orders(Base):
    __tablename__ = "orders"

    order_number            = Column(Integer, primary_key=True, index=True)
    user_id                 = Column(Integer, ForeignKey("users.id"))
    reciever_first_name     = Column(String)
    reciever_last_name      = Column(String)
    reciever_phone_number   = Column(String)
    shipping_city           = Column(String)
    nova_post_department    = Column(String)
    total_price             = Column(Float, nullable=False)
    status                  = Column(String, default="pending")
    created_at              = Column(DateTime, default=datetime.now(utc_plus_2))
    updated_at              = Column(DateTime, default=datetime.now(utc_plus_2), onupdate=datetime.now(utc_plus_2))

class OrderItem(Base):
    __tablename__ = "order_item"

    id              = Column(Integer, primary_key=True, index=True)  
    order_id        = Column(Integer, ForeignKey("orders.order_number"))
    goods_id        = Column(Integer, ForeignKey("goods.id"))
    quantity        = Column(Integer)
    price_for_one   = Column(Float)

class BestSellers(Base):
    __tablename__ = "best_sellers"

    id = Column(Integer, primary_key=True, index=True)
    goods_id = Column(Integer, ForeignKey("goods.id"))

class GoodsRelatives(Base):
    __tablename__ = 'goods_relatives'

    id = Column(Integer, primary_key=True, index=True)
    good_one = Column(Integer, ForeignKey('goods.id'), nullable=False)
    good_two = Column(Integer, ForeignKey('goods.id'), nullable=False)
    difference = Column(String, nullable=False)
    diff_value = Column(String, nullable=True)

    good_one_ref = relationship("Goods", foreign_keys=[good_one], backref="related_from")
    good_two_ref = relationship("Goods", foreign_keys=[good_two], backref="related_to")


class RecentlyWatchedGoods(Base):
    __tablename__ = 'recently_watched_goods'

    id                      = Column(Integer, primary_key=True, index=True)  
    goods_id                = Column(Integer, ForeignKey("goods.id"))
    users_id                 = Column(Integer, ForeignKey("users.id"))

class SavedGoods(Base):
    __tablename__ = 'saved_goods'

    id                      = Column(Integer, primary_key=True, index=True)  
    goods_id                = Column(Integer, ForeignKey("goods.id"))
    users_id                 = Column(Integer, ForeignKey("users.id"))