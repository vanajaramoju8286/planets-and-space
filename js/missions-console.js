/* missions-console.js - Mission Control console tabs and live telemetry */
(function() {
  const missions = {
    apollo11: {
      name: "Apollo 11",
      year: "1969",
      agency: "NASA",
      img: "assets/apollo.jpg",
      destination: "The Moon (Mare Tranquillitatis)",
      objective: "Perform first crewed lunar landing and safely return to Earth.",
      crew: "Neil Armstrong, Buzz Aldrin, Michael Collins",
      status: "SUCCESS / HISTORIC",
      telemetry: {
        distance: "384,400 km",
        duration: "8 Days 3 Hrs",
        samples: "21.55 kg lunar rock"
      },
      log: "LUNAR MODULE TOUCHDOWN CONFIRMED: HOUSTON, TRANQUILITY BASE HERE. THE EAGLE HAS LANDED."
    },
    voyager: {
      name: "Voyager 1 & 2",
      year: "1977 - Present",
      agency: "NASA / JPL",
      img: "assets/voyager.jpg",
      destination: "Interstellar Space",
      objective: "Explore Jupiter, Saturn, Uranus, Neptune and penetrate the heliopause into deep interstellar space.",
      crew: "Uncrewed Robotic Probe",
      status: "INTERSTELLAR CRUISE",
      telemetry: {
        distance: "24.3 Billion km",
        velocity: "61,200 km/h",
        signalDelay: "22.5 Hours (one-way)"
      },
      log: "HELIOPAUSE PENETRATION VERIFIED. CARRIES THE GOLDEN RECORD TO COMMUNICATE WITH COSMIC TRAVELERS."
    },
    hubble: {
      name: "Hubble Space Telescope",
      year: "1990 - Present",
      agency: "NASA / ESA",
      img: "assets/hubble.jpg",
      destination: "Low Earth Orbit (547 km)",
      objective: "Observe deep galaxies, resolve the Hubble constant, and peer back across 13 billion light years of cosmic history.",
      crew: "Uncrewed Observatory",
      status: "OPERATIONAL",
      telemetry: {
        orbits: "180,000+",
        observations: "1.5 Million+",
        dataArchive: "175+ Terabytes"
      },
      log: "DEEP FIELD REVEALED THOUSANDS OF PRIMORDIAL GALAXIES IN A SPECK OF NIGHT SKY ONCE THOUGHT EMPTY."
    },
    jameswebb: {
      name: "James Webb Space Telescope",
      year: "2021 - Present",
      agency: "NASA / ESA / CSA",
      img: "assets/jameswebb.jpg",
      destination: "Sun-Earth L2 Lagrange Point (1.5M km)",
      objective: "Deploy 6.5-meter gold beryllium mirror and mid-infrared instruments to image the first stars after the Big Bang.",
      crew: "Uncrewed Infrared Observatory",
      status: "SCIENCE OPERATIONS",
      telemetry: {
        mirrorDia: "6.5 Meters",
        temperature: "-233 deg C (40 K)",
        orbit: "Halo orbit at L2"
      },
      log: "ATMOSPHERIC SPECTRA OF EXOPLANET WASP-96b DETECTED CLEAR WATER VAPOR SIGNATURES ACROSS LIGHT YEARS."
    },
    marsrover: {
      name: "Perseverance & Ingenuity",
      year: "2020 - Present",
      agency: "NASA / JPL",
      img: "assets/marsrover.jpg",
      destination: "Jezero Crater, Mars",
      objective: "Seek ancient biosignatures, cache core samples, and demonstrate powered aerial flight in thin Martian atmosphere.",
      crew: "Robotic Rover & Helicopter",
      status: "ACTIVE SAMPLING",
      telemetry: {
        distanceDriven: "28.4 km",
        flightsCompleted: "72 Aerial Sorties",
        samplesCached: "24 Core Tubes"
      },
      log: "ANCIENT RIVER DELTA STRATA CONFIRMED. SEDIMENTS EXHIBIT ORGANIC MINERAL COATINGS PRESERVED IN STONE."
    },
    artemis: {
      name: "Artemis Program",
      year: "2022 - Ongoing",
      agency: "NASA & International Coalition",
      img: "assets/artemis.jpg",
      destination: "Lunar South Pole & Gateway",
      objective: "Establish sustainable human presence on the Moon, build the Lunar Gateway, and prepare for human missions to Mars.",
      crew: "Human Deep Space Crew",
      status: "PREPARING CREWED LUNAR ORBIT",
      telemetry: {
        launcher: "SLS Mega-Rocket",
        spacecraft: "Orion Capsule",
        targetRegion: "Shackleton Crater"
      },
      log: "ARTEMIS I DISTANCE RECORD SURPASSED APOLLO 13 FOR FARTHEST DISTANCE TRAVELED BY A HUMAN-RATED CRAFT."
    }
  };

  const tabButtons = document.querySelectorAll('.mission-tab-item');
  const titleEl = document.getElementById('mission-title');
  const destEl = document.getElementById('mission-dest');
  const objEl = document.getElementById('mission-objective');
  const crewEl = document.getElementById('mission-crew');
  const statusEl = document.getElementById('mission-status-badge');
  const imgEl = document.getElementById('mission-feed-img');
  const t1Val = document.getElementById('tel-1-val');
  const t1Label = document.getElementById('tel-1-label');
  const t2Val = document.getElementById('tel-2-val');
  const t2Label = document.getElementById('tel-2-label');
  const t3Val = document.getElementById('tel-3-val');
  const t3Label = document.getElementById('tel-3-label');
  const logEl = document.getElementById('mission-log-stream');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const missionKey = btn.getAttribute('data-mission');
      const data = missions[missionKey];
      if (!data) return;

      if (titleEl) titleEl.textContent = `${data.name} (${data.year})`;
      if (destEl) destEl.textContent = data.destination;
      if (objEl) objEl.textContent = data.objective;
      if (crewEl) crewEl.textContent = data.crew;
      if (statusEl) statusEl.textContent = data.status;
      if (imgEl && data.img) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.img;
          imgEl.alt = data.name;
          imgEl.style.opacity = '1';
        }, 180);
      }

      const keys = Object.keys(data.telemetry);
      if (t1Label && keys[0]) { t1Label.textContent = keys[0]; t1Val.textContent = data.telemetry[keys[0]]; }
      if (t2Label && keys[1]) { t2Label.textContent = keys[1]; t2Val.textContent = data.telemetry[keys[1]]; }
      if (t3Label && keys[2]) { t3Label.textContent = keys[2]; t3Val.textContent = data.telemetry[keys[2]]; }

      if (logEl) logEl.textContent = `[LIVE TELEMETRY] ${data.log}`;
    });
  });
})();
