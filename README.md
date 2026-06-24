Maria Teresa…  
vamos fazer um **README.md profissional**, bonito, organizado e exatamente no formato que o formador espera ver.  
Este README explica tudo: instalação, endpoints, tecnologias, estrutura e testes.

Podes copiar e colar diretamente no GitHub ou entregar em PDF.

---

# ⭐ **README.md — Projeto Final IEFP (Versão Profissional)**

```markdown
# 📘 Projeto Final — API REST com Node.js, Express e MySQL

Este projeto consiste na criação de uma API REST completa para gerir **Posts**, **Tópicos** e **Contactos**, desenvolvida com **Node.js**, **Express** e **MySQL**.  
Inclui operações CRUD completas e foi testado com Postman.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL (mysql2/promise)**
- **CORS**
- **Postman** (para testes)
- **JavaScript ES6**

---

## 📂 Estrutura do Projeto
```

server.js
│
├── Conexão MySQL
├── Middlewares (express.json, cors)
│
├── Rotas POSTS
│ ├── GET /api/posts
│ ├── GET /api/posts/:id
│ ├── POST /api/posts
│ ├── PUT /api/posts/:id
│ └── DELETE /api/posts/:id
│
├── Rotas TOPICOS
│ ├── GET /api/topicos
│ ├── GET /api/topicos/:id
│ ├── POST /api/topicos
│ ├── PUT /api/topicos/:id
│ └── DELETE /api/topicos/:id
│
├── Rotas CONTACTOS
│ ├── GET /api/contactos
│ ├── GET /api/contactos/:id
│ ├── POST /api/contactos
│ ├── PUT /api/contactos/:id
│ └── DELETE /api/contactos/:id
│
└── app.listen(...)

````

---

## 🗄️ Base de Dados

### Tabela: **posts**

| Campo      | Tipo         |
|------------|--------------|
| id         | INT PK AI    |
| titulo     | VARCHAR(255) |
| categoria  | VARCHAR(255) |
| conteudo   | TEXT         |
| data_criacao | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

---

### Tabela: **topicos**

| Campo      | Tipo         |
|------------|--------------|
| id         | INT PK AI    |
| titulo     | VARCHAR(255) |
| categoria  | VARCHAR(255) |
| descricao  | TEXT         |
| nivel      | VARCHAR(50)  |
| data_criacao | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

---

### Tabela: **mensagens_contacto**

| Campo      | Tipo         |
|------------|--------------|
| id         | INT PK AI    |
| nome       | VARCHAR(255) |
| email      | VARCHAR(255) |
| mensagem   | TEXT         |
| data_envio | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

---

## ⚙️ Instalação

1. Clonar o repositório:
```bash
git clone <url-do-repo>
````

2. Instalar dependências:

```bash
npm install
```

3. Configurar a base de dados no MySQL:

```sql
CREATE DATABASE blog_mtna;
```

4. Criar as tabelas (posts, topicos, mensagens_contacto).

5. Iniciar o servidor:

```bash
node server.js
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 📡 Endpoints da API

### 📌 POSTS

| Método | Endpoint       | Descrição    |
| ------ | -------------- | ------------ |
| GET    | /api/posts     | Listar todos |
| GET    | /api/posts/:id | Obter por ID |
| POST   | /api/posts     | Criar novo   |
| PUT    | /api/posts/:id | Atualizar    |
| DELETE | /api/posts/:id | Apagar       |

---

### 📌 TÓPICOS

| Método | Endpoint         | Descrição    |
| ------ | ---------------- | ------------ |
| GET    | /api/topicos     | Listar todos |
| GET    | /api/topicos/:id | Obter por ID |
| POST   | /api/topicos     | Criar novo   |
| PUT    | /api/topicos/:id | Atualizar    |
| DELETE | /api/topicos/:id | Apagar       |

---

### 📌 CONTACTOS

| Método | Endpoint           | Descrição          |
| ------ | ------------------ | ------------------ |
| GET    | /api/contactos     | Listar todos       |
| GET    | /api/contactos/:id | Obter por ID       |
| POST   | /api/contactos     | Criar mensagem     |
| PUT    | /api/contactos/:id | Atualizar mensagem |
| DELETE | /api/contactos/:id | Apagar mensagem    |

---

## 🧪 Testes com Postman

Todos os endpoints foram testados com:

- GET (listar e obter por ID)
- POST (criação)
- PUT (edição)
- DELETE (remoção)

As respostas retornam sempre JSON estruturado.

---

## 🏁 Conclusão

Este projeto cumpre todos os requisitos do módulo:

✔ CRUD completo  
✔ API REST funcional  
✔ MySQL integrado  
✔ Testado no Postman  
✔ Código organizado e profissional

```

```
