import type { MetalPrice, ExchangeRates } from './types';
import { API_METALS, API_FOREX, FOREX_CACHE_MS } from './constants';

const LS_GOLD = 'cached_gold';
const LS_SILVER = 'cached_silver';
const LS_RATES = 'cached_rates';

function saveToCache(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full — ignore
  }
}

function loadFromCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

// api.metals.live returns: [{"gold": price}, {"silver": price}, ..., {"timestamp": ts}]
type MetalsApiEntry = Record<string, number>;

function findPrice(entries: MetalsApiEntry[], metal: string): number | undefined {
  for (const entry of entries) {
    if (metal in entry) return entry[metal];
  }
  return undefined;
}

export async function fetchMetalPrices(): Promise<{ gold: MetalPrice; silver: MetalPrice }> {
  const res = await fetch(API_METALS, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Metals API error: ${res.status}`);
  const data: MetalsApiEntry[] = await res.json();

  const goldPrice = findPrice(data, 'gold');
  const silverPrice = findPrice(data, 'silver');

  if (goldPrice === undefined || silverPrice === undefined) {
    throw new Error('Missing gold or silver price in API response');
  }

  const gold: MetalPrice = { price: goldPrice };
  const silver: MetalPrice = { price: silverPrice };

  saveToCache(LS_GOLD, gold);
  saveToCache(LS_SILVER, silver);

  return { gold, silver };
}

let cachedRates: ExchangeRates | null = null;

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  if (cachedRates && Date.now() - cachedRates.fetchedAt < FOREX_CACHE_MS) {
    return cachedRates;
  }

  const res = await fetch(API_FOREX, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Forex API error: ${res.status}`);
  const data = await res.json();
  cachedRates = { rates: data.rates, fetchedAt: Date.now() };
  saveToCache(LS_RATES, cachedRates);
  return cachedRates;
}

export function getCachedGold(): MetalPrice | null {
  return loadFromCache<MetalPrice>(LS_GOLD);
}

export function getCachedSilver(): MetalPrice | null {
  return loadFromCache<MetalPrice>(LS_SILVER);
}

export function getCachedRates(): ExchangeRates | null {
  return loadFromCache<ExchangeRates>(LS_RATES);
}
