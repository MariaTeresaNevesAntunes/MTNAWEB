// ============================================
// MTNA Blogue - Script Interativo
// ============================================

// 1. Marcar página ativa no menu
document.addEventListener('DOMContentLoaded', function() {
  // Detectar página atual - melhor método
  const currentURL = window.location.href;
  const paginaAtual = currentURL.substring(currentURL.lastIndexOf('/') + 1) || 'indexmtna.html';
  
  // Remover classe active de todos os links de navegação
  const allNavLinks = document.querySelectorAll('.mtna-nav a');
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.remove('ativo');
  });
  
  // Marcar link ativo da página atual
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Comparar o href com a página atual
    if (href === paginaAtual || href.endsWith(paginaAtual)) {
      link.classList.add('active');
      link.classList.add('ativo');
    }
  });

  // 2. Sistema de filtros no Blogue
  const botoesFiltragem = document.querySelectorAll('.blog-filtros button');
  const posts = document.querySelectorAll('.blog-lista .post');

  botoesFiltragem.forEach(botao => {
    botao.addEventListener('click', function() {
      const filtro = this.getAttribute('data-filtro');
      
      // Remover classe ativo de todos os botões
      botoesFiltragem.forEach(btn => btn.classList.remove('ativo'));
      // Adicionar classe ativo ao botão clicado
      this.classList.add('ativo');
      
      // Filtrar posts
      posts.forEach(post => {
        const categoria = post.getAttribute('data-categoria');
        if (filtro === 'todos' || categoria === filtro) {
          post.style.display = 'block';
          post.classList.add('mostrado');
        } else {
          post.style.display = 'none';
          post.classList.remove('mostrado');
        }
      });
    });
  });

  // 3. Efeitos ao passar o rato
  const navLinks = document.querySelectorAll('.mtna-nav a, .menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.05)';
    });
    link.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // 4. Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const alvo = document.querySelector(this.getAttribute('href'));
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Adicionar animação de fade-in aos elementos
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.style.opacity = '1';
        entrada.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('article, .home-hero').forEach(elemento => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(20px)';
    elemento.style.transition = 'all 0.6s ease';
    observador.observe(elemento);
  });

  // 6. Feedback ao carregar página
  console.log('🎨 MTNA Blogue - Página carregada com sucesso!');
});

// 7. Função auxiliar para navegar
function navegarPara(pagina) {
  window.location.href = pagina;
}

// 8. Melhorar imagens - lazy loading e fallback para erros
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  img.addEventListener('error', function() {
    const wrapper = this.closest('.galeria-item') || this.parentElement;
    if (wrapper) {
      wrapper.style.display = 'none';
    } else {
      this.style.display = 'none';
    }
  });
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.opacity = '0.8';
  img.style.transition = 'opacity 0.3s';
});
