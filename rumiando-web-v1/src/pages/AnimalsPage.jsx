import { useAnimals } from "../hooks/useAnimals";

function AnimalsPage() {
  const {
    visibleAnimals,
    loading,
    error,
    searchTerm,
    speciesFilter,
    setSearchTerm,
    setSpeciesFilter,
    loadMore,
    hasMore,
    totalAnimals,
    totalFilteredAnimals,
  } = useAnimals();

  if (loading) return <section className="page-section"><p>Cargando animales...</p></section>;
  if (error) return <section className="page-section"><p>{error}</p></section>;

  return (
    <section className="page-section">
      <div className="section-heading">
        <h1>Censo</h1>
        <p>
          Vista actual del censo animal con búsqueda, filtro por especie y
          paginación.
        </p>
      </div>

      <div className="animals-summary">
        <p><strong>Total de animales:</strong> {totalAnimals}</p>
        <p>
          <strong>Mostrando:</strong> {visibleAnimals.length} de {totalFilteredAnimals}
        </p>
      </div>

      <section className="animals-filters">
        <input
          type="text"
          placeholder="Buscar por crotal, especie o raza"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">Todas las especies</option>
          <option value="Ovino">Ovino</option>
          <option value="Caprino">Caprino</option>
        </select>
      </section>

      <div className="animals-grid">
        {visibleAnimals.map((animal) => (
          <article key={animal.id} className="animal-card">
            <img src={animal.imagenRazaUrl} alt={animal.raza} />
            <h3>{animal.crotal}</h3>
            <p><strong>Especie:</strong> {animal.especie}</p>
            <p><strong>Raza:</strong> {animal.raza}</p>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button onClick={loadMore} className="btn-primary">
            Cargar más
          </button>
        </div>
      )}
    </section>
  );
}

export default AnimalsPage;