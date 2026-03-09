# Cloud Booking – Sistema de Reservas em Nuvem

Aplicação web baseada em arquitetura em camadas, projetada para execução em ambiente de nuvem com foco em escalabilidade, organização e boas práticas de engenharia de software.

O projeto segue princípios de separação de responsabilidades, arquitetura modular e preparação para DevOps.

---

# 📌 Sobre o Projeto

Este sistema está sendo desenvolvido com objetivo de executar 100% em ambiente cloud, utilizando:

- API RESTful
- Arquitetura em camadas
- Banco de dados gerenciado
- Containerização
- Pipeline CI/CD
- Boas práticas de segurança

Atualmente, o **back-end, o banco de dados nuvem e a infraestrutura de CI/CD** encontram-se estruturados e totalmente funcionais. Apenas o Front-end e o Deploy de Produção ainda estão em andamento.

---

# 🏗 Arquitetura

A aplicação segue o seguinte modelo arquitetural:

Client (Front-end)
        ↓
API Layer (Rotas FastAPI)
        ↓
Service Layer (Regras de Negócio e Anti-Conflito)
        ↓
Repository Layer (Acesso a Dados Otimizado)
        ↓
Cloud Database (Firebase Firestore)

Princípios adotados:

- Separação clara de camadas
- Organização modular
- Código desacoplado
- Persistência externa ao container diretamente no Google Cloud
- Preparação para ambiente distribuído

---

# 🖥 Back-end

## ✔ Status: Implementado 100%

### Funcionalidades atuais

- Estrutura modular organizada
- Separação de responsabilidades (Schemas, Repositories, Services, API)
- Autenticação e Autorização (JWT com `admin` e `user`)
- Validação de dados de alta precisão (Pydantic models)
- Documentação OpenAPI gerada automaticamente (Swagger UI)
- Três rotas CRUD complexas: Perfil, Serviços(Salas) e Reservas(Agendamentos)

---

# 🗄 Banco de Dados (Firebase)

## ✔ Status: Implementado
- Serviço de nuvem integrado: `Google Firebase Firestore`
- Índices múltiplos e repositórios NoSQL

---

# 🐳 Containerização (Docker)

## ✔ Status: Implementado
- Imagem base otimizada baseada no `python:3.12-slim`
- Isolamento por meio de virtualização
- Uso das melhores práticas com `requirements.txt` sem instalação de pacotes de testes/sistema em cache

---

# ☁ Deploy em Nuvem

Em desenvolvimento (Será renderizado e instanciado em nuvem)


---

# 🎨 Front-end

Em desenvolvimento (Interface do usuário consumirá essa API)


---

# 🔄 CI/CD

## ✔ Status: Implementado
- Pipeline de integração contínua (GitHub Actions)
- Disparo automático em requisições de Push nas branches main e feature
- Instalação e Execução de Suíte Automática de Testes de Sanidade do Código (`Pytest` + `TestClient`)

---

# � Segurança

## ✔ Status: Implementado

- Uso restrito de variáveis de ambiente usando `.env` (Protegidas) e validação estrita com `pydantic-settings`
- Chaves protegidas por hashing moderno `bcrypt` na hora da inserção
- Autenticação de tokens `JWT` com tempo útil de expiração
- Proteção e separação de rotas autenticadas por Papéis (`admin` lista todas as salas publicamente e usuários alteram apenas os seus próprios dados sem comprometer o dos outros).

---

# 🧪 Testes

## ✔ Status: Implementado parcialmente (Ambiente setado)
Estrutura de testes criada.

Implementado:
- Testes automatizados de endpoints essenciais e check da saúde do servidor (`/health check`)
- Evidência de execução na pipeline da Nuvem do Github (`green check`)

Em desenvolvimento:
- Expansão dos scripts para cenários de erro da regra de negócio (Reservas Passadas/Conflitos Simulados)

---

# 📊 Observabilidade

## ✔ Status: Implementado

- Padrões de logs estruturados utilizando o `logging_config.py`. Exposição limpa de todas as transações HTTP nativas por requisição (Start and End) identificadas e unificadas sem comprometer variáveis seguras.

Planejado:
- Retenção de logs via nuvem

---

# � Objetivo Técnico

Demonstrar a construção de uma aplicação moderna baseada em:

- Arquitetura escalável
- Serviços gerenciados (IaaS/PaaS)
- Containerização Avançada
- Cultura DevOps e Automação
- Boas práticas inabaláveis de segurança
- Organização profissional de código e design Patterns.

---

# 🚧 Roadmap

- [x] Estrutura base do back-end
- [x] Organização em camadas
- [x] Integração com Firebase
- [x] Implementação de autenticação (e autorização role-based)
- [x] Dockerfile
- [x] Pipeline CI/CD com Testes em Nuvem
- [ ] Deploy em nuvem pública externa (Back-end production mode)
- [ ] Desenvolvimento do Front-end e Consumo de API

---

# 📜 Licença

Projeto acadêmico desenvolvido para fins educacionais.