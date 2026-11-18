# Diseñand2 — Bitácora digital
Abrir `index.html` en el navegador (o `python -m http.server` en esta carpeta).
- **Menú, rutas y footer:** `js/config.js` (un solo lugar).
- **Colores y tipografías:** variables al inicio de `css/styles.css`.
- **Isotipo:** `assets/icons/isotipo.svg` es un placeholder; reemplazar por el real.
- **Nueva página:** copiar una de `paginas/`, ajustar `data-root`/`data-page` y registrarla en `config.js`.
- **Índice del tercer corte:** la retícula se genera desde `sections` en `config.js` (campo `topics` = texto breve de cada módulo). El módulo «+» siempre queda al final.
Estado: Etapa 3 (índice del tercer corte) lista. Textos entre corchetes = pendientes.

## Etapa 4: páginas de contenido (solo estructura)
- Estilos del sistema de páginas: `css/pages.css`. Los textos pendientes están entre corchetes con clase `pending`.
- **Sustituir una imagen:** dentro de cada `<figure class="fig">`, reemplazar `<div class="ph">…</div>` por `<img src="../assets/images/archivo.jpg" alt="descripción">`.
- **Referentes:** los 12 datos (nombre, grupo, imagen, texto) están en `js/referentes-data.js`; la matriz y las fichas se generan solas.
- **Cocreación:** cada `<section>` es un bloque independiente; copiar, borrar o reordenar.
- **Logotipos:** reemplazar `assets/icons/logotipo.svg` (hero de Inicio) e `isotipo.svg` (header y footer).
- Los `data-gallery` de las figuras preparan el lightbox (Etapa 5).

## Ajustes posteriores a la Etapa 4 (v2)
- Mini índice «En esta página»: solo en Semana 12 y Desarrollo Formal; pequeño y generado automáticamente desde las secciones con `data-toc="Título"`. Sin entrada para el primer texto.
- Concepto y Esquema Básico: solo dos secciones, esquema básico y concepto.
- Desarrollo Formal: una sección por semana (lista `SEMANAS` en el generador; en HTML, copiar una `<section>` con su `data-toc`), imágenes 1:1, y un render o video final.
- Referentes y Cocreación: sin índice.
- Hover de los módulos del índice del tercer corte: azul, amarillo y coral.

## Etapa 5 — multimedia y finalización
**Logotipos:** `assets/icons/isotipo.svg` (header y footer, alto fijo, ancho automático) y `logotipo.svg` (Hero de Inicio). Son los SVG reales con el `viewBox` ajustado al contenido (el «2» ya no se recorta). No se alteró el diseño.

**Lightbox (`js/gallery.js`):** cualquier `<figure class="fig" data-gallery="grupo"><img …><figcaption>…</figcaption></figure>` se abre ampliada. Mismo `data-gallery` = misma secuencia. Anterior/siguiente, cierre con ✕, Escape o clic fuera, flechas del teclado, deslizar en táctil, foco atrapado y regreso exacto a la posición de scroll. Los placeholders `.ph` no se abren; al cambiar un `.ph` por `<img>` el lightbox lo toma solo.

**Video (`js/media.js`):** `<div class="media" data-video="RUTA_O_ENLACE" data-title="…" data-ratio="16/9" data-poster="…">`. Acepta archivo propio (`assets/videos/x.mp4`) o YouTube (enlace o ID; carga el iframe solo al pulsar). Vacío = placeholder. Espacios listos: Desarrollo Formal (render/video final) y Cocreación.

**PDF:** `<div class="doc" data-pdf="assets/documents/x.pdf" data-title="…" data-note="…">` → botones Ver aquí / Abrir en pestaña / Descargar. Ya conectado: matriz original de referentes (`matrizPdf` en `js/referentes-data.js`, enlace a Wix). Se puede copiar el bloque a Semana 12, Concepto o Cocreación.

**3D:** `<div class="model3d" data-model="assets/3d/x.glb" data-title="…" data-ratio="4/3">`. Usa `<model-viewer>` (se carga solo si hay modelo y cerca de verse); rotar, zoom, táctil y sin giro automático con movimiento reducido. Formato recomendado: .glb. Espacio en Desarrollo Formal (borrar el bloque si no se usará).

**Referentes:** la matriz general ya no se genera (queda la matriz original en PDF). Cada ficha muestra imagen, nombre, año, origen, ¿En qué consiste? y ¿Qué tomamos de él? Campos en `js/referentes-data.js`: `name`, `year`, `origin`, `what`, `took`, `img`, `ratio`, `group`.

**Contenido recuperado de Wix:** Inicio (ya estaba), Semana 12 (texto de presentación; las diapositivas ya no se muestran como imágenes), Concepto (texto completo), HUMAN RUBIK (texto parcial), derechos del footer.

## Pendiente (depende de ti)
- Referentes: nombres, imágenes y los tres criterios de cada ficha (en Wix están en imágenes/PDF, no en texto) y los nombres de las demás clasificaciones.
- Semana 12: página solo de texto, transcrita desde semana_12.pdf (cultura digital y arquitectura efímera). Pendiente: diseño digital (el PDF no trae diapositivas de ese tema).
- Concepto: imagen del esquema (`propuesta 2 Stand (1).png`).
- Desarrollo Formal: imágenes 1:1 de semanas 12–14, render/video final, texto de HUMAN RUBIK (termina en «…»).
- Cocreación: todo el material. Inicio: fotos de integrantes. Footer: texto legal definitivo.
- Descargar a `assets/` las imágenes y PDF que hoy se enlazan desde Wix.

## Cambios de la etapa 6 (17 nov 2026)
- Header: solo el isotipo (sin el texto «Diseñand2»).
- Semana 12: texto en una sola columna, definiciones justificadas, recuadros más grandes y con color; cada tipo de estructura tiene un recuadro de imagen a la derecha; 3 tipos pendientes (neumáticas/inflables, tensiles y cubiertas de membrana, modulares y ensamblables).
- Análisis de referentes: se eliminó la matriz general generada; queda la matriz original (PDF) y las fichas (imagen, nombre, autor y origen, sin análisis).
- Desarrollo formal: máximo dos imágenes por semana.
- Imágenes: toda <figure class="fig"> con <img> se amplía (lightbox). Al reemplazar un placeholder (.ph) por <img>, esa figura ya queda ampliable.

## Cambios adicionales (v4)
- Inicio: integrantes más compactos; se eliminaron los apartados de objetivos y valores (quedan quiénes somos, misión, visión e integrantes).
- Semana 12 · Diseño digital: contenido transcrito del PDF MIC_DISEÑAND2 (definición, contenidos, perfil profesional, campos de acción, proyección con sus fuentes).
- Inicio · Integrantes (v6): tarjetas fijas con foto, nombre y descripción siempre visibles (sin expansión). Foto de Santiago en assets/images/santiago-sanjuan.png (recorte con fondo transparente, 3:4). Para las otras dos: poner <img> dentro de .m-photo.
- Integrantes: foto más grande (190 px de ancho, 3:4) y sombra trasera (drop-shadow) sobre el recorte; ajustar en .m-photo / .m-photo img (css/components.css).
- Referentes (actualización): las fichas ahora incluyen año, origen y los textos «¿En qué consiste?» y «¿Qué tomamos de él?» (ya no solo imagen y datos básicos). Se retiró el campo `learned`.

- Etapa 10: Desarrollo Formal queda solo con las semanas 12, 13 y 14 (se retiraron «Propuesta final» —render/video y texto de HUMAN RUBIK— y «Modelo interactivo»; están en el ZIP de la etapa 9 por si se retoman). Referentes: textos «¿En qué consiste?» / «¿Qué nos aportó?» completos, referente 10 = Pabellón del Grupo Fuji con su foto; Análisis de Referentes con dos propuestas visuales en el cierre; se eliminaron los subtítulos bajo los títulos de cada página.

- Etapa 14.1: Desarrollo Formal, Semana 12 ahora muestra dos imágenes (`desarrollo-formal-semana-12-a.svg` y `-b.svg`) con un solo pie compartido («Esquema básico de la semana 12.», clase `.fig-shared` en `pages.css`). `esquema-basico.png` se conserva en `assets/images/` sin uso en la página.

- Etapa 14.2: Proceso de Cocreación reestructurado: Introducción (pendiente), Registro de actividades (Encuestas 16/11/2026, Entrevistas 17/11/2026), Conclusiones de las entrevistas (Santiago con imagen 16:9 que enlaza al video de YouTube; Juan Esteban pendiente), Proceso de encuestas (enlace Tally + captura) y Resultados. Se eliminaron «Evidencias y documentos» y «Video».

- Etapa 14.3: Cocreación: cada integrante tiene dos fichas (primero imagen con enlace, luego «Conclusiones de…» con el párrafo), con colores alternados y más espacio (`.cc-*` en `pages.css`). Proceso de encuestas: ficha de texto y ficha de captura, con el botón «Ver la encuesta» al final, fuera de las fichas. Resultados: ficha pequeña de un solo párrafo.

- Etapa 14.4: Cocreación: texto de Introducción; entrevistas de Valentina Martínez (dos fichas, como Santiago) y de Juan Esteban en dos columnas (Alberto y Deluque), cada una con imagen 16:9 enlazada a YouTube, nombre y conclusión. Imágenes `entrevista-valentina.svg` y `entrevista-juan-esteban.svg`.

- Etapa 14.5: Footer sin texto provisional y con «Proyecto: Taller de Diseño Conceptual | Semestre 4 | Corte 3» (`config.js`); sin ampliación de imágenes en Conclusiones de integrantes (`gallery.js`) y subtítulo en coral; Registro de actividades sin espacio sobrante; Semana 14 sin texto provisional y con el logotipo del colectivo (`logo-colectivo.svg`) sobre fondo blanco.

- Etapa 14.6: Cocreación: imágenes de Conclusiones de las entrevistas sin pie; Registro de actividades con descripciones definitivas de Encuestas y Entrevistas. Desarrollo Formal: Semana 14 sin pies de imagen provisionales.
