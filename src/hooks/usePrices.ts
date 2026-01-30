import { useState, useEffect, useCallback, useRef } from 'react';
import type { PriceData } from '../types';
import {
  fetchGoldPrice,
  fetchSilverPrice,
  fetchExchangeRates,
  getCachedGold,
  getCachedSilver,
  getCachedRates,
} from '../api';
import { REFRESH_INTERVAL_MS } from '../constants';

export function usePrices(): PriceData & { refresh: () => void } {
  const [data, setData] = useState<PriceData>({
    gold: getCachedGold(),
    silver: getCachedSilver(),
    rates: getCachedRates(),
    loading: true,
    error: null,
    offline: !navigator.onLine,
    lastUpdated: null,
  });

  const intervalRef = useRef<number | null>(null);

  const refresh = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.onLine) {
      setData((prev) => ({
        ...prev,
        loading: false,
        offline: true,
        gold: prev.gold ?? getCachedGold(),
        silver: prev.silver ?? getCachedSilver(),
        rates: prev.rates ?? getCachedRates(),
      }));
      return;
    }

    try {
      const [gold, silver, rates] = await Promise.all([
        fetchGoldPrice(),
        fetchSilverPrice(),
        fetchExchangeRates(),
      ]);

      setData({
        gold,
        silver,
        rates,
        loading: false,
        error: null,
        offline: false,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch prices',
        gold: prev.gold ?? getCachedGold(),
        silver: prev.silver ?? getCachedSilver(),
        rates: prev.rates ?? getCachedRates(),
      }));
    }
  }, []);

  useEffect(() => {
    refresh();
    intervalRef.current = window.setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [refresh]);

  useEffect(() => {
    const goOnline = () => setData((prev) => ({ ...prev, offline: false }));
    const goOffline = () => setData((prev) => ({ ...prev, offline: true }));
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return { ...data, refresh };
}
