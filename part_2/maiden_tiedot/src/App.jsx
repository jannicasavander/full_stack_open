import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import countryService from "./services/countries";
import weatherService from "./services/weather";
import CountryList from "./components/CountryList";

const App = () => {
    const [newFilter, setNewFilter] = useState("");
    const [countries, setCountries] = useState([]);
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        countryService.getAll().then(initialCountries => {
            setCountries(initialCountries);
        });
    }, []);

    const fetchWeatherData = (capital, code) => {
        weatherService.fetchWeatherData(capital, code).then(response => {
            setWeather(response);
        });
    };

    const handleFilterChange = event => {
        setNewFilter(event.target.value);
    };

    const countriesToShow = countries.filter(countries =>
        countries.name.common.toLowerCase().includes(newFilter.toLowerCase()),
    );

    return (
        <div>
            <Filter
                filter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <CountryList
                countries={countriesToShow}
                setCountryFilter={setNewFilter}
                weather={weather}
                getWeather={fetchWeatherData}
            />
        </div>
    );
};

export default App;
