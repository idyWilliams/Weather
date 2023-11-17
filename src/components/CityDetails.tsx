import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WeatherData } from "../types";
import moment from "moment";
import { useGetWeather } from "../service";

interface CityDetailsProps {}

const CityDetails: React.FC<CityDetailsProps> = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [data, setData] = useState<WeatherData | null>(null);
  const getWeather = useGetWeather(cityName!);
  const [notes, setNotes] = useState(
    localStorage.getItem(`notes-${cityName}`) || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData =  () => {
      try {
        const { data } =  getWeather;
        setData(data);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, [cityName, getWeather]);

  useEffect(() => {
    if (data) {
      localStorage.setItem(`weather-${cityName}`, JSON.stringify(data));
    }
  }, [cityName, data]);

  const handleSave = () => {
    localStorage.setItem(`notes-${cityName}`, notes);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setNotes("");
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex items-center gap-3 mb-4">
        <span
          onClick={() => navigate(-1)}
          className="border text-[#000] shadow-md px-3 cursor-pointer rounded-md bg-[#fff] hover:text-[#fff] hover:bg-[#000]"
        >
          Back
        </span>
        <h1 className="text-3xl font-semibold ">{cityName} Weather Details</h1>
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-2 text-[#000]">{cityName}</h2>
          <img
            src={data?.current?.weather_icons[0]}
            alt={cityName}
            className="rounded-full h-12 w-12"
          />
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-5">
            <div className="bg-blue-100 p-4 rounded-md space-y-3">
              <p className="text-gray-700">
                <strong>Country:</strong> {data?.location?.country}
              </p>
              <p className="text-gray-700">
                <strong>Local time:</strong>{" "}
                {moment(data?.location?.localtime).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
              <p className="text-gray-700">
                <strong>Latitude:</strong> {data?.location?.lat}°latitude
              </p>
              <p className="text-gray-700">
                <strong>Longitude:</strong> {data?.location?.lon}°longitude
              </p>
              <p className="text-gray-700">
                <strong>Pressure:</strong> {data?.current?.pressure}hPa
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-md space-y-3">
              <p className="text-gray-700">
                <strong>Temperature:</strong> {data?.current?.temperature}°C
              </p>
              <p className="text-gray-700">
                <strong>Humidity:</strong> {data?.current?.humidity}%
              </p>
              <p className="text-gray-700">
                <strong>Weather:</strong>{" "}
                {data?.current?.weather_descriptions[0]}
              </p>
              <p className="text-gray-700">
                <strong>Degree:</strong> {data?.current?.wind_degree}°degrees
              </p>
              <p className="text-gray-700">
                <strong>Wind Speed:</strong> {data?.current?.wind_speed}m/s
              </p>
              <p className="text-gray-700">
                <strong>Wind Direction:</strong> {data?.current?.wind_dir}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Notes</h3>
          {isEditing ? (
            <>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded-md p-2 mb-2"
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{notes || "No notes available."}</p>
              <button
                onClick={handleEdit}
                className="text-blue-500 hover:underline cursor-pointer mt-2"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
