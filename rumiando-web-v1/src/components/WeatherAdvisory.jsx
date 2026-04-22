import { useWeather } from "../hooks/useWeather";

function WeatherAdvisory() {
  const { loading, error, locationName, today, tomorrow, recommendation } =
    useWeather();

  if (loading) {
    return (
      <section className="weather-section">
        <div className="weather-card">
          <p>Cargando previsión meteorológica...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-section">
        <div className="weather-card weather-card-error">
          <h2>Previsión meteorológica</h2>
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
            <span className="weather-kicker">Previsión operativa</span>
            <h2>{recommendation.title}</h2>
            <p className="weather-location">{locationName}</p>
          </div>
        </div>

        <p className="weather-recommendation">{recommendation.text}</p>

        <div className="weather-days-grid">
          <article className="weather-day">
            <h3>Hoy</h3>
            <p><strong>Estado:</strong> {today.weatherLabel}</p>
            <p><strong>Temperatura:</strong> {today.tempMin}°C - {today.tempMax}°C</p>
            <p><strong>Lluvia:</strong> {today.precipitationSum} mm</p>
            <p><strong>Prob. precipitación:</strong> {today.precipitationProbabilityMax}%</p>
            <p><strong>Viento máx.:</strong> {today.windSpeedMax} km/h</p>
          </article>

          <article className="weather-day">
            <h3>Mañana</h3>
            <p><strong>Estado:</strong> {tomorrow.weatherLabel}</p>
            <p><strong>Temperatura:</strong> {tomorrow.tempMin}°C - {tomorrow.tempMax}°C</p>
            <p><strong>Lluvia:</strong> {tomorrow.precipitationSum} mm</p>
            <p><strong>Prob. precipitación:</strong> {tomorrow.precipitationProbabilityMax}%</p>
            <p><strong>Viento máx.:</strong> {tomorrow.windSpeedMax} km/h</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WeatherAdvisory;