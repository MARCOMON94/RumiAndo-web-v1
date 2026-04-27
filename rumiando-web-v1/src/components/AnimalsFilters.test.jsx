import { render, screen, fireEvent } from "@testing-library/react";
import AnimalsFilters from "./AnimalsFilters";
import { vi } from "vitest";

describe("AnimalsFilters", () => {
  test("llama a setSpeciesFilter cuando cambia la especie", () => {
    const setSearchTerm = vi.fn();
    const setSpeciesFilter = vi.fn();
    const setBreedFilter = vi.fn();
    const setStateFilter = vi.fn();
    const setCorralFilter = vi.fn();
    const setItemsPerPage = vi.fn();
    const clearFilters = vi.fn();

    render(
      <AnimalsFilters
        searchTerm=""
        speciesFilter=""
        breedFilter=""
        stateFilter=""
        corralFilter=""
        itemsPerPage={10}
        setSearchTerm={setSearchTerm}
        setSpeciesFilter={setSpeciesFilter}
        setBreedFilter={setBreedFilter}
        setStateFilter={setStateFilter}
        setCorralFilter={setCorralFilter}
        setItemsPerPage={setItemsPerPage}
        speciesOptions={["Ovino", "Caprino"]}
        filteredBreedOptions={[]}
        stateOptions={["Lactación", "Seca"]}
        corralOptions={["Corral 1", "Corral 2"]}
        clearFilters={clearFilters}
      />
    );

    const speciesSelect = screen.getByLabelText(/Especie/i);
    fireEvent.change(speciesSelect, { target: { value: "Caprino" } });

    expect(setSpeciesFilter).toHaveBeenCalledWith("Caprino");
  });

  test("llama a clearFilters al pulsar el botón limpiar filtros", () => {
    const setSearchTerm = vi.fn();
    const setSpeciesFilter = vi.fn();
    const setBreedFilter = vi.fn();
    const setStateFilter = vi.fn();
    const setCorralFilter = vi.fn();
    const setItemsPerPage = vi.fn();
    const clearFilters = vi.fn();

    render(
      <AnimalsFilters
        searchTerm=""
        speciesFilter=""
        breedFilter=""
        stateFilter=""
        corralFilter=""
        itemsPerPage={10}
        setSearchTerm={setSearchTerm}
        setSpeciesFilter={setSpeciesFilter}
        setBreedFilter={setBreedFilter}
        setStateFilter={setStateFilter}
        setCorralFilter={setCorralFilter}
        setItemsPerPage={setItemsPerPage}
        speciesOptions={["Ovino", "Caprino"]}
        filteredBreedOptions={[]}
        stateOptions={["Lactación", "Seca"]}
        corralOptions={["Corral 1", "Corral 2"]}
        clearFilters={clearFilters}
      />
    );

    const clearButton = screen.getByRole("button", { name: /limpiar filtros/i });
    fireEvent.click(clearButton);

    expect(clearFilters).toHaveBeenCalled();
  });
});