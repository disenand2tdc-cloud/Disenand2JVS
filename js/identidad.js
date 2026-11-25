/* Navegación local del manual de identidad. */
(() => {
  const nav = document.querySelector('.id-index');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const activate = id => links.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  links.forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
    history.replaceState(null, '', link.getAttribute('href'));
    activate(target.id);
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) activate(visible.target.id);
    }, {rootMargin:'-22% 0px -62% 0px', threshold:[0,.15,.35,.6]});
    sections.forEach(section => observer.observe(section));
  } else {
    window.addEventListener('scroll', () => {
      const current = sections.filter(section => section.getBoundingClientRect().top < 180).pop();
      if (current) activate(current.id);
    }, {passive:true});
  }
  if (location.hash && document.querySelector(location.hash)) {
    setTimeout(() => document.querySelector(location.hash).scrollIntoView({block:'start'}), 80);
    activate(location.hash.slice(1));
  }
})();
