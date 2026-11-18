/* Integrantes: tarjetas fijas (foto, nombre y descripción siempre visibles); sin interacción de expansión. */

/* Índice del tercer corte: genera la retícula a partir de SITE.sections. Agregar un apartado en config.js lo suma aquí solo;
   el módulo «+» siempre queda al final. */
(function () {
  const grid = document.getElementById('grid-corte'); if (!grid) return;
  const S = window.SITE, root = document.body.dataset.root || '';
  document.getElementById('corte-intro').textContent = S.indice.intro;
  document.getElementById('corte-count').textContent = S.sections.length + ' apartados';
  const arrow = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  grid.innerHTML = S.sections.map((s, n) => `
    <li style="--i:${n}"><a class="mod" href="${root + s.href}">
      <span class="mod-num">${s.num}</span>
      <span class="mod-go">${arrow}</span>
      <span class="mod-body"><span class="mod-title">${s.title}</span><span class="mod-topics">${s.topics || ''}</span></span>
    </a></li>`).join('') + `
    <li style="--i:${S.sections.length}"><div class="mod mod-reserved"><span class="mod-num">+</span>
      <span class="mod-body"><span class="mod-topics">${S.indice.reserved}</span></span></div></li>`;
})();

/* ---------- Etapa 4: componentes de las páginas de contenido ---------- */

/* Aparición progresiva de elementos .reveal (respeta movimiento reducido). */
(function () {
  const els = [...document.querySelectorAll('.reveal')]; if (!els.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((en) => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
})();

/* Pestañas genéricas: <div data-tabs> con botones .tab[role=tab][aria-controls] y paneles .tab-panel. Flechas del teclado incluidas. */
(function () {
  document.querySelectorAll('[data-tabs]').forEach((box) => {
    const tabs = [...box.querySelectorAll('.tab')];
    const show = (t, focus) => {
      tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; box.querySelector('#' + x.getAttribute('aria-controls')).hidden = !on; });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(tabs[(i + 1) % tabs.length], true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      });
    });
    show(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  });
})();

/* Navegación entre apartados (anterior / siguiente) a partir de SITE.sections. */
(function () {
  const box = document.getElementById('pager'); if (!box) return;
  const S = window.SITE, root = document.body.dataset.root || '', i = S.sections.findIndex(s => s.id === document.body.dataset.page);
  if (i < 0) return;
  const a = (s, cls, dir) => `<a class="${cls}" href="${root + s.href}"><span class="dir">${dir}</span><span class="t">${s.num} ${s.title}</span></a>`;
  const prev = S.sections[i - 1], next = S.sections[i + 1];
  box.innerHTML = (prev ? a(prev, 'prev', 'Apartado anterior') : '') + (next ? a(next, 'next' + (prev ? '' : ' only'), 'Apartado siguiente') : '');
})();

/* Análisis de Referentes: fichas (imagen, nombre, año, origen, en qué consiste y qué nos aportó) y filtro, generadas desde js/referentes-data.js.
   La matriz general se eliminó; la matriz original (PDF) se conserva en su apartado. */
(function () {
  const R = window.REFERENTES, fichas = document.getElementById('fichas-list'); if (!R || !fichas) return;
  const root = document.body.dataset.root || '', label = (id) => (R.groups.find(g => g.id === id) || {}).label || '';
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const val = (t) => `<span${/^\[/.test(t) ? ' class="pending"' : ''}>${esc(t)}</span>`;
  fichas.innerHTML = R.items.map(r => `<li class="ficha-li" data-group="${r.group}"><article class="ficha">
    <div class="ficha-top"><span class="ficha-n">${r.n}</span>${r.group ? `<span class="ficha-tag">${esc(label(r.group))}</span>` : ''}</div>
    <figure class="fig" data-gallery="referentes">${r.img ? `<img src="${root + r.img}" alt="Referente ${r.n}: ${esc(r.name)}" loading="lazy" decoding="async" style="aspect-ratio:${r.ratio}">` : `<div class="ph" style="aspect-ratio:${r.ratio}">Imagen del referente · pendiente</div>`}<figcaption hidden>${esc(r.n + ' · ' + r.name)}</figcaption></figure>
    <h3>${val(r.name)}</h3>
    <p class="ficha-meta">${val(r.year)} <span aria-hidden="true">·</span> ${val(r.origin)}</p>
    <div class="ficha-txt"><h4>¿En qué consiste?</h4><p>${val(r.what)}</p></div>
    <div class="ficha-txt"><h4>¿Qué nos aportó?</h4><p>${val(r.took)}</p></div>
    ${r.link ? `<p><a href="${r.link}" target="_blank" rel="noopener">Ver referencia</a></p>` : ''}</article></li>`).join('');
  const bar = document.getElementById('filters'), items = [...fichas.children], count = bar.querySelector('.count');
  const used = R.groups.filter(g => R.items.some(r => r.group === g.id));
  const chips = [{ id: '', label: 'Todos' }, ...used].map((g, i) => `<button class="chip" type="button" data-g="${g.id}" aria-pressed="${i === 0}">${esc(g.label)}</button>`).join('');
  bar.insertAdjacentHTML('afterbegin', chips);
  if (!used.length) bar.querySelectorAll('.chip').forEach(c => c.hidden = true);
  const apply = (g) => {
    let n = 0; items.forEach(li => { const ok = !g || li.dataset.group === g; li.hidden = !ok; if (ok) n++; });
    bar.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.g === g));
    count.textContent = n + ' de ' + items.length + ' fichas';
  };
  bar.addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) apply(c.dataset.g); });
  apply('');
})();

/* Mini índice automático: lista las secciones con data-toc="Título". Agregar una sección con data-toc la suma al índice. */
(function () {
  document.querySelectorAll('.toc[data-auto]').forEach((ol) => {
    ol.innerHTML = [...document.querySelectorAll('[data-toc]')].map(s => `<li><a href="#${s.id}">${s.dataset.toc}</a></li>`).join('');
  });
})();
