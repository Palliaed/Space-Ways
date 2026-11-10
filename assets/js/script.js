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

// Parallax dos personagens do banner (só com mouse e sem "reduzir movimento")
const banner = document.querySelector('.banner-art');
if (banner && matchMedia('(hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  banner.addEventListener('mousemove', (e) => {
    const r = banner.getBoundingClientRect();
    banner.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * -2);
    banner.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * -2);
  });
  banner.addEventListener('mouseleave', () => {
    banner.style.setProperty('--mx', 0);
    banner.style.setProperty('--my', 0);
  });
}
