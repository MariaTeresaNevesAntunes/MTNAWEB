// ======================================================
//  MTNA — SCRIPT GLOBAL PARA TODAS AS PÁGINAS
//  Inclui:
//   ✔ Formulário de Contactos
//   ✔ Gestão de Tópicos (CRUD)
//   ✔ Código modular e seguro
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ======================================================
  // 1) FORMULÁRIO DE CONTACTO
  // ======================================================

  const form = document.getElementById("formulario-contacto");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        alert("Por favor preencha todos os campos.");
        return;
      }

      try {
        const resposta = await fetch("http://localhost:3000/api/contactos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, mensagem })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
          alert("Mensagem enviada com sucesso!");
          form.reset();
        } else {
          alert("Erro: " + dados.erro);
        }
      } catch (erro) {
        console.error("Erro no envio:", erro);
        alert("Erro ao enviar a mensagem. Verifique o servidor.");
      }
    });
  }

  // ======================================================
  // 2) TÓPICOS — LISTAR
  // ======================================================

  const listaTopicos = document.getElementById("lista-topicos");

  if (listaTopicos) {
    carregarTopicos();
  }

  async function carregarTopicos() {
    try {
      const resposta = await fetch("http://localhost:3000/api/topicos");
      const topicos = await resposta.json();

      listaTopicos.innerHTML = "";

      topicos.forEach((t) => {
        const item = document.createElement("div");
        item.classList.add("topico-item");

        item.innerHTML = `
          <h3>${t.titulo}</h3>
          <p><strong>Categoria:</strong> ${t.categoria}</p>
          <p>${t.descricao}</p>
          <p><em>Nível:</em> ${t.nivel}</p>

          <button class="editar" data-id="${t.id}">Editar</button>
          <button class="apagar" data-id="${t.id}">Apagar</button>
        `;

        listaTopicos.appendChild(item);
      });

      ativarBotoesTopicos();

    } catch (erro) {
      console.error("Erro ao carregar tópicos:", erro);
    }
  }

  // ======================================================
  // 3) TÓPICOS — APAGAR
  // ======================================================

  function ativarBotoesTopicos() {
    document.querySelectorAll(".apagar").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        if (!confirm("Tem a certeza que quer apagar este tópico?")) return;

        await fetch(`http://localhost:3000/api/topicos/${id}`, {
          method: "DELETE"
        });

        carregarTopicos();
      });
    });

    document.querySelectorAll(".editar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `editar_topico.html?id=${id}`;
      });
    });
  }

  // ======================================================
  // 4) TÓPICOS — CRIAR
  // ======================================================

  const formTopico = document.getElementById("form-criar-topico");

  if (formTopico) {
    formTopico.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = {
        titulo: formTopico.titulo.value.trim(),
        categoria: formTopico.categoria.value.trim(),
        descricao: formTopico.descricao.value.trim(),
        nivel: formTopico.nivel.value.trim()
      };

      const resposta = await fetch("http://localhost:3000/api/topicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        alert("Tópico criado com sucesso!");
        formTopico.reset();
      } else {
        alert("Erro ao criar tópico.");
      }
    });
  }

  // ======================================================
  // 5) TÓPICOS — EDITAR
  // ======================================================

  const formEditar = document.getElementById("form-editar-topico");

  if (formEditar) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    carregarDadosTopico(id);

    async function carregarDadosTopico(id) {
      const resposta = await fetch(`http://localhost:3000/api/topicos/${id}`);
      const t = await resposta.json();

      formEditar.titulo.value = t.titulo;
      formEditar.categoria.value = t.categoria;
      formEditar.descricao.value = t.descricao;
      formEditar.nivel.value = t.nivel;
    }

    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = {
        titulo: formEditar.titulo.value.trim(),
        categoria: formEditar.categoria.value.trim(),
        descricao: formEditar.descricao.value.trim(),
        nivel: formEditar.nivel.value.trim()
      };

      await fetch(`http://localhost:3000/api/topicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      alert("Tópico atualizado com sucesso!");
      window.location.href = "topicos.html";
    });
  }

});
