from typing import Optional

from app.core.firebase import get_firestore_client
from app.core.security import hash_password
from app.schemas.user import Role, UserCreate, UserInDB


class UserRepository:
    def __init__(self):
        self._db = get_firestore_client()
        self._collection = self._db.collection("users")

    def get_by_email(self, email: str) -> Optional[UserInDB]:
        docs = self._collection.where("email", "==", email).limit(1).stream()
        for doc in docs:
            data = doc.to_dict()
            return UserInDB(
                id=doc.id,
                email=data["email"],
                full_name=data.get("full_name"),
                role=data.get("role", "user"),
                password_hash=data["password_hash"],
            )
        return None

    def get_by_id(self, user_id: str) -> Optional[UserInDB]:
        doc = self._collection.document(user_id).get()
        if not doc.exists:
            return None
        data = doc.to_dict()
        return UserInDB(
            id=doc.id,
            email=data["email"],
            full_name=data.get("full_name"),
            role=data.get("role", "user"),
            password_hash=data["password_hash"],
        )

    def create_user(self, user: UserCreate, role: Role = "user") -> UserInDB:
        doc_ref = self._collection.document()
        password_hash = hash_password(user.password)
        payload = {
            "email": user.email,
            "full_name": user.full_name,
            "role": role,
            "password_hash": password_hash,
        }
        doc_ref.set(payload)
        return UserInDB(
            id=doc_ref.id,
            email=user.email,
            full_name=user.full_name,
            role=role,
            password_hash=password_hash,
        )

    def get_all(self) -> list[UserInDB]:
        users = []
        docs = self._collection.stream()
        for doc in docs:
            data = doc.to_dict()
            users.append(
                UserInDB(
                    id=doc.id,
                    email=data["email"],
                    full_name=data.get("full_name"),
                    role=data.get("role", "user"),
                    password_hash=data["password_hash"],
                )
            )
        return users

    def update_user(self, user_id: str, updates: dict) -> None:
        doc_ref = self._collection.document(user_id)
        if updates:
            doc_ref.update(updates)

    def delete_user(self, user_id: str) -> None:
        doc_ref = self._collection.document(user_id)
        doc_ref.delete()

