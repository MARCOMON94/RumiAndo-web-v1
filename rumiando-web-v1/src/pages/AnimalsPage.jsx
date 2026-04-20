import { useEffect, useState } from "react";

function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(
  "https://raw.githubusercontent.com/MARCOMON94/animals-api/refs/heads/main/animals.json"
);

        if (!response.ok) {
          throw new Error("Error al cargar los animales");
        }

        const data = await response.json();
        setAnimals(data.animals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const visibleAnimals = animals.slice(0, visibleCount);

  if (loading) return <p>Cargando animales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>Animales</h1>
      <p>Total de animales: {animals.length}</p>

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
              style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h2 style={{ fontSize: "18px" }}>{animal.crotal}</h2>
            <p><strong>Especie:</strong> {animal.especie}</p>
            <p><strong>Raza:</strong> {animal.raza}</p>
          </article>
        ))}
      </div>

      {visibleCount < animals.length && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={() => setVisibleCount((prev) => prev + 10)}>
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default AnimalsPage;