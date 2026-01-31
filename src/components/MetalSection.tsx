import type { Currency, Unit, PurityLevel, ExchangeRates } from '../types';
import { computePrice } from '../calculations';
import { PriceCard } from './PriceCard';

interface MetalSectionProps {
  title: string;
  pricePerOzUSD: number;
  purities: PurityLevel[];
  currency: Currency;
  unit: Unit;
  rates: ExchangeRates | null;
  colorClass: string;
}

export function MetalSection({
  title,
  pricePerOzUSD,
  purities,
  currency,
  unit,
  rates,
  colorClass,
}: MetalSectionProps) {
  const unitLabel = unit === 'gram' ? '/ג׳' : '/אונ׳';

  return (
    <section className={`metal-section ${colorClass}`}>
      <h2 className="metal-title">{title}</h2>
      <div className="price-grid">
        {purities.map((p, i) => (
          <PriceCard
            key={p.label}
            label={`${p.label} ${unitLabel}`}
            price={computePrice(pricePerOzUSD, p.ratio, unit, currency, rates)}
            currency={currency}
            primary={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
