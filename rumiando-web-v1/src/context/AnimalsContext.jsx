import { createContext, useEffect, useMemo, useState } from "react";

export const AnimalsContext = createContext();

const ANIMALS_URL =
  `https://cdn.jsdelivr.net/gh/MARCOMON94/animals-api@main/animals.json?t=${Date.now()}`;

const DEFAULT_ITEMS_PER_PAGE = 10;

export function AnimalsProvider({ children }) {
  const [allAnimals, setAllAnimals] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [corralFilter, setCorralFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(ANIMALS_URL);

        if (!response.ok) {
          throw new Error("Error al cargar los animales");
        }

        const data = await response.json();
        setAllAnimals(data.animals || []);
      } catch (err) {
        setError(err.message || "Ha ocurrido un error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSpeciesFilterChange = (value) => {
    setSpeciesFilter(value);
    setBreedFilter("");
  };

  const handleBreedFilterChange = (value) => {
    setBreedFilter(value);
  };

  const handleStateFilterChange = (value) => {
    setStateFilter(value);
  };

  const handleCorralFilterChange = (value) => {
    setCorralFilter(value);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSpeciesFilter("");
    setBreedFilter("");
    setStateFilter("");
    setCorralFilter("");
  };

  const speciesOptions = useMemo(() => {
    return [...new Set(allAnimals.map((animal) => animal.especie).filter(Boolean))];
  }, [allAnimals]);

  const breedOptions = useMemo(() => {
    return [...new Set(allAnimals.map((animal) => animal.raza).filter(Boolean))];
  }, [allAnimals]);

  const stateOptions = useMemo(() => {
    return [...new Set(allAnimals.map((animal) => animal.estado).filter(Boolean))];
  }, [allAnimals]);

  const corralOptions = useMemo(() => {
    return [...new Set(allAnimals.map((animal) => animal.loteCorral).filter(Boolean))];
  }, [allAnimals]);

  const filteredBreedOptions = useMemo(() => {
    if (!speciesFilter) return breedOptions;

    return [
      ...new Set(
        allAnimals
          .filter((animal) => animal.especie === speciesFilter)
          .map((animal) => animal.raza)
          .filter(Boolean)
      ),
    ];
  }, [allAnimals, speciesFilter, breedOptions]);

  const filteredAnimals = useMemo(() => {
    return allAnimals.filter((animal) => {
      const matchesSearch =
        animal.crotal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.especie?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecies =
        speciesFilter === "" || animal.especie === speciesFilter;

      const matchesBreed =
        breedFilter === "" || animal.raza === breedFilter;

      const matchesState =
        stateFilter === "" || animal.estado === stateFilter;

      const matchesCorral =
        corralFilter === "" || animal.loteCorral === corralFilter;

      return (
        matchesSearch &&
        matchesSpecies &&
        matchesBreed &&
        matchesState &&
        matchesCorral
      );
    });
  }, [
    allAnimals,
    searchTerm,
    speciesFilter,
    breedFilter,
    stateFilter,
    corralFilter,
  ]);

  const visibleAnimals = useMemo(() => {
    return filteredAnimals.slice(0, itemsPerPage);
  }, [filteredAnimals, itemsPerPage]);

  const addAnimal = (newAnimal) => {
    setAllAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
  };

  const value = {
    allAnimals,
    visibleAnimals,
    loading,
    error,

    searchTerm,
    speciesFilter,
    breedFilter,
    stateFilter,
    corralFilter,
    itemsPerPage,

    setSearchTerm: handleSearchChange,
    setSpeciesFilter: handleSpeciesFilterChange,
    setBreedFilter: handleBreedFilterChange,
    setStateFilter: handleStateFilterChange,
    setCorralFilter: handleCorralFilterChange,
    setItemsPerPage: handleItemsPerPageChange,

    speciesOptions,
    breedOptions,
    filteredBreedOptions,
    stateOptions,
    corralOptions,

    clearFilters,
    addAnimal,

    totalAnimals: allAnimals.length,
    totalFilteredAnimals: filteredAnimals.length,
  };

  return (
    <AnimalsContext.Provider value={value}>
      {children}
    </AnimalsContext.Provider>
  );
}