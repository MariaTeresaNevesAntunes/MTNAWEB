// ===============================
// CONFIGURAÇÕES
// ===============================
const POSTS_STATIC_URL = "posts.json";

let posts = [];
let postsFiltrados = [];
let paginaAtual = 1;
const postsPorPagina = 6;

// ===============================
// FUNÇÕES DE APOIO
// ===============================
function resumirTexto(texto, limite) {
  if (!texto) return "";
  if (texto.length <= limite) return texto;
  return `${texto.slice(0, limite).trimEnd()}...`;
}

function formatarData(data) {
  try {
    return new Date(data).toLocaleDateString("pt-PT");
  } catch {
    return data;
  }
}

async function obterPostsBase() {
  const respostaLocal = await fetch(`${POSTS_STATIC_URL}?v=${Date.now()}`);

  if (!respostaLocal.ok) {
    throw new Error(`Ficheiro estático indisponível: ${respostaLocal.status}`);
  }

  return respostaLocal.json();
}

// ===============================
// 1. BUSCAR POSTS
// ===============================
async function carregarPosts() {
  try {
    posts = await obterPostsBase();
    aplicarFiltro("todos");
  } catch (erro) {
    console.error("Erro ao carregar posts:", erro);
    const lista = document.getElementById("lista-publica");
    if (lista) lista.innerHTML = "<p>Não foi possível carregar os posts.</p>";
  }
}

// ===============================
// 2. APLICAR FILTRO
// ===============================
function aplicarFiltro(categoria) {
  postsFiltrados =
    categoria === "todos"
      ? posts
      : posts.filter((post) => post.categoria === categoria);

  paginaAtual = 1;
  renderizarPosts();
  renderizarPaginacao();
}

// ===============================
// 3. RENDERIZAR POSTS
// ===============================
function renderizarPosts() {
  const lista = document.getElementById("lista-publica");
  if (!lista) return;

  lista.innerHTML = "";

  const inicio = (paginaAtual - 1) * postsPorPagina;
  const fim = inicio + postsPorPagina;
  const pagina = postsFiltrados.slice(inicio, fim);

  if (pagina.length === 0) {
    lista.innerHTML = "<p>Sem posts para mostrar.</p>";
    return;
  }

  pagina.forEach((post) => {
    const artigo = document.createElement("article");
    artigo.classList.add("post");

    artigo.innerHTML = `
      <a href="post.html?id=${post.id}" style="text-decoration:none; color:inherit;">
        <h3>${post.titulo}</h3>
        <p class="post-meta"><strong>Categoria:</strong> ${post.categoria}</p>
        <p class="post-excerpt">${resumirTexto(post.conteudo, 104)}</p>
        <p class="post-date"><em>${formatarData(post.data)}</em></p>
      </a>
    `;

    lista.appendChild(artigo);
  });
}

// ===============================
// 4. PAGINAÇÃO
// ===============================
function renderizarPaginacao() {
  const paginacao = document.getElementById("paginacao");
  if (!paginacao) return;

  const totalPaginas = Math.ceil(postsFiltrados.length / postsPorPagina);
  paginacao.innerHTML = "";

  if (totalPaginas <= 1) return;

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

    if (i === paginaAtual) btn.classList.add("active");

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
      .forEach((botao) => botao.classList.remove("ativo"));

    btn.classList.add("ativo");
    aplicarFiltro(btn.dataset.filtro);
  });
});

// ===============================
// 6. MOSTRAR/ESCONDER PAINEL ADMIN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const adminAcoes = document.querySelector(".admin-acoes");

  if (adminAcoes) {
    if (localStorage.getItem("admin") === "true") {
      adminAcoes.style.display = "block";
    } else {
      adminAcoes.style.display = "none";
    }
  }
});

// ===============================
// 7. LOGOUT DO ADMIN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const btnSair = document.getElementById("btnSair");

  if (btnSair) {
    btnSair.addEventListener("click", () => {
      localStorage.removeItem("admin");
      window.location.href = "blogmtna.html";
    });
  }
});

// ===============================
// 8. INICIAR
// ===============================
carregarPosts();
