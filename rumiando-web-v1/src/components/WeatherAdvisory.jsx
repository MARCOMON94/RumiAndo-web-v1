import { useWeather } from "../hooks/useWeather";

function WeatherAdvisory() {
  const { loading, error, locationName, today, tomorrow, recommendation } =
    useWeather();

  if (loading) {
    return (
      <section className="weather-section">
        <div className="weather-card">
          <p>Cargando demo de sugerencias meteorológicas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-section">
        <div className="weather-card weather-card-error">
          <span className="weather-kicker">Datos externos en tiempo real</span>
          <h2>Demo de sugerencias meteorológicas</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!today || !tomorrow || !recommendation) return null;

  return (
    <section className="weather-section">
      <div className={`weather-card weather-card-${recommendation.level}`}>
        <div className="weather-card-header">
          <div>
            <span className="weather-kicker">Datos externos en tiempo real</span>
            <h2>Ejemplo de sugerencias apoyadas en previsión meteorológica</h2>
            <p className="weather-location">{locationName}</p>
          </div>
        </div>

        <p className="weather-recommendation">
          Esta sección muestra una demo de cómo RumiAndo podría interpretar
          datos meteorológicos para generar sugerencias útiles de manejo.
        </p>

        <div className="weather-highlight">
          <h3>{recommendation.title}</h3>
          <p>{recommendation.text}</p>
        </div>

        <div className="weather-days-grid">
          <article className="weather-day">
            <h3>Hoy</h3>
            <p>
              <strong>Estado:</strong> {today.weatherLabel}
            </p>
            <p>
              <strong>Temperatura:</strong> {today.tempMin}°C - {today.tempMax}°C
            </p>
            <p>
              <strong>Lluvia:</strong> {today.precipitationSum} mm
            </p>
            <p>
              <strong>Viento:</strong> {today.windSpeedMax} km/h
            </p>
          </article>

          <article className="weather-day">
            <h3>Mañana</h3>
            <p>
              <strong>Estado:</strong> {tomorrow.weatherLabel}
            </p>
            <p>
              <strong>Temperatura:</strong> {tomorrow.tempMin}°C - {tomorrow.tempMax}°C
            </p>
            <p>
              <strong>Lluvia:</strong> {tomorrow.precipitationSum} mm
            </p>
            <p>
              <strong>Viento:</strong> {tomorrow.windSpeedMax} km/h
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WeatherAdvisory;