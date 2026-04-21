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

  if (loading) return <p>Cargando animales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>Animales</h1>
      <p>Total de animales: {totalAnimals}</p>

      <section
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por crotal, especie o raza"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            minWidth: "260px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          style={{
            padding: "10px",
            minWidth: "180px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Todas las especies</option>
          <option value="Ovino">Ovino</option>
          <option value="Caprino">Caprino</option>
        </select>
      </section>

      <p>Mostrando {visibleAnimals.length} de {totalFilteredAnimals} animales filtrados</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {visibleAnimals.map((animal) => (
          <article
            key={animal.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={animal.imagenRazaUrl}
              alt={animal.raza}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h2 style={{ fontSize: "18px" }}>{animal.crotal}</h2>
            <p><strong>Especie:</strong> {animal.especie}</p>
            <p><strong>Raza:</strong> {animal.raza}</p>
          </article>
        ))}
      </div>

      {hasMore && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={loadMore}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default AnimalsPage;