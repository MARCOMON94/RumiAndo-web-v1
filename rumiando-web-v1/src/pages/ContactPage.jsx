import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function ContactPage() {
  const location = useLocation();

  const prefilledEmail = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("email") || "";
  }, [location.search]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: prefilledEmail,
    telefono: "",
    empresa: "",
    trabajadores: "",
    tipoEntidad: "",
    tipoConsulta: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Introduce tu nombre o responsable de contacto.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Introduce un correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!formData.tipoConsulta.trim()) {
      newErrors.tipoConsulta = "Selecciona el tipo de consulta.";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Escribe un breve mensaje.";
    } else if (formData.mensaje.trim().length < 15) {
      newErrors.mensaje = "El mensaje es demasiado corto.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      trabajadores: "",
      tipoEntidad: "",
      tipoConsulta: "",
      mensaje: "",
    });
  };

  const inputStyle = (fieldName) => ({
    width: "100%",
    border: errors[fieldName] ? "1px solid #b33a3a" : "1px solid #d9d3c4",
    outline: "none",
    backgroundColor: "#ffffff",
    padding: "14px 16px",
    fontSize: "0.96rem",
    color: "#233127",
    fontFamily: "inherit",
    borderRadius: "12px",
  });

  return (
    <main style={{ padding: "20px 0 0" }}>
      <section
        style={{
          marginBottom: "28px",
          width: "100%",
        }}
      >
        <h1
          style={{
            marginBottom: "12px",
            width: "100%",
            maxWidth: "unset",
            lineHeight: "0.98",
          }}
        >
          Solicitar información
        </h1>

        <p
          style={{
            width: "100%",
            maxWidth: "unset",
            lineHeight: "1.75",
            margin: 0,
          }}
        >
          Esta sección está pensada para simular una solicitud de información o
          presupuesto sobre RumiAndo. Puedes indicar el tipo de entidad, el tipo
          de consulta y los datos básicos necesarios para valorar una posible
          implantación o demo.
        </p>
      </section>

      <section
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "1.45rem",
            marginBottom: "18px",
            width: "100%",
            maxWidth: "unset",
          }}
        >
          Formulario de contacto
        </h2>

        {isSubmitted && (
          <div
            style={{
              marginBottom: "18px",
              padding: "14px 16px",
              borderRadius: "12px",
              backgroundColor: "#dbe8dc",
              border: "1px solid #c7d8c8",
              color: "#233127",
              fontWeight: 600,
            }}
          >
            Solicitud registrada en la demo. En una versión real, aquí se enviaría
            el formulario a un backend o CRM.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            width: "100%",
          }}
        >
          <div>
            <label
              htmlFor="nombre"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Nombre / responsable
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Marco Monzón"
              style={inputStyle("nombre")}
            />
            {errors.nombre && (
              <p style={{ marginTop: "6px", color: "#b33a3a", fontSize: "0.88rem" }}>
                {errors.nombre}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              style={inputStyle("email")}
            />
            {errors.email && (
              <p style={{ marginTop: "6px", color: "#b33a3a", fontSize: "0.88rem" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="telefono"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="text"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej. 600123123"
              style={inputStyle("telefono")}
            />
          </div>

          <div>
            <label
              htmlFor="empresa"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Empresa / explotación
            </label>
            <input
              id="empresa"
              name="empresa"
              type="text"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nombre de empresa o explotación"
              style={inputStyle("empresa")}
            />
          </div>

          <div>
            <label
              htmlFor="trabajadores"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Nº de trabajadores
            </label>
            <input
              id="trabajadores"
              name="trabajadores"
              type="number"
              min="1"
              value={formData.trabajadores}
              onChange={handleChange}
              placeholder="Ej. 5"
              style={inputStyle("trabajadores")}
            />
          </div>

          <div>
            <label
              htmlFor="tipoEntidad"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Tipo de entidad
            </label>
            <select
              id="tipoEntidad"
              name="tipoEntidad"
              value={formData.tipoEntidad}
              onChange={handleChange}
              style={inputStyle("tipoEntidad")}
            >
              <option value="">Selecciona una opción</option>
              <option value="Explotación ganadera">Explotación ganadera</option>
              <option value="Empresa agroganadera">Empresa agroganadera</option>
              <option value="Veterinaria / asesoría">Veterinaria / asesoría</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label
              htmlFor="tipoConsulta"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Tipo de consulta
            </label>
            <select
              id="tipoConsulta"
              name="tipoConsulta"
              value={formData.tipoConsulta}
              onChange={handleChange}
              style={inputStyle("tipoConsulta")}
            >
              <option value="">Selecciona una opción</option>
              <option value="Solicitar presupuesto">Solicitar presupuesto</option>
              <option value="Solicitar demo">Solicitar demo</option>
              <option value="Más información">Más información</option>
              <option value="Consulta técnica">Consulta técnica</option>
              <option value="Colaboración">Colaboración</option>
            </select>
            {errors.tipoConsulta && (
              <p style={{ marginTop: "6px", color: "#b33a3a", fontSize: "0.88rem" }}>
                {errors.tipoConsulta}
              </p>
            )}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label
              htmlFor="mensaje"
              style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Describe brevemente qué necesitas, el tipo de explotación o el objetivo de la consulta"
              style={{
                ...inputStyle("mensaje"),
                minHeight: "160px",
                resize: "vertical",
              }}
            />
            {errors.mensaje && (
              <p style={{ marginTop: "6px", color: "#b33a3a", fontSize: "0.88rem" }}>
                {errors.mensaje}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              gridColumn: "1 / -1",
              padding: "14px 18px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#3f6b4b",
              color: "#ffffff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Enviar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}

export default ContactPage;