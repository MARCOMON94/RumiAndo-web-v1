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
      <section className="hero">
        <div className="hero-content">
          <h1>Gestiona tu explotación con una visión más clara y útil</h1>
          <p>
            RumiAndo es una base digital pensada para organizar el censo y
            preparar una gestión ganadera más práctica, simple y escalable.
          </p>

          <div className="hero-buttons">
            <Link to="/contacto" className="btn-primary">
              Contactar
            </Link>
            <Link to="/censo" className="btn-secondary">
              Ver censo
            </Link>
          </div>
        </div>

        <div className="hero-images">
          <div className="hero-card hero-card-1">
            <h3>Censo centralizado</h3>
            <p>Búsqueda rápida por crotal, especie o raza.</p>
          </div>

          <div className="hero-main-image hero-placeholder">
            <span>Imagen principal</span>
          </div>

          <div className="hero-card hero-card-2">
            <h3>Preparado para crecer</h3>
            <p>Sanidad, estados, corrales, costes y recordatorios.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Qué es RumiAndo</h2>
        <p>
          Una aplicación pensada para organizar información animal de forma
          clara, rápida y usable, especialmente en contextos reales de manejo de
          ovino y caprino.
        </p>

        <div className="services-container">
          <article className="service-card">
            <h3>Consulta rápida</h3>
            <p>
              Accede al censo y localiza animales sin perder tiempo navegando
              entre listados confusos.
            </p>
          </article>

          <article className="service-card">
            <h3>Estructura funcional</h3>
            <p>
              La base actual permite seguir creciendo hacia módulos realmente
              útiles en una explotación.
            </p>
          </article>

          <article className="service-card">
            <h3>Diseño orientado al trabajo</h3>
            <p>
              Menos adorno inútil y más claridad para consultar, registrar y
              seguir datos relevantes.
            </p>
          </article>
        </div>
      </section>

      <WeatherAdvisory />

      <section className="newsletter">
        <h2>¿Tienes alguna pregunta?</h2>
        <p>Déjanos ayudarte</p>

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