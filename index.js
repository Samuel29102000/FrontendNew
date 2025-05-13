import { useState } from 'react';
import axios from 'axios';

function App() {
  const [brutto, setBrutto] = useState('');
  const [steuerSatz, setSteuerSatz] = useState('');
  const [ergebnis, setErgebnis] = useState(null);

  const rechneGehalt = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://DEIN-RENDER-BACKEND-URL/api/gehalt', {
        brutto: parseFloat(brutto),
        steuerSatz: parseFloat(steuerSatz)
      });
      setErgebnis(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gehaltsrechner</h1>
      <form onSubmit={rechneGehalt}>
        <input
          type="number"
          placeholder="Bruttogehalt"
          value={brutto}
          onChange={(e) => setBrutto(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Steuersatz (%)"
          value={steuerSatz}
          onChange={(e) => setSteuerSatz(e.target.value)}
          required
        />
        <button type="submit">Berechnen</button>
      </form>
      {ergebnis && (
        <div>
          <p>Bruttogehalt: {ergebnis.brutto} €</p>
          <p>Steuer: {ergebnis.steuer} €</p>
          <p><strong>Nettogehalt: {ergebnis.netto} €</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
