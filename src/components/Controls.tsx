import type { Currency, Unit } from '../types';

interface ControlsProps {
  currency: Currency;
  unit: Unit;
  onCurrencyChange: (c: Currency) => void;
  onUnitChange: (u: Unit) => void;
}

const currencies: Currency[] = ['USD', 'ILS', 'EUR'];
const units: Unit[] = ['gram', 'oz'];

export function Controls({ currency, unit, onCurrencyChange, onUnitChange }: ControlsProps) {
  return (
    <div className="controls">
      <div className="control-group">
        <label className="control-label">Currency</label>
        <div className="toggle-group">
          {currencies.map((c) => (
            <button
              key={c}
              className={`toggle-btn ${currency === c ? 'active' : ''}`}
              onClick={() => onCurrencyChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="control-group">
        <label className="control-label">Unit</label>
        <div className="toggle-group">
          {units.map((u) => (
            <button
              key={u}
              className={`toggle-btn ${unit === u ? 'active' : ''}`}
              onClick={() => onUnitChange(u)}
            >
              {u === 'gram' ? 'Gram' : 'Troy Oz'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
