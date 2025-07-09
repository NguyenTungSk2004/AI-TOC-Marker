/* ==================================================
   AI TOC Marker Guide Page - Enhanced JavaScript
   Modern, interactive, performance-optimized
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initProgressBar();
  initBackToTop();
  initTableOfContents();
  initImageModal();
  initSmoothScrolling();
  initHeaderEffects();
  initAnimations();
  initPerformanceOptimizations();
  
  console.log('🚀 AI TOC Marker Guide - All systems loaded successfully!');
});

/* ==================================================
   Progress Bar
   ================================================== */
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  };

  // Throttled scroll event for better performance
  let ticking = false;
  const throttledUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledUpdate, { passive: true });
  updateProgress(); // Initial call
}

/* ==================================================
   Back to Top Button
   ================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isVisible = scrollTop > 300;
    
    backToTopBtn.classList.toggle('visible', isVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Throttled scroll event
  let ticking = false;
  const throttledToggle = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleVisibility();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledToggle, { passive: true });
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // Keyboard accessibility
  backToTopBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  toggleVisibility(); // Initial call
}

/* ==================================================
   Table of Contents
   ================================================== */
function initTableOfContents() {
  const tocItems = document.querySelectorAll('.toc-item');
  const stepSections = document.querySelectorAll('.step-card');
  
  if (!tocItems.length || !stepSections.length) return;

  // Intersection Observer for active section highlighting
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-20% 0px -60% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const stepNumber = sectionId.replace('step-', '');
        
        // Remove active class from all TOC items
        tocItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current TOC item
        const currentTocItem = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentTocItem) {
          currentTocItem.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe all step sections
  stepSections.forEach(section => {
    observer.observe(section);
  });

  // Add smooth scroll behavior to TOC items
  tocItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const targetPosition = targetElement.offsetTop - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Add visual feedback
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.transform = '';
        }, 150);
      }
    });

    // Add hover effects
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px)';
    });

    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        item.style.transform = '';
      }
    });
  });
}

/* ==================================================
   Image Modal
   ================================================== */
function initImageModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close-modal');
  const images = document.querySelectorAll('.guide-image');

  if (!modal || !modalImg || !images.length) return;

  const openModal = (imageSrc, caption) => {
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    if (modalCaption) {
      modalCaption.textContent = caption;
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modal.focus();
    
    // Add opening animation
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  };

  const closeModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Add click events to images
  images.forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.nextElementSibling?.textContent || img.alt || '';
      openModal(img.src, caption);
    });

    // Add keyboard support
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const caption = img.nextElementSibling?.textContent || img.alt || '';
        openModal(img.src, caption);
      }
    });

    // Make images focusable
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Nhấn để phóng to hình ảnh: ${img.alt}`);
  });

  // Close modal events
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  // Initialize modal styles
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease-in-out';
}

/* ==================================================
   Smooth Scrolling
   ================================================== */
function initSmoothScrolling() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not(.toc-item)');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const targetPosition = targetElement.offsetTop - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==================================================
   Header Effects
   ================================================== */
function initHeaderEffects() {
  const header = document.querySelector('.guide-header');
  if (!header) return;

  let lastScrollTop = 0;
  const scrollThreshold = 100;

  const updateHeader = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    header.classList.toggle('scrolled', scrollTop > scrollThreshold);
    
    // Optional: Hide/show header on scroll direction (uncomment if needed)
    /*
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    */
    
    lastScrollTop = scrollTop;
  };

  // Throttled scroll event
  let ticking = false;
  const throttledUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledUpdate, { passive: true });
  updateHeader(); // Initial call
}

/* ==================================================
   Scroll Animations
   ================================================== */
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Stagger animations for child elements
        const children = entry.target.querySelectorAll('.step-card, .help-card, .toc-item');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const animatedElements = document.querySelectorAll(`
    .toc-section,
    .installation-steps,
    .help-section,
    .security-notice,
    .step-card
  `);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Add CSS animation classes
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

/* ==================================================
   Performance Optimizations
   ================================================== */
function initPerformanceOptimizations() {
  // Lazy load images with loading="lazy" fallback
  const lazyImages = document.querySelectorAll('img:not([loading="lazy"])');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Preload critical resources
  const preloadLinks = [
    'https://fonts.googleapis.com',
    'https://cdnjs.cloudflare.com'
  ];

  preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  });

  // Add performance monitoring
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('🎯 LCP:', entry.startTime);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Ignore if not supported
    }
  }
}

/* ==================================================
   Enhanced User Experience Features
   ================================================== */

// Copy code functionality
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'CODE') {
    const text = e.target.textContent;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Đã copy code!');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('📋 Đã copy code!');
    }
  }
});

// Toast notification system
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a73e8;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 500;
    animation: toastSlideUp 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.animation = 'toastSlideDown 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes toastSlideUp {
    from { transform: translateX(-50%) translateY(100px); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
  }
  
  @keyframes toastSlideDown {
    from { transform: translateX(-50%) translateY(0); opacity: 1; }
    to { transform: translateX(-50%) translateY(100px); opacity: 0; }
  }
`;
document.head.appendChild(toastStyle);

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
  // Quick navigation with number keys
  if (e.ctrlKey || e.metaKey) {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 7) {
      e.preventDefault();
      const stepElement = document.getElementById(`step-${num}`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast(`🎯 Đã chuyển đến bước ${num}`);
      }
    }
  }
});

// Add visual feedback for interactive elements
document.addEventListener('mousedown', (e) => {
  if (e.target.matches('button, .btn, .toc-item, .help-btn')) {
    e.target.style.transform = 'scale(0.95)';
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.target.matches('button, .btn, .toc-item, .help-btn')) {
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  }
});

// Error handling and graceful degradation
window.addEventListener('error', (e) => {
  console.warn('⚠️ Guide page error caught:', e.error);
  // Graceful degradation - ensure basic functionality still works
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Note: Service worker would need to be implemented separately
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Analytics and user behavior tracking (anonymized)
function trackUserInteraction(action, element) {
  // This would integrate with analytics service
  console.log(`📊 User interaction: ${action} on ${element}`);
}

// Track important user actions
document.addEventListener('click', (e) => {
  if (e.target.matches('.download-btn')) {
    trackUserInteraction('download_click', 'header_download');
  } else if (e.target.matches('.help-btn')) {
    trackUserInteraction('help_click', e.target.textContent.trim());
  } else if (e.target.matches('.toc-item')) {
    trackUserInteraction('toc_navigation', e.target.dataset.step);
  }
});

// Page load completion
window.addEventListener('load', () => {
  console.log('✅ Guide page fully loaded and interactive');
  
  // Remove any loading states
  document.body.classList.add('page-loaded');
  
  // Initialize any remaining components
  setTimeout(() => {
    // Final setup after everything is loaded
    console.log('🎉 All guide features initialized successfully!');
  }, 100);
});
