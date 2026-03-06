from datetime import datetime
from typing import Optional

from app.core.firebase import get_firestore_client
from app.schemas.booking import BookingCreate, BookingInDB, StatusEnum


class BookingRepository:
    def __init__(self):
        self._db = get_firestore_client()
        self._collection = self._db.collection("bookings")

    def get_all(self) -> list[BookingInDB]:
        docs = self._collection.stream()
        return [self._parse_doc(doc) for doc in docs]

    def get_by_id(self, booking_id: str) -> Optional[BookingInDB]:
        doc = self._collection.document(booking_id).get()
        if not doc.exists:
            return None
        return self._parse_doc(doc)

    def get_by_user(self, user_id: str) -> list[BookingInDB]:
        docs = self._collection.where("user_id", "==", user_id).stream()
        return [self._parse_doc(doc) for doc in docs]

    def check_conflict(
        self, service_id: str, start_time: datetime, end_time: datetime, exclude_booking_id: str = None
    ) -> bool:
        """
        No Firestore é complexo fazer queries de intersecção perfeitas.
        A abordagem mais segura aqui é trazer todos os agendamentos ativos futuros 
        daquele serviço específico e verificar a sobreposição em memória (Python).
        """
        # Buscamos apenas os não-cancelados do serviço em questão
        docs = (
            self._collection.where("service_id", "==", service_id)
            .where("status", "!=", "cancelled")
            .stream()
        )

        for doc in docs:
            if exclude_booking_id and doc.id == exclude_booking_id:
                continue

            data = doc.to_dict()
            # O Firestore pode retornar datetime com timezone, convertemos para manter consistência
            doc_start = data["start_time"]
            doc_end = data["end_time"]

            # Lógica de intersecção: (StartA < EndB) and (EndA > StartB)
            if start_time < doc_end and end_time > doc_start:
                return True

        return False

    def create(self, user_id: str, booking: BookingCreate) -> BookingInDB:
        doc_ref = self._collection.document()
        now = datetime.now()
        payload = {
            "service_id": booking.service_id,
            "user_id": user_id,
            "start_time": booking.start_time,
            "end_time": booking.end_time,
            "status": "confirmed", # Confirmação imediata por padrão no momento
            "created_at": now,
        }
        doc_ref.set(payload)
        return BookingInDB(id=doc_ref.id, **payload)

    def update_status(self, booking_id: str, status: StatusEnum) -> None:
        self._collection.document(booking_id).update({"status": status})

    def delete(self, booking_id: str) -> None:
        self._collection.document(booking_id).delete()

    def _parse_doc(self, doc) -> BookingInDB:
        data = doc.to_dict()
        return BookingInDB(
            id=doc.id,
            service_id=data["service_id"],
            user_id=data["user_id"],
            start_time=data["start_time"],
            end_time=data["end_time"],
            status=data["status"],
            created_at=data["created_at"],
        )
