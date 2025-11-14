export default function DeletePostModal({ post, onCancel, onConfirm }) {
  if (!post) return null;

  function handleClose() {
    onCancel?.();
  }

  function handleOverlay(event) {
    if (event.target === event.currentTarget) handleClose();
  }

  return (
    <div className="modal-overlay" onMouseDown={handleOverlay}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label="Eliminar post">
        <header className="modal-header">
          <h3>Eliminar post</h3>
          <button type="button" className="btn btn-ghost" onClick={handleClose}>
            ✕
          </button>
        </header>
        <div className="modal-body">
          <p>
            Vas a eliminar la publicación de <strong>{post.user}</strong>. Esta acción no se puede
            deshacer.
          </p>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={handleClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onConfirm?.(post.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
