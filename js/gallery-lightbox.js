/* facts-counter.js & gallery-lightbox.js combined utilities */

// Animated Counters with IntersectionObserver
(function() {
  const factBoxes = document.querySelectorAll('.fact-scatter-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fact-visible');
      }
    });
  }, { threshold: 0.2 });

  factBoxes.forEach(box => observer.observe(box));
})();

// Lightbox & Gallery logic
(function() {
  const modal = document.getElementById('gallery-lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const modalCanvas = document.getElementById('lightbox-render-canvas');
  const titleEl = document.getElementById('lightbox-item-title');
  const descEl = document.getElementById('lightbox-item-desc');
  const items = document.querySelectorAll('.gallery-mosaic-item');

  if (!modal) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title') || 'Cosmic Wonder';
      const desc = item.getAttribute('data-desc') || 'Deep field telescope observation of stellar phenomenon.';
      const theme = item.getAttribute('data-theme') || 'cyan';

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;

      renderLightboxGraphic(theme);
      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  function renderLightboxGraphic(theme) {
    if (!modalCanvas) return;
    const ctx = modalCanvas.getContext('2d');
    modalCanvas.width = 900;
    modalCanvas.height = 480;

    ctx.fillStyle = '#050711';
    ctx.fillRect(0, 0, 900, 480);

    // Render generative galaxy / nebula burst
    const numStars = 200;
    for (let i = 0; i < numStars; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.9})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 900, Math.random() * 480, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const grad = ctx.createRadialGradient(450, 240, 20, 450, 240, 260);
    if (theme === 'magenta') {
      grad.addColorStop(0, 'rgba(255, 119, 230, 0.85)');
      grad.addColorStop(0.5, 'rgba(108, 99, 255, 0.4)');
    } else if (theme === 'gold') {
      grad.addColorStop(0, 'rgba(255, 209, 102, 0.85)');
      grad.addColorStop(0.5, 'rgba(230, 111, 81, 0.4)');
    } else {
      grad.addColorStop(0, 'rgba(0, 217, 255, 0.85)');
      grad.addColorStop(0.5, 'rgba(58, 134, 255, 0.4)');
    }
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(450, 240, 260, 0, Math.PI * 2);
    ctx.fill();
  }
})();
