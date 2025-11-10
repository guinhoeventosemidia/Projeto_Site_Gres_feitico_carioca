// ======= PARALLAX =======
window.addEventListener('scroll', () => {
  const heros = document.querySelectorAll('.hero, .hero-historia');
  heros.forEach(hero => {
    let offset = window.pageYOffset;
    hero.style.backgroundPositionY = `${offset * 0.4}px`;
  });
});

// ======= NAVEGAÇÃO SUAVE =======
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ======= FADE AO ROLAR =======
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));

// ======= CARROSSEL =======
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let index = 0;

if (track) {
  const slides = Array.from(track.children);
  const total = slides.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    updateCarousel();
  });
}




  