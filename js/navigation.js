/* Construye header y footer desde SITE (config.js) en todas las páginas. */
(function () {
  const S = window.SITE, root = document.body.dataset.root || '', page = document.body.dataset.page || '';
  const u = (p) => root + p;
  const sub = S.sections.map(s => `<li><a href="${u(s.href)}" ${page === s.id ? 'aria-current="page"' : ''}><span class="num">${s.num}</span>${s.title}</a></li>`).join('');
  const tcActive = page === 'tercer-corte' || S.sections.some(s => s.id === page);

  document.getElementById('site-header').innerHTML = `
  <header class="site-header" id="header">
    <a class="brand" href="${u(S.home)}" aria-label="${S.name}, ir al inicio"><img class="brand-mark" src="${u(S.logo)}" alt="" height="44"></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú"><span></span><span></span></button>
    <nav id="main-nav" class="main-nav" aria-label="Principal">
      <ul>
        <li><a href="${u(S.home)}" ${page === 'inicio' ? 'aria-current="page"' : ''}>Inicio</a></li>
        <li class="has-sub ${tcActive ? 'is-section' : ''}">
          <a href="${u(S.tercerCorte.href)}" ${page === 'tercer-corte' ? 'aria-current="page"' : ''}>${S.tercerCorte.label}</a>
          <button class="sub-toggle" aria-expanded="false" aria-controls="sub-menu" aria-label="Mostrar apartados del tercer corte"><svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
          <ul class="sub-menu" id="sub-menu">${sub}</ul>
        </li>
      </ul>
    </nav>
  </header>`;

  document.getElementById('site-footer').innerHTML = `
  <footer class="site-footer"><img src="${u(S.logo)}" alt="Isotipo Diseñand2" height="72">
    <div>${S.footer.map(t => `<p>${t}</p>`).join('')}</div></footer>`;

  const header = document.getElementById('header'), toggle = header.querySelector('.menu-toggle');
  const li = header.querySelector('.has-sub'), subBtn = header.querySelector('.sub-toggle');
  const setSub = (o) => { li.classList.toggle('open', o); subBtn.setAttribute('aria-expanded', o); };
  const setMenu = (o) => { header.classList.toggle('menu-open', o); toggle.setAttribute('aria-expanded', o); if (!o) setSub(false); };

  toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  subBtn.addEventListener('click', (e) => { e.stopPropagation(); setSub(!li.classList.contains('open')); });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) { setSub(false); setMenu(false); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setSub(false); setMenu(false); } });

  /* Header dinámico: se oculta al bajar, reaparece al subir, visible arriba. */
  let last = window.scrollY, ticking = false;
  const update = () => {
    const y = window.scrollY, d = y - last;
    if (y <= 10) header.classList.remove('is-hidden');
    else if (d > 6 && !header.classList.contains('menu-open')) { header.classList.add('is-hidden'); setSub(false); }
    else if (d < -6) header.classList.remove('is-hidden');
    if (Math.abs(d) > 6 || y <= 10) last = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
})();
