import { useParams, Link } from "react-router-dom";
import { useAnimals } from "../hooks/useAnimals";

function AnimalDetailPage() {
  const { id } = useParams();
  const { allAnimals, loading, error } = useAnimals();

  if (loading) return <p>Cargando animal...</p>;
  if (error) return <p>{error}</p>;

const animal = allAnimals.find((item) => String(item.id) === String(id));

  if (!animal) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Animal no encontrado</h1>
        <p>No existe ningún animal con ese identificador.</p>
        <Link to="/censo">Volver al censo</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <Link to="/censo">← Volver al censo</Link>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 420px) 1fr",
          gap: "24px",
          marginTop: "20px",
          alignItems: "start",
        }}
      >
        <div>
          <img
            src={animal.imagenRazaUrl}
            alt={animal.raza}
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <h1>{animal.crotal}</h1>
          <p><strong>Especie:</strong> {animal.especie}</p>
          <p><strong>Raza:</strong> {animal.raza}</p>
          <p><strong>Sexo:</strong> {animal.sexo}</p>
          <p><strong>Edad:</strong> {animal.edadTexto}</p>
          <p><strong>Estado:</strong> {animal.estado}</p>
          <p><strong>Corral:</strong> {animal.loteCorral}</p>
        </div>
      </section>
    </main>
  );
}

export default AnimalDetailPage;