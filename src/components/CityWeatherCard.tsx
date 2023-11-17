import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetWeather } from "../service";
import { WeatherData } from "../types";

function CityWeatherCard({
  cityName,
  onRemove,
  onAddToFavorites,
  weatherData,
}: {
  cityName: string;
  onRemove: () => void;
  onAddToFavorites: () => void;
  weatherData: WeatherData | null;
}) {
  const { data, isLoading, error } = useGetWeather(cityName);
  const navigate = useNavigate();

  const displayData = weatherData || data;

  return (
    <div
      onClick={() => navigate(`/city-details/${cityName}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border-2 hover:border-slate-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>
        <img
          src={displayData?.current?.weather_icons[0]}
          alt={cityName}
          className="rounded-full h-8 w-8"
        />
      </div>

      {isLoading && <p className="text-gray-600 mt-2">Loading...</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      {displayData && (
        <div className="mt-2">
          <p className="text-gray-700">
            Temperature: {displayData?.current?.temperature}°C
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
        <div className="rounded-full p-1 shadow-md border bg-slate-600 hover:bg-slate-400 active:scale-75 ease-in-out text-right">
          <IoHeart
            size={25}
            // fill={}
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              onAddToFavorites();
            }}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default CityWeatherCard;
