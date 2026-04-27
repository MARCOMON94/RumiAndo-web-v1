import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WeatherAdvisory from "../components/WeatherAdvisory";

function HomePage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    navigate(`/contacto?email=${encodeURIComponent(cleanEmail)}`);
  };

  const handleGoToCensus = () => {
    navigate("/censo");
  };

  const handleGoToCharts = () => {
    navigate("/censo");
    setTimeout(() => {
      const chartsButton = document.querySelector('[data-tab-trigger="charts"]');
      chartsButton?.click();
    }, 80);
  };

  const handleGoToWeather = () => {
    const weatherSection = document.getElementById("weather-demo");

    if (weatherSection) {
      weatherSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className="hero hero-commercial section-container">
        <div className="hero-headline">
          <span className="hero-kicker">Gestión ganadera digital</span>

          <h1>RumiAndo, una forma más clara de organizar tu explotación</h1>
        </div>

        <div className="hero-copy">
          <p>
            Una demo funcional pensada para mostrar una app de gestión ganadera
            para la consulta rápida de animales, movimientos dentro de la granja,
            la visualización clara de información y consejos basados en esta,
            útil para el manejo diario.
          </p>

          <div className="hero-buttons">
            <Link to="/contacto" className="btn-primary">
              Solicitar información
            </Link>
            <Link to="/censo" className="btn-secondary">
              Ver demo del censo
            </Link>
          </div>

          <ul className="hero-highlights">
            <li>Censo visual con filtros y fichas individuales</li>
            <li>Alta simulada de animales dentro de la sesión</li>
            <li>Gráficas y bloques resumen a partir de datos del censo</li>
          </ul>
        </div>

        <div className="hero-images hero-images-commercial">
          <div className="hero-photo-card hero-photo-main">
            <img
              src="/images/home/hero-livestock.png"
              alt="Ganado en una explotación"
            />
          </div>
        </div>
      </section>

      <section className="home-section section-container">
        <div className="section-heading section-heading-wide">
          <span className="section-kicker">Qué muestra esta demo</span>
          <h2>Una primera visión de cómo podría funcionar RumiAndo</h2>
          <p>
            Esta versión está enfocada en enseñar la estructura general de la
            aplicación: navegación, censo con datos simulados, filtros, fichas
            individuales, gráficas, formularios y uso de datos externos como
            apoyo visual dentro de la demo.
          </p>
        </div>

        <div className="services-container home-features-grid">
          <article
            className="service-card service-card-media service-card-link"
            onClick={handleGoToCensus}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleGoToCensus();
              }
            }}
          >
            <img
              src="/images/home/feature-census.jpeg"
              alt="Animal identificado dentro de una demo de censo"
              className="service-card-image"
            />
            <h3>Demo de censo con datos simulados</h3>
            <p>
              Explora una muestra de animales con información inventada para
              enseñar cómo podrían visualizarse, filtrarse y consultarse los
              registros dentro de una app ganadera.
            </p>
          </article>

          <article
            className="service-card service-card-media service-card-link"
            onClick={handleGoToCharts}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleGoToCharts();
              }
            }}
          >
            <img
              src="/images/home/feature-analytics.png"
              alt="Representación visual de análisis y resumen de datos"
              className="service-card-image"
            />
            <h3>Gráficas y resumen visual</h3>
            <p>
              La demo incluye métricas y bloques de distribución para mostrar
              cómo podría presentarse la información del censo de una forma más
              clara y útil.
            </p>
          </article>

          <article
            className="service-card service-card-media service-card-link"
            onClick={handleGoToWeather}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleGoToWeather();
              }
            }}
          >
            <img
              src="/images/home/feature-weather.png"
              alt="Entorno rural con condiciones meteorológicas cambiantes"
              className="service-card-image"
            />
            <h3>Datos externos aplicados a la demo</h3>
            <p>
              La parte meteorológica se plantea como un ejemplo de cómo la app
              podría interpretar datos externos en tiempo real para ofrecer
              sugerencias simples de apoyo al manejo.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section home-demo-banner section-container">
        <div className="demo-banner">
          <div>
            <span className="section-kicker">Censo en modo demostración</span>
            <h2>Explora cómo se visualiza y organiza la información animal</h2>
            <p>
              La sección de censo funciona como una demo con datos inventados
              para mostrar distintas opciones de visualización, filtrado,
              consulta y organización de la información animal.
            </p>
          </div>

          <div className="demo-banner-actions">
            <Link to="/censo" className="btn-primary">
              Entrar al censo
            </Link>
            <Link to="/contacto" className="btn-secondary">
              Pedir presupuesto
            </Link>
          </div>
        </div>
      </section>

      <div id="weather-demo">
        <WeatherAdvisory />
      </div>

      <section className="newsletter section-container">
        <h2>¿Te interesa una solución de este tipo para tu explotación o empresa?</h2>
        <p>Déjanos tu correo y continuamos desde el formulario de contacto</p>

        <form
          className="newsletter-form"
          onSubmit={handleNewsletterSubmit}
          noValidate
        >
          <div className="input-wrapper">
            <span className="mail-icon">✉</span>
            <input
              type="email"
              id="newsletter-email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Continuar
          </button>
        </form>
      </section>
    </>
  );
}

export default HomePage;