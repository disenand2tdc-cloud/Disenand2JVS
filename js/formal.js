/* Pestañas semanales (12–15), indicador deslizante, anterior/siguiente y acordeón de un solo panel. */
(function () {
  const tabs = [...document.querySelectorAll('.tabs .tab')]; if (!tabs.length) return;
  const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
  const ind = document.querySelector('.tab-ind'), bar = document.querySelector('.tabs');
  const prev = document.querySelector('[data-wk="-1"]'), next = document.querySelector('[data-wk="1"]');
  let cur = 0;
  const label = (t) => t.textContent;
  const place = () => { const t = tabs[cur]; ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft}px)`; };
  const go = (n, push = true) => {
    cur = Math.max(0, Math.min(tabs.length - 1, n));
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === cur); t.tabIndex = k === cur ? 0 : -1; panels[k].hidden = k !== cur; });
    prev.disabled = cur === 0; next.disabled = cur === tabs.length - 1;
    prev.textContent = cur ? '← ' + label(tabs[cur - 1]) : '← Anterior';
    next.textContent = cur < tabs.length - 1 ? label(tabs[cur + 1]) + ' →' : 'Siguiente →';
    place(); tabs[cur].scrollIntoView({ inline: 'center', block: 'nearest' });
    if (push) history.replaceState(null, '', '#' + panels[cur].id);
  };
  tabs.forEach((t, k) => {
    t.addEventListener('click', () => go(k));
    t.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d === undefined) return;
      e.preventDefault(); go(cur + d); tabs[cur].focus();
    });
  });
  const step = (d) => { go(cur + d); bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  prev.addEventListener('click', () => step(-1)); next.addEventListener('click', () => step(1));
  const fromHash = () => { const k = panels.findIndex(p => '#' + p.id === location.hash); go(k < 0 ? 0 : k, false); };
  window.addEventListener('hashchange', fromHash); window.addEventListener('resize', place);
  fromHash(); (document.fonts && document.fonts.ready || Promise.resolve()).then(place);
})();
(function () { /* Acordeón reutilizable: <div data-acc><div class="acc-item"><button class="acc-btn" aria-expanded="false">…</button><div class="acc-panel" hidden>…</div></div></div> */
  document.querySelectorAll('[data-acc]').forEach(g => g.addEventListener('click', (e) => {
    const b = e.target.closest('.acc-btn'); if (!b) return; const open = b.getAttribute('aria-expanded') !== 'true';
    g.querySelectorAll('.acc-btn').forEach(x => { x.setAttribute('aria-expanded', false); const p = x.nextElementSibling; p.style.maxHeight = 0; });
    if (open) { b.setAttribute('aria-expanded', true); const p = b.nextElementSibling; p.hidden = false; p.style.maxHeight = p.scrollHeight + 'px'; }
  }));
})();
