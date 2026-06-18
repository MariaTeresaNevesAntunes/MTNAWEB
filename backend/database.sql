-- ============================================
--  CRIAR BASE DE DADOS
-- ============================================
CREATE DATABASE IF NOT EXISTS mtna_blog_db;
USE mtna_blog_db;

-- ============================================
--  TABELA: POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    data DATE NOT NULL,
    imagem VARCHAR(255)
);

-- Dados de exemplo
INSERT INTO posts (titulo, categoria, conteudo, data, imagem)
VALUES
('Bem-vindo ao meu Blogue', 'Introdução', 'Este é o primeiro post do meu novo sistema CRUD!', '2026-06-15', NULL),
('Matemática no Dia a Dia', 'Matemática', 'Como a matemática aparece em situações comuns do quotidiano.', '2026-06-14', NULL),
('Criatividade e Tecnologia', 'Tecnologia', 'Reflexões sobre como a criatividade impulsiona a inovação tecnológica.', '2026-06-13', NULL);

-- ============================================
--  TABELA: TÓPICOS
-- ============================================
CREATE TABLE IF NOT EXISTS topicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo
INSERT INTO topicos (titulo, categoria, descricao, nivel)
VALUES
('Ângulos e Triângulos', 'Geometria', 'Introdução aos tipos de ângulos e propriedades dos triângulos.', 'Básico'),
('Funções Lineares', 'Álgebra', 'Como identificar, representar e resolver funções lineares.', 'Intermédio'),
('Trigonometria Avançada', 'Geometria', 'Estudo aprofundado de identidades trigonométricas.', 'Avançado');

-- ============================================
--  TABELA: MENSAGENS DE CONTACTO
-- ============================================
CREATE TABLE IF NOT EXISTS mensagens_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo
INSERT INTO mensagens_contacto (nome, email, mensagem)
VALUES
('João Silva', 'joao@example.com', 'Gostei muito do vosso blogue!'),
('Ana Costa', 'ana@example.com', 'Podem publicar mais conteúdos de álgebra?');
