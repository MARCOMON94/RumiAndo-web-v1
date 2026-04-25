import { Link } from "react-router-dom";

function AnimalCard({ animal }) {
  return (
    <Link
      to={`/animal/${animal.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        className="animal-card"
        style={{
          cursor: "pointer",
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "18px",
          padding: "18px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "220px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={animal.imagenRazaUrl}
            alt={animal.raza}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>

        <p
          style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#3f6b4b",
            marginBottom: "8px",
            letterSpacing: "0.03em",
          }}
        >
          {animal.especie || "Sin especie"}
        </p>

        <h3
          style={{
            marginBottom: "10px",
            fontSize: "1.1rem",
            lineHeight: "1.25",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {animal.crotal}
        </h3>

        <p
  style={{
    lineHeight: "1.45",
    marginBottom: "6px",
  }}
>
  <strong>Raza:</strong> {animal.raza || "Sin raza"}
</p>

        <p style={{ minHeight: "32px", marginBottom: "6px" }}>
  <strong>Estado:</strong> {animal.estado || "Sin estado"}
</p>

<p style={{ minHeight: "32px", marginBottom: "0" }}>
  <strong>Corral:</strong> {animal.loteCorral || "Sin corral"}
</p>
      </article>
    </Link>
  );
}

export default AnimalCard;