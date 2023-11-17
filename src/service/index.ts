

// service.ts
import { useEffect, useState } from "react";
import { api, makeGetRequest } from "./api";

export const useGetWeather = (city: string) => {
  const [data, setData] = useState(null);
  const [error, ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await makeGetRequest(api.getWeather(city));
        setData(result);
      } catch (error) {
        console.error(error);
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
