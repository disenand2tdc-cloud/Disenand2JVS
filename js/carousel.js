/* Carrusel accesible: <div class="cr" data-carousel> con .cr-vp > .cr-track > .cr-slide. Cada instancia es independiente. */
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var vp = root.querySelector('.cr-vp'), track = root.querySelector('.cr-track');
    var slides = [].slice.call(root.querySelectorAll('.cr-slide')), n = slides.length, cur = 0;
    var prev = root.querySelector('.cr-prev'), next = root.querySelector('.cr-next');
    var count = root.querySelector('.cr-count'), dotsBox = root.querySelector('.cr-dots');
    var dots = slides.map(function (s, k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'cr-dot';
      b.setAttribute('aria-label', 'Ir a la diapositiva ' + (k + 1) + ' de ' + n);
      b.addEventListener('click', function () { go(k); }); dotsBox.appendChild(b); return b;
    });
    slides.forEach(function (s) {
      var im = s.querySelector('.cr-img');
      var miss = function () { s.classList.add('is-missing'); fit(); };
      if (im) { im.addEventListener('error', miss); im.addEventListener('load', fit); if (im.complete && !im.naturalWidth) miss(); }
    });
    function fit() { vp.style.height = slides[cur].offsetHeight + 'px'; }
    function go(k) {
      cur = Math.max(0, Math.min(n - 1, k));
      track.style.transform = 'translateX(' + (-100 * cur) + '%)';
      slides.forEach(function (s, i) { s.setAttribute('aria-hidden', i !== cur); if ('inert' in s) s.inert = i !== cur; });
      dots.forEach(function (d, i) { if (i === cur) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      prev.disabled = cur === 0; next.disabled = cur === n - 1;
      count.textContent = (cur + 1) + ' / ' + n; fit();
    }
    prev.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(cur - 1); } else if (e.key === 'ArrowRight') { go(cur + 1); }
    });
    /* Táctil y arrastre: deslizamiento horizontal */
    var x0 = null, y0 = 0;
    vp.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    vp.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });
    var mx = null;
    vp.addEventListener('mousedown', function (e) { mx = e.clientX; });
    window.addEventListener('mouseup', function (e) { if (mx === null) return; var dx = e.clientX - mx; mx = null; if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1)); });
    vp.addEventListener('dragstart', function (e) { e.preventDefault(); });
    window.addEventListener('resize', fit); window.addEventListener('load', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    go(0);
  });
})();
