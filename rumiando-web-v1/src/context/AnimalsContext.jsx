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
  const [sexFilter, setSexFilter] = useState("");
  const [healthFilter, setHealthFilter] = useState("");
  const [reproductiveFilter, setReproductiveFilter] = useState("");
  const [productiveFilter, setProductiveFilter] = useState("");
  const [dryFilter, setDryFilter] = useState("");

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

  const handleSexFilterChange = (value) => {
    setSexFilter(value);
  };

  const handleHealthFilterChange = (value) => {
    setHealthFilter(value);
  };

  const handleReproductiveFilterChange = (value) => {
    setReproductiveFilter(value);
  };

  const handleProductiveFilterChange = (value) => {
    setProductiveFilter(value);
  };

  const handleDryFilterChange = (value) => {
    setDryFilter(value);
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
    setSexFilter("");
    setHealthFilter("");
    setReproductiveFilter("");
    setProductiveFilter("");
    setDryFilter("");
  };

  const getUniqueOptions = (field) => {
    return [...new Set(allAnimals.map((animal) => animal[field]).filter(Boolean))];
  };

  const speciesOptions = useMemo(() => getUniqueOptions("especie"), [allAnimals]);
  const breedOptions = useMemo(() => getUniqueOptions("raza"), [allAnimals]);
  const stateOptions = useMemo(() => getUniqueOptions("estado"), [allAnimals]);
  const corralOptions = useMemo(() => getUniqueOptions("loteCorral"), [allAnimals]);
  const sexOptions = useMemo(() => getUniqueOptions("sexo"), [allAnimals]);
  const healthOptions = useMemo(() => getUniqueOptions("estadoSanitario"), [allAnimals]);
  const reproductiveOptions = useMemo(
    () => getUniqueOptions("estadoReproductivo"),
    [allAnimals]
  );
  const productiveOptions = useMemo(
    () => getUniqueOptions("destinoProductivo"),
    [allAnimals]
  );

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

      const matchesSex =
        sexFilter === "" || animal.sexo === sexFilter;

      const matchesHealth =
        healthFilter === "" || animal.estadoSanitario === healthFilter;

      const matchesReproductive =
        reproductiveFilter === "" ||
        animal.estadoReproductivo === reproductiveFilter;

      const matchesProductive =
        productiveFilter === "" ||
        animal.destinoProductivo === productiveFilter;

      const matchesDry =
        dryFilter === "" ||
        (dryFilter === "Sí" && animal.secado === true) ||
        (dryFilter === "No" && animal.secado === false);

      return (
        matchesSearch &&
        matchesSpecies &&
        matchesBreed &&
        matchesState &&
        matchesCorral &&
        matchesSex &&
        matchesHealth &&
        matchesReproductive &&
        matchesProductive &&
        matchesDry
      );
    });
  }, [
    allAnimals,
    searchTerm,
    speciesFilter,
    breedFilter,
    stateFilter,
    corralFilter,
    sexFilter,
    healthFilter,
    reproductiveFilter,
    productiveFilter,
    dryFilter,
  ]);

  const visibleAnimals = useMemo(() => {
    return filteredAnimals.slice(0, itemsPerPage);
  }, [filteredAnimals, itemsPerPage]);

  const addAnimal = (newAnimal) => {
    setAllAnimals((prevAnimals) => [newAnimal, ...prevAnimals]);
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
    sexFilter,
    healthFilter,
    reproductiveFilter,
    productiveFilter,
    dryFilter,
    itemsPerPage,

    setSearchTerm: handleSearchChange,
    setSpeciesFilter: handleSpeciesFilterChange,
    setBreedFilter: handleBreedFilterChange,
    setStateFilter: handleStateFilterChange,
    setCorralFilter: handleCorralFilterChange,
    setSexFilter: handleSexFilterChange,
    setHealthFilter: handleHealthFilterChange,
    setReproductiveFilter: handleReproductiveFilterChange,
    setProductiveFilter: handleProductiveFilterChange,
    setDryFilter: handleDryFilterChange,
    setItemsPerPage: handleItemsPerPageChange,

    speciesOptions,
    breedOptions,
    filteredBreedOptions,
    stateOptions,
    corralOptions,
    sexOptions,
    healthOptions,
    reproductiveOptions,
    productiveOptions,

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