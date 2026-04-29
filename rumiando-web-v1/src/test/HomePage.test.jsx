import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { vi } from "vitest";

vi.mock("../components/WeatherAdvisory", () => ({
  default: () => <div>Weather mock</div>,
}));

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe("HomePage", () => {
  test("muestra el título principal actual", () => {
    renderHomePage();

    expect(
      screen.getByRole("heading", {
        name: /RumiAndo, una forma más clara de organizar tu explotación/i,
      })
    ).toBeInTheDocument();
  });

  test("muestra el enlace de demo del censo", () => {
    renderHomePage();

    expect(
      screen.getByRole("link", { name: /ver demo del censo/i })
    ).toBeInTheDocument();
  });

  test("muestra el bloque de newsletter con el botón continuar", () => {
    renderHomePage();

    expect(
      screen.getByPlaceholderText(/introduce tu email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /continuar/i })
    ).toBeInTheDocument();
  });
});