from fastapi import HTTPException, status

from app.core.security import hash_password
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserInDB, UserPublic, UserUpdate


class UserService:
    def __init__(self, user_repo: UserRepository | None = None):
        self.user_repo = user_repo or UserRepository()

    def get_all_users(self) -> list[UserPublic]:
        users_db = self.user_repo.get_all()
        return [
            UserPublic(
                id=u.id, email=u.email, full_name=u.full_name, role=u.role
            )
            for u in users_db
        ]

    def get_user_by_id(self, user_id: str) -> UserPublic:
        user = self.user_repo.get_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado"
            )
        return UserPublic(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
        )

    def update_user(self, user_id: str, updates: UserUpdate) -> UserPublic:
        # Verifica se existe
        self.get_user_by_id(user_id)

        update_data = updates.model_dump(exclude_unset=True)

        # Se houver senha, faz o hash antes de salvar
        if "password" in update_data:
            update_data["password_hash"] = hash_password(update_data.pop("password"))

        self.user_repo.update_user(user_id, update_data)
        return self.get_user_by_id(user_id)

    def delete_user(self, user_id: str) -> None:
        # Verifica se existe
        self.get_user_by_id(user_id)
        self.user_repo.delete_user(user_id)
