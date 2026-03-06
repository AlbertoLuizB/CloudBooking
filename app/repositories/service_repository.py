from typing import Optional

from app.core.firebase import get_firestore_client
from app.schemas.service_model import ServiceCreate, ServiceInDB


class ServiceRepository:
    def __init__(self):
        self._db = get_firestore_client()
        self._collection = self._db.collection("services")

    def get_all(self, only_active: bool = False) -> list[ServiceInDB]:
        query = self._collection
        if only_active:
            query = query.where("is_active", "==", True)
            
        docs = query.stream()
        services = []
        for doc in docs:
            data = doc.to_dict()
            services.append(
                ServiceInDB(
                    id=doc.id,
                    name=data["name"],
                    description=data.get("description"),
                    capacity=data.get("capacity"),
                    is_active=data.get("is_active", True),
                )
            )
        return services

    def get_by_id(self, service_id: str) -> Optional[ServiceInDB]:
        doc = self._collection.document(service_id).get()
        if not doc.exists:
            return None
        data = doc.to_dict()
        return ServiceInDB(
            id=doc.id,
            name=data["name"],
            description=data.get("description"),
            capacity=data.get("capacity"),
            is_active=data.get("is_active", True),
        )

    def create(self, service: ServiceCreate) -> ServiceInDB:
        doc_ref = self._collection.document()
        payload = service.model_dump()
        doc_ref.set(payload)
        return ServiceInDB(id=doc_ref.id, **payload)

    def update(self, service_id: str, updates: dict) -> None:
        doc_ref = self._collection.document(service_id)
        if updates:
            doc_ref.update(updates)

    def delete(self, service_id: str) -> None:
        self._collection.document(service_id).delete()
