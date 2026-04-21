import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

function ContactPage() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");

    if (emailFromQuery) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromQuery,
      }));
    }
  }, [searchParams]);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === "fullName" && trimmedValue === "") {
      return "Por favor, completa el campo NOMBRE con tu nombre";
    }

    if (name === "email") {
      if (
        trimmedValue === "" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
      ) {
        return "Correo electrónico no válido";
      }
    }

    if (name === "phone" && trimmedValue === "") {
      return "Por favor, introduce tu número de teléfono";
    }

    if (name === "message" && trimmedValue === "") {
      return "";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);

      if (error !== null) {
        newErrors[name] = error;
      }
    });

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const liveError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: liveError === null ? undefined : liveError,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const blurError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: blurError === null ? undefined : blurError,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Formulario enviado:", {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    });

    alert("Formulario enviado correctamente");

    setFormData({
      ...initialState,
      email: searchParams.get("email") || "",
    });

    setErrors({});
  };

  return (
    <section className="contact-page">
      <h1>Contáctanos</h1>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group full-width">
          <label htmlFor="fullName">
            Nombre completo <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Introduce tu nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.fullName !== undefined ? "input-error" : ""}
          />
          {errors.fullName && (
            <p className="error-message">{errors.fullName}</p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Correo electrónico <span className="required-mark">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Introduce tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email !== undefined ? "input-error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Teléfono <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Introduce tu número de teléfono"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone !== undefined ? "input-error" : ""}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">
            Mensaje <span className="required-mark">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="8"
            placeholder="Escribe aquí tu mensaje..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message !== undefined ? "input-error" : ""}
          ></textarea>
          {errors.message && (
            <p className="error-message">{errors.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary submit-btn">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default ContactPage;