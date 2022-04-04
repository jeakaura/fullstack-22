import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [haettava, asetaHaettava] = useState('');
  const [maat, asetaMaat] = useState([]);
  const [naytettavatMaat, asetaNaytettavatMaat] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      asetaMaat(response.data);
    });
  }, []);

  const kasitteleHaku = (event) => {
    const hae = event.target.value;
    asetaHaettava(hae);
    asetaNaytettavatMaat(
      maat.filter((maa) => maa.name.common.toLowerCase().includes(hae.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        Etsi <input value={haettava} onChange={kasitteleHaku} />
      </div>
      {naytettavatMaat.length === 1 ? (
        <Country country={naytettavatMaat[0]} />
      ) : null}
      {naytettavatMaat.length > 10 ? (
        <div>Ehdon täyttäviä maita on liikaa, tarkenna hakuehtoa.</div>
      ) : (
        <Countries
          naytettavatMaat={naytettavatMaat}
          asetaNaytettavatMaat={asetaNaytettavatMaat}
        />
      )}
    </div>
  );
}

export default App;
