// MENU MOBILE
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
