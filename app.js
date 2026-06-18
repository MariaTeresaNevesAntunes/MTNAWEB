// ===============================
//  CONFIGURAÇÕES
// ===============================
const API_URL = "http://localhost:3000/api/posts";

// Elementos do DOM
const lista = document.getElementById("lista-posts");
const form = document.getElementById("form-post");
const btnGuardar = document.getElementById("btn-guardar");
const idEditar = document.getElementById("id-editar");

// ===============================
//  LISTAR POSTS
// ===============================
async function carregarPosts() {
  lista.innerHTML = "<p>A carregar...</p>";

  try {
    const resposta = await fetch(API_URL);
    const posts = await resposta.json();

    if (posts.length === 0) {
      lista.innerHTML = "<p>Sem posts ainda.</p>";
      return;
    }

    lista.innerHTML = posts
      .map(
        (p) => `
            <div class="post">
                <h3>${p.titulo}</h3>
                <p><strong>Categoria:</strong> ${p.categoria}</p>
                <p>${p.conteudo}</p>
                <p><em>${p.data}</em></p>

                <button onclick="editarPost(${p.id})">Editar</button>
                <button onclick="apagarPost(${p.id})" class="apagar">Apagar</button>
            </div>
        `,
      )
      .join("");
  } catch (erro) {
    lista.innerHTML = "<p>Erro ao carregar posts.</p>";
    console.error("Erro:", erro);
  }
}

// ===============================
//  CRIAR OU EDITAR POST
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    titulo: form.titulo.value,
    categoria: form.categoria.value,
    conteudo: form.conteudo.value,
    data: form.data.value,
    imagem: form.imagem.value || null,
  };

  const id = idEditar.value;

  try {
    let resposta;

    if (id) {
      // EDITAR
      resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    } else {
      // CRIAR
      resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    }

    const resultado = await resposta.json();

    alert(resultado.message || "Operação concluída");

    form.reset();
    idEditar.value = "";
    btnGuardar.textContent = "Criar Post";

    carregarPosts();
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao guardar post");
  }
});

// ===============================
//  APAGAR POST
// ===============================
async function apagarPost(id) {
  if (!confirm("Tens a certeza que queres apagar este post?")) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const resultado = await resposta.json();
    alert(resultado.message);

    carregarPosts();
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao apagar post");
  }
}

// ===============================
//  EDITAR POST (preencher formulário)
// ===============================
async function editarPost(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`);
    const post = await resposta.json();

    form.titulo.value = post.titulo;
    form.categoria.value = post.categoria;
    form.conteudo.value = post.conteudo;
    form.data.value = post.data;
    form.imagem.value = post.imagem || "";

    idEditar.value = id;
    btnGuardar.textContent = "Guardar Alterações";
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao carregar post para edição");
  }
}

// ===============================
//  INICIAR
// ===============================
carregarPosts();
