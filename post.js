const POSTS_STATIC_URL = "posts.json";
const POSTS_STORAGE_KEY = "mtna_posts";

// 1. Obter ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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

// 2. Buscar o post localmente
async function carregarPost() {
  try {
    const posts = await obterPostsBase();
    const post = posts.find((item) => String(item.id) === String(id));

    if (!post) {
      throw new Error("Post não encontrado");
    }

    document.getElementById("titulo").textContent = post.titulo;
    document.getElementById("categoria").textContent =
      "Categoria: " + post.categoria;

    document.getElementById("data").textContent =
      "Publicado em " + new Date(post.data).toLocaleDateString("pt-PT");

    document.getElementById("conteudo").textContent = post.conteudo;

    if (post.imagem) {
      const img = document.getElementById("imagem");
      img.src = post.imagem;
      img.style.display = "block";
    }
  } catch (erro) {
    console.error("Erro ao carregar post:", erro);
  }
}

carregarPost();
