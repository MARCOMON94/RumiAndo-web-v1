import { createContext, useEffect, useMemo, useState } from "react";

export const AnimalsContext = createContext();

const ANIMALS_URL =
  `https://cdn.jsdelivr.net/gh/MARCOMON94/animals-api@main/animals.json?t=${Date.now()}`;

const PAGE_SIZE = 10;

export function AnimalsProvider({ children }) {
  const [allAnimals, setAllAnimals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
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

  const filteredAnimals = useMemo(() => {
    return allAnimals.filter((animal) => {
      const matchesSearch =
        animal.crotal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.especie?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecies =
        speciesFilter === "" || animal.especie === speciesFilter;

      return matchesSearch && matchesSpecies;
    });
  }, [allAnimals, searchTerm, speciesFilter]);

  const visibleAnimals = useMemo(() => {
    return filteredAnimals.slice(0, visibleCount);
  }, [filteredAnimals, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const resetPagination = () => {
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    resetPagination();
  };

  const handleSpeciesFilterChange = (value) => {
    setSpeciesFilter(value);
    resetPagination();
  };

  const hasMore = visibleCount < filteredAnimals.length;

  const value = {
    allAnimals,
    visibleAnimals,
    filteredAnimals,
    loading,
    error,
    searchTerm,
    speciesFilter,
    setSearchTerm: handleSearchChange,
    setSpeciesFilter: handleSpeciesFilterChange,
    loadMore,
    hasMore,
    totalAnimals: allAnimals.length,
    totalFilteredAnimals: filteredAnimals.length,
  };

  return (
    <AnimalsContext.Provider value={value}>
      {children}
    </AnimalsContext.Provider>
  );
}