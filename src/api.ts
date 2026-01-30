import type { MetalPrice, ExchangeRates } from './types';
import { API_GOLD, API_SILVER, API_FOREX, FOREX_CACHE_MS } from './constants';

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

export async function fetchGoldPrice(): Promise<MetalPrice> {
  const res = await fetch(API_GOLD);
  if (!res.ok) throw new Error(`Gold API error: ${res.status}`);
  const data: MetalPrice = await res.json();
  saveToCache(LS_GOLD, data);
  return data;
}

export async function fetchSilverPrice(): Promise<MetalPrice> {
  const res = await fetch(API_SILVER);
  if (!res.ok) throw new Error(`Silver API error: ${res.status}`);
  const data: MetalPrice = await res.json();
  saveToCache(LS_SILVER, data);
  return data;
}

let cachedRates: ExchangeRates | null = null;

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  if (cachedRates && Date.now() - cachedRates.fetchedAt < FOREX_CACHE_MS) {
    return cachedRates;
  }

  const res = await fetch(API_FOREX);
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
