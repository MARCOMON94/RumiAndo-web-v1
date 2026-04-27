import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";

function renderContactPage() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>
  );
}

describe("ContactPage", () => {
  test("muestra el formulario de contacto", () => {
    renderContactPage();

    expect(screen.getByRole("heading", { name: /contáctanos/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  test("muestra errores si se intenta enviar vacío", () => {
    renderContactPage();

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/Por favor, completa el campo NOMBRE con tu nombre/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Correo electrónico no válido/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Por favor, introduce tu número de teléfono/i)
    ).toBeInTheDocument();
  });
});