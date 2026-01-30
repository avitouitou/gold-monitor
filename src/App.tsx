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
          Failed to load prices. Please check your connection and try again.
        </div>
      )}

      {gold && (
        <MetalSection
          title="Gold"
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
          title="Silver"
          pricePerOzUSD={silver.price}
          purities={SILVER_PURITIES}
          currency={settings.currency}
          unit={settings.unit}
          rates={rates}
          colorClass="metal-silver"
        />
      )}

      {loading && !gold && !silver && (
        <div className="loading-text">Loading prices...</div>
      )}
    </div>
  );
}
