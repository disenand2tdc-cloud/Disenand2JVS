/* MULTIMEDIA: video (propio o YouTube), PDF y modelo 3D. Cada módulo se activa solo cuando su atributo de ruta no está vacío;
   si está vacío se conserva el placeholder. Las rutas locales son relativas a la raíz del sitio (ej. assets/videos/final.mp4).
   <div class="media" data-video="assets/videos/x.mp4" data-poster="assets/images/p.jpg" data-title="..." data-ratio="16/9">
   <div class="media" data-video="https://youtu.be/ID11caracteres" ...>
   <div class="doc" data-pdf="assets/documents/x.pdf" data-title="..." data-note="...">
   <div class="model3d" data-model="assets/3d/x.glb" data-title="..." data-ratio="4/3"> */
(function () {
  const root = document.body.dataset.root || '';
  const url = (p) => /^(https?:)?\/\//.test(p) ? p : root + p;
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---- Video ---- */
  document.querySelectorAll('[data-video]').forEach((box) => {
    const src = (box.dataset.video || '').trim(); if (!src) return;
    const title = box.dataset.title || 'Video', ratio = box.dataset.ratio || '16/9';
    box.style.aspectRatio = ratio; box.classList.add('media-on');
    const yt = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/) || (/^[\w-]{11}$/.test(src) ? [0, src] : null);
    if (yt) { /* YouTube: miniatura primero, el iframe solo carga al pulsar (carga eficiente) */
      const id = yt[1];
      box.innerHTML = `<button type="button" class="yt" aria-label="Reproducir video: ${esc(title)}" style="background-image:url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)"><span class="play" aria-hidden="true"></span></button>`;
      box.querySelector('.yt').addEventListener('click', () => {
        box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      });
    } else {
      const poster = box.dataset.poster ? ` poster="${url(box.dataset.poster)}"` : '';
      box.innerHTML = `<video controls preload="metadata" playsinline${poster} aria-label="${esc(title)}"><source src="${url(src)}"><p>Tu navegador no reproduce este video. <a href="${url(src)}">Descargarlo</a>.</p></video>`;
    }
  });

  /* ---- PDF: ver en la página, abrir en pestaña, descargar ---- */
  document.querySelectorAll('[data-pdf]').forEach((box) => {
    const src = (box.dataset.pdf || '').trim(); if (!src) return;
    const title = box.dataset.title || 'Documento PDF', note = box.dataset.note || '', href = url(src);
    box.classList.add('doc-on');
    box.innerHTML = `<div class="doc-head"><div><span class="doc-kind">PDF</span><h3>${esc(title)}</h3>${note ? `<p>${esc(note)}</p>` : ''}</div>
      <div class="doc-actions"><button type="button" class="btn-s" aria-expanded="false">Ver aquí</button>
      <a class="btn-s" href="${href}" target="_blank" rel="noopener">Abrir en pestaña</a>
      <a class="btn-s" href="${href}" download>Descargar</a></div></div>
      <div class="doc-view" hidden></div>`;
    const btn = box.querySelector('button'), view = box.querySelector('.doc-view');
    btn.addEventListener('click', () => {
      const open = view.hidden;
      if (open && !view.firstChild) view.innerHTML = `<iframe src="${href}#view=FitH" title="${esc(title)}" loading="lazy"></iframe><p class="doc-fallback">¿No se muestra el documento? Usa «Abrir en pestaña» o «Descargar».</p>`;
      view.hidden = !open; btn.setAttribute('aria-expanded', open); btn.textContent = open ? 'Ocultar' : 'Ver aquí';
    });
  });

  /* ---- Modelo 3D (glTF/GLB) con <model-viewer>; la biblioteca solo se descarga si hay un modelo y está cerca de verse ---- */
  const models = [...document.querySelectorAll('[data-model]')].filter(b => (b.dataset.model || '').trim());
  if (!models.length) return;
  const lib = () => window.__mv || (window.__mv = new Promise((ok, no) => {
    const s = document.createElement('script'); s.type = 'module';
    s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s);
  }));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const build = (box) => {
    const title = box.dataset.title || 'Modelo 3D', poster = box.dataset.poster ? ` poster="${url(box.dataset.poster)}"` : '';
    box.style.aspectRatio = box.dataset.ratio || '4/3'; box.classList.add('model-on');
    box.innerHTML = `<model-viewer src="${url(box.dataset.model)}" alt="${esc(title)}" camera-controls touch-action="pan-y" ${calm ? '' : 'auto-rotate'} shadow-intensity="1" loading="lazy" interaction-prompt="auto"${poster}></model-viewer>
      <p class="model-hint">Arrastra para rotar · rueda o pellizco para acercar</p>`;
    lib().catch(() => { box.insertAdjacentHTML('beforeend', '<p class="model-err">No se pudo cargar el visor 3D. Revisa tu conexión.</p>'); });
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => en.forEach(x => { if (x.isIntersecting) { io.unobserve(x.target); build(x.target); } }), { rootMargin: '300px' });
    models.forEach(m => io.observe(m));
  } else models.forEach(build);
})();
