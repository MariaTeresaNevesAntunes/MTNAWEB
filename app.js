document.addEventListener("DOMContentLoaded", () => {
  const POSTS_STATIC_URL = "posts.json";
  const POSTS_STORAGE_KEY = "mtna_posts";
  const TOPICOS_STORAGE_KEY = "mtna_topicos";
  const CONTACTOS_STORAGE_KEY = "mtna_contactos";

  const listaPosts = document.getElementById("lista-posts");
  const formPost = document.getElementById("form-post");
  const listaTopicos = document.getElementById("lista-topicos");
  const formTopico = document.getElementById("form-topico");
  const listaContactos = document.getElementById("lista-contactos");

  const topicosIniciais = [
    {
      id: 1,
      titulo: "Ângulos e Triângulos",
      categoria: "Geometria",
      descricao:
        "Introdução aos tipos de ângulos e propriedades dos triângulos.",
      nivel: "Básico",
    },
    {
      id: 2,
      titulo: "Funções Lineares",
      categoria: "Álgebra",
      descricao: "Como identificar, representar e resolver funções lineares.",
      nivel: "Intermédio",
    },
    {
      id: 3,
      titulo: "Trigonometria Avançada",
      categoria: "Geometria",
      descricao: "Estudo aprofundado de identidades trigonométricas.",
      nivel: "Avançado",
    },
  ];

  function lerLista(chave, valorPadrao) {
    try {
      const guardado = localStorage.getItem(chave);
      return guardado ? JSON.parse(guardado) : valorPadrao;
    } catch {
      return valorPadrao;
    }
  }

  function guardarLista(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  function proximoId(lista) {
    return (
      lista.reduce((maior, item) => Math.max(maior, Number(item.id) || 0), 0) +
      1
    );
  }

  async function garantirPosts() {
    const postsGuardados = localStorage.getItem(POSTS_STORAGE_KEY);

    if (postsGuardados !== null) {
      return lerLista(POSTS_STORAGE_KEY, []);
    }

    const resposta = await fetch(POSTS_STATIC_URL);

    if (!resposta.ok) {
      throw new Error(`Não foi possível carregar posts: ${resposta.status}`);
    }

    const postsBase = await resposta.json();
    guardarLista(POSTS_STORAGE_KEY, postsBase);
    return postsBase;
  }

  function garantirTopicos() {
    const topicosGuardados = localStorage.getItem(TOPICOS_STORAGE_KEY);

    if (topicosGuardados !== null) {
      return lerLista(TOPICOS_STORAGE_KEY, []);
    }

    guardarLista(TOPICOS_STORAGE_KEY, topicosIniciais);
    return topicosIniciais;
  }

  function renderizarPosts() {
    if (!listaPosts) {
      return;
    }

    const posts = lerLista(POSTS_STORAGE_KEY, []);

    if (posts.length === 0) {
      listaPosts.innerHTML = "<p>Sem posts ainda.</p>";
      return;
    }

    listaPosts.innerHTML = posts
      .map(
        (post) => `
          <div class="post">
            <h3>${post.titulo}</h3>
            <p><strong>Categoria:</strong> ${post.categoria}</p>
            <p>${post.conteudo}</p>
            <p><em>${post.data}</em></p>
            <button type="button" onclick="apagarPost(${post.id})" class="apagar">Apagar</button>
          </div>
        `,
      )
      .join("");
  }

  function renderizarTopicos() {
    if (!listaTopicos) {
      return;
    }

    const topicos = lerLista(TOPICOS_STORAGE_KEY, []);

    if (topicos.length === 0) {
      listaTopicos.innerHTML = "<p>Sem tópicos ainda.</p>";
      return;
    }

    listaTopicos.innerHTML = topicos
      .map(
        (topico) => `
          <div class="topico-item">
            <h3>${topico.titulo}</h3>
            <p><strong>Categoria:</strong> ${topico.categoria}</p>
            <p>${topico.descricao}</p>
            <p><em>Nível:</em> ${topico.nivel}</p>
            <button type="button" onclick="apagarTopico(${topico.id})" class="apagar">Apagar</button>
          </div>
        `,
      )
      .join("");
  }

  function renderizarContactos() {
    if (!listaContactos) {
      return;
    }

    const contactos = lerLista(CONTACTOS_STORAGE_KEY, []);

    if (contactos.length === 0) {
      listaContactos.innerHTML = "<p>Sem mensagens ainda.</p>";
      return;
    }

    listaContactos.innerHTML = contactos
      .map(
        (contacto) => `
          <div class="topico-item">
            <h3>${contacto.nome}</h3>
            <p><strong>Email:</strong> ${contacto.email}</p>
            <p>${contacto.mensagem}</p>
            <p><em>${contacto.data}</em></p>
            <button type="button" onclick="apagarContacto(${contacto.id})" class="apagar">Apagar</button>
          </div>
        `,
      )
      .join("");
  }

  if (formPost) {
    formPost.addEventListener("submit", (e) => {
      e.preventDefault();

      const posts = lerLista(POSTS_STORAGE_KEY, []);

      const novoPost = {
        id: proximoId(posts),
        titulo: document.getElementById("post-titulo").value.trim(),
        categoria: document.getElementById("post-categoria").value.trim(),
        conteudo: document.getElementById("post-conteudo").value.trim(),
        data: document.getElementById("post-data").value,
        imagem: document.getElementById("post-imagem").value.trim() || null,
      };

      posts.unshift(novoPost);
      guardarLista(POSTS_STORAGE_KEY, posts);
      formPost.reset();
      renderizarPosts();
      alert("Post guardado localmente.");
    });
  }

  if (formTopico) {
    formTopico.addEventListener("submit", (e) => {
      e.preventDefault();

      const topicos = lerLista(TOPICOS_STORAGE_KEY, []);

      const novoTopico = {
        id: proximoId(topicos),
        titulo: document.getElementById("topico-titulo").value.trim(),
        categoria: document.getElementById("topico-categoria").value.trim(),
        descricao: document.getElementById("topico-descricao").value.trim(),
        nivel: document.getElementById("topico-nivel").value,
      };

      topicos.unshift(novoTopico);
      guardarLista(TOPICOS_STORAGE_KEY, topicos);
      formTopico.reset();
      renderizarTopicos();
      alert("Tópico guardado localmente.");
    });
  }

  window.apagarPost = (id) => {
    const posts = lerLista(POSTS_STORAGE_KEY, []);
    const atualizados = posts.filter((post) => String(post.id) !== String(id));
    guardarLista(POSTS_STORAGE_KEY, atualizados);
    renderizarPosts();
  };

  window.apagarTopico = (id) => {
    const topicos = lerLista(TOPICOS_STORAGE_KEY, []);
    const atualizados = topicos.filter(
      (topico) => String(topico.id) !== String(id),
    );
    guardarLista(TOPICOS_STORAGE_KEY, atualizados);
    renderizarTopicos();
  };

  window.apagarContacto = (id) => {
    const contactos = lerLista(CONTACTOS_STORAGE_KEY, []);
    const atualizados = contactos.filter(
      (contacto) => String(contacto.id) !== String(id),
    );
    guardarLista(CONTACTOS_STORAGE_KEY, atualizados);
    renderizarContactos();
  };

  (async () => {
    try {
      await garantirPosts();
      renderizarPosts();
      garantirTopicos();
      renderizarTopicos();
      renderizarContactos();
    } catch (erro) {
      console.error("Erro ao inicializar painel:", erro);
      if (listaPosts) {
        listaPosts.innerHTML = "<p>Erro ao carregar posts locais.</p>";
      }
    }
  })();
});
