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

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please, complete the field NAME with your name";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write your message";
    }

    return newErrors;
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Contact form submitted:", formData);
    alert("Form submitted successfully!");

    setFormData((prev) => ({
      ...initialState,
      email: searchParams.get("email") || "",
    }));
    setErrors({});
  };

  return (
    <section className="contact-page">
      <h1>Contáctanos</h1>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group full-width">
          <label htmlFor="fullName">
            Full Name <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "input-error" : ""}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required-mark">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">
            Message <span className="required-mark">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="8"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}
          ></textarea>
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <button type="submit" className="btn-primary submit-btn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default ContactPage;