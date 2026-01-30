import type { Currency } from '../types';
import { formatPrice } from '../calculations';

interface PriceCardProps {
  label: string;
  price: number;
  currency: Currency;
  primary?: boolean;
}

export function PriceCard({ label, price, currency, primary }: PriceCardProps) {
  return (
    <div className={`price-card ${primary ? 'price-card-primary' : ''}`}>
      <span className="price-label">{label}</span>
      <span className={`price-value ${primary ? 'price-value-large' : ''}`}>
        {formatPrice(price, currency)}
      </span>
    </div>
  );
}
