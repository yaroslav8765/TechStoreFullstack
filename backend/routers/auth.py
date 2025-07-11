from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import or_
from starlette import status
from pydantic import BaseModel, Field, EmailStr
from ..models import Users
from passlib.context import CryptContext
from jose import jwt, JWTError
from ..routers.email_actions.email_verification import send_verification_email
from ..routers.email_actions.email_mailing import send_recover_password_email, decode_verification_token_for_the_password_recover
from ..config import settings
from typing import Optional
from pydantic import EmailStr, HttpUrl
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from ..config import settings
import phonenumbers
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type

from email_validator import validate_email

utc_plus_2 = timezone(timedelta(hours=2))


router = APIRouter(
    prefix = "/auth",
    tags=["auth"]
)

bcrypt_context = CryptContext(schemes=["bcrypt"],deprecated = "auto") 
oauth2_bearer = OAuth2PasswordBearer(tokenUrl = "auth/token")

class LoginWithGoogleModel(BaseModel):
    sub: str
    email: EmailStr
    email_verified: bool
    name: str
    picture: HttpUrl
    id_token: str


class CreateUserRequest(BaseModel):
    email_or_phone_number: str
    first_name: Optional[str] = Field(default=None, min_length=2, max_length=30)
    last_name: Optional[str] = Field(default=None, min_length=2, max_length=50)       
    password: str      

class Token(BaseModel):
    access_token: str
    token_type: str

class RecoverSetNewPassword(BaseModel):
    token:str
    new_password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
#По сути, мы тут создаём зависимость, которая будет возвращать объект сессии, который мы будем использовать в запросах к БД.
db_dependancy = Annotated[Session, Depends(get_db)]
#Это аннотация, которая говорит FastAPI, что это зависимость, которая возвращает объект сессии.

def authenticate_user(login: str, password: str, db: db_dependancy):
    user = db.query(Users).filter(or_(Users.email == login, Users.phone_number == login)).first()
    if user is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "User not found")
    if not bcrypt_context.verify(password, user.hashed_password): 
        raise HTTPException(status_code = status.HTTP_406_NOT_ACCEPTABLE, detail = "Wrong password")
    return user

def create_access_token(login: str, user_id:str, role:str, expires_delta: timedelta):
    encode = {"sub": login, "id": user_id, "role": role}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, settings.SECRET_KEY, algorithm = settings.ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try: 
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms = [settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        user_role: str = payload.get("role")
        if username is None or user_id is None:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not validate user err 1")
        return {"username":username, "id":user_id, "role":user_role}
    except JWTError:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not validate user. JWTError")

async def get_current_user_with_str_token(token: str):
    try: 
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms = [settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        user_role: str = payload.get("role")
        if username is None or user_id is None:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not validate user err 1")
        return {"username":username, "id":user_id, "role":user_role}
    except JWTError:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Could not validate user. JWTError")

def check_if_user_enter_email_or_phone_num(login: str):
    try:
        if carrier._is_mobile(number_type(phonenumbers.parse(login))):
            return "Phone_number"
    except:
        try:
            email = validate_email(login)
            return "Email"
        except:
            return "Something wrong with your email or phone number. Please, check if your information is correct"

############END POINTS############
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

@router.post("/create-user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependancy, new_user_request: CreateUserRequest):

    user_enter = check_if_user_enter_email_or_phone_num(new_user_request.email_or_phone_number)

    if user_enter == "Email":
        check_user = db.query(Users).filter(Users.email == new_user_request.email_or_phone_number).first()

        if check_user is not None:
            if not check_user.is_active:
                await send_verification_email(new_user_request.email_or_phone_number)
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Please verify your e-mail. We've sent you an activation email again"
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User with such email already exists"
                )

        await send_verification_email(new_user_request.email_or_phone_number)

        create_user_model = Users(
            email=new_user_request.email_or_phone_number,
            first_name=new_user_request.first_name,
            last_name=new_user_request.last_name,
            hashed_password=bcrypt_context.hash(new_user_request.password),
            role="user",
            is_active=False
        )

        db.add(create_user_model)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

    elif user_enter == "Phone_number":
        check_user = db.query(Users).filter(Users.phone_number == new_user_request.email_or_phone_number).first()
        if check_user is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with such phone number already exists"
            )

        create_user_model = Users(
            phone_number=new_user_request.email_or_phone_number,
            first_name=new_user_request.first_name,
            last_name=new_user_request.last_name,
            hashed_password=bcrypt_context.hash(new_user_request.password),
            role="user",
            is_active=False
        )

        db.add(create_user_model)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this phone number already exists"
            )

    else:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="User entered an invalid phone number or email"
        )



@router.post("/token/", response_model=Token)
async def login_for_access_token(form_data : Annotated[OAuth2PasswordRequestForm, Depends()], db : db_dependancy):

    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,  detail = "Could not validate user")
    if(user.is_active == True):
        if(user.email is not None):
            token = create_access_token(user.email, user.id, user.role, timedelta(minutes = 200))
        elif(user.phone_number is not None):
            token = create_access_token(user.phone_number, user.id, user.role, timedelta(minutes = 200))
        
        return {"access_token":token, "token_type":"bearer"}
    elif(user.is_active == False):
        return {"message": "Please,  activate your account"}

@router.post("/login-with-google", response_model=Token)
async def login_with_google(request: LoginWithGoogleModel, db: db_dependancy):
    try:
        idinfo = id_token.verify_oauth2_token(
            request.id_token,
            google_requests.Request(),
            settings.GOOGLE_AUTH_ID
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google ID token"
        )

    if not idinfo.get("email_verified"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email is not verified"
        )

    if idinfo["sub"] != request.sub or idinfo["email"] != request.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID token does not match request payload"
        )

    userInfo = db.query(Users).filter(idinfo["email"] == Users.email).first()

    if(userInfo is None):
        create_user_model = Users(
            email=idinfo["email"],
            first_name=idinfo["name"],
            last_name="",
            hashed_password="Google",
            role="user",
            is_active=True
        )

        db.add(create_user_model)
        db.commit()
        db.refresh(create_user_model)
        token = create_access_token(create_user_model.email, create_user_model.id, create_user_model.role, timedelta(minutes = 200))
        return {"access_token":token, "token_type":"bearer"} 

    if(userInfo):
        token = create_access_token(userInfo.email, userInfo.id, userInfo.role, timedelta(minutes = 200))
        return {"access_token":token, "token_type":"bearer"} 


@router.get("/recover-password", status_code = status.HTTP_200_OK)
async def recover_password(db: db_dependancy, login: str):

    if check_if_user_enter_email_or_phone_num(login) == "Phone_number":
        user_info = db.query(Users).filter(Users.phone_number == login).first()
        if user_info is None:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "User with such phone number doesn`t exist")

    elif check_if_user_enter_email_or_phone_num(login) == "Email":
        user_info = db.query(Users).filter(Users.email == login).first()
        if user_info is None:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "User with such email doesn`t exist")
            
    elif check_if_user_enter_email_or_phone_num(login) == "Something wrong with your email or phone number. Please, check if your information is correct":
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "Invalid e-mail or password")

    await send_recover_password_email(user_info.id, user_info.hashed_password, user_info.email)

    
@router.put("/recover-set-new-password", status_code = status.HTTP_200_OK)
async def set_new_recovered_passwoed(db: db_dependancy, request: RecoverSetNewPassword):
    user_id, hashed_password = decode_verification_token_for_the_password_recover(request.token)
    #return [{"user_id":user_id, "hashed_password": hashed_password}]

    user_info = db.query(Users).filter(Users.id == user_id, Users.hashed_password == hashed_password).first()

    user_info.hashed_password = bcrypt_context.hash(request.new_password)
    #test str
    db.commit()