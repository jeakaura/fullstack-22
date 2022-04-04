const Countries = ({ naytettavatMaat }) => {
    if (naytettavatMaat.length === 1) return null;
    return naytettavatMaat.map((maa) => (
      <div key={maa.name.official}>
        {maa.name.common}
      </div>
    ));
  };

export default Countries