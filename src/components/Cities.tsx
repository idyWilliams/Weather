import React, { useState,  } from "react";
import { useGetWeather } from "../service";
import { BsSuitHeart } from "react-icons/bs";

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
  const [selectedFavorite, ] = useState<string | null>(null);
  const [favoriteCityData, setFavoriteCityData] = useState<Record<string, unknown>>(
    {}
  );

  const removeCity = (cityToRemove: string) => {
    setCityList((prevCityList) =>
      prevCityList.filter((city) => city !== cityToRemove)
    );
  };

  // const addToFavorites = (cityToAdd: string) => {
  //   setFavoriteCities((prevFavorites) => [...prevFavorites, cityToAdd]);
  // };

  const addToFavorites = (cityToAdd: string) => {
    // Check if the city is already in favorites
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

  const handleFavoriteClick = async (city: string) => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = useGetWeather(city).data;
      setFavoriteCityData((prevData) => ({ ...prevData, [city]: data }));
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Weather in Top Cities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cityList
          .sort((a, b) => a.localeCompare(b))
          .map((city) => (
            <CityWeather
              key={city}
              cityName={city}
              onRemove={() => removeCity(city)}
              onAddToFavorites={() => addToFavorites(city)}
            />
          ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">My Favourites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteCities.map((favoriteCity) => (
          <FavoriteCity
            key={favoriteCity}
            cityName={favoriteCity}
            temperature={favoriteCityData[favoriteCity]?.current?.temperature}
            onRemove={() => removeFromFavorites(favoriteCity)}
            onClick={() => handleFavoriteClick(favoriteCity)}
            isSelected={selectedFavorite === favoriteCity}
          />
        ))}
      </div>
    </div>
  );
}

function CityWeather({
  cityName,
  onRemove,
  onAddToFavorites,
}: {
  cityName: string;
  onRemove: () => void;
  onAddToFavorites: () => void;
}) {
  const { data, isLoading, error } = useGetWeather(cityName);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border-2 hover:border-slate-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>
        <img
          src={data?.current?.weather_icons}
          alt={cityName}
          className="rounded-full h-8 w-8"
        />
      </div>

      {isLoading && <p className="text-gray-600 mt-2">Loading...</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      {data && (
        <div className="mt-2">
          <p className="text-gray-700">
            Temperature: {data?.current?.temperature}°C
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={onRemove}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
        >
          Remove
        </button>
        <div>
          <BsSuitHeart
            size={25}
            onClick={(e) => {
              e.stopPropagation(); // Prevents click on heart from triggering card click
              onAddToFavorites();
            }}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function FavoriteCity({
  cityName,
  temperature,
  onRemove,
  onClick,
  isSelected,
}: {
  cityName: string;
  temperature: number | undefined;
  onRemove: () => void;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-blue-200 p-4 rounded-md cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onRemove();
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="text-gray-700">
        Temperature: {temperature !== undefined ? `${temperature}°C` : "N/A"}
      </p>
    </div>
  );
}

export default Cities;
