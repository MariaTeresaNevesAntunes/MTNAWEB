# Projeto MTNA — Website Pessoal / Portfólio

**Curso:** Técnico/a de Multimédia  
**Módulo:** Desenvolvimento Web  
**Autora:** Maria Teresa  
**Data de Entrega:** Maio 2026

---

## 1. Descrição

Website pessoal de portfólio composto por cinco páginas HTML interligadas, com design totalmente responsivo (desktop, tablet e telemóvel). O projeto inclui uma galeria de imagens, um blog dinâmico com filtros por categoria e um formulário de contacto com validação de dados.

---

## 2. Requisitos

| Requisito | Detalhes |
|---|---|
| **Navegador Web** | Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari (versão atualizada) |
| **Sistema Operativo** | Windows, macOS ou Linux |
| **Software adicional** | Nenhum — o projeto funciona diretamente no navegador sem necessidade de servidor ou instalação |

---

## 3. Instalação

### Opção A — Ficheiros locais

1. Transferir a pasta completa do projeto para o computador.
2. Certificar-se de que todos os ficheiros estão na **mesma pasta**:

```
projeto-mtna/
├── indexmtna.html
├── blogmtna.html
├── galmtna.html
├── sobrmtna.html
├── contmtna.html
├── style.css
├── scriptmtna.js
└── imagens/
    └── (ficheiros de imagem)
```

### Opção B — Com servidor local (opcional, para testes avançados)

Caso pretenda utilizar um servidor local, pode usar o Python (já instalado na maioria dos sistemas):

```bash
# Abrir o terminal na pasta do projeto e executar:
python -m http.server 8000
```

Em seguida, abrir o navegador e aceder a:

```
http://localhost:8000/indexmtna.html
```

> **Nota:** A Opção B é totalmente opcional. O projeto funciona sem servidor.

---

## 4. Execução

1. **Abrir** o ficheiro `indexmtna.html` com duplo clique (abre no navegador predefinido).
2. **Navegar** pelas restantes páginas utilizando o menu de navegação no topo.
3. Em dispositivos móveis ou janelas pequenas, clicar no **ícone do menu** (☰) para abrir a navegação.

---

## 5. Estrutura de Ficheiros

### 5.1 Páginas HTML

| Ficheiro | Página | Descrição |
|---|---|---|
| `indexmtna.html` | **Início** | Página principal com cabeçalho, menu de navegação, secção de boas-vindas e rodapé. Inclui script inline para o menu responsivo (`toggleMenu()`). |
| `blogmtna.html` | **Blog** | Página de artigos com renderização dinâmica de posts via JavaScript. Dispõe de botões de filtro por categoria: Tecnologia, Design e Desenvolvimento. |
| `galmtna.html` | **Galeria** | Grelha de 10 imagens com efeito de destaque ao passar o rato (hover). Layout adaptável com CSS Grid. |
| `sobrmtna.html` | **Sobre Mim** | Página pessoal com fotografia, descrição profissional, experiência e lista de competências. |
| `contmtna.html` | **Contacto** | Formulário com campos de nome, e-mail, assunto e mensagem. Inclui validação de campos obrigatórios e mensagem de feedback visual ao utilizador. |

### 5.2 Folha de Estilos

| Ficheiro | Descrição |
|---|---|
| `style.css` | Folha de estilos única partilhada por todas as páginas. Contém: layout com Flexbox e CSS Grid, tipografia, cores, espaçamentos, efeitos hover, animações e **media queries** para tablet (≤768px) e telemóvel (≤600px). |

### 5.3 JavaScript

| Ficheiro | Descrição |
|---|---|
| `scriptmtna.js` | Ficheiro JavaScript externo utilizado na página do blog. Contém: array de objetos com os dados dos posts, função `renderizarPosts()` para gerar o HTML dinamicamente, função `filtrar()` para filtrar por categoria e evento `DOMContentLoaded` para carregamento inicial. |

> **Nota:** As restantes páginas utilizam JavaScript inline (dentro de `<script>`) apenas para a função `toggleMenu()` do menu responsivo.

---

## 6. Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Menu responsivo** | Navegação adaptável com botão toggle (☰) para ecrãs pequenos. |
| **Blog dinâmico** | Posts gerados via JavaScript a partir de um array de dados, com filtragem por categoria. |
| **Galeria de imagens** | Grelha visual com efeitos de escala e sombra ao passar o rato. |
| **Formulário de contacto** | Validação de campos obrigatórios com feedback visual (mensagem de sucesso/erro). |
| **Design responsivo** | Três breakpoints: desktop (>768px), tablet (≤768px) e telemóvel (≤600px). |
| **Estado vazio** | Mensagem informativa quando não existem posts na categoria selecionada. |

---

## 7. Tecnologias Utilizadas

- **HTML5** — Estrutura semântica das páginas
- **CSS3** — Estilos visuais (Flexbox, Grid, Media Queries, transições)
- **JavaScript (ES6+)** — Manipulação do DOM, renderização dinâmica, filtragem de conteúdo

---

*Projeto desenvolvido no âmbito do curso Técnico/a de Multimédia — Maio 2026*
