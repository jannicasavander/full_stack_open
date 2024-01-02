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
                    />
                ))
            )}
        </div>
    );
};

const CountryListElement = ({ country }) => {
    return <p>{country.name.common}</p>;
};

const SingleCountry = ({ country }) => {
    return (
        <p>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
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
