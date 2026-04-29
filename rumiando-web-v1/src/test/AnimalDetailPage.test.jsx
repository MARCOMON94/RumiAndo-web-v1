import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import AnimalDetailPage from "../pages/AnimalDetailPage";

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
          fechaNacimiento: "2024-10-17",
          edadMeses: 18,
          edadTexto: "1 año y 6 meses",
          madreCrotal: "ES3500000675",
          padreCrotal: "ES3500000705",
          explotacionREGA: "ES350230000004",
          estado: "Activa",
          estadoSanitario: "Normal",
          loteCorral: "Reposición",
          ubicacion: "Reposición",
          observaciones: "Buen estado general",
          fechaAlta: "2025-01-20",
          fechaBaja: null,
          motivoBaja: null,
          identificacionOficial: "ES3500000001",
          origen: "Nacida en explotación",
          destinoProductivo: "Carne",
          ultimaRevision: "2025-08-09",
          estadoReproductivo: "No aplica",
          numeroParto: 0,
          fechaUltimoParto: null,
          numeroCrias: null,
          secado: false,
          cubricionInseminacion: null,
          registrosSanitarios: [],
          historialMovimientos: [],
        },
      ],
      loading: false,
      error: "",
    });

    renderAnimalDetail("/animal/1");

    expect(
      screen.getByRole("heading", { name: "ES3500000001" })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/caprino/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/majorera/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/reposición/i).length).toBeGreaterThan(0);
  });

  test("muestra enlaces de madre y padre cuando existen en el dataset", () => {
    mockUseAnimals.mockReturnValue({
      allAnimals: [
        {
          id: 1,
          crotal: "ES3500000001",
          especie: "Caprino",
          raza: "Majorera",
          sexo: "Hembra",
          fechaNacimiento: "2024-10-17",
          edadMeses: 18,
          edadTexto: "1 año y 6 meses",
          madreCrotal: "ES3500000675",
          padreCrotal: "ES3500000705",
          explotacionREGA: "ES350230000004",
          estado: "Activa",
          estadoSanitario: "Normal",
          loteCorral: "Reposición",
          ubicacion: "Reposición",
          observaciones: "Buen estado general",
          fechaAlta: "2025-01-20",
          fechaBaja: null,
          motivoBaja: null,
          identificacionOficial: "ES3500000001",
          origen: "Nacida en explotación",
          destinoProductivo: "Carne",
          ultimaRevision: "2025-08-09",
          estadoReproductivo: "No aplica",
          numeroParto: 0,
          fechaUltimoParto: null,
          numeroCrias: null,
          secado: false,
          cubricionInseminacion: null,
          registrosSanitarios: [],
          historialMovimientos: [],
        },
        {
          id: 2,
          crotal: "ES3500000675",
          especie: "Caprino",
          raza: "Majorera",
          sexo: "Hembra",
          estado: "Activa",
        },
        {
          id: 3,
          crotal: "ES3500000705",
          especie: "Caprino",
          raza: "Majorera",
          sexo: "Macho",
          estado: "Activa",
        },
      ],
      loading: false,
      error: "",
    });

    renderAnimalDetail("/animal/1");

    expect(
      screen.getByRole("link", { name: /ES3500000675/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /ES3500000705/i })
    ).toBeInTheDocument();
  });

  test("muestra mensaje de no encontrado cuando el id no existe", () => {
    mockUseAnimals.mockReturnValue({
      allAnimals: [
        {
          id: 1,
          crotal: "ES3500000001",
          especie: "Caprino",
          raza: "Majorera",
        },
      ],
      loading: false,
      error: "",
    });

    renderAnimalDetail("/animal/999");

    expect(screen.getByText(/animal no encontrado/i)).toBeInTheDocument();
  });
});