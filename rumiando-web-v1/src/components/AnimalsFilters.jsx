function AnimalsFilters({
  searchTerm,
  speciesFilter,
  breedFilter,
  stateFilter,
  corralFilter,
  sexFilter,
  healthFilter,
  reproductiveFilter,
  productiveFilter,
  itemsPerPage,
  setSearchTerm,
  setSpeciesFilter,
  setBreedFilter,
  setStateFilter,
  setCorralFilter,
  setSexFilter,
  setHealthFilter,
  setReproductiveFilter,
  setProductiveFilter,
  setItemsPerPage,
  speciesOptions,
  filteredBreedOptions,
  stateOptions,
  corralOptions,
  sexOptions,
  healthOptions,
  reproductiveOptions,
  productiveOptions,
  clearFilters,
}) {
  const selectStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
  };

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
        <label htmlFor="searchTerm" style={labelStyle}>
          Búsqueda
        </label>
        <input
          id="searchTerm"
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
        <label htmlFor="speciesFilter" style={labelStyle}>
          Especie
        </label>
        <select
          id="speciesFilter"
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          style={selectStyle}
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
        <label htmlFor="breedFilter" style={labelStyle}>
          Raza
        </label>
        <select
          id="breedFilter"
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          disabled={!speciesFilter}
          style={selectStyle}
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
        <label htmlFor="stateFilter" style={labelStyle}>
          Estado
        </label>
        <select
          id="stateFilter"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          style={selectStyle}
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
        <label htmlFor="corralFilter" style={labelStyle}>
          Corral
        </label>
        <select
          id="corralFilter"
          value={corralFilter}
          onChange={(e) => setCorralFilter(e.target.value)}
          style={selectStyle}
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
        <label htmlFor="sexFilter" style={labelStyle}>
          Sexo
        </label>
        <select
          id="sexFilter"
          value={sexFilter}
          onChange={(e) => setSexFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos</option>
          {sexOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="healthFilter" style={labelStyle}>
          Estado sanitario
        </label>
        <select
          id="healthFilter"
          value={healthFilter}
          onChange={(e) => setHealthFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos</option>
          {healthOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="reproductiveFilter" style={labelStyle}>
          Estado reproductivo
        </label>
        <select
          id="reproductiveFilter"
          value={reproductiveFilter}
          onChange={(e) => setReproductiveFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos</option>
          {reproductiveOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="productiveFilter" style={labelStyle}>
          Destino productivo
        </label>
        <select
          id="productiveFilter"
          value={productiveFilter}
          onChange={(e) => setProductiveFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos</option>
          {productiveOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="itemsPerPage" style={labelStyle}>
          Mostrar
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          style={selectStyle}
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