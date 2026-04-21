import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <span className="logo-text">RumiAndo</span>
          </NavLink>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Abrir navegación"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/censo" onClick={closeMenu}>
                  Censo
                </NavLink>
              </li>
            </ul>

            <NavLink to="/contacto" className="contact-btn" onClick={closeMenu}>
              Contáctanos
            </NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">RumiAndo</div>
          <p>Gestión ganadera clara, visual y escalable.</p>
        </div>

        <div className="footer-right">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/censo">Censo</NavLink>
          <NavLink to="/contacto">Contáctanos</NavLink>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;