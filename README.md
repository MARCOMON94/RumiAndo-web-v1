RumiAndo
RumiAndo es una aplicación web desarrollada con React y Vite orientada a mostrar una propuesta de interfaz para la gestión de censo ganadero. El proyecto está planteado como una demo funcional que permite visualizar animales, filtrarlos, consultar su ficha individual, registrar nuevos animales dentro de la sesión y mostrar información resumida en una vista de gráficas.

La idea principal del proyecto es enseñar cómo podría organizarse una aplicación real enfocada a explotaciones ovinas y caprinas, con una estructura escalable y una interfaz clara para consultar datos relevantes de cada animal.

Objetivo del proyecto

El objetivo de este trabajo ha sido desarrollar una aplicación pequeña pero completa en React aplicando los conceptos vistos en clase:
- componentes funcionales
- props
- hooks
- Context API
- React Router
- renderizado dinámico
- filtros
- consumo de API externa
- tests básicos
- estructura modular
Además de cumplir los requisitos técnicos, se ha intentado orientar la app a un caso de uso realista relacionado con la gestión ganadera.

Tecnologías utilizadas
- React
- Vite
- JavaScript
- React Router DOM
- Context API
- CSS
- Vitest
- Testing Library

Funcionalidades principales

Home
La página principal presenta la app como una demo funcional de RumiAndo. Incluye una estructura tipo landing, accesos rápidos a la demo del censo, un bloque explicativo del proyecto y un formulario de entrada rápida al contacto mediante email.

Censo animal
La sección de censo permite:
- visualizar animales en formato tarjeta
- buscar por crotal, especie o raza
- filtrar por especie
- filtrar por raza
- filtrar por estado
- filtrar por corral
- filtrar por sexo
- filtrar por estado sanitario
- filtrar por estado reproductivo
- filtrar por destino productivo
- filtrar por secado
- controlar cuántos animales se muestran por vista

Ficha individual
Cada animal tiene una ficha individual accesible mediante una ruta dinámica con parámetro `:id`. En esta vista se muestra información completa del animal, incluyendo:
- identificación
- datos generales
- estado y manejo
- información reproductiva
- relación familiar por crotal
- registros sanitarios
- historial de movimientos

Alta de animales
La aplicación incluye una pestaña para simular el alta de nuevos animales dentro de la sesión actual. El formulario permite:
- elegir tipo de alta
- registrar datos básicos
- autocompletar parte de la lógica según si el alta es por nacimiento o compra
- sugerir madre y padre según especie y sexo
- asignar imagen automáticamente según raza
Los datos creados en esta parte no se guardan en una base de datos real. Solo se mantienen en memoria mientras la sesión está abierta.

Gráficas
La vista de gráficas muestra una representación resumida del censo mediante métricas y barras visuales generadas con `div`, sin librerías externas de gráficos. Esto permite mantener la solución dentro del nivel trabajado en clase.

Contacto
La página de contacto está orientada a una solicitud de información, demo o presupuesto. Incluye validación básica de formulario y lectura del email desde query params si el usuario llega desde la Home.

Información meteorológica
La aplicación incluye una integración de datos meteorológicos como ejemplo de uso de una API externa y como demostración de cómo una app de este tipo podría aprovechar datos externos para generar sugerencias o apoyo visual.

Estructura del proyecto
src/
  components/
  context/
  hooks/
  layouts/
  pages/
  test/
  
Organización general
•	components: componentes reutilizables como filtros, tarjetas o formularios 
•	context: gestión de estado global, especialmente para animales y clima 
•	hooks: hooks personalizados como acceso al contexto 
•	layouts: estructura general compartida 
•	pages: páginas principales de la aplicación 
•	test: configuración y utilidades de testing 

Routing
La aplicación utiliza React Router para organizar la navegación entre vistas.
Rutas principales:
•	/ → Home 
•	/censo → vista principal del censo 
•	/animal/:id → ficha individual del animal 
•	/contacto → formulario de contacto 
La ruta dinámica /animal/:id permite consultar una ficha concreta según el identificador del animal.

Gestión de estado
La aplicación utiliza Context API para centralizar el acceso a la información del censo y evitar props drilling innecesario.
AnimalsContext
Se encarga de:
•	cargar los datos del JSON externo 
•	almacenar todos los animales 
•	aplicar filtros 
•	calcular los animales visibles 
•	añadir animales dentro de la sesión 
•	exponer opciones dinámicas para los filtros 

WeatherContext
Se utiliza para la integración de la información meteorológica y para generar una demostración de recomendaciones basadas en datos externos.
Consumo de datos y API
El proyecto utiliza un JSON externo como base de datos simulada del censo animal.
También se usa una API meteorológica para mostrar cómo podrían integrarse datos en tiempo real en una aplicación más completa.
La carga de datos se realiza con fetch, controlando:
•	estado de carga 
•	errores 
•	transformación de datos para filtros y visualización 

Responsive
La aplicación está planteada para funcionar en distintos tamaños de pantalla y se ha trabajado pensando en tres rangos principales:
•	móvil 
•	tablet 
•	escritorio 
El ajuste visual final se apoya tanto en CSS global como en estilos específicos de componentes y algunos estilos inline.

Testing
El proyecto incluye tests unitarios básicos con Vitest y Testing Library.
Actualmente se han trabajado tests sobre:
•	HomePage 
•	AnimalsFilters 
•	ContactPage 
•	AnimalDetailPage 
Con ellos se validan aspectos como:
•	renderizado de textos clave 
•	cambios en filtros 
•	validación básica de formularios 
•	navegación de elementos renderizados 
•	existencia de datos en la ficha individual 

Indicador de carga y errores
La aplicación contempla estados de loading y de error en la carga de datos, especialmente en la gestión del censo y la obtención de información externa.

CSS y enfoque visual
En el proyecto se han usado varias formas de aplicar estilos, tal y como se pedía en los requisitos:
•	CSS general 
•	estilos asociados a módulos y componentes 
•	estilos inline en algunas vistas y bloques concretos 

Deploy
El proyecto se ha preparado para despliegue online. La parte de configuración y ajustes de deploy se ha trabajado con Netlify.

Variables de entorno
Se han planteado variables de entorno para algunos datos relacionados con la parte meteorológica, aunque el uso final depende del entorno de despliegue.

Documentación breve del uso de IA
La IA se ha utilizado como apoyo puntual en:
•	revisión de estructura de componentes 
•	propuesta de mejoras de organización 
•	ayuda para depurar errores 
•	apoyo en la redacción técnica 
•	propuesta y ajuste de tests 
En todos los casos, el código ha sido revisado, adaptado y corregido manualmente para ajustarlo a los contenidos vistos en clase y a las necesidades concretas del proyecto.

Tiempos de desarrollo
Creación del proyecto y configuración inicial con React + Vite: 10 min
Organización inicial de carpetas, archivos y primera subida al repositorio: 35 min
Preparación, revisión y adaptación de los datos JSON iniciales: 1 h 35 min
Modelado de la estructura de especies, razas y contenido base: 1 h 10 min
Implementación del sistema de obtención y lectura de datos: 1 h 20 min
Desarrollo del filtro o barra de búsqueda: 1 h 25 min
Construcción de la Home: 1 h 35 min
Construcción de la página de Contacto: 1 h 10 min
Correcciones y refactor de ContactPage: 45 min
Estilos generales de la aplicación: 1 h 20 min
Ajustes de estilos por módulos y componentes: 1 h 10 min
Responsive para móvil, tablet y escritorio: 1 h 40 min
Configuración del deploy y ajustes con Netlify: 45 min
Integración de una API externa con Context y fetch: 1 h 35 min
Gestión del loading y tratamiento de errores de la API: 50 min
Pruebas unitarias básicas: 1 h 15 min
Revisión final del proyecto y corrección de detalles: 1 h
Implementación de la ruta dinámica para el detalle individual de cada animal (/animal/:id): 35 min
Configuración del entorno de pruebas unitarias con Vitest, Testing Library y archivos de setup: 25 min
Ajustes de accesibilidad y correcciones sobre componentes para validación correcta de tests: 1 h 20 min
Refactor del censo con pestañas internas para listado, alta y gráficas: 1 h 25 min
Ampliación del sistema de filtros con variables ganaderas adicionales: 1 h 30 min
Desarrollo de la ficha individual completa con relaciones familiares, registros sanitarios y movimientos: 1 h 20 min
Implementación del formulario de alta con lógica condicional y autocompletados: 1 h 35 min
Actualización y revisión de tests tras la ampliación funcional del proyecto: 1 h 10 min

Mejoras futuras
•	persistencia real con base de datos 
•	autenticación de usuarios 
•	edición de animales existentes 
•	eliminación lógica de registros 
•	importación y exportación de datos 
•	integración con lectores RFID 
•	alertas o recordatorios automáticos mediante por ejemplo whatsapp con agentes
•	gráficas más avanzadas 
•	panel de administración 
•	validaciones más completas en formularios 
•	uso de Error Boundary para mejorar tolerancia a fallos de renderizado
•	recomendaciones mediante IA

