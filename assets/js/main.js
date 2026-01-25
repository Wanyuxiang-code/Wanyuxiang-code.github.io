/**
 * Main JavaScript - Personal Homepage
 * Handles navigation, scroll effects, and interactions
 */

(function() {
  'use strict';

  // ============================================================
  // DOM Elements
  // ============================================================
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('.section[id]');

  // ============================================================
  // Header Scroll Effect
  // ============================================================
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ============================================================
  // Mobile Navigation Toggle
  // ============================================================
  function toggleMobileNav() {
    siteNav.classList.toggle('open');
    document.body.style.overflow = siteNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileNav() {
    siteNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================================
  // Active Navigation Link on Scroll
  // ============================================================
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================================
  // Smooth Scroll for Navigation Links
  // ============================================================
  function handleNavClick(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 64;
        const extraOffset = 20;
        const rect = targetSection.getBoundingClientRect();
        const targetPosition = rect.top + window.pageYOffset - headerHeight - extraOffset;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });

        // Close mobile nav if open
        closeMobileNav();
      }
    }
  }

  // ============================================================
  // Back to Top Button
  // ============================================================
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ============================================================
  // Close mobile nav when clicking outside
  // ============================================================
  function handleClickOutside(e) {
    if (siteNav.classList.contains('open') && 
        !siteNav.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMobileNav();
    }
  }

  // ============================================================
  // Throttle Function for Performance
  // ============================================================
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ============================================================
  // Initialize
  // ============================================================
  function init() {
    // Initial state checks
    handleHeaderScroll();
    handleBackToTop();

    // Scroll event handlers (throttled for performance)
    const throttledScrollHandler = throttle(function() {
      handleHeaderScroll();
      handleBackToTop();
      updateActiveNavLink();
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    // Navigation toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
    }

    // Navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Back to top
    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
    }

    // Close mobile nav on outside click
    document.addEventListener('click', handleClickOutside);

    // Handle escape key to close mobile nav
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Smooth scroll for all anchor links (skip nav-links as they have their own handler)
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 64;
            const extraOffset = 20;
            const rect = target.getBoundingClientRect();
            const targetPosition = rect.top + window.pageYOffset - headerHeight - extraOffset;
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
