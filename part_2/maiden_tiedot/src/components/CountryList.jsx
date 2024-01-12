const CountryList = props => {
    return (
        <div>
            {props.countries.length === 1 ? (
                <SingleCountry country={props.countries[0]} />
            ) : props.countries.length > 10 ? (
                <p>Too many matches, specify another filter</p>
            ) : (
                props.countries.map(country => (
                    <CountryListElement
                        key={country.name.common}
                        country={country}
                        setCountryFilter={() =>
                            props.setCountryFilter(country.name.common)
                        }
                    />
                ))
            )}
        </div>
    );
};

const CountryListElement = ({ country, setCountryFilter }) => {
    return (
        <div>
            {country.name.common + " "}
            <button onClick={setCountryFilter}>Show</button>
        </div>
    );
};

const SingleCountry = ({ country }) => {
    return (
        <p>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width="200"
            />
        </p>
    );
};

export default CountryList;
