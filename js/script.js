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
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlide = 0;

    // Configura a posição inicial do carrossel
    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
      const targetPosition = targetSlide.style.left;
      track.style.transform = 'translateX(-' + targetPosition + ')';
      currentSlide = slides.indexOf(targetSlide);
      return currentSlide;
    };

    // Atualiza a largura do slide em caso de redimensionamento
    const updateSlideWidth = () => {
      const newSlideWidth = slides[0].getBoundingClientRect().width;
      slides.forEach((slide, index) => {
        slide.style.left = newSlideWidth * index + 'px';
      });
      // Reposiciona para o slide atual após o redimensionamento
      const targetSlide = slides[currentSlide];
      track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    };
    window.addEventListener('resize', updateSlideWidth);


    // Botão Anterior
    prevButton.addEventListener('click', () => {
      const prevSlide = slides[currentSlide - 1] || slides[slides.length - 1];
      currentSlide = moveToSlide(track, currentSlide, prevSlide);
    });

    // Botão Próximo
    nextButton.addEventListener('click', () => {
      const nextSlide = slides[currentSlide + 1] || slides[0];
      currentSlide = moveToSlide(track, currentSlide, nextSlide);
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
      } else {
        // Opcional: remover a classe ao sair da viewport para permitir reanimação
        // section.classList.remove('visible'); 
      }
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
                menu.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
  }

});
