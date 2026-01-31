import { usePrices } from './hooks/usePrices';
import { useSettings } from './hooks/useSettings';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { MetalSection } from './components/MetalSection';
import { OfflineBadge } from './components/OfflineBadge';
import { GOLD_PURITIES, SILVER_PURITIES } from './constants';
import './styles/app.css';

export default function App() {
  const { gold, silver, rates, loading, error, offline, lastUpdated, refresh } = usePrices();
  const { settings, setCurrency, setUnit } = useSettings();

  return (
    <div className="app">
      <Header lastUpdated={lastUpdated} loading={loading} onRefresh={refresh} />
      <Controls
        currency={settings.currency}
        unit={settings.unit}
        onCurrencyChange={setCurrency}
        onUnitChange={setUnit}
      />

      <OfflineBadge visible={offline} />

      {error && !gold && !silver && (
        <div className="error-box">
          שגיאה בטעינת המחירים. בדוק את החיבור לאינטרנט.
        </div>
      )}

      {gold && (
        <MetalSection
          title="זהב"
          pricePerOzUSD={gold.price}
          purities={GOLD_PURITIES}
          currency={settings.currency}
          unit={settings.unit}
          rates={rates}
          colorClass="metal-gold"
        />
      )}

      {silver && (
        <MetalSection
          title="כסף"
          pricePerOzUSD={silver.price}
          purities={SILVER_PURITIES}
          currency={settings.currency}
          unit={settings.unit}
          rates={rates}
          colorClass="metal-silver"
        />
      )}

      {loading && !gold && !silver && (
        <div className="loading-text">טוען מחירים...</div>
      )}
    </div>
  );
}
