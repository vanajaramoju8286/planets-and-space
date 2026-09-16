/* cursor.js - Desktop magnetic cursor with context states */
(function() {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth <= 1024;
  if (isTouch) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachCursorHover() {
    // Links & Buttons
    document.querySelectorAll('a, button, input, select, .cursor-interactive').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-hover');
        ring.innerText = '';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-hover');
        ring.innerText = '';
      });
    });

    // Planets & Orbits -> "EXPLORE"
    document.querySelectorAll('.world-editorial-card, #orbit-canvas, .planet-catalog-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-explore');
        ring.innerText = 'EXPLORE';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-explore');
        ring.innerText = '';
      });
    });

    // Gallery Items -> "VIEW"
    document.querySelectorAll('.gallery-mosaic-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-view');
        ring.innerText = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-view');
        ring.innerText = '';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachCursorHover);
  } else {
    attachCursorHover();
  }
})();
