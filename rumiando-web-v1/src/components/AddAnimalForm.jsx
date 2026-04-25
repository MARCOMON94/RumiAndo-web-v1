import { useEffect, useMemo, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";

const BASE_IMAGE_URL =
  "https://raw.githubusercontent.com/MARCOMON94/animals-api/main/";

const RACE_IMAGE_URLS = {
  Merina: BASE_IMAGE_URL + "merina.png",
  Manchega: BASE_IMAGE_URL + "manchega.png",
  Assaf: BASE_IMAGE_URL + "assaf.png",
  Latxa: BASE_IMAGE_URL + "latxa.png",
  Canaria: BASE_IMAGE_URL + "canaria.png",
  Majorera: BASE_IMAGE_URL + "majorera.png",
  "Murciano-Granadina": BASE_IMAGE_URL + "murcianogranadina.png",
  Malagueña: BASE_IMAGE_URL + "malaguena.png",
  Saanen: BASE_IMAGE_URL + "saanen.png",
  Florida: BASE_IMAGE_URL + "florida.png",
};

function AddAnimalForm() {
  const { addAnimal, speciesOptions, allAnimals } = useAnimals();

  const today = new Date().toISOString().split("T")[0];

  const [tipoAlta, setTipoAlta] = useState("Nacimiento");
  const [crotal, setCrotal] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaAlta, setFechaAlta] = useState(today);
  const [madreCrotal, setMadreCrotal] = useState("");
  const [padreCrotal, setPadreCrotal] = useState("");
  const [explotacionREGA, setExplotacionREGA] = useState("");
  const [destinoProductivo, setDestinoProductivo] = useState("");
  const [origen, setOrigen] = useState("Nacida en explotación");
  const [loteCorral, setLoteCorral] = useState("Lactación");
  const [ubicacion, setUbicacion] = useState("Lactación");
  const [observaciones, setObservaciones] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (tipoAlta === "Nacimiento") {
      setOrigen("Nacida en explotación");
      setLoteCorral("Lactación");
      setUbicacion("Lactación");
    } else {
      setOrigen("Compra externa");
      setLoteCorral("Reposición");
      setUbicacion("Reposición");
    }
  }, [tipoAlta]);

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

  const motherOptions = useMemo(() => {
    if (!especie) return [];

    return allAnimals.filter(
      (animal) =>
        animal.especie === especie &&
        animal.sexo === "Hembra" &&
        animal.estado === "Activa"
    );
  }, [allAnimals, especie]);

  const fatherOptions = useMemo(() => {
    if (!especie) return [];

    return allAnimals.filter(
      (animal) =>
        animal.especie === especie &&
        animal.sexo === "Macho" &&
        animal.estado === "Activa"
    );
  }, [allAnimals, especie]);

  const regaOptions = useMemo(() => {
    return [
      ...new Set(
        allAnimals
          .map((animal) => animal.explotacionREGA)
          .filter(Boolean)
      ),
    ];
  }, [allAnimals]);

  const corralOptions = useMemo(() => {
    return [
      ...new Set(
        allAnimals
          .map((animal) => animal.loteCorral)
          .filter(Boolean)
      ),
    ];
  }, [allAnimals]);

  const calculateAgeMonths = (birthDateString) => {
    if (!birthDateString) return 0;

    const currentDate = new Date();
    const birthDate = new Date(birthDateString);

    let months =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (currentDate.getMonth() - birthDate.getMonth());

    if (currentDate.getDate() < birthDate.getDate()) {
      months -= 1;
    }

    return Math.max(months, 0);
  };

  const ageTextFromMonths = (totalMonths) => {
    if (totalMonths < 12) {
      return `${totalMonths} meses`;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
      return years === 1 ? "1 año" : `${years} años`;
    }

    const yearText = years === 1 ? "año" : "años";
    const monthText = months === 1 ? "mes" : "meses";

    return `${years} ${yearText} y ${months} ${monthText}`;
  };

  const determineReproductiveState = (sexoAnimal, edadMeses) => {
    if (sexoAnimal === "Macho") {
      if (edadMeses < 10) return "No aplica";
      return "No reproductor";
    }

    if (edadMeses < 8) return "No aplica";
    return "Vacía";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (tipoAlta === "Nacimiento" && !madreCrotal.trim()) {
      setErrorMessage("Si el alta es por nacimiento, la madre es obligatoria.");
      return;
    }

    if (!crotal.trim() || !especie || !raza || !sexo || !fechaNacimiento || !fechaAlta) {
      setErrorMessage("Completa los campos obligatorios antes de guardar.");
      return;
    }

    const crotalExists = allAnimals.some(
      (animal) => animal.crotal?.toLowerCase() === crotal.trim().toLowerCase()
    );

    if (crotalExists) {
      setErrorMessage("Ya existe un animal con ese crotal.");
      return;
    }

    const edadMeses = calculateAgeMonths(fechaNacimiento);
    const edadTexto = ageTextFromMonths(edadMeses);
    const estadoReproductivo = determineReproductiveState(sexo, edadMeses);

    const newAnimal = {
      id:
        allAnimals.length > 0
          ? Math.max(...allAnimals.map((animal) => Number(animal.id) || 0)) + 1
          : 1,
      crotal: crotal.trim(),
      especie,
      raza,
      imagenRazaUrl: RACE_IMAGE_URLS[raza] || "",
      sexo,
      fechaNacimiento,
      edadMeses,
      edadTexto,
      madreCrotal: madreCrotal.trim() || null,
      padreCrotal: padreCrotal.trim() || null,
      explotacionREGA: explotacionREGA.trim() || "No definida",
      estado: "Activa",
      estadoSanitario: "Normal",
      loteCorral: loteCorral.trim() || "Reposición",
      ubicacion: ubicacion.trim() || loteCorral.trim() || "Reposición",
      observaciones: observaciones.trim() || "Sin observaciones",
      fechaAlta,
      fechaBaja: null,
      motivoBaja: null,
      identificacionOficial: crotal.trim(),
      origen: origen.trim() || (tipoAlta === "Nacimiento" ? "Nacida en explotación" : "Compra externa"),
      destinoProductivo: destinoProductivo || "Reposición",
      ultimaRevision: fechaAlta,
      estadoReproductivo,
      numeroParto: 0,
      fechaUltimoParto: null,
      numeroCrias: null,
      secado: false,
      cubricionInseminacion: null,
      registrosSanitarios: [],
      historialMovimientos: [],
    };

    addAnimal(newAnimal);

    setTipoAlta("Nacimiento");
    setCrotal("");
    setEspecie("");
    setRaza("");
    setSexo("");
    setFechaNacimiento("");
    setFechaAlta(today);
    setMadreCrotal("");
    setPadreCrotal("");
    setExplotacionREGA("");
    setDestinoProductivo("");
    setOrigen("Nacida en explotación");
    setLoteCorral("Lactación");
    setUbicacion("Lactación");
    setObservaciones("");
    setErrorMessage("");
  };

  return (
    <section
      style={{
        marginBottom: "24px",
        padding: "20px",
        border: "1px solid #d9d3c4",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "10px" }}>Añadir animal</h2>
      <p style={{ marginBottom: "18px" }}>
        Alta guiada para registrar nuevos animales en la demo.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
            Tipo de alta
          </label>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["Nacimiento", "Compra"].map((option) => {
              const isActive = tipoAlta === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTipoAlta(option)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: isActive ? "1px solid #3f6b4b" : "1px solid #d9d3c4",
                    backgroundColor: isActive ? "#3f6b4b" : "#ffffff",
                    color: isActive ? "#ffffff" : "#233127",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

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
            setMadreCrotal("");
            setPadreCrotal("");
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

        <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
          <option value="">Selecciona sexo</option>
          <option value="Hembra">Hembra</option>
          <option value="Macho">Macho</option>
        </select>

        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />

        <input
          type="date"
          value={fechaAlta}
          onChange={(e) => setFechaAlta(e.target.value)}
          required
        />

        <select
          value={explotacionREGA}
          onChange={(e) => setExplotacionREGA(e.target.value)}
          required
        >
          <option value="">Selecciona explotación REGA</option>
          {regaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={destinoProductivo}
          onChange={(e) => setDestinoProductivo(e.target.value)}
          required
        >
          <option value="">Destino productivo</option>
          <option value="Leche">Leche</option>
          <option value="Carne">Carne</option>
          <option value="Reproducción">Reproducción</option>
          <option value="Reposición">Reposición</option>
        </select>

        <input
          type="text"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          placeholder="Origen"
          required
        />

        <select
          value={loteCorral}
          onChange={(e) => {
            setLoteCorral(e.target.value);
            setUbicacion(e.target.value);
          }}
          required
        >
          <option value="">Selecciona corral / lote</option>
          {corralOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          {!corralOptions.includes("Lactación") && (
            <option value="Lactación">Lactación</option>
          )}
          {!corralOptions.includes("Reposición") && (
            <option value="Reposición">Reposición</option>
          )}
        </select>

        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          placeholder="Ubicación"
          required
        />

        <input
          type="text"
          list="madres-list"
          placeholder={tipoAlta === "Nacimiento" ? "Madre crotal (obligatorio)" : "Madre crotal"}
          value={madreCrotal}
          onChange={(e) => setMadreCrotal(e.target.value)}
          required={tipoAlta === "Nacimiento"}
        />
        <datalist id="madres-list">
          {motherOptions.map((animal) => (
            <option key={animal.id} value={animal.crotal} />
          ))}
        </datalist>

        <input
          type="text"
          list="padres-list"
          placeholder="Padre crotal (opcional)"
          value={padreCrotal}
          onChange={(e) => setPadreCrotal(e.target.value)}
        />
        <datalist id="padres-list">
          {fatherOptions.map((animal) => (
            <option key={animal.id} value={animal.crotal} />
          ))}
        </datalist>

        <textarea
          placeholder="Observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          style={{
            gridColumn: "1 / -1",
            minHeight: "110px",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #d9d3c4",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />

        {errorMessage && (
          <p
            style={{
              gridColumn: "1 / -1",
              margin: 0,
              color: "#b33a3a",
              fontWeight: 700,
            }}
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#3f6b4b",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Guardar animal
        </button>
      </form>
    </section>
  );
}

export default AddAnimalForm;