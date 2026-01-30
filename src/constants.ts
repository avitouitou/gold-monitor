import type { PurityLevel } from './types';

export const API_GOLD = 'https://api.gold-api.com/price/XAU';
export const API_SILVER = 'https://api.gold-api.com/price/XAG';
export const API_FOREX = 'https://open.er-api.com/v6/latest/USD';

export const TROY_OZ_TO_GRAM = 31.1035;

export const GOLD_PURITIES: PurityLevel[] = [
  { label: '24K', ratio: 1.0 },
  { label: '22K', ratio: 22 / 24 },
  { label: '18K', ratio: 18 / 24 },
  { label: '14K', ratio: 14 / 24 },
];

export const SILVER_PURITIES: PurityLevel[] = [
  { label: '999', ratio: 0.999 },
  { label: '925', ratio: 0.925 },
  { label: '900', ratio: 0.9 },
  { label: '800', ratio: 0.8 },
];

export const REFRESH_INTERVAL_MS = 60_000;
export const FOREX_CACHE_MS = 5 * 60_000;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  ILS: '₪',
  EUR: '€',
};
