/* -----------------------------------------
   Javier Agüera — portfolio interactions
 ----------------------------------------- */

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
}

// Nav background on scroll + back-to-top visibility
const nav = document.querySelector('.nav');
const backToTop = document.getElementById('back-to-top');

const onScroll = () => {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('is-scrolled', y > 20);
  if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
  // Safety net: if anything is still hidden after load, reveal it.
  window.addEventListener('load', () => {
    setTimeout(() => revealEls.forEach((el) => el.classList.add('is-in')), 2000);
  });
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}
