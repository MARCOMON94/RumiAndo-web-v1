import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "../pages/ContactPage";

function renderContactPage(initialEntry = "/contacto") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ContactPage />
    </MemoryRouter>
  );
}
 
describe("ContactPage", () => {
  test("muestra el formulario de contacto actualizado", () => {
    renderContactPage();

    expect(
      screen.getByRole("heading", { name: /solicitar información/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/nombre \/ responsable/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/correo electrónico/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/tipo de consulta/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  test("muestra errores si se intenta enviar vacío", () => {
    renderContactPage();

    fireEvent.click(
      screen.getByRole("button", { name: /enviar solicitud/i })
    );

    expect(
      screen.getByText(/introduce tu nombre o responsable de contacto/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/introduce un correo electrónico/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/selecciona el tipo de consulta/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/escribe un breve mensaje/i)
    ).toBeInTheDocument();
  });

  test("envía correctamente el formulario y muestra mensaje de éxito", () => {
    renderContactPage();

    fireEvent.change(screen.getByLabelText(/nombre \/ responsable/i), {
      target: { value: "Marco" },
    });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "marco@email.com" },
    });

    fireEvent.change(screen.getByLabelText(/tipo de consulta/i), {
      target: { value: "Solicitar demo" },
    });

    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: {
        value: "Quiero más información sobre la demo para una explotación.",
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /enviar solicitud/i })
    );

    expect(
      screen.getByText(/solicitud registrada en la demo/i)
    ).toBeInTheDocument();
  });

  test("rellena el email si llega por query params", () => {
    renderContactPage("/contacto?email=test@demo.com");

    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue(
      "test@demo.com"
    );
  });
});