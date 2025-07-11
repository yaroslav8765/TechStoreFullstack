from pydantic_settings import BaseSettings, SettingsConfigDict
import dotenv

dotenv.load_dotenv(verbose=True)

class Settings(BaseSettings):
    API_BASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    MAIL_PASSWORD: str
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="allow",)
    SQLALCHEMY_DATABASE_URL: str
    GOOGLE_AUTH_ID: str

settings = Settings()
