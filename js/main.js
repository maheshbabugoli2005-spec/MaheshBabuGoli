// ============================================
// MAHESH.DEV - MAIN JAVASCRIPT
// Single Page Portfolio
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSkillTabs();
  initScrollAnimations();
  initCounterAnimations();
  initSmoothScroll();
});

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const close = document.getElementById('navClose');
  const overlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  // Open menu
  toggle.addEventListener('click', () => {
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close menu function
  const closeMenu = () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close button
  if (close) {
    close.addEventListener('click', closeMenu);
  }

  // Click overlay to close
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Highlight active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });
}

// ============================================
// SKILL TABS
// ============================================

function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const contents = document.querySelectorAll('.skill-content');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Hide all content
      contents.forEach(c => c.classList.remove('active'));

      // Activate clicked tab
      tab.classList.add('active');

      // Show corresponding content
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.about-card, .timeline-card, .project-card, .exp-icon-card, .cert-card, .honor-card, .stat-card'
  );

  if (elements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number, .honor-stat-number, .tech-stat-number');

  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const text = element.textContent;
  const match = text.match(/(\d+\.?\d*)/);

  if (!match) return;

  const target = parseFloat(match[0]);
  const isFloat = text.includes('.');
  const suffix = text.replace(match[0], '');
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = target * easeOut;

    if (isFloat) {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = text; // Reset to original
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// SKILL BAR ANIMATIONS
// ============================================

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bars when tab is shown
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateSkillBars, 500);
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '⏳ Sending...';
    submitBtn.disabled = true;

    // Re-enable after form submission (Formspree handles the actual submit)
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ============================================
// NAVIGATION MENU (Mobile-ready)
// ============================================

document.querySelectorAll('.footer-links a, .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    // Close mobile menu if open
    const toggle = document.querySelector('.nav-toggle');
    if (toggle && toggle.classList.contains('active')) {
      toggle.classList.remove('active');
    }
  });
});
