/* navigation.js - Header scroll effects, mobile slide-in menu, audio ambient toggle */
(function() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const audioBtn = document.querySelector('.audio-toggle-btn');

  // Glass blur header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu open / close
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open', isOpen);
    });

    // Close on navigation link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Audio Ambient Synthesizer
  let audioCtx = null;
  let isPlaying = false;
  let osc1 = null;
  let osc2 = null;
  let gainNode = null;

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (!isPlaying) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        osc1 = audioCtx.createOscillator();
        osc2 = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A hum
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // Harmonic

        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
        isPlaying = true;
        audioBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>`;
        audioBtn.style.color = 'var(--secondary)';
        audioBtn.style.borderColor = 'var(--secondary)';
      } else {
        if (gainNode) {
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          osc1?.stop();
          osc2?.stop();
        }
        isPlaying = false;
        audioBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>`;
        audioBtn.style.color = '';
        audioBtn.style.borderColor = '';
      }
    });
  }
})();
