export function OfflineBadge({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="offline-badge">
      Offline — showing cached prices
    </div>
  );
}
