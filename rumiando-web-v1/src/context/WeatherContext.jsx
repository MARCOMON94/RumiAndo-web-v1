import { createContext, useEffect, useMemo, useState } from "react";

export const WeatherContext = createContext();

const LAT = import.meta.env.VITE_WEATHER_LAT;
const LON = import.meta.env.VITE_WEATHER_LON;
const LOCATION_NAME =
  import.meta.env.VITE_WEATHER_LOCATION_NAME || "Tu explotación";

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}` +
  `&longitude=${LON}` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max` +
  `&timezone=auto` +
  `&forecast_days=2`;

function getWeatherLabel(code) {
  if (code === 0) return "cielo despejado";
  if ([1, 2, 3].includes(code)) return "nubosidad variable";
  if ([45, 48].includes(code)) return "niebla";
  if ([51, 53, 55, 56, 57].includes(code)) return "lloviznas";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "lluvia";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "nieve";
  if ([95, 96, 99].includes(code)) return "tormenta";
  return "condiciones variables";
}

function buildDayData(daily, index) {
  return {
    date: daily.time?.[index] ?? "",
    weatherCode: daily.weather_code?.[index] ?? null,
    weatherLabel: getWeatherLabel(daily.weather_code?.[index] ?? null),
    tempMax: daily.temperature_2m_max?.[index] ?? null,
    tempMin: daily.temperature_2m_min?.[index] ?? null,
    precipitationSum: daily.precipitation_sum?.[index] ?? null,
    precipitationProbabilityMax:
      daily.precipitation_probability_max?.[index] ?? null,
    windSpeedMax: daily.wind_speed_10m_max?.[index] ?? null,
  };
}

function isGoodWorkDay(day) {
  if (!day) return false;

  const noRain = (day.precipitationSum ?? 0) < 1;
  const lowRainRisk = (day.precipitationProbabilityMax ?? 0) < 35;
  const mildTemp = (day.tempMax ?? 99) >= 12 && (day.tempMax ?? 99) <= 26;
  const acceptableWind = (day.windSpeedMax ?? 999) < 30;
  const noStorm = ![95, 96, 99].includes(day.weatherCode);
  const noSnow = ![71, 73, 75, 77, 85, 86].includes(day.weatherCode);

  return noRain && lowRainRisk && mildTemp && acceptableWind && noStorm && noSnow;
}

function buildRecommendation(today, tomorrow) {
  const todayGood = isGoodWorkDay(today);
  const tomorrowGood = isGoodWorkDay(tomorrow);

  if (todayGood && tomorrowGood) {
    return {
      level: "good",
      title: "Buen momento para trabajos adicionales",
      text: `Hoy y mañana se prevén condiciones bastante favorables en ${LOCATION_NAME}. Hoy esperamos ${today.weatherLabel}, entre ${today.tempMin}°C y ${today.tempMax}°C, con baja probabilidad de lluvia.`,
    };
  }

  if (todayGood && !tomorrowGood) {
    return {
      level: "warning",
      title: "Conviene adelantar trabajo a hoy",
      text: `Hoy se recomienda aprovechar para trabajos adicionales. Mañana se prevé ${tomorrow.weatherLabel}, con una probabilidad de precipitación de ${tomorrow.precipitationProbabilityMax}% y hasta ${tomorrow.precipitationSum} mm de lluvia.`,
    };
  }

  if (!todayGood && tomorrowGood) {
    return {
      level: "neutral",
      title: "Hoy no acompaña tanto, mañana pinta mejor",
      text: `Para hoy no se recomiendan tareas extra exigentes. Mañana mejora la previsión con ${tomorrow.weatherLabel}, temperaturas entre ${tomorrow.tempMin}°C y ${tomorrow.tempMax}°C y menor riesgo meteorológico.`,
    };
  }

  return {
    level: "bad",
    title: "Condiciones poco favorables",
    text: `Hoy no se recomiendan trabajos adicionales. Para mañana tampoco se espera una mejora clara: ${tomorrow.weatherLabel}, probabilidad de precipitación del ${tomorrow.precipitationProbabilityMax}% y ${tomorrow.precipitationSum} mm previstos.`,
  };
}

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(WEATHER_URL);

        if (!response.ok) {
          throw new Error("No se pudo cargar la previsión meteorológica");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message || "Error al cargar la previsión");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const value = useMemo(() => {
    if (!weather?.daily) {
      return {
        weather,
        loading,
        error,
        locationName: LOCATION_NAME,
        today: null,
        tomorrow: null,
        recommendation: null,
      };
    }

    const today = buildDayData(weather.daily, 0);
    const tomorrow = buildDayData(weather.daily, 1);
    const recommendation = buildRecommendation(today, tomorrow);

    return {
      weather,
      loading,
      error,
      locationName: LOCATION_NAME,
      today,
      tomorrow,
      recommendation,
    };
  }, [weather, loading, error]);

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}