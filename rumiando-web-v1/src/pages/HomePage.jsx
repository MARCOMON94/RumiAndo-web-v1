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

  return (
    <>
      <section className="hero hero-commercial">
        <div className="hero-content">
          <span className="hero-kicker">Gestión ganadera digital</span>

          <h1>RumiAndo, una forma más clara de organizar tu explotación</h1>

          <p>
            Una demo funcional pensada para mostrar cómo puede verse una app
            enfocada al censo, la consulta rápida de animales y la toma de
            decisiones con apoyo visual y datos útiles.
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
            <li>Censo accesible y visual</li>
            <li>Consulta rápida por crotal y filtros</li>
            <li>Base preparada para crecer hacia módulos reales de gestión</li>
          </ul>
        </div>

        <div className="hero-images hero-images-commercial">
          <div className="hero-photo-card hero-photo-main">
            <img
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1400&q=80"
              alt="Ganado en una explotación"
            />
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span className="section-kicker">Qué muestra esta demo</span>
          <h2>Una primera visión de cómo podría funcionar RumiAndo</h2>
          <p>
            Esta versión está enfocada en enseñar la estructura general de la
            aplicación: navegación, censo, filtros, fichas individuales,
            contacto e integración de datos externos.
          </p>
        </div>

        <div className="services-container">
          <article className="service-card">
            <h3>Censo visual</h3>
            <p>
              Consulta animales de forma más rápida, con filtros y fichas
              individuales accesibles desde una misma interfaz.
            </p>
          </article>

          <article className="service-card">
            <h3>Datos externos como apoyo</h3>
            <p>
              La parte meteorológica se plantea como una demo de cómo la app
              puede ofrecer sugerencias útiles a partir de datos externos en
              tiempo real.
            </p>
          </article>

          <article className="service-card">
            <h3>Base preparada para crecer</h3>
            <p>
              La estructura actual está pensada para poder evolucionar hacia
              módulos más completos sin rehacer toda la aplicación.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section home-demo-banner">
        <div className="demo-banner">
          <div>
            <span className="section-kicker">Censo en modo demostración</span>
            <h2>Explora cómo se visualiza y organiza la información animal</h2>
            <p>
              La sección de censo está planteada como una demo funcional para
              enseñar búsqueda, filtrado, fichas individuales y estructura base
              de una app ganadera.
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

      <WeatherAdvisory />

      <section className="newsletter">
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