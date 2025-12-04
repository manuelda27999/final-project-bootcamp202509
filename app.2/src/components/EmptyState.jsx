export default function EmptyState({ title = "Nada por aquí", children }) {
  return (
    <div className="empty-state">
      <p className="empty-title">{title}</p>
      {children && <div className="empty-actions">{children}</div>}
    </div>
  );
}

