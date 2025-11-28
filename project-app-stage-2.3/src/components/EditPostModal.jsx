import { useState } from "react";

function getInitialValues(post) {
  if (!post) return { user: "", imageUrl: "", description: "" };
  return {
    user: post.user,
    imageUrl: post.imageUrl,
    description: post.description,
  };
}

export default function EditPostModal({ post, onClose, onSubmit }) {
  const [values, setValues] = useState(getInitialValues(post));

  if (!post) return null;

  function updateField(field) {
    return (event) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleCancel() {
    setValues(getInitialValues(post));
    onClose?.();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = {
      user: values.user.trim(),
      imageUrl: values.imageUrl.trim(),
      description: values.description.trim(),
    };

    if (!trimmed.user || !trimmed.imageUrl || !trimmed.description) return;
    onSubmit?.(trimmed);
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleCancel();
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-label="Editar post">
        <header className="modal-header">
          <h3>Editar post</h3>
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>
            ✕
          </button>
        </header>
        <div className="modal-body">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor={`edit-user-${post.id}`}>Usuario</label>
              <input
                id={`edit-user-${post.id}`}
                name="user"
                value={values.user}
                onChange={updateField("user")}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor={`edit-image-${post.id}`}>Imagen (URL)</label>
              <input
                id={`edit-image-${post.id}`}
                name="imageUrl"
                value={values.imageUrl}
                onChange={updateField("imageUrl")}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor={`edit-description-${post.id}`}>Descripción</label>
              <textarea
                id={`edit-description-${post.id}`}
                name="description"
                rows={4}
                value={values.description}
                onChange={updateField("description")}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
