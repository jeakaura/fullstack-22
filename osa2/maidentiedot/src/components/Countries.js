const Countries = ({ naytettavatMaat, asetaNaytettavatMaat }) => {
    if (naytettavatMaat.length === 1) return null;
    return naytettavatMaat.map((maa) => (
      <div key={maa.name.official}>
        {maa.name.common}
        <button onClick={() => asetaNaytettavatMaat([maa])}>näytä</button>
      </div>
    ));
  };

export default Countries