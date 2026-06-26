MTNA Blog – Projeto Final IEFP
Aplicação Web com Frontend + Backend + Base de Dados MySQL

1.  Objetivo do Projeto

    O objetivo deste projeto é desenvolver uma aplicação web completa — Blog MTNA — que permite:

Visualizar artigos de matemática

Filtrar por tópicos/categorias

Enviar mensagens de contacto

Gerir conteúdos através de um Painel de Administração

Criar, editar e apagar posts e tópicos

Guardar mensagens de contacto na base de dados

O projeto inclui Frontend, Backend (Node.js/Express) e Base de Dados MySQL.

2.  Tecnologias Utilizadas

Frontend

HTML5

CSS3

JavaScript (Fetch API)

Backend

Node.js

Express.js

Nodemon (ambiente de desenvolvimento)

Base de Dados

MySQL

MySQL Workbench

3. Estrutura do Projeto

projeto-final/
│
├── frontend/
│ ├── indexmtna.html
│ ├── blogmtna.html
│ ├── galmtna.html
│ ├── sobrmtna.html
│ ├── contmtna.html
│ ├── topicos.html
│ ├── style.css
│ └── app.js
 
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
│ ├── .env.example
│ └── database.sql ← exportado do MySQL
│
└── README.md

4. Instalação das Dependências (Backend)
   4.1 Abrir o terminal na pasta backend:

cd backend

    4.2 Instalar dependências:

npm install

5. Configuração do Ficheiro .env

Criar um ficheiro .env dentro da pasta backend com:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD= A_TUA_PASSWORD
DB_NAME=mtna_blog_db
PORT=3000

O ficheiro .env.example está incluído como referência.

6.  Importar a Base de Dados

    6.1 Abrir MySQL Workbench

    6.2 Ir a Server → Data Import

    6.3 Escolher o ficheiro:

backend/database.sql

    6.4 Importar estrutura + dados

7. Como Executar o Backend

Dentro da pasta backend:

Desenvolvimento (com nodemon):

npm run dev

Produção:

node server.js

O servidor ficará disponível em:

http://localhost:3000.

8. Como Abrir o Frontend

Basta abrir o ficheiro:

frontend/indexmtna.html
ou qualquer outra página HTML.

9. Rotas da API (Backend)

Mensagens de Contacto

| Método | Rota               | Descrição                |
| ------ | ------------------ | ------------------------ |
| GET    | /api/contactos     | Lista todas as mensagens |
| GET    | /api/contactos/:id | Obtém uma mensagem       |
| POST   | /api/contactos     | Cria nova mensagem       |
| PUT    | /api/contactos/:id | Atualiza mensagem        |
| DELETE | /api/contactos/:id | Apaga mensagem           |

10. Exemplos de Requests

    POST /api/contactos

    {
    "nome": "Maria",
    "email": "maria@example.com",
    "mensagem": "Olá, gostei do blog!"
    }

    PUT /api/contactos/1

    {
    "nome": "Maria Atualizada",
    "email": "maria@example.com",
    "mensagem": "Mensagem atualizada"
    }

11. Testes no Postman

    Selecionar método correto (GET, POST, PUT, DELETE)

Para POST/PUT → Body → raw → JSON

URL base:

http://localhost:3000/api/

12. Notas Finais

    O projeto foi desenvolvido como Projeto Final do Curso de Técnico/a de Informática – Instalação e Gestão de Redes (IEFP).

    Todo o código foi organizado, validado e testado.

    A base de dados foi exportada e incluída no projeto.

    O backend e o frontend comunicam via Fetch API.

13. Autoria

    Projeto desenvolvido por:

    Maria Teresa Neves Antunes  
     Aveiro, 25/06/2026.
