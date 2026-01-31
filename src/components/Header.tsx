interface HeaderProps {
  lastUpdated: Date | null;
  loading: boolean;
  onRefresh: () => void;
}

export function Header({ lastUpdated, loading, onRefresh }: HeaderProps) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <header className="header">
      <h1 className="header-title">מחירי זהב וכסף</h1>
      <div className="header-row">
        <span className="header-updated">
          עודכן: {timeStr}
        </span>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={loading}
          aria-label="רענון מחירים"
        >
          {loading ? '⟳' : '↻'} רענון
        </button>
      </div>
    </header>
  );
}
