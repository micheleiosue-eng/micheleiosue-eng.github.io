// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Mobile menu
const btn = document.getElementById('menuBtn');
const links = document.getElementById('navLinks');
if (btn && links) {
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
  }));
}

// Nav shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.style.background = window.scrollY > 20 ? 'rgba(30,33,39,.92)' : 'rgba(30,33,39,.72)';
}, { passive: true });

// Anno automatico
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Form con validazione reale
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const msg = document.getElementById('msg');
  const privacy = document.getElementById('privacy');
  const note = document.getElementById('formNote');
  const btnSubmit = document.getElementById('submitBtn');

  if (!name.value.trim() || !email.value.includes('@') || msg.value.trim().length < 10 || !privacy.checked) {
    note.style.color = '#ff6961';
    note.textContent = 'Compila tutti i campi obbligatori e accetta la privacy.';
    return;
  }
  btnSubmit.disabled = true; btnSubmit.textContent = 'Invio...';
  setTimeout(() => {
    note.style.color = '#30d158';
    note.textContent = `Grazie ${name.value.trim()}! Ti risponderò entro 24h lavorative.`;
    form.reset();
    btnSubmit.disabled = false; btnSubmit.textContent = 'Invia messaggio';
  }, 800);
});

// Torna su
document.getElementById('topBtn')?.addEventListener('click', (e) => {
  e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
});
