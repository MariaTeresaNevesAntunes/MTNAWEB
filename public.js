// ===============================
// CONFIGURAÇÕES
// ===============================
const POSTS_STATIC_URL = "posts.json";
const POSTS_STORAGE_KEY = "mtna_posts";

let posts = [];
let postsFiltrados = [];
let paginaAtual = 1;
const postsPorPagina = 6;

function guardarPostsLocais(listaPosts) {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(listaPosts));
}

async function obterPostsBase() {
  const postsGuardados = localStorage.getItem(POSTS_STORAGE_KEY);

  if (postsGuardados) {
    return JSON.parse(postsGuardados);
  }

  const respostaLocal = await fetch(POSTS_STATIC_URL);

  if (!respostaLocal.ok) {
    throw new Error(`Ficheiro estático indisponível: ${respostaLocal.status}`);
  }

  const postsBase = await respostaLocal.json();
  guardarPostsLocais(postsBase);
  return postsBase;
}

// ===============================
// 1. BUSCAR POSTS LOCAIS
// ===============================
async function carregarPosts() {
  try {
    posts = await obterPostsBase();
    aplicarFiltro("todos");
  } catch (erro) {
    console.error("Erro ao carregar posts:", erro);
  }
}

// ===============================
// 2. APLICAR FILTRO
// ===============================
  postsFiltrados =
const POSTS_STORAGE_KEY = "mtna_posts";
    categoria === "todos"
      ? posts
      : posts.filter((p) => p.categoria === categoria);

  paginaAtual = 1;
  renderizarPosts();
  renderizarPaginacao();
}

// ===============================
  const postsGuardados = localStorage.getItem(POSTS_STORAGE_KEY);
// 3. RENDERIZAR POSTS
  if (postsGuardados) {
    return JSON.parse(postsGuardados);
  }
// ===============================
  const respostaLocal = await fetch(POSTS_STATIC_URL);
function renderizarPosts() {
  if (!respostaLocal.ok) {
    throw new Error(`Ficheiro estático indisponível: ${respostaLocal.status}`);
  }
  const lista = document.getElementById("lista-publica");
  const postsBase = await respostaLocal.json();
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(postsBase));
  return postsBase;
  lista.innerHTML = "";

  const inicio = (paginaAtual - 1) * postsPorPagina;
  try {
    posts = await obterPostsBase();
    aplicarFiltro("todos");
  } catch (erro) {
    console.error("Erro ao carregar posts:", erro);
  }
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
