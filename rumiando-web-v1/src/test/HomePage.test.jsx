import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import HomePage from "../pages/HomePage";

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe("HomePage", () => {
  test("muestra la propuesta comercial principal", () => {
    renderHomePage();

    expect(
      screen.getByRole("heading", {
        name: /RumiAndo ordena el día a día de una explotación ovina o caprina/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /solicitar información/i })
    ).toHaveAttribute("href", "/contacto");
  });

  test("muestra funciones actuales de la app real", () => {
    renderHomePage();

    expect(screen.getByText(/Censo y ficha animal/i)).toBeInTheDocument();
    expect(screen.getByText(/Operaciones con lector/i)).toBeInTheDocument();
    expect(screen.getByText(/Estadísticas, Excel y leche/i)).toBeInTheDocument();
    expect(screen.getByText(/Asistente IA que abre flujos/i)).toBeInTheDocument();
  });

  test("muestra los placeholders de capturas sustituibles", () => {
    renderHomePage();

    expect(screen.getByAltText(/Placeholder para imagen de portada/i)).toHaveAttribute(
      "src",
      "/images/landing/landing-hero.png"
    );

    expect(screen.getByText(/Inicio de trabajo/i)).toBeInTheDocument();
    expect(screen.getByText(/Uso móvil en campo/i)).toBeInTheDocument();
  });
});
