// ===============================
//  VARIÁVEIS DE AMBIENTE
// ===============================
require("dotenv").config();

// ===============================
//  IMPORTAÇÕES
// ===============================
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

// ===============================
//  EXPRESS
// ===============================
const app = express();
app.use(express.json());
app.use(cors());

// ===============================
//  SERVIR FRONTEND
// ===============================
const frontendRoot = path.join(__dirname, "..");

app.use(express.static(frontendRoot));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendRoot, "index.html"));
});

// ===============================
//  LIGAÇÃO À BASE DE DADOS
// ===============================
let db;

(async () => {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
    });

    console.log("Ligação MySQL bem-sucedida!");
  } catch (err) {
    console.error("Erro ao ligar à BD:", err);
  }
})();

// ===============================
//  CRUD — POSTS
// ===============================

// LISTAR POSTS
app.get("/api/posts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Erro ao obter posts" });
  }
});

// OBTER 1 POST
app.get("/api/posts/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Post não encontrado" });

    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Erro ao obter post" });
  }
});

// CRIAR POST
app.post("/api/posts", async (req, res) => {
  const { titulo, categoria, conteudo, data, imagem } = req.body;

  if (!titulo || !categoria || !conteudo || !data)
    return res.status(400).json({ error: "Campos obrigatórios em falta" });

  try {
    const sql =
      "INSERT INTO posts (titulo, categoria, conteudo, data, imagem) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      titulo,
      categoria,
      conteudo,
      data,
      imagem || null,
    ]);

    res.json({ message: "Post criado com sucesso", id: result.insertId });
  } catch {
    res.status(500).json({ error: "Erro ao criar post" });
  }
});

// APAGAR POST
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post apagado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao apagar post" });
  }
});

// ===============================
//  CONTACTOS
// ===============================

// GUARDAR MENSAGEM
app.post("/api/contactos", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem)
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });

  try {
    await db.query(
      "INSERT INTO mensagens_contacto (nome, email, mensagem) VALUES (?, ?, ?)",
      [nome, email, mensagem],
    );

    res.json({ sucesso: true, mensagem: "Mensagem enviada com sucesso!" });
  } catch {
    res.status(500).json({ erro: "Erro ao guardar mensagem." });
  }
});

// LISTAR CONTACTOS
app.get("/api/contactos", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM mensagens_contacto ORDER BY id DESC",
    );
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao obter mensagens" });
  }
});

// APAGAR CONTACTO
app.delete("/api/contactos/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM mensagens_contacto WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: "Erro ao apagar mensagem" });
  }
});

// ===============================
//  TÓPICOS
// ===============================

// LISTAR
app.get("/api/topicos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM topicos ORDER BY id DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao obter tópicos" });
  }
});

// CRIAR
app.post("/api/topicos", async (req, res) => {
  const { titulo, categoria, descricao, nivel } = req.body;

  try {
    const sql =
      "INSERT INTO topicos (titulo, categoria, descricao, nivel) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [titulo, categoria, descricao, nivel]);

    res.json({ sucesso: true, id: result.insertId });
  } catch {
    res.status(500).json({ erro: "Erro ao criar tópico" });
  }
});

// APAGAR
app.delete("/api/topicos/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM topicos WHERE id = ?", [req.params.id]);
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: "Erro ao apagar tópico" });
  }
});

// ===============================
//  INICIAR SERVIDOR
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
