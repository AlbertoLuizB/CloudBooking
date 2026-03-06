from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies import get_current_active_user, get_current_admin
from app.schemas.user import UserPublic, UserUpdate
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserPublic])
def get_users(
    current_user: UserPublic = Depends(get_current_admin),
):
    service = UserService()
    return service.get_all_users()


@router.get("/{user_id}", response_model=UserPublic)
def get_user(
    user_id: str,
    current_user: UserPublic = Depends(get_current_active_user),
):
    if current_user.role != "admin" and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: você só pode acessar o seu próprio usuário",
        )
    service = UserService()
    return service.get_user_by_id(user_id)


@router.put("/{user_id}", response_model=UserPublic)
def update_user(
    user_id: str,
    payload: UserUpdate,
    current_user: UserPublic = Depends(get_current_active_user),
):
    if current_user.role != "admin" and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: você só pode alterar o seu próprio usuário",
        )
    service = UserService()
    return service.update_user(user_id, payload)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: str,
    current_user: UserPublic = Depends(get_current_active_user),
):
    if current_user.role != "admin" and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: você só pode deletar o seu próprio usuário",
        )
    service = UserService()
    service.delete_user(user_id)
