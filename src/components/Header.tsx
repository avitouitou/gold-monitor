interface HeaderProps {
  lastUpdated: Date | null;
  loading: boolean;
  onRefresh: () => void;
}

export function Header({ lastUpdated, loading, onRefresh }: HeaderProps) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <header className="header">
      <h1 className="header-title">Gold &amp; Silver Prices</h1>
      <div className="header-row">
        <span className="header-updated">
          Updated: {timeStr}
        </span>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh prices"
        >
          {loading ? '⟳' : '↻'} Refresh
        </button>
      </div>
    </header>
  );
}
