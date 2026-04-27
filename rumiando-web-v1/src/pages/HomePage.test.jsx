import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
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
  test("muestra el título principal", () => {
    renderHomePage();

    expect(
      screen.getByText(/Gestiona tu explotación con una visión más clara y útil/i)
    ).toBeInTheDocument();
  });

  test("muestra el botón de ver censo", () => {
    renderHomePage();

    expect(screen.getByRole("link", { name: /ver censo/i })).toBeInTheDocument();
  });
});