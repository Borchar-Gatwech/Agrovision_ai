const API_KEY = import.meta.env.NEXT_PUBLIC_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city: string) {
  const response = await fetch(`${BASE_URL}?q=${city},KE&appid=${API_KEY}&units=metric`);
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
}
