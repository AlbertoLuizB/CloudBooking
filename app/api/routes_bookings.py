from fastapi import APIRouter, Depends, status

from app.dependencies import get_current_active_user, get_current_admin
from app.schemas.booking import BookingCreate, BookingPublic
from app.schemas.user import UserPublic
from app.services.booking_service import BookingService

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("/", response_model=BookingPublic, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookingCreate,
    current_user: UserPublic = Depends(get_current_active_user),
):
    service = BookingService()
    return service.create_booking(user_id=current_user.id, booking_in=payload)


@router.get("/", response_model=list[BookingPublic])
def get_my_bookings(
    current_user: UserPublic = Depends(get_current_active_user),
):
    """
    Se for ADMIN, poderia retornar tudo (ou criar uma rota diferente). 
    Aqui o padrão é retornar as reservas do próprio usuário que está logando.
    """
    service = BookingService()
    if current_user.role == "admin":
        return service.get_all_bookings()
    return service.get_user_bookings(user_id=current_user.id)


@router.get("/{booking_id}", response_model=BookingPublic)
def get_booking(
    booking_id: str,
    current_user: UserPublic = Depends(get_current_active_user),
):
    service = BookingService()
    # O service se certificará de que o usuário só consiga cancelar a dele (fazemos checks parecidos no get)
    # Por simplicidade, a view pode obter qualquer reserva (desde que sejas admin ou o dono)
    booking = service.get_booking_by_id(booking_id)
    if current_user.role != "admin" and booking.user_id != current_user.id:
         from fastapi import HTTPException
         raise HTTPException(
             status_code=status.HTTP_403_FORBIDDEN,
             detail="Acesso Negado",
         )
    return booking


@router.put("/{booking_id}/cancel", response_model=BookingPublic)
def cancel_booking(
    booking_id: str,
    current_user: UserPublic = Depends(get_current_active_user),
):
    service = BookingService()
    return service.cancel_booking(
        booking_id=booking_id, 
        requesting_user_id=current_user.id, 
        is_admin=(current_user.role == "admin")
    )
