import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AnimalsFilters from "./AnimalsFilters";

describe("AnimalsFilters", () => {
  const defaultProps = {
    searchTerm: "",
    speciesFilter: "",
    breedFilter: "",
    stateFilter: "",
    corralFilter: "",
    sexFilter: "",
    healthFilter: "",
    reproductiveFilter: "",
    productiveFilter: "",
    itemsPerPage: 10,

    setSearchTerm: vi.fn(),
    setSpeciesFilter: vi.fn(),
    setBreedFilter: vi.fn(),
    setStateFilter: vi.fn(),
    setCorralFilter: vi.fn(),
    setSexFilter: vi.fn(),
    setHealthFilter: vi.fn(),
    setReproductiveFilter: vi.fn(),
    setProductiveFilter: vi.fn(),
    setItemsPerPage: vi.fn(),

    speciesOptions: ["Ovino", "Caprino"],
    filteredBreedOptions: ["Merina", "Majorera"],
    stateOptions: ["Activa", "Baja"],
    corralOptions: ["Lactación", "Reposición"],
    sexOptions: ["Hembra", "Macho"],
    healthOptions: ["Normal", "En tratamiento"],
    reproductiveOptions: ["No aplica", "Vacía", "Lactante"],
    productiveOptions: ["Leche", "Carne", "Reposición"],

    clearFilters: vi.fn(),
  };

  test("llama a setSpeciesFilter cuando cambia la especie", () => {
    render(<AnimalsFilters {...defaultProps} />);

    const speciesSelect = screen.getByLabelText(/especie/i);
    fireEvent.change(speciesSelect, { target: { value: "Caprino" } });

    expect(defaultProps.setSpeciesFilter).toHaveBeenCalledWith("Caprino");
  });

  test("llama a setProductiveFilter cuando cambia el destino productivo", () => {
    render(<AnimalsFilters {...defaultProps} />);

    const productiveSelect = screen.getByLabelText(/destino productivo/i);
    fireEvent.change(productiveSelect, { target: { value: "Carne" } });

    expect(defaultProps.setProductiveFilter).toHaveBeenCalledWith("Carne");
  });

  test("llama a clearFilters al pulsar limpiar filtros", () => {
    render(<AnimalsFilters {...defaultProps} />);

    const clearButton = screen.getByRole("button", {
      name: /limpiar filtros/i,
    });

    fireEvent.click(clearButton);

    expect(defaultProps.clearFilters).toHaveBeenCalled();
  });
});