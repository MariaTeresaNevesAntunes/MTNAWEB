const POSTS_STATIC_URL = "posts.json";

// 1. Obter ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function obterPostsBase() {
  const respostaLocal = await fetch(`${POSTS_STATIC_URL}?v=${Date.now()}`);

  if (!respostaLocal.ok) {
    throw new Error(`Ficheiro estático indisponível: ${respostaLocal.status}`);
  }

  return respostaLocal.json();
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
    const titulo = document.getElementById("titulo");
    const conteudo = document.getElementById("conteudo");

    if (titulo) {
      titulo.textContent = "Post indisponível";
    }

    if (conteudo) {
      conteudo.textContent = "Não foi possível carregar este post.";
    }
  }
}

carregarPost();
