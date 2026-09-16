/* hero-video.js - Cinematic 60FPS WebGL/Canvas deep-space flythrough loop */
(function() {
  const canvas = document.getElementById('hero-nebula-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationId;

  // Realistic High-Res Planet Image
  const planetImg = new Image();
  planetImg.src = 'assets/hero-space.jpg';
  let imgLoaded = false;
  planetImg.onload = () => { imgLoaded = true; };

  // Generate 3D Starfield particles for cinematic forward travel & sideways drift
  const NUM_STARS = 650;
  let stars = [];

  function initStars() {
    stars = [];
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000 + 1,
        origZ: Math.random() * 1000 + 1,
        size: Math.random() * 1.6 + 0.4,
        colorType: Math.random()
      });
    }
  }

  // Floating cosmic dust particles
  const NUM_DUST = 45;
  let dustParticles = [];
  function initDust() {
    dustParticles = [];
    for (let i = 0; i < NUM_DUST; i++) {
      dustParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0002,
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1
      });
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();
  initStars();
  initDust();

  // Seamless 12-second timing loop (720 frames at 60 FPS)
  const LOOP_DURATION = 12000; // 12 seconds
  let startTime = performance.now();

  function render(now) {
    const elapsed = (now - startTime) % LOOP_DURATION;
    const progress = elapsed / LOOP_DURATION; // 0.0 -> 1.0 smooth cycle

    // Cinematic forward travel speed with ultra-smooth sinusoidal easing for loop
    // camera moves forward and slightly drifts sideways
    const speed = 2.2;
    const driftX = Math.sin(progress * Math.PI * 2) * 80;
    const driftY = Math.cos(progress * Math.PI * 2) * 35;

    ctx.clearRect(0, 0, width, height);

    // 1. Deep space base backdrop
    ctx.fillStyle = '#03040a';
    ctx.fillRect(0, 0, width, height);

    // 2. Render realistic 4K backdrop if loaded (with cinematic pan & zoom)
    if (imgLoaded) {
      ctx.save();
      // Slight scale 1.05 to 1.12 to simulate approaching the planet
      const scale = 1.05 + Math.sin(progress * Math.PI) * 0.07;
      const panX = -20 + Math.sin(progress * Math.PI * 2) * 25;
      const panY = -15 + Math.cos(progress * Math.PI * 2) * 15;

      // Draw image with cover aspect ratio, keeping right-side planet prominent
      const imgAspect = planetImg.width / planetImg.height;
      const canvasAspect = width / height;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = width * scale;
        drawH = (width / imgAspect) * scale;
      } else {
        drawH = height * scale;
        drawW = (height * imgAspect) * scale;
      }
      drawX = (width - drawW) * 0.5 + panX;
      drawY = (height - drawH) * 0.5 + panY;

      // Ensure planet on right side remains nicely anchored
      if (width < 768) {
        // Mobile crop: shift slightly right so planet crescent remains visible
        drawX += width * 0.15;
      }

      ctx.globalAlpha = 0.95;
      ctx.drawImage(planetImg, drawX, drawY, drawW, drawH);
      ctx.restore();
    }

    // 3. Electric Blue & Violet Atmospheric Nebulae Clouds (Volumetric multi-layer)
    ctx.save();
    // Nebula 1 (Electric Violet deep glow)
    const neb1X = width * 0.38 + Math.sin(progress * Math.PI * 2) * 45;
    const neb1Y = height * 0.5 + Math.cos(progress * Math.PI * 2) * 30;
    const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 50, neb1X, neb1Y, width * 0.6);
    grad1.addColorStop(0, 'rgba(108, 99, 255, 0.28)');
    grad1.addColorStop(0.4, 'rgba(168, 85, 247, 0.14)');
    grad1.addColorStop(1, 'rgba(3, 4, 10, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    // Nebula 2 (Cyan / Deep Navy cosmic light ray)
    const neb2X = width * 0.72 + Math.cos(progress * Math.PI * 2) * 35;
    const neb2Y = height * 0.42 + Math.sin(progress * Math.PI * 2) * 25;
    const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 30, neb2X, neb2Y, width * 0.55);
    grad2.addColorStop(0, 'rgba(0, 217, 255, 0.24)');
    grad2.addColorStop(0.5, 'rgba(58, 134, 255, 0.10)');
    grad2.addColorStop(1, 'rgba(3, 4, 10, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // 4. Warp & Parallax 3D Starfield (Traveling Forward)
    ctx.save();
    const cx = width * 0.5 + driftX;
    const cy = height * 0.5 + driftY;

    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
      s.z -= speed;
      if (s.z <= 0) {
        s.z = 1000;
        s.x = (Math.random() - 0.5) * 2000;
        s.y = (Math.random() - 0.5) * 2000;
      }

      const k = 280 / s.z;
      const px = s.x * k + cx;
      const py = s.y * k + cy;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const size = Math.max(0.6, (1 - s.z / 1000) * s.size * 2);
        const alpha = (1 - s.z / 1000) * 0.85;

        if (s.colorType > 0.85) {
          ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`;
        } else if (s.colorType > 0.7) {
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 5. Subtle Cosmic Dust Particles Floating
    ctx.save();
    for (let d of dustParticles) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = 1;
      if (d.x > 1) d.x = 0;
      if (d.y < 0) d.y = 1;
      if (d.y > 1) d.y = 0;

      const px = d.x * width;
      const py = d.y * height;
      const pulse = 0.5 + 0.5 * Math.sin(progress * Math.PI * 4 + d.x * 10);

      ctx.fillStyle = `rgba(147, 197, 253, ${d.alpha * pulse})`;
      ctx.beginPath();
      ctx.arc(px, py, d.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 6. Left & Center-Left Negative Space Darkening Gradient
    // Ensures large white headline "EXPLORE THE INFINITE" has pristine contrast
    ctx.save();
    const textVignette = ctx.createLinearGradient(0, 0, width, 0);
    textVignette.addColorStop(0, 'rgba(3, 4, 10, 0.82)');
    textVignette.addColorStop(0.38, 'rgba(3, 4, 10, 0.65)');
    textVignette.addColorStop(0.70, 'rgba(3, 4, 10, 0.20)');
    textVignette.addColorStop(1, 'rgba(3, 4, 10, 0.45)');
    ctx.fillStyle = textVignette;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    animationId = requestAnimationFrame(render);
  }

  animationId = requestAnimationFrame(render);
})();