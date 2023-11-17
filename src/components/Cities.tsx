import { useState, useEffect } from "react";
import CityWeatherCard from "./CityWeatherCard";
import FavoriteCity from "./FavoriteCity";
import { useGetWeather } from "../service";
import { WeatherData } from "../types";

function Cities() {
  const initialCityList = [
    "Tokyo",
    "Delhi",
    "Shanghai",
    "São Paulo",
    "Mexico City",
    "Cairo",
    "Mumbai",
    "Beijing",
    "Dhaka",
    "Osaka",
    "New York",
    "Karachi",
    "Buenos Aires",
    "Chongqing",
    "Istanbul",
  ];

  const [cityList, setCityList] = useState(initialCityList);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [weatherData, setWeatherData] = useState<{
    [key: string]: WeatherData | null;
  }>({});
  const getWeather = useGetWeather(searchQuery);

  const removeCity = (cityToRemove: string) => {
    setCityList((prevCityList) =>
      prevCityList.filter((city) => city !== cityToRemove)
    );
  };

  const addToFavorites = (cityToAdd: string) => {
    if (favoriteCities.includes(cityToAdd)) {
      alert(`City ${cityToAdd} already added to favorites!`);
      return;
    }

    setFavoriteCities((prevFavorites) => [...prevFavorites, cityToAdd]);
  };

  const removeFromFavorites = (cityToRemove: string) => {
    setFavoriteCities((prevFavorites) =>
      prevFavorites.filter((city) => city !== cityToRemove)
    );
  };

  const handleFavoriteClick = (city: string) => {
    setSelectedFavorite(city);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    if (cityList.includes(searchQuery)) {
      alert(`City ${searchQuery} is already in the list!`);
      return;
    }

    try {
      const { data } = await getWeather;

      setWeatherData((prevWeatherData) => ({
        ...prevWeatherData,
        [searchQuery]: data,
      }));

      setCityList((prevCityList) => [...prevCityList, searchQuery]);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching data from the API:", error);

    }
  };

  useEffect(() => {
    const cachedFavorites = localStorage.getItem("favoriteCities");
    if (cachedFavorites) {
      setFavoriteCities(JSON.parse(cachedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  return (
    <div className="container mx-auto my-8">
      {favoriteCities.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8">Favorite Cities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteCities.map((favoriteCity) => (
              <FavoriteCity
                key={favoriteCity}
                cityName={favoriteCity}
                onRemove={() => removeFromFavorites(favoriteCity)}
                onClick={() => handleFavoriteClick(favoriteCity)}
                isSelected={selectedFavorite === favoriteCity}
                weatherData={weatherData[favoriteCity]}
              />
            ))}
          </div>
        </>
      )}
      <h1 className="text-3xl font-semibold mb-4 mt-8">
        Weather in Top Cities
      </h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter city name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 mr-2 border border-gray-300"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cityList
          .sort((a, b) => a.localeCompare(b))
          .map((city) => (
            <CityWeatherCard
              key={city}
              cityName={city}
              onRemove={() => removeCity(city)}
              onAddToFavorites={() => addToFavorites(city)}
              weatherData={weatherData[city]}
            />
          ))}
      </div>
    </div>
  );
}

export default Cities;
