from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_health_check_returns_200():
    """
    Testa se a API está online e respondendo rotas públicas 
    sem necessidade de autenticação no Firebase.
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
