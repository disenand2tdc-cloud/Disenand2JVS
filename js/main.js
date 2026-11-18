/* Transición de salida: tres cortinas curvas suben desde abajo; la de entrada es CSS (animations.css). */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const veil = document.createElement('div'); veil.className = 'veil'; veil.innerHTML = '<i></i><i></i><i></i>'; document.body.appendChild(veil);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return; /* anclas internas: sin cortina */
    e.preventDefault(); veil.classList.add('on');
    setTimeout(() => { location.href = a.href; }, 650);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) veil.classList.remove('on'); });
})();
