document.addEventListener('DOMContentLoaded', () => {

  // ===============================================
  // 1. MENU MOBILE (SOLUÇÃO CRÍTICA)
  // ===============================================
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      // Alterna as classes para mostrar/esconder o menu
      menu.classList.toggle('show');
      menuToggle.classList.toggle('active');

      // Alterna o atributo ARIA
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Fecha o menu quando um item é clicado (para links âncora)
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                // Pequeno delay para permitir que o link âncora funcione antes de fechar o menu
                setTimeout(() => {
                    menu.classList.remove('show');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }, 100); 
            }
        });
    });
  }

  // ===============================================
  // 2. FADE-IN NA ROLAGEM (SCROLL)
  // ===============================================

  const fadeSections = document.querySelectorAll('.fade-section');

  const checkVisibility = () => {
    fadeSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Se o topo da seção estiver dentro da metade inferior da viewport
      if (sectionTop < windowHeight - 100) {
        section.classList.add('visible');
      } 
    });
  };

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();


  // ===============================================
  // 3. CARROSSEL
  // ===============================================
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  // Verifica se os elementos do carrossel existem antes de tentar manipulá-los
  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let index = 0;

    function updateCarousel() {
      // Usamos porcentagem, que é mais robusto em diferentes tamanhos de tela.
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Botão Anterior
    prevBtn.addEventListener('click', () => {
      index = index > 0 ? index - 1 : slides.length - 1;
      updateCarousel();
    });

    // Botão Próximo
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  }
});
