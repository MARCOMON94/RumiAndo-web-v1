import { useMemo, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import AnimalCard from "../components/AnimalCard";
import AnimalsFilters from "../components/AnimalsFilters";
import AddAnimalForm from "../components/AddAnimalForm";

function AnimalsPage() {
  const [activeView, setActiveView] = useState("censo");

  const {
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
    totalAnimals,
    totalFilteredAnimals,
    allAnimals,
  } = useAnimals();

  const countByField = (items, field) => {
    return items.reduce((acc, item) => {
      const key =
        item[field] === null || item[field] === undefined || item[field] === ""
          ? "Sin dato"
          : String(item[field]);

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const chartData = useMemo(() => {
  return {
    species: countByField(allAnimals, "especie"),
    status: countByField(allAnimals, "estado"),
    healthStatus: countByField(allAnimals, "estadoSanitario"),
    sex: countByField(allAnimals, "sexo"),
    productiveDestination: countByField(allAnimals, "destinoProductivo"),
    reproductiveStatus: countByField(allAnimals, "estadoReproductivo"),
    origin: countByField(allAnimals, "origen"),
  };
}, [allAnimals]);

  const activeAnimals = useMemo(() => {
    return allAnimals.filter((animal) => animal.estado === "Activa").length;
  }, [allAnimals]);

  

  const withSanitaryRecords = useMemo(() => {
    return allAnimals.filter(
      (animal) =>
        Array.isArray(animal.registrosSanitarios) &&
        animal.registrosSanitarios.length > 0
    ).length;
  }, [allAnimals]);

  const withMovements = useMemo(() => {
    return allAnimals.filter(
      (animal) =>
        Array.isArray(animal.historialMovimientos) &&
        animal.historialMovimientos.length > 0
    ).length;
  }, [allAnimals]);

  const bornInFarmAnimals = useMemo(() => {
  return allAnimals.filter(
    (animal) => animal.origen === "Nacida en explotación"
  ).length;
}, [allAnimals]);


  const renderTabButton = (label, value) => {
    const isActive = activeView === value;

    return (
      <button
        type="button"
        onClick={() => setActiveView(value)}
        style={{
          padding: "12px 18px",
          borderRadius: "999px",
          border: isActive ? "1px solid #3f6b4b" : "1px solid #d9d3c4",
          backgroundColor: isActive ? "#3f6b4b" : "#ffffff",
          color: isActive ? "#ffffff" : "#233127",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  };

  const renderBarChartCard = (title, dataObject) => {
    const entries = Object.entries(dataObject).sort((a, b) => b[1] - a[1]);
    const maxValue = entries.length ? Math.max(...entries.map(([, value]) => value)) : 0;

    return (
      <article
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
        }}
      >
        <h3 style={{ marginBottom: "18px", fontSize: "1.2rem" }}>{title}</h3>

        {entries.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {entries.map(([label, value]) => {
              const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

              return (
                <div key={label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#233127",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        color: "#5f6f63",
                        fontWeight: 700,
                      }}
                    >
                      {value}
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      backgroundColor: "#edf2ed",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        backgroundColor: "#3f6b4b",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    );
  };

  const renderMetricCard = (title, value, subtitle) => (
    <article
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #d9d3c4",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
      }}
    >
      <p
        style={{
          fontSize: "0.86rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontWeight: 700,
          color: "#3f6b4b",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "#233127",
          marginBottom: "8px",
        }}
      >
        {value}
      </p>

      <p style={{ margin: 0 }}>{subtitle}</p>
    </article>
  );

  if (loading) return <p>Cargando animales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "10px" }}>Censo</h1>
        <p style={{ marginBottom: "18px" }}>
          Esta sección funciona como una demo para mostrar cómo podría organizarse
          el censo animal dentro de RumiAndo.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {renderTabButton("Censo", "censo")}
{renderTabButton("Añadir animal", "add")}
<button
  type="button"
  data-tab-trigger="charts"
  onClick={() => setActiveView("charts")}
  style={{
    padding: "12px 18px",
    borderRadius: "999px",
    border: activeView === "charts" ? "1px solid #3f6b4b" : "1px solid #d9d3c4",
    backgroundColor: activeView === "charts" ? "#3f6b4b" : "#ffffff",
    color: activeView === "charts" ? "#ffffff" : "#233127",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Gráficas
</button>
        </div>
      </div>

      {activeView === "censo" && (
        <>
          <div
            style={{
              marginBottom: "20px",
              padding: "18px 20px",
              backgroundColor: "#dbe8dc",
              border: "1px solid #c7d8c8",
              borderRadius: "18px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 28px",
            }}
          >
            <p style={{ margin: 0, color: "#233127" }}>
              <strong>Total de animales:</strong> {totalAnimals}
            </p>
            <p style={{ margin: 0, color: "#233127" }}>
              <strong>Mostrando:</strong> {visibleAnimals.length} de {totalFilteredAnimals}
            </p>
          </div>

          <AnimalsFilters
            searchTerm={searchTerm}
            speciesFilter={speciesFilter}
            breedFilter={breedFilter}
            stateFilter={stateFilter}
            corralFilter={corralFilter}
            sexFilter={sexFilter}
            healthFilter={healthFilter}
            reproductiveFilter={reproductiveFilter}
            productiveFilter={productiveFilter}
            
            itemsPerPage={itemsPerPage}
            setSearchTerm={setSearchTerm}
            setSpeciesFilter={setSpeciesFilter}
            setBreedFilter={setBreedFilter}
            setStateFilter={setStateFilter}
            setCorralFilter={setCorralFilter}
            setSexFilter={setSexFilter}
            setHealthFilter={setHealthFilter}
            setReproductiveFilter={setReproductiveFilter}
            setProductiveFilter={setProductiveFilter}
          
            setItemsPerPage={setItemsPerPage}
            speciesOptions={speciesOptions}
            filteredBreedOptions={filteredBreedOptions}
            stateOptions={stateOptions}
            corralOptions={corralOptions}
            sexOptions={sexOptions}
            healthOptions={healthOptions}
            reproductiveOptions={reproductiveOptions}
            productiveOptions={productiveOptions}
            clearFilters={clearFilters}
          />

          {visibleAnimals.length === 0 ? (
            <div
              style={{
                padding: "24px",
                borderRadius: "18px",
                backgroundColor: "#ffffff",
                border: "1px solid #d9d3c4",
              }}
            >
              <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                No hay resultados
              </h2>
              <p>
                No se han encontrado animales que coincidan con los filtros
                seleccionados.
              </p>
            </div>
          ) : (
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
          )}
        </>
      )}

      {activeView === "add" && (
        <section>
          <div
            style={{
              marginBottom: "18px",
              padding: "18px 20px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d3c4",
              borderRadius: "18px",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Alta de animal
            </h2>
            <p>
              Esta parte de la demo permite simular el registro de nuevos animales
              dentro del sistema.
            </p>
          </div>

          <AddAnimalForm />
        </section>
      )}

      {activeView === "charts" && (
        <section>
          <div
            style={{
              marginBottom: "18px",
              padding: "18px 20px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d3c4",
              borderRadius: "18px",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Gráficas y distribución
            </h2>
            <p>
              Esta vista muestra una demo de cómo podrían representarse algunos
              datos resumidos del censo a partir de la información actual.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {renderMetricCard(
              "Total de animales",
              totalAnimals,
              "Número total de registros cargados en la demo"
            )}

            {renderMetricCard(
              "Animales activos",
              activeAnimals,
              "Animales cuyo estado actual figura como Activa"
            )}

            {renderMetricCard(
              "Con registros sanitarios",
              withSanitaryRecords,
              "Animales con al menos una incidencia, revisión o actuación sanitaria"
            )}

            {renderMetricCard(
              "Con movimientos registrados",
              withMovements,
              "Animales con historial de entradas, cambios o reubicaciones"
            )}

            

            {renderMetricCard(
  "Nacidos en explotación",
  bornInFarmAnimals,
  "Animales cuyo origen figura como nacida/o en explotación"
)}


          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {renderBarChartCard("Distribución por especie", chartData.species)}
{renderBarChartCard("Distribución por estado", chartData.status)}
{renderBarChartCard(
  "Distribución por estado sanitario",
  chartData.healthStatus
)}
{renderBarChartCard("Distribución por sexo", chartData.sex)}
{renderBarChartCard(
  "Distribución por destino productivo",
  chartData.productiveDestination
)}
{renderBarChartCard(
  "Distribución por estado reproductivo",
  chartData.reproductiveStatus
)}
{renderBarChartCard("Distribución por origen", chartData.origin)}
          </div>
        </section>
      )}
    </main>
  );
}

export default AnimalsPage;