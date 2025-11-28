export default function PostCard({ post }) {
  // Extrae los datos principales del post para simplificar el JSX.
  const { author, timestamp, content, tags, stats } = post;

  return (
    <article className="post-card">
      {/* Cabecera con la identidad de la persona que publica */}
      <div className="post-header">
        <div className="avatar">{author?.initials}</div>
        <div>
          <h3>{author?.name}</h3>
          <p className="post-meta">
            {author?.role} · {timestamp}
          </p>
        </div>
      </div>

      <div className="post-body">
        {/* Cada párrafo del post se muestra en su propia línea */}
        {Array.isArray(content) &&
          content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>

      {Array.isArray(tags) && tags.length > 0 && (
        /* Listado de etiquetas relacionadas con la publicación */
        <ul className="post-tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {/* Resumen de las interacciones que recibió la publicación */}
      <dl className="post-stats">
        <div>
          <dt>Me gusta</dt>
          <dd>{stats?.likes}</dd>
        </div>
        <div>
          <dt>Comentarios</dt>
          <dd>{stats?.comments}</dd>
        </div>
        <div>
          <dt>Compartidos</dt>
          <dd>{stats?.shares}</dd>
        </div>
      </dl>
    </article>
  );
}
