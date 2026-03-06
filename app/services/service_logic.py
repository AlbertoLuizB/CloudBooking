from fastapi import HTTPException, status

from app.repositories.service_repository import ServiceRepository
from app.schemas.service_model import ServiceCreate, ServicePublic, ServiceUpdate


class ServiceLogic:
    def __init__(self, repo: ServiceRepository | None = None):
        self.repo = repo or ServiceRepository()

    def create_service(self, service_in: ServiceCreate) -> ServicePublic:
        created = self.repo.create(service_in)
        return ServicePublic(**created.model_dump())

    def get_all_services(self, only_active: bool = False) -> list[ServicePublic]:
        services = self.repo.get_all(only_active=only_active)
        return [ServicePublic(**s.model_dump()) for s in services]

    def get_service_by_id(self, service_id: str) -> ServicePublic:
        service = self.repo.get_by_id(service_id)
        if not service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Serviço não encontrado"
            )
        return ServicePublic(**service.model_dump())

    def update_service(self, service_id: str, updates: ServiceUpdate) -> ServicePublic:
        # Verifica se existe
        self.get_service_by_id(service_id)
        
        update_data = updates.model_dump(exclude_unset=True)
        self.repo.update(service_id, update_data)
        
        return self.get_service_by_id(service_id)

    def delete_service(self, service_id: str) -> None:
        # Verifica se existe
        self.get_service_by_id(service_id)
        self.repo.delete(service_id)
