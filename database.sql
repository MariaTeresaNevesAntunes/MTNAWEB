-- Criar base de dados
CREATE DATABASE IF NOT EXISTS mtna_blog_db;
USE mtna_blog_db;

-- Criar tabela principal de posts
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    data DATE NOT NULL,
    imagem VARCHAR(255)  -- opcional
);

-- Inserir alguns posts de exemplo
INSERT INTO posts (titulo, categoria, conteudo, data, imagem)
VALUES
("Bem-vindo ao meu Blogue", "Introdução", "Este é o primeiro post do meu novo sistema CRUD!", "2026-06-15", NULL),

("Matemática no Dia a Dia", "Matemática", "Como a matemática aparece em situações comuns do quotidiano.", "2026-06-14", NULL),

("Criatividade e Tecnologia", "Tecnologia", "Reflexões sobre como a criatividade impulsiona a inovação tecnológica.", "2026-06-13", NULL);
