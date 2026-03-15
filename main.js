/* =============================================
   まるの おさんぽびより — Main Script
   ============================================= */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal, .reveal--slide-left, .reveal--slide-right, .reveal--scale-up');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    const parent = el.closest('section');
    if (parent) {
      const siblings = Array.from(parent.querySelectorAll('.reveal, .reveal--slide-left, .reveal--slide-right, .reveal--scale-up'));
      const siblingIndex = siblings.indexOf(el);
      el.style.transitionDelay = `${siblingIndex * 0.08}s`;
    }
    revealObserver.observe(el);
  });

  // --- Mobile Menu ---
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.header__nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
        menuBtn.focus();
      }
    });
  }

  // --- Back to Top ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Header scroll style ---
  const header = document.querySelector('.header');

  function updateHeader() {
    if (window.scrollY > 80) {
      header.style.boxShadow = '0 1px 8px rgba(42, 33, 24, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Scroll Spy for Active Nav ---
  const navLinks = document.querySelectorAll('.header__nav-link[data-section]');
  const sections = [];

  navLinks.forEach((link) => {
    const sectionId = link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({ el: section, link: link });
    }
  });

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    let currentSection = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollY >= sections[i].el.offsetTop) {
        currentSection = sections[i];
        break;
      }
    }

    navLinks.forEach((link) => {
      if (!link.classList.contains('header__nav-link--cta')) {
        link.classList.remove('is-active');
      }
    });

    if (currentSection && !currentSection.link.classList.contains('header__nav-link--cta')) {
      currentSection.link.classList.add('is-active');
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --- Story chapter stagger animation ---
  const chapters = document.querySelectorAll('.story__chapter');
  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(chapters).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.12}s`;
          entry.target.classList.add('is-visible');
          chapterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  chapters.forEach((ch) => chapterObserver.observe(ch));
})();
