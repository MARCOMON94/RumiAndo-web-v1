import { Link } from "react-router-dom";

function AnimalCard({ animal }) {
  return (
    <Link
      to={`/animal/${animal.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <img
          src={animal.imagenRazaUrl}
          alt={animal.raza}
          width="180"
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <h2>{animal.crotal}</h2>
        <p>Especie: {animal.especie}</p>
        <p>Raza: {animal.raza}</p>
        <p>Sexo: {animal.sexo}</p>
        <p>Edad: {animal.edadTexto}</p>
        <p>Estado: {animal.estado}</p>
        <p>Corral: {animal.loteCorral}</p>
      </article>
    </Link>
  );
}

export default AnimalCard;