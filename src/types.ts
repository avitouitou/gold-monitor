export interface MetalPrice {
  name: string;
  price: number;
  symbol: string;
  updatedAt: string;
}

export interface ExchangeRates {
  rates: Record<string, number>;
  fetchedAt: number;
}

export type Currency = 'USD' | 'ILS' | 'EUR';
export type Unit = 'oz' | 'gram';

export interface Settings {
  currency: Currency;
  unit: Unit;
}

export interface PriceData {
  gold: MetalPrice | null;
  silver: MetalPrice | null;
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  offline: boolean;
  lastUpdated: Date | null;
}

export interface PurityLevel {
  label: string;
  ratio: number;
}
