/* facts-counter.js - Animates numbers counting up when scrolled into view */
(function() {
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    var suffix = el.getAttribute('data-suffix') || '';
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // IntersectionObserver to trigger counters when visible
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target') || '0', 10);
          var duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
          animateCounter(el, target, duration);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-counter]').forEach(function(el) {
      observer.observe(el);
    });
  }

  // Scroll reveal for sections
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(function(el) {
      revealObserver.observe(el);
    });
  }
})();
