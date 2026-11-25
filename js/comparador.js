/* Comparador antes/después: arrastre con mouse o dedo sobre la imagen, y flechas/Inicio/Fin con el control enfocado. */
(function () {
  document.querySelectorAll('[data-cmp]').forEach(function (box) {
    var h = box.querySelector('.cmp-handle'), pos = 50, drag = false;
    function set(v) {
      pos = Math.max(0, Math.min(100, v)); box.style.setProperty('--pos', pos + '%');
      h.setAttribute('aria-valuenow', Math.round(pos)); h.setAttribute('aria-valuetext', Math.round(pos) + ' % boceto visible');
    }
    function fromX(x) { var r = box.getBoundingClientRect(); set((x - r.left) / r.width * 100); }
    box.addEventListener('pointerdown', function (e) {
      drag = true; box.setPointerCapture(e.pointerId); fromX(e.clientX); h.focus({ preventScroll: true });
    });
    box.addEventListener('pointermove', function (e) { if (drag) fromX(e.clientX); });
    ['pointerup', 'pointercancel'].forEach(function (ev) { box.addEventListener(ev, function () { drag = false; }); });
    h.addEventListener('keydown', function (e) {
      var d = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }[e.key];
      if (d !== undefined) { e.preventDefault(); set(pos + d); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); } else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  });
})();
