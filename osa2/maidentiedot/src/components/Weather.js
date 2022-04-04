import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [saa, asetaSaa] = useState([]);
  const ACCESS_KEY = process.env.REACT_APP_API_KEY;
  const KAUPUNKI = city

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${KAUPUNKI}&appid=${ACCESS_KEY}`).then((response) => {
      asetaSaa(response.data);
    });
  }, []);

  console.log(KAUPUNKI)

  return(
    <div>
      <p>Lämpötila on {saa.main.temp} celsiusta</p>
      <img
            alt="saakuvake"
            src={`http://openweathermap.org/img/wn/${saa.weather[0].icon}@2x.png`}
      />
      <p>Tuuli {saa.wind.speed} m/s</p>
    </div>
  )
};

export default Weather