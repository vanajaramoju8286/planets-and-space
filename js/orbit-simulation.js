/* orbit-simulation.js - High-DPI Interactive 2D Solar System simulation */
(function() {
  const canvas = document.getElementById('orbit-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let speedMultiplier = 1;
  let hoveredPlanet = null;

  // Planet definitions
  const planets = [
    { name: 'Mercury', distance: 55, radius: 4, speed: 0.04, color: '#a0aab2', type: 'Terrestrial', dia: '4,879 km', distKm: '57.9M km', day: '59 days' },
    { name: 'Venus', distance: 80, radius: 6.5, speed: 0.025, color: '#e3bb76', type: 'Terrestrial', dia: '12,104 km', distKm: '108.2M km', day: '243 days' },
    { name: 'Earth', distance: 115, radius: 7, speed: 0.018, color: '#4a90e2', type: 'Terrestrial', dia: '12,742 km', distKm: '149.6M km', day: '24 hrs' },
    { name: 'Mars', distance: 150, radius: 5, speed: 0.014, color: '#e2594a', type: 'Terrestrial', dia: '6,779 km', distKm: '227.9M km', day: '24.6 hrs' },
    { name: 'Jupiter', distance: 200, radius: 15, speed: 0.009, color: '#d4a373', type: 'Gas Giant', dia: '139,820 km', distKm: '778.5M km', day: '9.9 hrs' },
    { name: 'Saturn', distance: 250, radius: 12, speed: 0.007, color: '#e9d8a6', hasRings: true, type: 'Gas Giant', dia: '116,460 km', distKm: '1.43B km', day: '10.7 hrs' },
    { name: 'Uranus', distance: 295, radius: 9, speed: 0.005, color: '#90e0ef', type: 'Ice Giant', dia: '50,724 km', distKm: '2.87B km', day: '17.2 hrs' },
    { name: 'Neptune', distance: 340, radius: 8.5, speed: 0.0035, color: '#0077b6', type: 'Ice Giant', dia: '49,244 km', distKm: '4.50B km', day: '16.1 hrs' }
  ];

  planets.forEach((p, index) => {
    p.angle = (index * Math.PI) / 4;
  });

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse move detection
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    hoveredPlanet = null;
    for (let p of planets) {
      const px = centerX + Math.cos(p.angle) * p.distance;
      const py = centerY + Math.sin(p.angle) * p.distance * 0.55; // Elliptical 3D incline
      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist < p.radius + 8) {
        hoveredPlanet = p;
        updateHud(p);
        break;
      }
    }
  });

  function updateHud(planet) {
    const nameEl = document.getElementById('hud-planet-name');
    const typeEl = document.getElementById('hud-planet-type');
    const distEl = document.getElementById('hud-planet-dist');
    const diaEl = document.getElementById('hud-planet-dia');
    const dayEl = document.getElementById('hud-planet-day');
    if (nameEl) nameEl.textContent = planet.name;
    if (typeEl) typeEl.textContent = planet.type;
    if (distEl) distEl.textContent = planet.distKm;
    if (diaEl) diaEl.textContent = planet.dia;
    if (dayEl) dayEl.textContent = planet.day;
  }

  // Speed controls
  document.querySelectorAll('.orbit-ctrl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.orbit-ctrl-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const spd = btn.getAttribute('data-speed');
      speedMultiplier = spd === 'pause' ? 0 : parseFloat(spd);
    });
  });

  function render() {
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Orbit gridlines
    for (let p of planets) {
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, p.distance, p.distance * 0.55, 0, 0, Math.PI * 2);
      ctx.strokeStyle = hoveredPlanet === p ? 'rgba(0, 217, 255, 0.4)' : 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = hoveredPlanet === p ? 1.5 : 1;
      ctx.stroke();
    }

    // Draw Sun
    ctx.save();
    const sunGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 32);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#ffcc00');
    sunGrad.addColorStop(0.8, '#ff6600');
    sunGrad.addColorStop(1, 'rgba(255, 68, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Render Planets
    for (let p of planets) {
      p.angle += p.speed * 0.5 * speedMultiplier;
      const px = centerX + Math.cos(p.angle) * p.distance;
      const py = centerY + Math.sin(p.angle) * p.distance * 0.55;

      // Glow if hovered
      if (hoveredPlanet === p) {
        ctx.beginPath();
        ctx.arc(px, py, p.radius + 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.25)';
        ctx.fill();
      }

      // Planet Sphere
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Saturn ring
      if (p.hasRings) {
        ctx.beginPath();
        ctx.ellipse(px, py, p.radius * 2.2, p.radius * 0.6, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(233, 216, 166, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Planet Label
      ctx.fillStyle = hoveredPlanet === p ? '#00d9ff' : 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px "Space Grotesk", monospace';
      ctx.fillText(p.name, px + p.radius + 5, py + 3);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
})();
