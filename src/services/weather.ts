import { DailyWeather } from "../types/plan";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(destination: string) {
  if (!API_KEY) {
    console.error("Weather API key is missing");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${destination}&days=7`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract a clean summary for the AI
    const weatherSummary = {
      location: data.location.name,
      country: data.location.country,
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        max_temp: day.day.maxtemp_c,
        min_temp: day.day.mintemp_c,
        condition: day.day.condition.text,
        rain_chance: day.day.daily_chance_of_rain,
      }))
    };

    return weatherSummary;
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
}