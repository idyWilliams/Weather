import React, { useState } from "react";
import { useGetWeather } from "../service";

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

  const removeCity = (cityToRemove: string) => {
    setCityList((prevCityList) =>
      prevCityList.filter((city) => city !== cityToRemove)
    );
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Weather in Top Cities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cityList
          .sort((a, b) => a.localeCompare(b)) // Sort cities alphabetically
          .map((city) => (
            <CityWeather
              key={city}
              cityName={city}
              onRemove={() => removeCity(city)}
            />
          ))}
      </div>
    </div>
  );
}

function CityWeather({
  cityName,
  onRemove,
}: {
  cityName: string;
  onRemove: () => void;
}) {
  const { data, isLoading, error } = useGetWeather(cityName);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border-2 hover:border-slate-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>
        <img src={data?.current?.weather_icons} alt={cityName}  className="rounded-full h-8 w-8"/>
      </div>

      {isLoading && <p className="text-gray-600 mt-2">Loading...</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      {data && (
        <div className="mt-2">
          <p className="text-gray-700">
            Temperature: {data?.current?.temperature}°C
          </p>
          {/* Display other weather information as needed */}
        </div>
      )}
      <div>
      <button
        onClick={onRemove}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mt-3"
      >
        Remove
      </button>
        <div>
          
</div>
      </div>
    </div>
  );
}

export default Cities;
