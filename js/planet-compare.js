/* planet-compare.js - Interactive side-by-side planet comparison matrix */
(function() {
  const planetData = {
    mercury: { name: 'Mercury', type: 'Terrestrial', mass: '0.055 Earths', dia: '4,879 km', gravity: '3.7 m/s²', temp: '167°C', moons: '0', day: '58.6 days' },
    venus: { name: 'Venus', type: 'Terrestrial', mass: '0.815 Earths', dia: '12,104 km', gravity: '8.87 m/s²', temp: '464°C', moons: '0', day: '243 days' },
    earth: { name: 'Earth', type: 'Terrestrial', mass: '1.0 Earth', dia: '12,742 km', gravity: '9.8 m/s²', temp: '15°C', moons: '1', day: '24 hours' },
    mars: { name: 'Mars', type: 'Terrestrial', mass: '0.107 Earths', dia: '6,779 km', gravity: '3.72 m/s²', temp: '-63°C', moons: '2', day: '24.6 hours' },
    jupiter: { name: 'Jupiter', type: 'Gas Giant', mass: '317.8 Earths', dia: '139,820 km', gravity: '24.79 m/s²', temp: '-110°C', moons: '95', day: '9.9 hours' },
    saturn: { name: 'Saturn', type: 'Gas Giant', mass: '95.2 Earths', dia: '116,460 km', gravity: '10.44 m/s²', temp: '-140°C', moons: '146', day: '10.7 hours' },
    uranus: { name: 'Uranus', type: 'Ice Giant', mass: '14.5 Earths', dia: '50,724 km', gravity: '8.69 m/s²', temp: '-195°C', moons: '28', day: '17.2 hours' },
    neptune: { name: 'Neptune', type: 'Ice Giant', mass: '17.1 Earths', dia: '49,244 km', gravity: '11.15 m/s²', temp: '-200°C', moons: '16', day: '16.1 hours' }
  };

  const sel1 = document.getElementById('compare-planet-1');
  const sel2 = document.getElementById('compare-planet-2');

  function updateMatrix() {
    if (!sel1 || !sel2) return;
    const p1 = planetData[sel1.value] || planetData.earth;
    const p2 = planetData[sel2.value] || planetData.mars;

    const fillVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    fillVal('c-name-1', p1.name);
    fillVal('c-type-1', p1.type);
    fillVal('c-mass-1', p1.mass);
    fillVal('c-dia-1', p1.dia);
    fillVal('c-grav-1', p1.gravity);
    fillVal('c-temp-1', p1.temp);
    fillVal('c-moons-1', p1.moons);
    fillVal('c-day-1', p1.day);

    fillVal('c-name-2', p2.name);
    fillVal('c-type-2', p2.type);
    fillVal('c-mass-2', p2.mass);
    fillVal('c-dia-2', p2.dia);
    fillVal('c-grav-2', p2.gravity);
    fillVal('c-temp-2', p2.temp);
    fillVal('c-moons-2', p2.moons);
    fillVal('c-day-2', p2.day);
  }

  if (sel1 && sel2) {
    sel1.addEventListener('change', updateMatrix);
    sel2.addEventListener('change', updateMatrix);
    updateMatrix();
  }

  // Filter pills on planets.html
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const cards = document.querySelectorAll('.planet-catalog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
