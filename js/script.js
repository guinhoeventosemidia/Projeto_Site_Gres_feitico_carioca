document.addEventListener('DOMContentLoaded', () => {

  // ===============================================
  // 1. MENU MOBILE (VERSÃO PADRONIZADA)
  // ===============================================
  // Usamos 'toggle' para ser fiel ao nome usado originalmente
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
      toggle.classList.toggle('active');

      const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                setTimeout(() => {
                    menu.classList.remove('show');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
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

  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
      index = index > 0 ? index - 1 : slides.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });
  }
});
