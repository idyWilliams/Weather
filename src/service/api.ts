// api.ts
const KEY = import.meta.env.VITE_REACT_APP_API_KEY;
export const BASEURL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://api.weatherstack.com";

export const api = {
  getWeather: (city: string) =>
    `${BASEURL}/current?access_key=${KEY}&query=${city}`,
};

export const makeGetRequest = async <T = never>(url: string) => {
  try {
    const response = await fetch(`${url}`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};
