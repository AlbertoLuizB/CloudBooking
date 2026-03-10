from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "development"
    app_name: str = "cloud-booking-api"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60

    firebase_project_id: str
    firebase_credentials_json_path: str | None = None
    firebase_credentials_json: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        case_sensitive=False
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()

