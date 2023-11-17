import { useEffect } from "react";
import { useGetWeather } from "../service";

export const useFavoriteCityWeather = (cityName: string) => {
  const { data, isLoading, error } = useGetWeather(cityName);

  useEffect(() => {
    if (data) {
      localStorage.setItem(`weather-${cityName}`, JSON.stringify(data));
    }
  }, [data, cityName]);

  return { data, isLoading, error };
};
