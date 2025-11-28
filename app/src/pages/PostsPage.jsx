import { useEffect, useState, useContext } from "react";
import initialPosts from "../data/postsSoft.data.js";
import PostItem from "../components/PostItem.jsx";
import EmptyState from "../components/EmptyState.jsx";
import CreatePostModal from "../components/CreatePostModal.jsx";
import EditPostModal from "../components/EditPostModal.jsx";
import DeletePostModal from "../components/DeletePostModal.jsx";
import { usePostCount } from "../contexts/PostCountContext.jsx";

export default function PostsPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isCreateOpen, setIsCreateOpen] = useState(false); //Contorla la visibilidad del modal de creación
  const [postEditing, setPostEditing] = useState(null); //Contorla el post que se está editando
  const [postDeleting, setPostDeleting] = useState(null); //Contorla el post que se está eliminando
  const { setCount } = usePostCount();

  // Ejemplo sencillo de useEffect: mantenemos el título actualizado con el total de posts
  useEffect(() => {
    setCount(posts.length);
    document.title = `Posts (${posts.length})`;
  }, [posts.length, setCount]);

  // Función para manejar la creación de un nuevo post
  function handleCreate(data) {
    const newPost = {
      id: globalThis.crypto?.randomUUID?.() || `p_${Date.now().toString(36)}`, // Genera un ID único
      user: data.user,
      imageUrl: data.imageUrl,
      description: data.description,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [...prev, newPost]);
    setIsCreateOpen(false);
  }

  //Función para manejar la actualización de un post existente
  function handleUpdate(data) {
    if (!postEditing) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postEditing.id
          ? {
              ...post,
              user: data.user,
              imageUrl: data.imageUrl,
              description: data.description,
            }
          : post
      )
    );
    setPostEditing(null);
  }

  //Función para manejar la confirmación de eliminación de un post
  function handleDeleteConfirm(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setPostDeleting(null);
  }

  return (
    <section className="page">
      <div className="section-header">
        <div>
          <h2>Publicaciones</h2>
          <p>CRUD sencillo sobre posts con imagen obligatoria.</p>
        </div>
        <div className="section-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            Crear post
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <EmptyState title="Aún no hay publicaciones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            Crear el primero
          </button>
        </EmptyState>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onEdit={(current) => setPostEditing(current)} //Mediante esta prop se abre el modal de edición y le paso el post a editar
              onDelete={(current) => setPostDeleting(current)} //Mediante esta prop se abre el modal de eliminación y le paso el post a eliminar
            />
          ))}
        </div>
      )}

      {isCreateOpen && (
        <CreatePostModal
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {postEditing && (
        <EditPostModal
          key={postEditing.id}
          post={postEditing}
          onClose={() => setPostEditing(null)}
          onSubmit={handleUpdate}
        />
      )}

      {postDeleting && (
        <DeletePostModal
          post={postDeleting}
          onCancel={() => setPostDeleting(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </section>
  );
}
