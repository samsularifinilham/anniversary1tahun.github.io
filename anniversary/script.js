// ==========================================
// OUR LITTLE LOVE STORY - ANNIVERSARY
// Complete Interactive JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Our Little Love Story is ready! ❤️');

  // ELEMENTS
  const openingPage = document.getElementById('opening-page');
  const openGiftBtn = document.querySelector('.open-gift-btn');
  const floatingHearts = document.getElementById('floating-hearts');
  const flowerPetals = document.getElementById('flower-petals');

  // ==========================================
  // 1. FLOATING HEARTS
  // ==========================================

  function createFloatingHearts() {
    if (!floatingHearts) return;

    const symbols = ['♥️', '♡', '✧'];

    function createHeart() {
      const heart = document.createElement('span');
      heart.className = 'heart';
      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration =
        (Math.random() * 4 + 6) + 's';
      heart.style.fontSize =
        (Math.random() * 0.5 + 0.5) + 'rem';

      floatingHearts.appendChild(heart);

      setTimeout(() => heart.remove(), 10000);
    }

    createHeart();
    setInterval(createHeart, 1800);
  }

  // ==========================================
  // 2. FLOWER PETALS
  // ==========================================

  function createFlowerPetals() {
    if (!flowerPetals) return;

    const symbols = ['✿', '❀', '✧'];

    function createPetal() {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration =
        (Math.random() * 5 + 7) + 's';

      flowerPetals.appendChild(petal);

      setTimeout(() => petal.remove(), 12000);
    }

    createPetal();
    setInterval(createPetal, 2500);
  }

  // ==========================================
  // 3. SMOOTH SCROLLING
  // ==========================================

  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', event => {
        const selector = link.getAttribute('href');

        if (!selector || selector === '#') return;

        const target = document.querySelector(selector);

        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================
  // 4. SCROLL REVEAL
  // ==========================================

  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => {
        element.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    elements.forEach(element => observer.observe(element));
  }

  // ==========================================
  // 5. OPEN GIFT BUTTON
  // ==========================================

  function initGiftButton() {
    if (!openGiftBtn) {
      console.warn('Open Your Gift button not found.');
      return;
    }

    if (floatingHearts) floatingHearts.style.pointerEvents = 'none';
    if (flowerPetals) flowerPetals.style.pointerEvents = 'none';

    openGiftBtn.addEventListener('click', event => {
      event.preventDefault();

      if (openGiftBtn.disabled) return;
      openGiftBtn.disabled = true;

      if (openingPage) {
        openingPage.style.transition = 'opacity 0.8s ease';
        openingPage.style.opacity = '0';
        openingPage.style.pointerEvents = 'none';
      }

      setTimeout(() => {
        if (openingPage) {
          openingPage.style.display = 'none';
        }

        const sections = [
          '.hero-section',
          '.our-story-section',
          '#letter',
          '.memories-section',
          '.special-message-section',
          '.final-section'
        ];

        sections.forEach((selector, index) => {
          const section = document.querySelector(selector);

          if (!section) return;

          section.style.display = 'block';
          section.style.opacity = '0';

          setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease';
            section.style.opacity = '1';
          }, 100 + index * 180);
        });

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        openGiftBtn.disabled = false;
      }, openingPage ? 850 : 0);
    });

    // READ LETTER AGAIN
    document.querySelectorAll('.read-again-btn').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();

        const letter = document.getElementById('letter');

        if (letter) {
          letter.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // 6. PHOTO GALLERY
  // ==========================================

  function initGallery() {
    const photoSlots = document.querySelectorAll('.photo-slot');

    photoSlots.forEach(slot => {
      slot.style.transition = 'transform 0.3s ease';

      slot.addEventListener('mouseenter', () => {
        slot.style.transform = 'translateY(-5px)';
      });

      slot.addEventListener('mouseleave', () => {
        slot.style.transform = 'translateY(0)';
      });
    });
  }

  // ==========================================
  // 7. PHOTO LIGHTBOX
  // ==========================================

  function initLightbox() {
    const images = document.querySelectorAll('.photo-slot img');

    if (!images.length) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'photo-lightbox';

    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <img src="" alt="Our memory">
    `;

    document.body.appendChild(lightbox);

    const preview = lightbox.querySelector('img');
    const closeButton = lightbox.querySelector('.lightbox-close');

    images.forEach(image => {
      image.style.cursor = 'pointer';

      image.addEventListener('click', () => {
        preview.src = image.src;
        preview.alt = image.alt || 'Our memory';
        lightbox.classList.add('active');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
    }

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // 8. BACK TO TOP
  // ==========================================

  function initBackToTop() {
    if (document.getElementById('back-to-top')) return;

    const button = document.createElement('button');

    button.id = 'back-to-top';
    button.className = 'btn-primary';
    button.textContent = '↑';
    button.setAttribute('aria-label', 'Back to top');

    button.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      cursor: pointer;
    `;

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', () => {
      button.style.display =
        window.scrollY > 500 ? 'flex' : 'none';
    });

    document.body.appendChild(button);
  }

  // ==========================================
  // 9. HERO PARALLAX
  // ==========================================

  function initParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      hero.style.backgroundPosition =
        'center ' + (window.scrollY * 0.3) + 'px';
    }, { passive: true });
  }

  // ==========================================
  // 10. LIVE RELATIONSHIP COUNTER
  // ==========================================

  function initRelationshipCounter() {
    // Anniversary: 25 November 2025, 15:30 WIB
    const startDate = new Date('2025-11-25T15:30:00+07:00');

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement
    ) {
      console.warn('Relationship counter HTML elements not found.');
      return;
    }

    function updateCounter() {
      const now = Date.now();
      let difference = now - startDate.getTime();

      if (difference < 0) difference = 0;

      const totalSeconds = Math.floor(difference / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      daysElement.textContent = days;
      hoursElement.textContent = String(hours).padStart(2, '0');
      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  // ==========================================
  // 11. INITIALIZE EVERYTHING
  // ==========================================

  createFloatingHearts();
  createFlowerPetals();
  initSmoothScrolling();
  initScrollReveal();
  initGiftButton();
  initGallery();
  initLightbox();
  initBackToTop();
  initParallax();
  initRelationshipCounter();

});