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
        <h1 style={{ marginBottom: "12px" }}>Animal no encontrado</h1>
        <p style={{ marginBottom: "16px" }}>
          No existe ningún animal con ese identificador.
        </p>
        <Link to="/censo" className="btn-secondary">
          Volver al censo
        </Link>
      </main>
    );
  }

  const motherAnimal = animal.madreCrotal
    ? allAnimals.find((item) => item.crotal === animal.madreCrotal)
    : null;

  const fatherAnimal = animal.padreCrotal
    ? allAnimals.find((item) => item.crotal === animal.padreCrotal)
    : null;

  const mainInfo = [
    { label: "Crotal", value: animal.crotal },
    { label: "Identificación oficial", value: animal.identificacionOficial },
    { label: "Especie", value: animal.especie },
    { label: "Raza", value: animal.raza },
    { label: "Sexo", value: animal.sexo },
    { label: "Fecha de nacimiento", value: animal.fechaNacimiento },
    { label: "Edad en meses", value: animal.edadMeses },
    { label: "Edad", value: animal.edadTexto },
    { label: "Explotación REGA", value: animal.explotacionREGA },
    { label: "Origen", value: animal.origen },
    { label: "Destino productivo", value: animal.destinoProductivo },
  ];

  const statusInfo = [
    { label: "Estado", value: animal.estado },
    { label: "Estado sanitario", value: animal.estadoSanitario },
    { label: "Lote / corral", value: animal.loteCorral },
    { label: "Ubicación", value: animal.ubicacion },
    { label: "Última revisión", value: animal.ultimaRevision },
    { label: "Fecha de alta", value: animal.fechaAlta },
    { label: "Fecha de baja", value: animal.fechaBaja || "No aplica" },
    { label: "Motivo de baja", value: animal.motivoBaja || "No aplica" },
    { label: "Observaciones", value: animal.observaciones || "Sin observaciones" },
  ];

  const reproductiveInfo = [
    { label: "Estado reproductivo", value: animal.estadoReproductivo },
    { label: "Número de parto", value: animal.numeroParto },
    { label: "Fecha último parto", value: animal.fechaUltimoParto || "No aplica" },
    { label: "Número de crías", value: animal.numeroCrias ?? "No aplica" },
    { label: "Secado", value: animal.secado ? "Sí" : "No" },
    {
      label: "Cubrición / inseminación",
      value: animal.cubricionInseminacion || "No aplica",
    },
  ];

  const renderInfoGrid = (title, items) => (
    <section
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #d9d3c4",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.45rem", marginBottom: "18px" }}>{title}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px 18px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              backgroundColor: "#f6f3eb",
              border: "1px solid #ebe4d4",
            }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#3f6b4b",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                margin: 0,
                color: "#233127",
                lineHeight: "1.5",
                wordBreak: "break-word",
              }}
            >
              {String(item.value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <main style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/censo" className="btn-secondary">
          ← Volver al censo
        </Link>
      </div>

      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#3f6b4b",
            marginBottom: "8px",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}
        >
          Ficha individual
        </p>

        <h1
          style={{
            marginBottom: "12px",
            lineHeight: "1.1",
            wordBreak: "break-word",
          }}
        >
          {animal.crotal}
        </h1>

        <p style={{ marginBottom: "18px" }}>
          {animal.especie} · {animal.raza} · {animal.estado}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "999px",
              backgroundColor: "#dbe8dc",
              color: "#233127",
              fontWeight: 700,
            }}
          >
            Estado sanitario: {animal.estadoSanitario}
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: "999px",
              backgroundColor: "#f6f3eb",
              color: "#233127",
              fontWeight: 700,
            }}
          >
            Corral: {animal.loteCorral}
          </div>
        </div>
      </section>

      {renderInfoGrid("Información general", mainInfo)}
      {renderInfoGrid("Estado y manejo", statusInfo)}
      {renderInfoGrid("Información reproductiva", reproductiveInfo)}

      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.45rem", marginBottom: "18px" }}>
          Relación familiar
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px 18px",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              backgroundColor: "#f6f3eb",
              border: "1px solid #ebe4d4",
            }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#3f6b4b",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Madre
            </p>

            {motherAnimal ? (
              <Link to={`/animal/${motherAnimal.id}`} className="btn-secondary">
                {motherAnimal.crotal}
              </Link>
            ) : (
              <p style={{ margin: 0, color: "#233127" }}>
                {animal.madreCrotal || "No disponible"}
              </p>
            )}
          </div>

          <div
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              backgroundColor: "#f6f3eb",
              border: "1px solid #ebe4d4",
            }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#3f6b4b",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Padre
            </p>

            {fatherAnimal ? (
              <Link to={`/animal/${fatherAnimal.id}`} className="btn-secondary">
                {fatherAnimal.crotal}
              </Link>
            ) : (
              <p style={{ margin: 0, color: "#233127" }}>
                {animal.padreCrotal || "No disponible"}
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.45rem", marginBottom: "18px" }}>
          Registros sanitarios
        </h2>

        {animal.registrosSanitarios && animal.registrosSanitarios.length > 0 ? (
          <div style={{ display: "grid", gap: "14px" }}>
            {animal.registrosSanitarios.map((registro, index) => (
              <div
                key={`${registro.tipo}-${registro.fecha}-${index}`}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: "#f6f3eb",
                  border: "1px solid #ebe4d4",
                }}
              >
                <p style={{ marginBottom: "6px" }}>
                  <strong>Tipo:</strong> {registro.tipo}
                </p>
                <p style={{ marginBottom: "6px" }}>
                  <strong>Fecha:</strong> {registro.fecha}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Descripción:</strong> {registro.descripcion}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay registros sanitarios disponibles.</p>
        )}
      </section>

      <section
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d9d3c4",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
        }}
      >
        <h2 style={{ fontSize: "1.45rem", marginBottom: "18px" }}>
          Historial de movimientos
        </h2>

        {animal.historialMovimientos && animal.historialMovimientos.length > 0 ? (
          <div style={{ display: "grid", gap: "14px" }}>
            {animal.historialMovimientos.map((movimiento, index) => (
              <div
                key={`${movimiento.tipo}-${movimiento.fecha}-${index}`}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: "#f6f3eb",
                  border: "1px solid #ebe4d4",
                }}
              >
                <p style={{ marginBottom: "6px" }}>
                  <strong>Fecha:</strong> {movimiento.fecha}
                </p>
                <p style={{ marginBottom: "6px" }}>
                  <strong>Tipo:</strong> {movimiento.tipo}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Descripción:</strong> {movimiento.descripcion}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay movimientos registrados.</p>
        )}
      </section>
    </main>
  );
}

export default AnimalDetailPage;