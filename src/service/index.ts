import { useEffect, useState } from "react";
import { api, makeGetRequest } from "./api";
import { WeatherData } from "../types";

export const useGetWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await makeGetRequest(api.getWeather(city));
        setData(result);
      } catch (error) {
        console.error(error, "error");
        // setError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return {
    data,
    error,
    isLoading,
  };
};
