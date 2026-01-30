import { useState, useCallback } from 'react';
import type { Currency, Unit, Settings } from '../types';

const LS_KEY = 'gold_tracker_settings';

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Settings;
  } catch {
    // ignore
  }
  return { currency: 'USD', unit: 'gram' };
}

function saveSettings(settings: Settings) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  const setCurrency = useCallback((currency: Currency) => {
    setSettings((prev) => {
      const next = { ...prev, currency };
      saveSettings(next);
      return next;
    });
  }, []);

  const setUnit = useCallback((unit: Unit) => {
    setSettings((prev) => {
      const next = { ...prev, unit };
      saveSettings(next);
      return next;
    });
  }, []);

  return { settings, setCurrency, setUnit };
}
