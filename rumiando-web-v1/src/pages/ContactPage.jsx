import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const CONTACT_EMAIL = "rumiando.app@gmail.com";

const INITIAL_FORM = {
  nombre: "",
  email: "",
  telefono: "",
  entidad: "",
  animales: "",
  tipoConsulta: "",
  mensaje: "",
};

function buildMailto(formData) {
  const subject = `Solicitud RumiAndo - ${formData.tipoConsulta || "Información"}`;
  const bodyLines = [
    "Hola, equipo de RumiAndo:",
    "",
    formData.mensaje.trim(),
    "",
    "Datos de contacto:",
    `Nombre: ${formData.nombre.trim()}`,
    `Email: ${formData.email.trim()}`,
    `Teléfono: ${formData.telefono.trim() || "No indicado"}`,
    `Explotación / entidad: ${formData.entidad.trim() || "No indicado"}`,
    `Tamaño aproximado del censo: ${formData.animales.trim() || "No indicado"}`,
    `Tipo de consulta: ${formData.tipoConsulta}`,
  ];

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function ContactPage() {
  const location = useLocation();

  const prefilledEmail = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("email") || "";
  }, [location.search]);

  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    email: prefilledEmail,
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setStatusMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.nombre.trim()) {
      nextErrors.nombre = "Introduce tu nombre o responsable de contacto.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Introduce un correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!formData.tipoConsulta.trim()) {
      nextErrors.tipoConsulta = "Selecciona el tipo de consulta.";
    }

    if (!formData.mensaje.trim()) {
      nextErrors.mensaje = "Escribe un breve mensaje.";
    } else if (formData.mensaje.trim().length < 15) {
      nextErrors.mensaje = "El mensaje es demasiado corto.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const mailtoHref = buildMailto(formData);
    setStatusMessage("Se ha preparado un correo para rumiando.app@gmail.com.");
    window.open(mailtoHref, "_self");
  };

  return (
    <section className="contact-page section-container">
      <div className="contact-intro">
        <span className="section-kicker">Contacto</span>
        <h1>Cuéntanos qué necesitas de RumiAndo.</h1>
        <p>
          El contacto actual es por Gmail. Puedes escribir directamente o usar
          este formulario para preparar el correo con los datos principales.
        </p>
        <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="contact-layout">
        <form className="contact-form panel-card" onSubmit={handleSubmit} noValidate>
          {statusMessage && <p className="form-status">{statusMessage}</p>}

          <div className="form-row">
            <label className="form-group" htmlFor="nombre">
              Nombre / responsable
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Marco Monzón"
                className={errors.nombre ? "input-error" : ""}
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </label>

            <label className="form-group" htmlFor="email">
              Correo electrónico
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>
          </div>

          <div className="form-row">
            <label className="form-group" htmlFor="telefono">
              Teléfono
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej. 600123123"
              />
            </label>

            <label className="form-group" htmlFor="entidad">
              Explotación / entidad
              <input
                id="entidad"
                name="entidad"
                type="text"
                value={formData.entidad}
                onChange={handleChange}
                placeholder="Nombre de explotación o empresa"
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-group" htmlFor="animales">
              Tamaño aproximado del censo
              <input
                id="animales"
                name="animales"
                type="text"
                value={formData.animales}
                onChange={handleChange}
                placeholder="Ej. 350 ovejas y 80 cabras"
              />
            </label>

            <label className="form-group" htmlFor="tipoConsulta">
              Tipo de consulta
              <select
                id="tipoConsulta"
                name="tipoConsulta"
                value={formData.tipoConsulta}
                onChange={handleChange}
                className={errors.tipoConsulta ? "input-error" : ""}
              >
                <option value="">Selecciona una opción</option>
                <option value="Solicitar información">Solicitar información</option>
                <option value="Probar RumiAndo">Probar RumiAndo</option>
                <option value="Consulta técnica">Consulta técnica</option>
                <option value="Colaboración">Colaboración</option>
              </select>
              {errors.tipoConsulta && (
                <span className="error-message">{errors.tipoConsulta}</span>
              )}
            </label>
          </div>

          <label className="form-group full-width" htmlFor="mensaje">
            Mensaje
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Describe el tipo de explotación, qué módulo te interesa y qué quieres resolver primero."
              className={errors.mensaje ? "input-error" : ""}
            />
            {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
          </label>

          <button type="submit" className="btn-primary submit-btn">
            Abrir correo preparado
          </button>
        </form>

        <aside className="contact-aside">
          <h2>Qué incluir en el primer mensaje</h2>
          <ul>
            <li>Especie principal y tamaño aproximado del censo.</li>
            <li>Si ya trabajas con lector de crotales o Excel.</li>
            <li>Qué flujo te urge ordenar: censo, sanidad, partos, leche o avisos.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default ContactPage;
