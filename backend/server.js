// ===============================
//  IMPORTAÇÕES
// ===============================
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ===============================
//  LIGAÇÃO À BASE DE DADOS
// ===============================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",       // coloca a tua password se tiveres
    database: "mtna_blog_db"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao ligar à BD:", err);
        return;
    }
    console.log("Ligação MySQL bem-sucedida!");
});

// ===============================
//  SERVIR O FRONTEND
// ===============================
app.use(express.static(path.join(__dirname, "../frontend")));


// ===============================
//  ROTAS CRUD
// ===============================

// GET → listar todos os posts
app.get("/api/posts", (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Erro ao obter posts" });
        res.json(results);
    });
});

// GET → obter 1 post
app.get("/api/posts/:id", (req, res) => {
    const sql = "SELECT * FROM posts WHERE id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: "Erro ao obter post" });
        if (results.length === 0) return res.status(404).json({ error: "Post não encontrado" });
        res.json(results[0]);
    });
});

// POST → criar post
app.post("/api/posts", (req, res) => {
    const { titulo, categoria, conteudo, data, imagem } = req.body;

    if (!titulo || !categoria || !conteudo || !data) {
        return res.status(400).json({ error: "Campos obrigatórios em falta" });
    }

    const sql = "INSERT INTO posts (titulo, categoria, conteudo, data, imagem) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [titulo, categoria, conteudo, data, imagem || null], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao criar post" });
        res.json({ message: "Post criado com sucesso", id: result.insertId });
    });
});

// PUT → editar post
app.put("/api/posts/:id", (req, res) => {
    const { titulo, categoria, conteudo, data, imagem } = req.body;

    const sql = `
        UPDATE posts 
        SET titulo = ?, categoria = ?, conteudo = ?, data = ?, imagem = ?
        WHERE id = ?
    `;

    db.query(sql, [titulo, categoria, conteudo, data, imagem || null, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar post" });
        res.json({ message: "Post atualizado com sucesso" });
    });
});

// DELETE → apagar post
app.delete("/api/posts/:id", (req, res) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao apagar post" });
        res.json({ message: "Post apagado com sucesso" });
    });
});

// ===============================
//  INICIAR SERVIDOR
// ===============================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});
