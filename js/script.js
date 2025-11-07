// Mobile menu toggle
function toggleMobileMenu(){
  const nav = document.querySelector('.nav ul');
  if(nav) nav.classList.toggle('open');
}

// Parallax: use requestAnimationFrame for smoothness
const parallaxEls = document.querySelectorAll('.parallax');
function onScroll(){
  const scrollY = window.scrollY;
  parallaxEls.forEach(el=>{
    const speed = parseFloat(el.dataset.speed) || 0.2;
    // translateY for smooth GPU-accelerated motion
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}
window.addEventListener('scroll', ()=>{
  window.requestAnimationFrame(onScroll);
});

// Smooth nav scrolling (delegation)
document.addEventListener('click', (e)=>{
  if(e.target.matches('nav a')){
    e.preventDefault();
    const href = e.target.getAttribute('href');
    const target = document.querySelector(href);
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    const navul = document.querySelector('.nav ul');
    if(navul && navul.classList.contains('open')) navul.classList.remove('open');
  }
});

// Fade-in observer
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.18});

document.querySelectorAll('.fade-section').forEach(s=>observer.observe(s));

// Carousel
(function(){
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  if(!track) return;
  const slides = Array.from(track.children);
  let idx = 0;
  function update(){ track.style.transform = `translateX(-${idx * 100}%)`; }
  if(prev) prev.addEventListener('click', ()=>{ idx = (idx-1 + slides.length)%slides.length; update();});
  if(next) next.addEventListener('click', ()=>{ idx = (idx+1)%slides.length; update();});
  // autoplay gentle
  setInterval(()=>{ idx = (idx+1)%slides.length; update(); }, 5000);
})();
