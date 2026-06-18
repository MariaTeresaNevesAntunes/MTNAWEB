const API_URL = "http://localhost:3000/api/posts";

// 1. Obter ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. Buscar o post ao backend
async function carregarPost() {
  try {
    const resposta = await fetch(`${API_URL}/${id}`);
    const post = await resposta.json();

    // Preencher o HTML com os dados do post
    document.getElementById("titulo").textContent = post.titulo;
    document.getElementById("categoria").textContent =
      "Categoria: " + post.categoria;

    document.getElementById("data").textContent =
      "Publicado em " + new Date(post.data).toLocaleDateString("pt-PT");

    document.getElementById("conteudo").textContent = post.conteudo;

    // Mostrar imagem se existir
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
