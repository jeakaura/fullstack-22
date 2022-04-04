import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Pääkaupunki: {country.capital}</div>
      <div>Pinta-ala: {country.area} km²</div>
      <h3>Kielet:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h3>Sää pääkaupungissa {country.capital}</h3>
      <Weather city={country.capital} />
    </div>
  );
};

export default Country;