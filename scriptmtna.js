/* SCRIPT MTNA */
var posts = [
  {
    id: 1,
    titulo: "Teorema de Pitágoras",
    categoria: "Geometria",
    descricao:
      "Relação entre os lados de um triângulo retângulo com exemplos visuais.",
    createdAt: "2026-01-15",
  },
  {
    id: 2,
    titulo: "Funções Lineares",
    categoria: "Álgebra",
    descricao: "Como interpretar gráficos e equações de funções do 1.º grau.",
    createdAt: "2026-02-10",
  },
  {
    id: 3,
    titulo: "Ângulos Notáveis",
    categoria: "Geometria",
    descricao: "Ângulos especiais e as suas aplicações em problemas práticos.",
    createdAt: "2026-03-05",
  },
  {
    id: 4,
    titulo: "Equações do 2.º Grau",
    categoria: "Álgebra",
    descricao:
      "Resolução de equações quadráticas e ligação com gráficos parabólicos.",
    createdAt: "2026-04-20",
  },
];

var lista = document.getElementById("lista-posts");

function renderizarPosts(listaFiltrada) {
  if (!lista) return;
  lista.innerHTML = "";
  if (listaFiltrada.length === 0) {
    lista.innerHTML =
      '<p class="estado-vazio">Nenhum post encontrado nesta categoria.</p>';
    return;
  }
  for (var i = 0; i < listaFiltrada.length; i++) {
    var post = listaFiltrada[i];
    var artigo = document.createElement("article");
    artigo.className = "post";
    artigo.innerHTML =
      "<h3>" +
      post.titulo +
      "</h3>" +
      "<p><strong>Categoria:</strong> " +
      post.categoria +
      "</p>" +
      "<p>" +
      post.descricao +
      "</p>" +
      '<p class="post-data">Publicado em: ' +
      post.createdAt +
      "</p>";
    lista.appendChild(artigo);
  }
}

function mostrarTodos() {
  renderizarPosts(posts);
}

function filtrar(categoria) {
  var filtrados = [];
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].categoria.toLowerCase() === categoria.toLowerCase()) {
      filtrados.push(posts[i]);
    }
  }
  renderizarPosts(filtrados);
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarTodos();
  var botoes = document.querySelectorAll("#filtros button");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
      var categoria = this.getAttribute("data-categoria");
      if (categoria === "todos") {
        mostrarTodos();
      } else {
        filtrar(categoria);
      }
    });
  }
});
