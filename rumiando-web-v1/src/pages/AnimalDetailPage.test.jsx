import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import AnimalDetailPage from "./AnimalDetailPage";

const mockUseAnimals = vi.fn();

vi.mock("../hooks/useAnimals", () => ({
  useAnimals: () => mockUseAnimals(),
}));

function renderAnimalDetail(initialRoute = "/animal/1") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/animal/:id" element={<AnimalDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AnimalDetailPage", () => {
  test("muestra los datos del animal cuando el id existe", () => {
    mockUseAnimals.mockReturnValue({
      allAnimals: [
        {
          id: 1,
          crotal: "ES3500000001",
          especie: "Caprino",
          raza: "Majorera",
          sexo: "Hembra",
          edadTexto: "2 años",
          estado: "Lactación",
          loteCorral: "Corral 1",
          imagenRazaUrl: "https://example.com/majorera.png",
        },
      ],
      loading: false,
      error: "",
    });

    renderAnimalDetail("/animal/1");

    expect(screen.getByText("ES3500000001")).toBeInTheDocument();
    expect(screen.getByText(/Caprino/i)).toBeInTheDocument();
    expect(screen.getByText(/Majorera/i)).toBeInTheDocument();
  });

  test("muestra mensaje de no encontrado cuando el id no existe", () => {
    mockUseAnimals.mockReturnValue({
      allAnimals: [
        {
          id: 1,
          crotal: "ES3500000001",
          especie: "Caprino",
          raza: "Majorera",
          sexo: "Hembra",
          edadTexto: "2 años",
          estado: "Lactación",
          loteCorral: "Corral 1",
          imagenRazaUrl: "https://example.com/majorera.png",
        },
      ],
      loading: false,
      error: "",
    });

    renderAnimalDetail("/animal/999");

    expect(screen.getByText(/Animal no encontrado/i)).toBeInTheDocument();
  });
});