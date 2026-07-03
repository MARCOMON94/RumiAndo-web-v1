import { Link } from "react-router-dom";

const coreFeatures = [
  {
    title: "Censo y ficha animal",
    text: "Consulta animales por crotal, revisa su ficha y conserva datos de corral, salud, genealogía, estado reproductivo, alertas y leche.",
  },
  {
    title: "Operaciones con lector",
    text: "Mueve animales, actualiza estados reproductivos y registra eventos sanitarios pasando crotales y finalizando una lista revisable.",
  },
  {
    title: "Partos, bajas y cría",
    text: "Abre partos desde la madre, crea crías, registra bajas con revisión previa y mantiene el historial operativo del animal.",
  },
  {
    title: "Avisos y recordatorios",
    text: "Centraliza avisos automáticos y recordatorios manuales para localizar animales pendientes y actuar desde la ficha o la lista.",
  },
  {
    title: "Corrales y reglas de manejo",
    text: "Gestiona corrales por cuenta ganadera, evita duplicados y usa reglas que proponen cambios relacionados con confirmación.",
  },
  {
    title: "Estadísticas, Excel y leche",
    text: "Filtra paneles, revisa listados, exporta Excel y registra ventas de leche repartiendo litros e importe entre animales del corral.",
  },
];

const workflowSteps = [
  "Elige una acción: buscar crotal, parto, baja, movimiento, reproducción o evento sanitario.",
  "Pasa crotales con el lector y RumiAndo prepara una lista editable sin duplicados.",
  "Revisa animales, corrales, fechas y datos antes de pulsar Finalizar.",
  "Cada ficha queda actualizada con historial y datos útiles para próximas decisiones.",
];

const modules = [
  "Búsqueda inteligente privada por usuario",
  "Censo activo con filtros progresivos",
  "Ficha individual por animal",
  "Evento sanitario: vacunación, desparasitación, enfermedad u otro",
  "Estado reproductivo y diagnóstico de gestación",
  "Movimiento de corral con reglas opcionales",
  "Registro de leche y reparto por animal",
  "Crías sin crotal definitivo",
  "Importación inicial por lectura o Excel/CSV",
  "Asistente IA que abre flujos y prepara acciones",
];

const capturePlaceholders = [
  {
    src: "/images/landing/landing-app-home.png",
    title: "Inicio de trabajo",
    text: "Sustituye esta imagen por una captura de la pantalla principal de RumiAndo.",
  },
  {
    src: "/images/landing/landing-reader-flow.png",
    title: "Flujo con lector",
    text: "Sustituye esta imagen por una captura de una operación con lista de crotales.",
  },
  {
    src: "/images/landing/landing-analytics.png",
    title: "Estadísticas y Excel",
    text: "Sustituye esta imagen por un panel de estadísticas o exportación.",
  },
  {
    src: "/images/landing/landing-mobile.png",
    title: "Uso móvil en campo",
    text: "Sustituye esta imagen por una captura móvil de la barra inferior o lector.",
  },
];

function HomePage() {
  return (
    <>
      <section className="hero section-container">
        <div className="hero-copy">
          <span className="hero-kicker">Gestión ganadera para trabajo real</span>
          <h1>RumiAndo ordena el día a día de una explotación ovina o caprina.</h1>
          <p>
            Una app web para consultar el censo, trabajar con lector de crotales,
            registrar operaciones, seguir avisos y revisar datos útiles sin perder
            el hilo del manejo diario.
          </p>

          <div className="hero-buttons">
            <Link to="/contacto" className="btn-primary">
              Solicitar información
            </Link>
            <a href="#funciones" className="btn-secondary">
              Ver funciones
            </a>
          </div>

          <ul className="hero-highlights" aria-label="Resumen de RumiAndo">
            <li>Censo, fichas, corrales, partos, bajas y salud en un mismo sitio.</li>
            <li>Operaciones por lector con revisión antes de guardar.</li>
            <li>Estadísticas, Excel, leche, cría y asistente IA conectados al flujo real.</li>
          </ul>
        </div>

        <div className="hero-visual" aria-label="Vista comercial de RumiAndo">
          <div className="hero-brand-card">
            <img
              src="/images/brand/rumiando-sheep-tech-app-colors.png"
              alt="Icono oficial de RumiAndo"
              className="hero-brand-icon"
            />
            <div>
              <span>RumiAndo</span>
              <strong>Campo, datos y lector en una sola app</strong>
            </div>
          </div>

          <img
            src="/images/landing/landing-hero.png"
            alt="Placeholder para imagen de portada de RumiAndo"
            className="hero-main-image"
          />

          <div className="hero-floating-panel">
            <span>Lector activo</span>
            <strong>Buscar crotal · Parto · Baja</strong>
          </div>
        </div>
      </section>

      <section className="home-section section-container value-strip">
        <article>
          <strong>Menos hojas sueltas</strong>
          <span>La ficha animal reúne historial, alertas y datos de manejo.</span>
        </article>
        <article>
          <strong>Más seguridad al guardar</strong>
          <span>Las operaciones por lector se revisan antes de finalizar.</span>
        </article>
        <article>
          <strong>Datos exportables</strong>
          <span>Los listados filtrados son la base de los Excel de trabajo.</span>
        </article>
      </section>

      <section id="funciones" className="home-section section-container">
        <div className="section-heading">
          <span className="section-kicker">Funciones actuales</span>
          <h2>Lo que ya hace RumiAndo dentro de la aplicación.</h2>
          <p>
            La landing se basa en las pantallas reales de la app: gestión de
            animales, operaciones, avisos, estadísticas, leche, cría y apoyo del
            asistente IA para abrir flujos sin ejecutar cambios a ciegas.
          </p>
        </div>

        <div className="feature-grid">
          {coreFeatures.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="lector" className="home-section reader-section section-container">
        <div className="reader-content">
          <span className="section-kicker">Trabajo con lector</span>
          <h2>El lector ayuda a pasar del animal físico a la acción correcta.</h2>
          <p>
            RumiAndo tiene lector silencioso global para búsqueda, parto y baja,
            y pantallas de operación que capturan crotales en lote para registrar
            movimientos, reproducción o sanidad.
          </p>
        </div>

        <ol className="workflow-list">
          {workflowSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section section-container modules-section">
        <div className="section-heading">
          <span className="section-kicker">Módulos conectados</span>
          <h2>Una herramienta de explotación, no una pantalla aislada.</h2>
          <p>
            Cada módulo comparte cuenta ganadera, REGA, corrales, usuarios y datos
            de animales para que la información se mantenga coherente.
          </p>
        </div>

        <div className="modules-list">
          {modules.map((module) => (
            <span key={module}>{module}</span>
          ))}
        </div>
      </section>

      <section id="capturas" className="home-section section-container">
        <div className="section-heading section-heading-split">
          <div>
            <span className="section-kicker">Imágenes sustituibles</span>
            <h2>Espacios listos para tus capturas o imágenes generadas.</h2>
          </div>
          <p>
            Mantén estos nombres de archivo y cambia las imágenes cuando tengas
            capturas de la app o escenas generadas para la portada.
          </p>
        </div>

        <div className="capture-grid">
          {capturePlaceholders.map((item) => (
            <article className="capture-card" key={item.src}>
              <img src={item.src} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section final-cta section-container">
        <div>
          <span className="section-kicker">Contacto</span>
          <h2>Hablemos de cómo encaja RumiAndo en tu explotación.</h2>
          <p>
            De momento el contacto oficial es por Gmail. Cuéntanos el tipo de
            explotación, el tamaño del censo y qué flujo quieres probar primero.
          </p>
        </div>
        <Link to="/contacto" className="btn-primary">
          Escribir a RumiAndo
        </Link>
      </section>
    </>
  );
}

export default HomePage;
