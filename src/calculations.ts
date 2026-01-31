import type { Currency, Unit, ExchangeRates } from './types';
import { TROY_OZ_TO_GRAM } from './constants';

export function convertPurity(pricePerOz: number, purityRatio: number): number {
  return pricePerOz * purityRatio;
}

export function convertUnit(pricePerOz: number, unit: Unit): number {
  return unit === 'oz' ? pricePerOz : pricePerOz / TROY_OZ_TO_GRAM;
}

export function convertCurrency(
  priceUSD: number,
  currency: Currency,
  rates: ExchangeRates | null,
): number {
  if (currency === 'USD' || !rates) return priceUSD;
  const rate = rates.rates[currency];
  return rate ? priceUSD * rate : priceUSD;
}

export function computePrice(
  pricePerOzUSD: number,
  purityRatio: number,
  unit: Unit,
  currency: Currency,
  rates: ExchangeRates | null,
): number {
  let price = convertPurity(pricePerOzUSD, purityRatio);
  price = convertUnit(price, unit);
  price = convertCurrency(price, currency, rates);
  return price;
}

export function formatPrice(value: number, currency: Currency): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
