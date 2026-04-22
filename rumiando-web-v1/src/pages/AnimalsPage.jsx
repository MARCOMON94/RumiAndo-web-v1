import { useAnimals } from "../hooks/useAnimals";
import AnimalCard from "../components/AnimalCard";
import AnimalsFilters from "../components/AnimalsFilters";
import AddAnimalForm from "../components/AddAnimalForm";

function AnimalsPage() {
  const {
    visibleAnimals,
    loading,
    error,

    searchTerm,
    speciesFilter,
    breedFilter,
    stateFilter,
    corralFilter,
    itemsPerPage,

    setSearchTerm,
    setSpeciesFilter,
    setBreedFilter,
    setStateFilter,
    setCorralFilter,
    setItemsPerPage,

    speciesOptions,
    filteredBreedOptions,
    stateOptions,
    corralOptions,

    clearFilters,
    totalAnimals,
    totalFilteredAnimals,
  } = useAnimals();

  if (loading) return <p>Cargando animales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>Animales</h1>
      <p>Total de animales: {totalAnimals}</p>

      <AddAnimalForm />

      <AnimalsFilters
        searchTerm={searchTerm}
        speciesFilter={speciesFilter}
        breedFilter={breedFilter}
        stateFilter={stateFilter}
        corralFilter={corralFilter}
        itemsPerPage={itemsPerPage}
        setSearchTerm={setSearchTerm}
        setSpeciesFilter={setSpeciesFilter}
        setBreedFilter={setBreedFilter}
        setStateFilter={setStateFilter}
        setCorralFilter={setCorralFilter}
        setItemsPerPage={setItemsPerPage}
        speciesOptions={speciesOptions}
        filteredBreedOptions={filteredBreedOptions}
        stateOptions={stateOptions}
        corralOptions={corralOptions}
        clearFilters={clearFilters}
      />

      <p>
        Mostrando {visibleAnimals.length} de {totalFilteredAnimals} animales filtrados
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {visibleAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </main>
  );
}

export default AnimalsPage;