// Menu hambúrguer
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu-mobile');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Carrossel infinito: duplica as cartas para o laço fechar sem emenda
const track = document.querySelector('.track');
[...track.children].forEach(li => {
  const clone = li.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);
});

// Em telas de toque, o toque vira a carta
track.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card && window.matchMedia('(hover: none)').matches) card.classList.toggle('flipped');
});

// Entrada suave das seções (uma vez)
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
