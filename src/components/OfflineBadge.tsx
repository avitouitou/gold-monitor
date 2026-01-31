export function OfflineBadge({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="offline-badge">
      אין חיבור — מוצגים מחירים שמורים
    </div>
  );
}
