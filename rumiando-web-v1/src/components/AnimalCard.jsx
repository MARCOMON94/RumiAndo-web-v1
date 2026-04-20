function AnimalCard({ animal }) {
  return (
    <article>
      <img src={animal.imagenRazaUrl} alt={animal.raza} width="180" />
      <h2>{animal.crotal}</h2>
      <p>Especie: {animal.especie}</p>
      <p>Raza: {animal.raza}</p>
      <p>Sexo: {animal.sexo}</p>
      <p>Edad: {animal.edadTexto}</p>
      <p>Estado: {animal.estado}</p>
      <p>Corral: {animal.loteCorral}</p>
    </article>
  );
}

export default AnimalCard;