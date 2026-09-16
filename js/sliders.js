/* sliders.js – Center-Mode Worlds Carousel & Timeline Stepper Slider */

/* ================================================================
   1. CENTER-MODE WORLDS SLIDER (Extraordinary Worlds)
   Active card: full size  |  Side cards: scaled down + dimmed
   Infinite loop via DOM cloning  |  Auto-play every 3.5s
================================================================ */
(function () {
  const track = document.getElementById('worlds-slider-track');
  const prevBtn = document.getElementById('worlds-prev-btn');
  const nextBtn = document.getElementById('worlds-next-btn');
  if (!track || !prevBtn || !nextBtn) return;

  const SLIDE_CLASS   = 'world-center-slide';
  const ACTIVE_CLASS  = 'active-center';
  const AUTO_INTERVAL = 3500;
  const TRANSITION_MS = 650;

  const origSlides = Array.from(track.querySelectorAll('.' + SLIDE_CLASS));
  const total      = origSlides.length;

  const cloneLast  = origSlides[total - 1].cloneNode(true);
  const cloneFirst = origSlides[0].cloneNode(true);
  cloneLast.setAttribute('aria-hidden', 'true');
  cloneFirst.setAttribute('aria-hidden', 'true');
  track.prepend(cloneLast);
  track.append(cloneFirst);

  const allSlides = Array.from(track.querySelectorAll('.' + SLIDE_CLASS));
  let current = 1;
  let isTransitioning = false;
  let autoTimer = null;

  function getOffset(idx) {
    const viewport  = track.parentElement;
    const vpWidth   = viewport.clientWidth;
    const slide     = allSlides[idx];
    const slideOffsetLeft = slide.offsetLeft;
    const slideWidth      = slide.offsetWidth;
    return -(slideOffsetLeft - (vpWidth - slideWidth) / 2);
  }

  function jumpTo(idx) {
    track.style.transition = 'none';
    track.style.transform  = 'translateX(' + getOffset(idx) + 'px)';
    setActiveClass(idx);
    void track.offsetWidth;
    track.style.transition = '';
  }

  function slideTo(idx) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = idx;
    track.style.transform = 'translateX(' + getOffset(current) + 'px)';
    setActiveClass(current);
    setTimeout(function() {
      if (current === 0) { jumpTo(total); current = total; }
      else if (current === total + 1) { jumpTo(1); current = 1; }
      isTransitioning = false;
    }, TRANSITION_MS + 20);
  }

  function setActiveClass(idx) {
    allSlides.forEach(function(s, i) { s.classList.toggle(ACTIVE_CLASS, i === idx); });
  }

  function goNext() { slideTo(current + 1); }
  function goPrev() { slideTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(goNext, AUTO_INTERVAL);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  jumpTo(current);

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() { jumpTo(current); }, 150);
  });

  prevBtn.addEventListener('click', function() { stopAuto(); goPrev(); startAuto(); });
  nextBtn.addEventListener('click', function() { stopAuto(); goNext(); startAuto(); });

  var viewport = track.parentElement;
  viewport.addEventListener('mouseenter', stopAuto);
  viewport.addEventListener('mouseleave', startAuto);

  var touchStartX = 0;
  viewport.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) goNext(); else goPrev(); }
  });

  startAuto();
})();


/* ================================================================
   2. TIMELINE STEPPER SLIDER (From Dust to Discovery)
   Auto-advances every 5s. Arrow buttons navigate era by era.
================================================================ */
(function () {
  var stepBtns   = document.querySelectorAll('.stepper-step-btn');
  var slides     = document.querySelectorAll('.timeline-story-slide');
  var prevBtn    = document.getElementById('timeline-prev-btn');
  var nextBtn    = document.getElementById('timeline-next-btn');
  if (!stepBtns.length || !slides.length) return;

  var STEP_COUNT    = slides.length;
  var AUTO_INTERVAL = 5000;
  var currentStep   = 0;
  var autoTimer     = null;

  function showStep(idx) {
    currentStep = ((idx % STEP_COUNT) + STEP_COUNT) % STEP_COUNT;
    slides.forEach(function(sl, i) { sl.classList.toggle('active', i === currentStep); });
    stepBtns.forEach(function(btn, i) { btn.classList.toggle('active', i === currentStep); });
    var activeBtn = stepBtns[currentStep];
    if (activeBtn) { activeBtn.parentElement.scrollLeft = activeBtn.offsetLeft - 20; }
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function() { showStep(currentStep + 1); }, AUTO_INTERVAL);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  stepBtns.forEach(function(btn, i) {
    btn.addEventListener('click', function() { stopAuto(); showStep(i); startAuto(); });
  });

  if (prevBtn) prevBtn.addEventListener('click', function() { stopAuto(); showStep(currentStep - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { stopAuto(); showStep(currentStep + 1); startAuto(); });

  showStep(0);
  startAuto();
})();
