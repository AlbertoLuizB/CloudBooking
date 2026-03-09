from fastapi import APIRouter, Depends, status

from app.dependencies import get_current_active_user, get_current_admin
from app.schemas.service_model import ServiceCreate, ServicePublic, ServiceUpdate
from app.schemas.user import UserPublic
from app.services.service_logic import ServiceLogic

router = APIRouter(prefix="/services", tags=["services"])


@router.post("/", response_model=ServicePublic, status_code=status.HTTP_201_CREATED)
def create_service(
    payload: ServiceCreate,
    current_admin: UserPublic = Depends(get_current_admin),
):
    logic = ServiceLogic()
    return logic.create_service(payload)


@router.get("/", response_model=list[ServicePublic])
def get_services(
    only_active: bool = False,
    current_user: UserPublic = Depends(get_current_active_user),
):
    logic = ServiceLogic()
    return logic.get_all_services(only_active=only_active)


@router.get("/{service_id}", response_model=ServicePublic)
def get_service(
    service_id: str,
    current_user: UserPublic = Depends(get_current_active_user),
):
    logic = ServiceLogic()
    return logic.get_service_by_id(service_id)


@router.put("/{service_id}", response_model=ServicePublic)
def update_service(
    service_id: str,
    payload: ServiceUpdate,
    current_admin: UserPublic = Depends(get_current_admin),
):
    logic = ServiceLogic()
    return logic.update_service(service_id, payload)


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: str,
    current_admin: UserPublic = Depends(get_current_admin),
):
    logic = ServiceLogic()
    logic.delete_service(service_id)
