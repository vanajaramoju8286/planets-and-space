/* main.js - Starfield background generator, Hero nebula canvas, Constellation interactive map */
(function() {
  // Global Starfield Canvas
  const starCanvas = document.getElementById('starfield-canvas');
  if (starCanvas) {
    const ctx = starCanvas.getContext('2d');
    let stars = [];
    const numStars = 280;

    function initStars() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.015
        });
      }
    }

    window.addEventListener('resize', initStars);
    initStars();

    function renderStarfield() {
      ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      for (let s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(renderStarfield);
    }
    renderStarfield();
  }

  // Hero background canvas is rendered and animated by hero-video.js

  // Constellation Canvas in Final CTA
  const constCanvas = document.getElementById('constellation-canvas');
  if (constCanvas) {
    const ctx = constCanvas.getContext('2d');
    let points = [];
    const numPoints = 35;

    function resizeConst() {
      const rect = constCanvas.getBoundingClientRect();
      constCanvas.width = rect.width;
      constCanvas.height = rect.height;
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * constCanvas.width,
          y: Math.random() * constCanvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
    }
    window.addEventListener('resize', resizeConst);
    resizeConst();

    function renderConst() {
      ctx.clearRect(0, 0, constCanvas.width, constCanvas.height);
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > constCanvas.width) p1.vx = -p1.vx;
        if (p1.y < 0 || p1.y > constCanvas.height) p1.vy = -p1.vy;

        ctx.fillStyle = 'rgba(0, 217, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(108, 99, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderConst);
    }
    renderConst();
  }

  // Draw Gallery Thumbnails onto Canvas
  document.querySelectorAll('.gallery-thumb-canvas').forEach(cvs => {
    const ctx = cvs.getContext('2d');
    const color = cvs.getAttribute('data-color') || '#00d9ff';
    cvs.width = 400;
    cvs.height = 300;

    ctx.fillStyle = '#070b16';
    ctx.fillRect(0, 0, 400, 300);

    const grad = ctx.createRadialGradient(200, 150, 20, 200, 150, 180);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, 'rgba(108, 99, 255, 0.3)');
    grad.addColorStop(1, 'rgba(7, 11, 22, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(200, 150, 180, 0, Math.PI * 2);
    ctx.fill();

    // Random stars
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(Math.random() * 400, Math.random() * 300, 1.5, 1.5);
    }
  });
})();
