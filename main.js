// Gallery filter
const filterBtns = document.querySelectorAll('.gf-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
});

mobileClose.addEventListener('click', closeMobile);

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Form submission
const form = document.getElementById('reg-form');
const toast = document.getElementById('toast');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#f07070';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    toast.classList.add('show');
    form.reset();

    setTimeout(() => toast.classList.remove('show'), 4000);
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.querySelector('.theme-icon').textContent = '🌙';
    themeToggle.querySelector('.theme-label').textContent = 'Dark';
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.querySelector('.theme-icon').textContent = '☀️';
      themeToggle.querySelector('.theme-label').textContent = 'Light';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.querySelector('.theme-icon').textContent = '🌙';
      themeToggle.querySelector('.theme-label').textContent = 'Dark';
    }
  });
}