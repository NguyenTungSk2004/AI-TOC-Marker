// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    header.style.backdropFilter = 'blur(10px)';
    header.style.background = 'rgba(248, 249, 250, 0.95)';
  } else {
    header.style.backdropFilter = 'none';
    header.style.background = 'var(--bg-white)';
  }
  
  lastScrollTop = scrollTop;
});

// Mobile menu toggle
const createMobileMenu = () => {
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav-links');
  
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
  
  // Insert mobile menu button
  nav.insertBefore(mobileMenuBtn, navLinks);
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-links-mobile');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = navLinks.classList.contains('nav-links-mobile') 
      ? 'fas fa-times' 
      : 'fas fa-bars';
  });
  
  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-links-mobile');
      mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
  });
};

// Initialize mobile menu on page load
document.addEventListener('DOMContentLoaded', () => {
  createMobileMenu();
  
  // Add loading animation to page
  document.body.classList.add('page-loaded');
});

// Performance optimization - lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

console.log('AI TOC Marker - Landing page loaded successfully');
