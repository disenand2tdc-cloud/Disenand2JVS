/* CONFIGURACIÓN CENTRAL: editar aquí títulos de menú, rutas y texto del footer.
   Todas las rutas son relativas a la raíz del sitio. */
window.SITE = {
  name: 'Diseñand2',
  logo: 'assets/icons/isotipo.svg',
  home: 'index.html',
  tercerCorte: { id: 'tercer-corte', label: 'Tercer corte', href: 'tercer-corte.html' },
  /* Los 6 apartados. Para sumar uno nuevo: agregar un objeto y crear su HTML. */
  sections: [
    { id: 'semana-12', topics: 'Cultura digital, diseño digital y arquitectura efímera.',  num: '01', title: 'Semana 12 — Proyecto Final', href: 'paginas/semana-12.html' },
    { id: 'concepto', topics: 'La instalación, su referente en Voronoi, su estructura y sus actividades.',   num: '02', title: 'Concepto y Esquema Básico',  href: 'paginas/concepto-esquema.html' },
    { id: 'desarrollo', topics: 'Semanas 12 a 15, propuesta final y diseño de itinerancia, montaje y desmontaje.', num: '03', title: 'Desarrollo Formal',          href: 'paginas/desarrollo-formal.html' },
    { id: 'referentes', topics: 'Matriz de análisis y las doce fichas de referentes.', num: '04', title: 'Análisis de Referentes',     href: 'paginas/analisis-referentes.html' },
    { id: 'cocreacion', topics: 'Registro del proceso de cocreación y la imagen corporativa del programa.', num: '05', title: 'Proceso de Cocreación',      href: 'paginas/cocreacion.html' },
    { id: 'identidad', topics: 'Presentación resumida de la identidad visual del programa de diseño digital.', num: '06', title: 'Desarrollo de imagen corporativa del programa', href: 'paginas/identidad-visual.html' }
  ],
  /* Índice del tercer corte (tercer-corte.html): textos editables. */
  indice: {
    intro: 'Este corte reúne el proceso académico y creativo de Diseñand2 durante el semestre en curso: la base teórica del proyecto final, el concepto de la instalación que promueve la carrera de Diseño Digital, su desarrollo formal, los referentes analizados y el proceso de cocreación y la imagen corporativa del programa.',
    reserved: 'Espacio reservado para futuras incorporaciones'
  },
  footer: [
    '© 2026 Diseñand2. Todos los derechos reservados. Contenidos y publicaciones reservados por el colectivo.',
    'Derechos de imagen reservados.',
    'Proyecto: Taller de Diseño Conceptual | Semestre 4 | Corte 3'
  ]
};
