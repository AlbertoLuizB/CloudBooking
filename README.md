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

Atualmente, o back-end encontra-se estruturado e funcional em nível de aplicação.  
A integração com o banco de dados e a infraestrutura em nuvem estão em andamento.

---

# 🏗 Arquitetura

A aplicação segue o seguinte modelo arquitetural:

Client (Front-end)
        ↓
API Layer (Rotas)
        ↓
Service Layer (Regras de Negócio)
        ↓
Repository Layer (Acesso a Dados)
        ↓
Cloud Database (Firebase)

Princípios adotados:

- Separação clara de camadas
- Organização modular
- Código desacoplado
- Persistência externa ao container
- Preparação para ambiente distribuído

---

# 🖥 Back-end

## ✔ Status: Implementado (estrutura base)

### Funcionalidades atuais

- Estrutura modular organizada
- Separação de responsabilidades
- Preparação para autenticação
- Validação de dados
- Estrutura preparada para documentação OpenAPI

---

# 🗄 Banco de Dados (Firebase)

Em desenvolvimento


---

# 🐳 Containerização (Docker)

Em desenvolvimento


---

# ☁ Deploy em Nuvem

Em desenvolvimento


---

# 🎨 Front-end

Em desenvolvimento


---

# 🔄 CI/CD

Em desenvolvimento

---

# 🔐 Segurança

Implementado parcialmente:

- Uso de variáveis de ambiente (.env)
- Separação de configurações
- Estrutura preparada para proteção de rotas

Em desenvolvimento:

- Autenticação completa
- Autorização baseada em perfis
- Estratégia de segregação de ambientes (dev/prod)

---

# 🧪 Testes

Estrutura de testes criada.

Em desenvolvimento:

- Testes automatizados de endpoints
- Testes de regras de negócio
- Evidência de execução para pipeline

---

# 📊 Observabilidade

Em desenvolvimento

Planejado:

- Logs estruturados
- Registro de erros
- Preparação para monitoramento em ambiente cloud

---

# 🎯 Objetivo Técnico

Demonstrar a construção de uma aplicação moderna baseada em:

- Arquitetura escalável
- Serviços gerenciados
- Containerização
- DevOps
- Boas práticas de segurança
- Organização profissional de código

---

# 🚧 Roadmap

- [x] Estrutura base do back-end
- [x] Organização em camadas
- [ ] Integração com Firebase
- [ ] Implementação de autenticação
- [ ] Dockerfile
- [ ] Pipeline CI/CD
- [ ] Deploy em nuvem
- [ ] Desenvolvimento do Front-end

---

# 📜 Licença

Projeto acadêmico desenvolvido para fins educacionais.