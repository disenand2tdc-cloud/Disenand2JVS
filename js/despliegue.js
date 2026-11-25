/* Desplegables independientes: pulsar abre, pulsar de nuevo cierra. Al abrir se recalcula el alto de los carruseles internos. */
(function () {
  document.querySelectorAll('[data-dd]').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.dd-btn'); if (!b || !g.contains(b)) return;
      var p = document.getElementById(b.getAttribute('aria-controls')), open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open); p.hidden = !open;
      if (open) { p.querySelectorAll('.reveal').forEach(function (r) { r.classList.add('in'); }); window.dispatchEvent(new Event('resize')); requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); }); }
    });
  });
})();
