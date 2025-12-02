document.addEventListener('DOMContentLoaded', () => {

  // ===============================================
  // 1. CARROSSEL
  // ===============================================
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');

  if (carousel && track && prevButton && nextButton) {
    const slides = Array.from(track.children);
    
    // A função getBoundingClientRect().width é mais precisa para carrossel.
    let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
    let currentSlide = 0;

    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    if (slideWidth > 0) {
      slides.forEach(setSlidePosition);
    }

    const moveToSlide = (track, targetSlide) => {
      const targetPosition = targetSlide.style.left;
      track.style.transform = 'translateX(-' + targetPosition + ')';
      currentSlide = slides.indexOf(targetSlide);
    };

    const updateSlideWidth = () => {
      slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
      slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
      });
      // Reposiciona para o slide atual após o redimensionamento
      if (slides.length > 0) {
          const targetSlide = slides[currentSlide];
          track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
      }
    };
    window.addEventListener('resize', updateSlideWidth);


    // Botão Anterior
    prevButton.addEventListener('click', () => {
      const prevSlide = slides[currentSlide - 1] || slides[slides.length - 1];
      moveToSlide(track, prevSlide);
    });

    // Botão Próximo
    nextButton.addEventListener('click', () => {
      const nextSlide = slides[currentSlide + 1] || slides[0];
      moveToSlide(track, nextSlide);
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
      // Não removemos a classe para evitar a repetição da animação ao rolar para cima.
    });
  };

  // Executa ao carregar e ao rolar
  window.addEventListener('scroll', checkVisibility);
  // Garante que as seções visíveis no carregamento já apareçam
  checkVisibility();


  // ===============================================
  // 3. MENU MOBILE (HAMBÚRGUER)
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

    // Fecha o menu quando um item é clicado (útil para links âncora)
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

});
