import json
from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore

from app.config import get_settings


@lru_cache
def get_firestore_client():
    settings = get_settings()
    if not firebase_admin._apps:
        if settings.firebase_credentials_json:
            # Carrega credenciais direto da variavel de ambiente (Render)
            cred_dict = json.loads(settings.firebase_credentials_json)
            cred = credentials.Certificate(cred_dict)
        elif settings.firebase_credentials_json_path:
            # Carrega do arquivo local (Dev)
            cred = credentials.Certificate(settings.firebase_credentials_json_path)
        else:
            raise ValueError("Firebase credentials missing")

        firebase_admin.initialize_app(
            cred,
            {
                "projectId": settings.firebase_project_id,
            },
        )
    return firestore.client()
