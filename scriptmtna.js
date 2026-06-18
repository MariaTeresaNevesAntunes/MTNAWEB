// ======================================================
//  MTNA — SCRIPT GLOBAL PARA TODAS AS PÁGINAS
//  Versão estática com armazenamento local no navegador
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const CONTACTOS_STORAGE_KEY = "mtna_contactos";
  const TOPICOS_STORAGE_KEY = "mtna_topicos";

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

  // ======================================================
  // 1) FORMULÁRIO DE CONTACTO
  // ======================================================

  const form = document.getElementById("formulario-contacto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        alert("Por favor preencha todos os campos.");
        return;
      }

      const contactos = lerLista(CONTACTOS_STORAGE_KEY, []);

      contactos.unshift({
        id: proximoId(contactos),
        nome,
        email,
        mensagem,
        data: new Date().toLocaleString("pt-PT"),
      });

      guardarLista(CONTACTOS_STORAGE_KEY, contactos);
      form.reset();
      alert("Mensagem guardada localmente.");
    });
  }

  // ======================================================
  // 2) TÓPICOS — LISTAR
  // ======================================================

  const listaTopicos = document.getElementById("lista-topicos");

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
        (t) => `
          <div class="topico-item">
            <h3>${t.titulo}</h3>
            <p><strong>Categoria:</strong> ${t.categoria}</p>
            <p>${t.descricao}</p>
            <p><em>Nível:</em> ${t.nivel}</p>
            <button class="apagar" type="button" data-id="${t.id}">Apagar</button>
          </div>
        `,
      )
      .join("");

    listaTopicos.querySelectorAll(".apagar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const atualizados = topicos.filter((t) => String(t.id) !== String(id));
        guardarLista(TOPICOS_STORAGE_KEY, atualizados);
        renderizarTopicos();
      });
    });
  }

  function garantirTopicosIniciais() {
    if (localStorage.getItem(TOPICOS_STORAGE_KEY) !== null) {
      return;
    }

    guardarLista(TOPICOS_STORAGE_KEY, [
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
    ]);
  }

  const formTopico = document.getElementById("form-criar-topico");

  if (formTopico) {
    formTopico.addEventListener("submit", (e) => {
      e.preventDefault();

      const topicos = lerLista(TOPICOS_STORAGE_KEY, []);

      topicos.unshift({
        id: proximoId(topicos),
        titulo: formTopico.titulo.value.trim(),
        categoria: formTopico.categoria.value.trim(),
        descricao: formTopico.descricao.value.trim(),
        nivel: formTopico.nivel.value.trim(),
      });

      guardarLista(TOPICOS_STORAGE_KEY, topicos);
      formTopico.reset();
      renderizarTopicos();
      alert("Tópico guardado localmente.");
    });
  }

  // ======================================================
  // 3) INICIALIZAÇÃO
  // ======================================================

  garantirTopicosIniciais();
  renderizarTopicos();
});
