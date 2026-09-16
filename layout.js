const fs = require('fs');

const head = (title, desc) => `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${desc}" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="css/designTokens.css" />
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/homepage.css" />
  <link rel="stylesheet" href="css/inner-pages.css" />
  <link rel="stylesheet" href="css/responsive.css" />
</head>
<body>
  <canvas id="starfield-canvas"></canvas>
  <div class="cosmic-vignette"></div>
`;

const nav = (active) => `
  <header class="site-header" id="site-header">
    <div class="nav-container">
      <a href="index.html" class="logo-brand">
        <div class="logo-icon"><div class="logo-orbit"></div><div class="logo-core"></div></div>
        <span class="logo-text">COSMOS</span>
      </a>
      <nav class="main-nav">
        <ul class="nav-links">
          <li><a href="planets.html" class="${active === 'planets' ? 'active' : ''}">Planets</a></li>
          <li><a href="solar-system.html" class="${active === 'solar' ? 'active' : ''}">Solar System</a></li>
          <li><a href="missions.html" class="${active === 'missions' ? 'active' : ''}">Missions</a></li>
          <li><a href="index.html#section-featured">Discover</a></li>
          <li><a href="space-facts.html" class="${active === 'facts' ? 'active' : ''}">Space Facts</a></li>
          <li><a href="gallery.html" class="${active === 'gallery' ? 'active' : ''}">Gallery</a></li>
          <li><a href="about.html" class="${active === 'about' ? 'active' : ''}">About</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="audio-toggle-btn" aria-label="Toggle Ambient Sound" title="Cosmic Ambient Sound">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        </button>
        <a href="solar-system.html" class="btn btn-primary btn-glow">EXPLORE SPACE</a>
        <button class="mobile-nav-toggle" aria-label="Open Menu"><span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-menu-drawer">
    <ul class="mobile-nav-links">
      <li><a href="index.html" class="${active === 'home' ? 'active' : ''}">Home</a></li>
      <li><a href="planets.html" class="${active === 'planets' ? 'active' : ''}">Planets</a></li>
      <li><a href="solar-system.html" class="${active === 'solar' ? 'active' : ''}">Solar System</a></li>
      <li><a href="missions.html" class="${active === 'missions' ? 'active' : ''}">Missions</a></li>
      <li><a href="space-facts.html" class="${active === 'facts' ? 'active' : ''}">Space Facts</a></li>
      <li><a href="gallery.html" class="${active === 'gallery' ? 'active' : ''}">Gallery</a></li>
      <li><a href="about.html" class="${active === 'about' ? 'active' : ''}">About</a></li>
    </ul>
    <div style="margin-top: 2rem;"><a href="solar-system.html" class="btn btn-primary" style="width:100%;">LAUNCH SIMULATION</a></div>
  </div>
`;

const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-cosmic-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo-brand"><div class="logo-icon"><div class="logo-orbit"></div><div class="logo-core"></div></div><span class="logo-text">COSMOS</span></a>
          <p style="color: var(--text-muted); margin-top: 1rem;">An interactive, high-end portal dedicated to the wonder, science, and exploration of our solar system and the deep universe.</p>
        </div>
        <div class="footer-col">
          <h4>Exploration</h4>
          <ul class="footer-links">
            <li><a href="planets.html">Planetary Index</a></li>
            <li><a href="solar-system.html">Solar System 3D</a></li>
            <li><a href="missions.html">Mission Control</a></li>
            <li><a href="space-facts.html">Cosmic Facts</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Archive</h4>
          <ul class="footer-links">
            <li><a href="gallery.html">Deep Space Gallery</a></li>
            <li><a href="about.html">About Project</a></li>
            <li><a href="about.html#manifesto">Why We Explore</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Dispatch</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.8rem;">Get cosmic discoveries and mission updates.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to Dispatch!');">
            <input type="email" class="newsletter-input" placeholder="Your email" required />
            <button type="submit" class="newsletter-btn">JOIN</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <div>&copy; 2026 COSMOS. EXPLORE BEYOND. ALL RIGHTS RESERVED.</div>
        <div class="social-links">
          <a href="#" class="social-link">INSTAGRAM</a>
          <a href="#" class="social-link">YOUTUBE</a>
          <a href="#" class="social-link">X (TWITTER)</a>
        </div>
      </div>
    </div>
  </footer>
  <script src="js/cursor.js"></script>
  <script src="js/navigation.js"></script>
  <script src="js/orbit-simulation.js"></script>
  <script src="js/missions-console.js"></script>
  <script src="js/facts-counter.js"></script>
  <script src="js/gallery-lightbox.js"></script>
  <script src="js/planet-compare.js"></script>
  <script src="js/hero-video.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
`;

module.exports = { head, nav, footer };