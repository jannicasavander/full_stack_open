import axios from "axios";
const baseUrlGeo = "http://api.openweathermap.org/geo/1.0/";
const baseURL = "https://api.openweathermap.org/data/2.5/";

const api_key = import.meta.env.VITE_OWM_API_KEY;

const getCoordinates = async (city, code) => {
    const response = await axios.get(
        `${baseUrlGeo}direct?q=${city},${code}&limit=5&appid=${api_key}`,
    );
    return [response.data[0].lat, response.data[0].lon];
};

const getWeather = async coordinates => {
    const response = await axios.get(
        `${baseURL}weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&exclude={minutely,hourly,daily,alerts}&appid=${api_key}`,
    );

    return {
        temp: response.data.main.temp,
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed,
    };
};

const fetchWeatherData = async (city, code) => {
    const coordinates = await getCoordinates(city, code);
    const weather = await getWeather(coordinates);
    return weather;
};

export default {
    fetchWeatherData: fetchWeatherData,
};
