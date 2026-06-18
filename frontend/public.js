// ===============================
// CONFIGURAÇÕES
// ===============================
const API_URL = "http://localhost:3000/api/posts";

let posts = [];
let postsFiltrados = [];
let paginaAtual = 1;
const postsPorPagina = 6;

// ===============================
// 1. BUSCAR POSTS DO BACKEND
// ===============================
async function carregarPosts() {
  try {
    const resposta = await fetch(API_URL);
    posts = await resposta.json();
    aplicarFiltro("todos");
  } catch (erro) {
    console.error("Erro ao carregar posts:", erro);
  }
}

// ===============================
// 2. APLICAR FILTRO
// ===============================
function aplicarFiltro(categoria) {
  postsFiltrados =
    categoria === "todos"
      ? posts
      : posts.filter((p) => p.categoria === categoria);

  paginaAtual = 1;
  renderizarPosts();
  renderizarPaginacao();
}

// ===============================
// 3. RENDERIZAR POSTS
// ===============================
function renderizarPosts() {
  const lista = document.getElementById("lista-publica");
  lista.innerHTML = "";

  const inicio = (paginaAtual - 1) * postsPorPagina;
  const fim = inicio + postsPorPagina;
  const pagina = postsFiltrados.slice(inicio, fim);

  pagina.forEach((post) => {
    const div = document.createElement("article");
    div.classList.add("post");

    div.innerHTML = `
      <a href="post.html?id=${post.id}" style="text-decoration:none; color:inherit;">
        <h3>${post.titulo}</h3>
        <p><strong>Categoria:</strong> ${post.categoria}</p>
        <p>${post.conteudo.substring(0, 120)}...</p>
        <p><em>${new Date(post.data).toLocaleDateString("pt-PT")}</em></p>
      </a>
    `;

    lista.appendChild(div);
  });
}

// ===============================
// 4. PAGINAÇÃO
// ===============================
function renderizarPaginacao() {
  const totalPaginas = Math.ceil(postsFiltrados.length / postsPorPagina);
  const paginacao = document.getElementById("paginacao");

  paginacao.innerHTML = "";

  if (paginaAtual > 1) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.onclick = () => {
      paginaAtual--;
      renderizarPosts();
      renderizarPaginacao();
    };
    paginacao.appendChild(btnAnterior);
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === paginaAtual) btn.style.background = "#729b52";

    btn.onclick = () => {
      paginaAtual = i;
      renderizarPosts();
      renderizarPaginacao();
    };

    paginacao.appendChild(btn);
  }

  if (paginaAtual < totalPaginas) {
    const btnSeguinte = document.createElement("button");
    btnSeguinte.textContent = "Próximo";
    btnSeguinte.onclick = () => {
      paginaAtual++;
      renderizarPosts();
      renderizarPaginacao();
    };
    paginacao.appendChild(btnSeguinte);
  }
}

// ===============================
// 5. EVENTOS DOS FILTROS
// ===============================
document.querySelectorAll(".blog-filtros button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".blog-filtros button")
      .forEach((b) => b.classList.remove("ativo"));

    btn.classList.add("ativo");
    aplicarFiltro(btn.dataset.filtro);
  });
});

// ===============================
// 6. INICIAR
// ===============================
carregarPosts();
