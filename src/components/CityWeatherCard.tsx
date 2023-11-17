import { BsSuitHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetWeather } from "../service";


function CityWeatherCard({
  cityName,
  onRemove,
  onAddToFavorites,
}: {
  cityName: string;
  onRemove: () => void;
  onAddToFavorites: () => void;
}) {
  const { data, isLoading, error } = useGetWeather(
    cityName
  );
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/city-details/${cityName}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:border-2 hover:border-slate-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>

        <img
          src={data?.current?.weather_icons[0]}
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
            onClick={(e: { stopPropagation: () => void }) => {
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
export default CityWeatherCard;