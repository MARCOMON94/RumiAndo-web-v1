import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, test, vi } from "vitest";
import ContactPage, { CONTACT_EMAIL } from "../pages/ContactPage";

function renderContactPage(initialEntry = "/contacto") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ContactPage />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactPage", () => {
  test("muestra el Gmail oficial y el formulario de contacto", () => {
    renderContactPage();

    expect(
      screen.getByRole("heading", { name: /Cuéntanos qué necesitas de RumiAndo/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: CONTACT_EMAIL })).toHaveAttribute(
      "href",
      `mailto:${CONTACT_EMAIL}`
    );

    expect(screen.getByLabelText(/Nombre \/ responsable/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de consulta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  test("muestra errores si se intenta enviar vacío", () => {
    renderContactPage();

    fireEvent.click(screen.getByRole("button", { name: /Abrir correo preparado/i }));

    expect(
      screen.getByText(/Introduce tu nombre o responsable de contacto/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Introduce un correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecciona el tipo de consulta/i)).toBeInTheDocument();
    expect(screen.getByText(/Escribe un breve mensaje/i)).toBeInTheDocument();
  });

  test("abre un mailto con los datos validados", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    renderContactPage();

    fireEvent.change(screen.getByLabelText(/Nombre \/ responsable/i), {
      target: { value: "Marco" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "marco@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Tipo de consulta/i), {
      target: { value: "Probar RumiAndo" },
    });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), {
      target: {
        value: "Quiero probar RumiAndo en una explotación caprina.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /Abrir correo preparado/i }));

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining(`mailto:${CONTACT_EMAIL}`),
      "_self"
    );
    expect(openSpy.mock.calls[0][0]).toContain("Solicitud%20RumiAndo");
    expect(
      screen.getByText(/Se ha preparado un correo para rumiando.app@gmail.com/i)
    ).toBeInTheDocument();
  });

  test("rellena el email si llega por query params", () => {
    renderContactPage("/contacto?email=test@rumiando.com");

    expect(screen.getByLabelText(/Correo electrónico/i)).toHaveValue("test@rumiando.com");
  });
});
