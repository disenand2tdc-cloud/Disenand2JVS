/* LIGHTBOX. Cualquier <figure class="fig" data-gallery="grupo"> con <img> se abre ampliada.
   Las figuras con el mismo data-gallery forman una secuencia (anterior / siguiente). Sin data-gallery: grupo «pagina».
   Pie de imagen: el <figcaption> de la figura (si no es un pendiente). Los placeholders (.ph) no se abren. */
(function () {
  const figs = [...document.querySelectorAll('figure.fig')].filter(f => f.querySelector('img') && !f.closest('#conclusiones'));
  if (!figs.length) return;
  const group = (f) => f.dataset.gallery || 'pagina';
  const lb = document.createElement('div');
  lb.className = 'lb'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Visor de imágenes');
  lb.innerHTML = `<button type="button" class="lb-btn lb-close" aria-label="Cerrar visor">✕</button>
    <button type="button" class="lb-btn lb-prev" aria-label="Imagen anterior">‹</button>
    <figure class="lb-fig"><img alt=""><figcaption></figcaption></figure>
    <button type="button" class="lb-btn lb-next" aria-label="Imagen siguiente">›</button>
    <p class="lb-count" aria-live="polite"></p>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('.lb-fig img'), cap = lb.querySelector('figcaption'), count = lb.querySelector('.lb-count');
  const prev = lb.querySelector('.lb-prev'), next = lb.querySelector('.lb-next'), close = lb.querySelector('.lb-close');
  let list = [], i = 0, opener = null, savedY = 0;

  const show = (n) => {
    i = (n + list.length) % list.length;
    const f = list[i], im = f.querySelector('img'), c = f.querySelector('figcaption');
    img.src = im.currentSrc || im.src; img.alt = im.alt || '';
    const t = c && !c.classList.contains('pending') ? c.textContent.trim() : '';
    cap.textContent = t; cap.hidden = !t;
    count.textContent = (i + 1) + ' / ' + list.length;
    const one = list.length < 2; prev.hidden = next.hidden = one;
  };
  const open = (f) => {
    list = figs.filter(x => group(x) === group(f) && !x.closest('[hidden]')); opener = f.querySelector('img'); savedY = window.scrollY;
    lb.hidden = false; document.documentElement.classList.add('lb-open'); /* overflow:hidden conserva la posición de scroll */
    show(list.indexOf(f)); requestAnimationFrame(() => lb.classList.add('on')); close.focus();
  };
  const shut = () => {
    lb.classList.remove('on'); lb.hidden = true; document.documentElement.classList.remove('lb-open'); img.removeAttribute('src');
    window.scrollTo({ top: savedY, behavior: 'instant' }); /* regresa exactamente a la posición previa */
    if (opener) opener.focus({ preventScroll: true });
  };

  figs.forEach((f) => {
    const im = f.querySelector('img');
    im.tabIndex = 0; im.setAttribute('role', 'button'); im.style.cursor = 'zoom-in';
    im.setAttribute('aria-label', 'Ampliar imagen' + (im.alt ? ': ' + im.alt : ''));
    im.addEventListener('click', () => open(f));
    im.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(f); } });
  });
  close.addEventListener('click', shut);
  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-fig')) shut(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') shut();
    else if (e.key === 'ArrowLeft' && list.length > 1) show(i - 1);
    else if (e.key === 'ArrowRight' && list.length > 1) show(i + 1);
    else if (e.key === 'Tab') { /* mantiene el foco dentro del visor */
      const b = [close, prev, next].filter(x => !x.hidden), k = b.indexOf(document.activeElement);
      e.preventDefault(); b[(k + (e.shiftKey ? -1 : 1) + b.length) % b.length].focus();
    }
  });
  /* Deslizar en pantallas táctiles */
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null || list.length < 2) return; const d = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(d) > 50) show(i + (d < 0 ? 1 : -1));
  });
})();
