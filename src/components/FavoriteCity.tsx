import { useFavoriteCityWeather } from "../helper";
import { WeatherData } from "../types";

function FavoriteCity({
  cityName,
  onRemove,
  onClick,
  isSelected,
  weatherData,
}: {
  cityName: string;
  onRemove: () => void;
  onClick: () => void;
  isSelected: boolean;
  weatherData: WeatherData | null ;
}) {
  const { data, isLoading, error } = useFavoriteCityWeather(cityName);
  const displayData = weatherData || data;

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
        {isLoading
          ? "Loading..."
          : error
          ? `Error: ${error}`
          : `Temperature: ${displayData?.current?.temperature}°C`}
      </p>
    </div>
  );
}

export default FavoriteCity;
