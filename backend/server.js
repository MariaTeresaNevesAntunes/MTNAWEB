// ===============================
//  CARREGAR VARIÁVEIS DE AMBIENTE
// ===============================
require("dotenv").config();

// ===============================
//  IMPORTAÇÕES
// ===============================
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

// ===============================
//  CONFIGURAÇÃO DO EXPRESS
// ===============================
const app = express();
app.use(express.json());
app.use(cors());

// ===============================
//  SERVIR O FRONTEND
// ===============================
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "indexmtna.html"));
});

// ===============================
//  LIGAÇÃO À BASE DE DADOS
// ===============================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao ligar à BD:", err);
  } else {
    console.log("Ligação MySQL bem-sucedida!");
  }
});

// ===============================
//  CRUD — POSTS
// ===============================

// LISTAR POSTS
app.get("/api/posts", (req, res) => {
  const sql = "SELECT * FROM posts ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao obter posts" });
    res.json(results);
  });
});

// OBTER 1 POST
app.get("/api/posts/:id", (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao obter post" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post não encontrado" });
    res.json(results[0]);
  });
});

// CRIAR POST
app.post("/api/posts", (req, res) => {
  const { titulo, categoria, conteudo, data, imagem } = req.body;

  if (!titulo || !categoria || !conteudo || !data) {
    return res.status(400).json({ error: "Campos obrigatórios em falta" });
  }

  const sql =
    "INSERT INTO posts (titulo, categoria, conteudo, data, imagem) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [titulo, categoria, conteudo, data, imagem || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erro ao criar post" });
      res.json({ message: "Post criado com sucesso", id: result.insertId });
    },
  );
});

// EDITAR POST
app.put("/api/posts/:id", (req, res) => {
  const { titulo, categoria, conteudo, data, imagem } = req.body;

  const sql = `
    UPDATE posts 
    SET titulo = ?, categoria = ?, conteudo = ?, data = ?, imagem = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [titulo, categoria, conteudo, data, imagem || null, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar post" });
      res.json({ message: "Post atualizado com sucesso" });
    },
  );
});

// APAGAR POST
app.delete("/api/posts/:id", (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao apagar post" });
    res.json({ message: "Post apagado com sucesso" });
  });
});

// ===============================
//  CONTACTOS — GUARDAR MENSAGEM
// ===============================
app.post("/api/contactos", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const sql =
    "INSERT INTO mensagens_contacto (nome, email, mensagem) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, mensagem], (err) => {
    if (err) {
      console.error("Erro ao guardar mensagem:", err);
      return res.status(500).json({ erro: "Erro ao guardar mensagem." });
    }

    res.json({ sucesso: true, mensagem: "Mensagem enviada com sucesso!" });
  });
});

// LISTAR CONTACTOS
app.get("/api/contactos", (req, res) => {
  const sql = "SELECT * FROM mensagens_contacto ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao obter mensagens" });
    res.json(results);
  });
});

// APAGAR CONTACTO
app.delete("/api/contactos/:id", (req, res) => {
  const sql = "DELETE FROM mensagens_contacto WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao apagar mensagem" });
    res.json({ sucesso: true });
  });
});

// ===============================
//  TÓPICOS — CRUD
// ===============================

// LISTAR TÓPICOS
app.get("/api/topicos", (req, res) => {
  const sql = "SELECT * FROM topicos ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao obter tópicos" });
    res.json(results);
  });
});

// CRIAR TÓPICO
app.post("/api/topicos", (req, res) => {
  const { titulo, categoria, descricao, nivel } = req.body;

  const sql = `
    INSERT INTO topicos (titulo, categoria, descricao, nivel)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [titulo, categoria, descricao, nivel], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao criar tópico" });
    res.json({ sucesso: true, id: result.insertId });
  });
});

// APAGAR TÓPICO
app.delete("/api/topicos/:id", (req, res) => {
  const sql = "DELETE FROM topicos WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao apagar tópico" });
    res.json({ sucesso: true });
  });
});

// ===============================
//  INICIAR SERVIDOR
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
