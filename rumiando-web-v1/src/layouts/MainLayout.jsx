import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { href: "/#funciones", label: "Funciones" },
  { href: "/#lector", label: "Lector" },
  { href: "/#capturas", label: "Capturas" },
];

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <img
              src="/images/brand/rumiando-sheep-tech-app-colors.png"
              alt=""
              aria-hidden="true"
              className="logo-mark"
            />
            <span className="logo-text">RumiAndo</span>
          </NavLink>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            id="main-navigation"
            className={`nav-menu ${menuOpen ? "is-open" : ""}`}
          >
            <ul className="nav-links">
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Inicio
                </NavLink>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <NavLink
              to="/contacto"
              className="contact-btn"
              onClick={closeMenu}
            >
              Contacto
            </NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-left">
          <div className="footer-brand">
            <img
              src="/images/brand/rumiando-sheep-tech-app-colors.png"
              alt=""
              aria-hidden="true"
              className="footer-mark"
            />
            <div className="footer-logo">RumiAndo</div>
          </div>
          <p>Gestión ganadera clara para trabajo real de campo.</p>
        </div>

        <div className="footer-right">
          <NavLink to="/">Inicio</NavLink>
          <a href="/#funciones">Funciones</a>
          <a href="/#capturas">Capturas</a>
          <NavLink to="/contacto">Contacto</NavLink>
          <a href="mailto:rumiando.app@gmail.com">rumiando.app@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
