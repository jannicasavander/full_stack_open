import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";

const App = () => {
    const [newFilter, setNewFilter] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        countryService.getAll().then(initialCountries => {
            setCountries(initialCountries);
        });
    }, []);

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
            />
        </div>
    );
};

export default App;
