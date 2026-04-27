import { useWeather } from "../hooks/useWeather";

function WeatherAdvisory() {
  const { loading, error, locationName, today, tomorrow, recommendation } =
    useWeather();

  if (loading) {
    return (
      <section className="weather-section section-container">
        <div className="weather-card">
          <p>Cargando demo de datos externos aplicados al manejo...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-section section-container">
        <div className="weather-card weather-card-error">
          <span className="weather-kicker">Datos externos aplicados a la demo</span>
          <h2>Sugerencias apoyadas en previsión meteorológica</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!today || !tomorrow || !recommendation) return null;

  return (
    <section className="weather-section section-container">
      <div className={`weather-card weather-card-${recommendation.level}`}>
        <div className="weather-card-layout">
          <div className="weather-card-heading">
            <span className="weather-kicker">Datos externos aplicados a la demo</span>
            <h2>Sugerencias apoyadas en previsión meteorológica</h2>
            <p className="weather-location">{locationName}</p>
          </div>

          <p className="weather-recommendation">
            Esta sección muestra un ejemplo de cómo RumiAndo podría interpretar
            datos meteorológicos en tiempo real para ofrecer sugerencias simples
            de apoyo al manejo dentro de una demo funcional.
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
      </div>
    </section>
  );
}

export default WeatherAdvisory;