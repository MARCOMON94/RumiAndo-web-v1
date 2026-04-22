function AnimalsFilters({
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
}) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
        marginBottom: "20px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
      }}
    >
      <div style={{ gridColumn: "1 / -1" }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>Filtros</h2>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label style={{ display: "block", marginBottom: "6px" }}>Búsqueda</label>
        <input
          type="text"
          placeholder="Buscar por crotal, especie o raza"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px" }}>Especie</label>
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Todas</option>
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px" }}>Raza</label>
        <select
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          disabled={!speciesFilter}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Todas</option>
          {filteredBreedOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px" }}>Estado</label>
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Todos</option>
          {stateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px" }}>Corral</label>
        <select
          value={corralFilter}
          onChange={(e) => setCorralFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Todos</option>
          {corralOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "6px" }}>Mostrar</label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "end" }}>
        <button
          type="button"
          onClick={clearFilters}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}

export default AnimalsFilters;