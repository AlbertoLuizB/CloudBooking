from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.repositories.booking_repository import BookingRepository
from app.repositories.service_repository import ServiceRepository
from app.schemas.booking import BookingCreate, BookingPublic


class BookingService:
    def __init__(
        self,
        booking_repo: BookingRepository | None = None,
        service_repo: ServiceRepository | None = None,
    ):
        self.booking_repo = booking_repo or BookingRepository()
        self.service_repo = service_repo or ServiceRepository()

    def get_all_bookings(self) -> list[BookingPublic]:
        bookings = self.booking_repo.get_all()
        return [BookingPublic(**b.model_dump()) for b in bookings]

    def get_user_bookings(self, user_id: str) -> list[BookingPublic]:
        bookings = self.booking_repo.get_by_user(user_id)
        return [BookingPublic(**b.model_dump()) for b in bookings]

    def get_booking_by_id(self, booking_id: str) -> BookingPublic:
        booking = self.booking_repo.get_by_id(booking_id)
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Reserva não encontrada"
            )
        return BookingPublic(**booking.model_dump())

    def create_booking(self, user_id: str, booking_in: BookingCreate) -> BookingPublic:
        # 1. Validação Básica de Tempo
        # Se os datetimes vierem sem timezone, assumimos UTC ou local. Ideal forçar conversão para UTC na API real, 
        # mas aqui faremos a comparação crua por enquanto. Assegurando que end > start
        if booking_in.start_time >= booking_in.end_time:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O término da reserva deve ser posterior ao início.",
            )

        now = datetime.now(timezone.utc)
        start_utc = booking_in.start_time.replace(tzinfo=timezone.utc) if booking_in.start_time.tzinfo is None else booking_in.start_time
        if start_utc < now:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Não é possível fazer reservas no passado.",
            )

        # 2. Verificar se o serviço existe e está ativo
        service = self.service_repo.get_by_id(booking_in.service_id)
        if not service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Serviço inexistente."
            )
        if not service.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Este serviço não está disponível para reservas no momento.",
            )

        # 3. VALIDAÇÃO DE CONFLITO
        # Removemos os timezones temporariamente apenas para o Firestore check simplificado se precisar, 
        # mas Firestore lida com offset timezone nativamente se injetado.
        has_conflict = self.booking_repo.check_conflict(
            service_id=booking_in.service_id,
            start_time=booking_in.start_time,
            end_time=booking_in.end_time,
        )

        if has_conflict:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Conflito de horário: este serviço já possui uma reserva confirmada para este período.",
            )

        # 4. Criar
        created = self.booking_repo.create(user_id, booking_in)
        return BookingPublic(**created.model_dump())

    def cancel_booking(self, booking_id: str, requesting_user_id: str, is_admin: bool) -> BookingPublic:
        booking = self.get_booking_by_id(booking_id)

        if not is_admin and booking.user_id != requesting_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Você não tem permissão para cancelar a reserva de outra pessoa.",
            )

        if booking.status == "cancelled":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Esta reserva já foi cancelada.",
            )

        self.booking_repo.update_status(booking_id, "cancelled")
        return self.get_booking_by_id(booking_id)
