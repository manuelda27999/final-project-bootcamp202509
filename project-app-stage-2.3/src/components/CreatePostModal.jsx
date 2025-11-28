import { useState } from "react";

const emptyForm = Object.freeze({ user: "", imageUrl: "", description: "" });

export default function CreatePostModal({ onClose, onSubmit }) {
  const [values, setValues] = useState(emptyForm);

  function updateField(field) {
    return (event) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };
  }

  function resetForm() {
    setValues(emptyForm);
  }

  function closeModal() {
    resetForm();
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
    resetForm();
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-label="Crear post">
        <header className="modal-header">
          <h3>Crear post</h3>
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            ✕
          </button>
        </header>
        <div className="modal-body">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="create-user">Usuario</label>
              <input
                id="create-user"
                name="user"
                value={values.user}
                onChange={updateField("user")}
                placeholder="Ada Lovelace"
                autoFocus
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="create-image">Imagen (URL)</label>
              <input
                id="create-image"
                name="imageUrl"
                value={values.imageUrl}
                onChange={updateField("imageUrl")}
                placeholder="https://picsum.photos/..."
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="create-description">Descripción</label>
              <textarea
                id="create-description"
                name="description"
                rows={4}
                value={values.description}
                onChange={updateField("description")}
                placeholder="Comparte una actualización breve"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Crear post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
