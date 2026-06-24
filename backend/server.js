// ======================================
//  IMPORTAÇÕES E CONFIGURAÇÕES INICIAIS
// ======================================
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
//  CONEXÃO À BASE DE DADOS MYSQL
// ===============================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog_mtna",
});

// ===============================
//  ROTAS POSTS
// ===============================

// LISTAR TODOS
app.get("/api/posts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao obter posts" });
  }
});

// OBTER POR ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Post não encontrado" });
    }

    res.json(rows[0]);
  } catch {
    res.status(500).json({ erro: "Erro ao obter post" });
  }
});

// CRIAR
app.post("/api/posts", async (req, res) => {
  const { titulo, categoria, conteudo } = req.body;

  try {
    const sql =
      "INSERT INTO posts (titulo, categoria, conteudo) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [titulo, categoria, conteudo]);

    res.json({ sucesso: true, id: result.insertId });
  } catch {
    res.status(500).json({ erro: "Erro ao criar post" });
  }
});

// ATUALIZAR
app.put("/api/posts/:id", async (req, res) => {
  const { titulo, categoria, conteudo } = req.body;

  try {
    const sql = `
      UPDATE posts
      SET titulo=?, categoria=?, conteudo=?
      WHERE id=?
    `;

    await db.query(sql, [titulo, categoria, conteudo, req.params.id]);

    res.json({ sucesso: true, mensagem: "Post atualizado com sucesso" });
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar post" });
  }
});

// APAGAR
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ sucesso: true, mensagem: "Post apagado com sucesso" });
  } catch {
    res.status(500).json({ erro: "Erro ao apagar post" });
  }
});

// ===============================
//  ROTAS TÓPICOS
// ===============================

// LISTAR TODOS
app.get("/api/topicos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM topicos ORDER BY id DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao obter tópicos" });
  }
});

// OBTER POR ID
app.get("/api/topicos/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM topicos WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Tópico não encontrado" });
    }

    res.json(rows[0]);
  } catch {
    res.status(500).json({ erro: "Erro ao obter tópico" });
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

// ATUALIZAR
app.put("/api/topicos/:id", async (req, res) => {
  const { titulo, categoria, descricao, nivel } = req.body;

  try {
    const sql = `
      UPDATE topicos
      SET titulo=?, categoria=?, descricao=?, nivel=?
      WHERE id=?
    `;

    await db.query(sql, [titulo, categoria, descricao, nivel, req.params.id]);

    res.json({ sucesso: true, mensagem: "Tópico atualizado com sucesso" });
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar tópico" });
  }
});

// APAGAR
app.delete("/api/topicos/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM topicos WHERE id = ?", [req.params.id]);
    res.json({ sucesso: true, mensagem: "Tópico apagado com sucesso" });
  } catch {
    res.status(500).json({ erro: "Erro ao apagar tópico" });
  }
});

// ===============================
//  ROTAS CONTACTOS
// ===============================

// LISTAR TODOS
app.get("/api/contactos", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM mensagens_contacto ORDER BY id DESC",
    );
    res.json(rows);
  } catch {
    res.status(500).json({ erro: "Erro ao obter contactos" });
  }
});

// OBTER POR ID
app.get("/api/contactos/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM mensagens_contacto WHERE id = ?",
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Contacto não encontrado" });
    }

    res.json(rows[0]);
  } catch {
    res.status(500).json({ erro: "Erro ao obter contacto" });
  }
});

// CRIAR
app.post("/api/contactos", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const sql =
      "INSERT INTO mensagens_contacto (nome, email, mensagem) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [nome, email, mensagem]);

    res.json({
      sucesso: true,
      mensagem: "Mensagem enviada com sucesso!",
      id: result.insertId,
    });
  } catch {
    res.status(500).json({ erro: "Erro ao enviar mensagem" });
  }
});

// ATUALIZAR (opcional)
app.put("/api/contactos/:id", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const sql = `
      UPDATE mensagens_contacto
      SET nome=?, email=?, mensagem=?
      WHERE id=?
    `;

    const [result] = await db.query(sql, [
      nome,
      email,
      mensagem,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Contacto não encontrado" });
    }

    res.json({
      sucesso: true,
      mensagem: "Contacto atualizado com sucesso",
    });
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar contacto" });
  }
});

// APAGAR
app.delete("/api/contactos/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM mensagens_contacto WHERE id = ?", [
      req.params.id,
    ]);

    res.json({
      sucesso: true,
      mensagem: "Mensagem apagada com sucesso",
    });
  } catch {
    res.status(500).json({ erro: "Erro ao apagar mensagem" });
  }
});

// ===============================
//  INICIAR SERVIDOR
// ===============================
app.listen(3000, () => {
  console.log("Servidor a correr em http://localhost:3000");
});
