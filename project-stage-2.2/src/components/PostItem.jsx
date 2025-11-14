export default function PostItem({ post, onEdit, onDelete }) {
  const { user, imageUrl, description } = post;

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-image">
          <img src={imageUrl} alt={`Imagen del post de ${user}`} />
        </div>
        <div className="post-header-text">
          <h3>{user}</h3>
          <p className="post-meta">Publicación visible para el equipo</p>
        </div>
        <div className="post-actions">
          <button type="button" className="btn btn-ghost" onClick={() => onEdit?.(post)}>
            Editar
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onDelete?.(post)}>
            Eliminar
          </button>
        </div>
      </div>
      <div className="post-body">
        <p>{description}</p>
      </div>
    </article>
  );
}
