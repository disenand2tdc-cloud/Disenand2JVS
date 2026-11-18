/* DATOS DE LOS 12 REFERENTES (editar aquí; la matriz y las fichas se generan solas).
   Cada ficha muestra: imagen, name (nombre del referente), year (año), origin (origen), what (¿En qué consiste?) y took (¿Qué nos aportó?).
   La matriz general ya no se genera; la matriz original (PDF) se conserva aparte.
   - group: id de REFERENTES.groups (vacío = sin clasificar). Solo se muestran los filtros de grupos con al menos una ficha.
   - img: ruta (ej. 'assets/images/referente-01.jpg'); vacío = placeholder.  ratio: proporción original, ej. '4/3'.
   - Texto entre corchetes = pendiente (se marca visualmente). Reemplazar con el análisis real de la matriz original. */
window.REFERENTES = {
  groups: [
    { id: 'proposito', label: '1 propósito' },
    { id: 'criterio-2', label: '[Criterio 2]' },   /* pendiente: nombre real de la clasificación */
    { id: 'criterio-3', label: '[Criterio 3]' }    /* pendiente: nombre real de la clasificación */
  ],
  criteria: [
    { key: 'what',    label: '¿En qué consiste?' },
    { key: 'took',    label: '¿Qué nos aportó?' }
  ],
  /* Matriz original en PDF (Wix). Si se descarga, guardarla en assets/documents/ y cambiar la ruta. */
  matrizPdf: 'https://5038afb1-1ac4-4bdd-8346-b69a4a3ef2a9.filesusr.com/ugd/28c001_9b6ffcd7fe7a41bb987edf42381ca39e.pdf',
  items: [
    ['Constructive Geometry Pavilion', '2012', 'Oporto, Portugal', 'Es un pabellón experimental construido con cartón corrugado, compuesto por celdas hexagonales y paneles perforados que se ensamblan para formar una estructura tridimensional ligera.', 'Nos permitió explorar la geometría modular como base para construir nuestra instalación, además de comprender cómo dividirla en piezas prefabricadas que faciliten su transporte y montaje.'],
    ['Serpentine Pavilion — BIG', '2016', 'Londres, Inglaterra, Reino Unido', 'Es un pabellón temporal formado por módulos de fibra de vidrio apilados y desplazados, que transforman un muro lineal en una estructura abierta, cubierta y transitable.', 'Nos mostró cómo una estructura modular puede transformar su configuración para generar espacios habitables y recorridos, inspirándonos a desarrollar una instalación compacta que pueda desplegarse en el lugar de exposición.'],
    ['116 x 31', 'abril de 2022', 'Cambridge, Estados Unidos', 'Es una instalación audiovisual interactiva que utiliza la fachada de un edificio como una superficie de proyección, donde las ventanas funcionan como píxeles que generan imágenes a partir de los sonidos de los visitantes.', 'Nos permitió reconocer el potencial de las superficies arquitectónicas como medios de comunicación visual e interacción, aprovechando los estímulos de los visitantes para generar contenidos digitales.'],
    ['NExT Lab Cube', '2018', 'Ciudad y país no identificados', 'Es un laboratorio universitario de experimentación tecnológica organizado alrededor de un cubo central reflectante, que integra herramientas de fabricación digital, realidad virtual, escaneo 3D e iluminación LED.', 'Nos enseñó cómo un elemento arquitectónico protagonista puede concentrar diferentes recursos tecnológicos y darle identidad al espacio, integrando varias disciplinas en una misma experiencia.'],
    ['Sketch Aquarium — teamLab', '2013', 'Japón', 'Es una instalación interactiva en la que los visitantes colorean criaturas marinas que posteriormente son digitalizadas y proyectadas en un acuario virtual, donde adquieren movimiento e interactúan con el entorno.', 'Nos inspiró a conectar la creación manual con las herramientas digitales, permitiendo que los estudiantes experimenten cómo sus propias ideas pueden transformarse en contenidos interactivos.'],
    ['Trace Pavilion', '2015', 'Macao, China', 'Es un pabellón experimental construido con una estructura de bambú, complementada con proyectores y sistemas audiovisuales que generan una experiencia envolvente mediante video mapping de 360 grados.', 'Nos permitió comprender cómo una estructura física puede convertirse en un soporte para contenidos digitales, integrando arquitectura, iluminación y proyecciones dentro de una misma experiencia.'],
    ['LightTank II', '2018', 'Auckland, Nueva Zelanda', 'Es una instalación interactiva de gran formato compuesta por cuatro paredes transparentes distribuidas en forma de X, sobre las cuales se proyectan contenidos digitales tridimensionales que pueden modificarse mediante la interacción de los visitantes.', 'Nos mostró cómo una distribución espacial abierta y transparente permite generar diferentes perspectivas de observación, haciendo que los visitantes recorran e interactúen con los contenidos desde distintos puntos.'],
    ['Pulse Room — Rafael Lozano-Hemmer', '2006', 'México', 'Es una instalación interactiva formada por bombillas suspendidas que responden al ritmo cardíaco de los visitantes, transformando sus pulsaciones en señales luminosas que se integran en una composición colectiva.', 'Nos permitió explorar cómo las acciones y características individuales pueden convertirse en respuestas visuales mediante la tecnología, generando experiencias participativas a partir de interacciones sencillas.'],
    ['Christie – Immersive Interactive Room', '2024', 'Las Vegas, Nevada, Estados Unidos', 'Es un espacio inmersivo que utiliza proyectores de alta resolución y sistemas de seguimiento para transformar paredes y suelos en superficies digitales que responden a los movimientos de los visitantes.', 'Nos permitió identificar posibilidades de interacción mediante sensores y proyecciones, comprendiendo cómo transformar nuestro espacio en un entorno dinámico donde los estudiantes descubran contenidos a través de sus propias acciones.'],
    ['Pabellón del Grupo Fuji', '1970', 'Osaka, Japón', 'Es una propuesta arquitectónica experimental presentada en la Exposición Universal de Osaka de 1970, que utiliza estructuras neumáticas e inflables para configurar un espacio temporal de grandes dimensiones y formas poco convencionales.', 'Nos permitió explorar las posibilidades de las estructuras inflables como alternativa constructiva, especialmente por su capacidad para generar volúmenes llamativos, ampliar la escala espacial y facilitar propuestas arquitectónicas temporales.'],
    ['Al Bahar Towers — Aedas', '2012', 'Abu Dabi, Emiratos Árabes Unidos', 'Son dos torres en Abu Dabi que incorporan una fachada de paneles triangulares móviles, los cuales se abren y pliegan automáticamente para regular la entrada de luz solar y generar sombra.', 'Nos permitió estudiar cómo los módulos geométricos pueden incorporar movimiento y adaptarse a diferentes estímulos, inspirándonos a explorar superficies móviles que transformen la apariencia y funcionalidad de nuestra instalación.'],
    ['Biósfera de Montreal — Richard Buckminster Fuller', '1967', 'Montreal, Quebec, Canadá', 'Es una estructura geodésica de gran escala formada por miles de elementos metálicos interconectados, organizados geométricamente para crear una envolvente espacial de apariencia esférica.', 'Nos enseñó cómo la unión de pequeñas piezas geométricas puede conformar una estructura amplia y resistente, aportando criterios para desarrollar una instalación modular, envolvente y fácil de transportar y ensamblar.']
  ].map((d, i) => ({
    n: String(i + 1).padStart(2, '0'),
    name: d[0],
    year: d[1],
    origin: d[2],
    group: '',
    img: 'assets/images/referente-' + String(i + 1).padStart(2, '0') + '.jpg',
    ratio: '16/9',
    link: '',
    what: d[3],
    took: d[4]
  }))
};
