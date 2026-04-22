import { useMemo, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";

function AddAnimalForm() {
  const { addAnimal, speciesOptions, allAnimals } = useAnimals();

  const [crotal, setCrotal] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [edadTexto, setEdadTexto] = useState("");
  const [estado, setEstado] = useState("");
  const [loteCorral, setLoteCorral] = useState("");
  const [imagenRazaUrl, setImagenRazaUrl] = useState("");

  const availableBreeds = useMemo(() => {
    if (!especie) return [];

    return [
      ...new Set(
        allAnimals
          .filter((animal) => animal.especie === especie)
          .map((animal) => animal.raza)
          .filter(Boolean)
      ),
    ];
  }, [allAnimals, especie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnimal = {
      id: crypto.randomUUID(),
      crotal,
      especie,
      raza,
      sexo,
      edadTexto,
      estado,
      loteCorral,
      imagenRazaUrl,
    };

    addAnimal(newAnimal);

    setCrotal("");
    setEspecie("");
    setRaza("");
    setSexo("");
    setEdadTexto("");
    setEstado("");
    setLoteCorral("");
    setImagenRazaUrl("");
  };

  return (
    <section
      style={{
        marginBottom: "24px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Añadir animal</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Crotal"
          value={crotal}
          onChange={(e) => setCrotal(e.target.value)}
          required
        />

        <select
          value={especie}
          onChange={(e) => {
            setEspecie(e.target.value);
            setRaza("");
          }}
          required
        >
          <option value="">Selecciona especie</option>
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={raza}
          onChange={(e) => setRaza(e.target.value)}
          required
          disabled={!especie}
        >
          <option value="">Selecciona raza</option>
          {availableBreeds.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Edad"
          value={edadTexto}
          onChange={(e) => setEdadTexto(e.target.value)}
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        <input
          type="text"
          placeholder="Corral / lote"
          value={loteCorral}
          onChange={(e) => setLoteCorral(e.target.value)}
        />

        <input
          type="url"
          placeholder="URL imagen raza"
          value={imagenRazaUrl}
          onChange={(e) => setImagenRazaUrl(e.target.value)}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Añadir animal
        </button>
      </form>
    </section>
  );
}

export default AddAnimalForm;