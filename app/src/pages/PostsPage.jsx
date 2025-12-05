import { useEffect, useState } from "react";
import PostItem from "../components/PostItem.jsx";
import EmptyState from "../components/EmptyState.jsx";
import CreatePostModal from "../components/CreatePostModal.jsx";
import EditPostModal from "../components/EditPostModal.jsx";
import DeletePostModal from "../components/DeletePostModal.jsx";
import { usePostCount } from "../contexts/PostCountContext.jsx";
import getPosts from "../logic/getPosts.js";
import createPost from "../logic/createPost.js";
import updatePost from "../logic/updatePost.js";
import deletePost from "../logic/deletePost.js";

export default function PostsPage() {
  const [posts, setPosts] = useState([]); //Estado que contiene la lista de posts, lo iniciamos con un array vacío
  const [isCreateOpen, setIsCreateOpen] = useState(false); //Contorla la visibilidad del modal de creación
  const [postEditing, setPostEditing] = useState(null); //Contorla el post que se está editando
  const [postDeleting, setPostDeleting] = useState(null); //Contorla el post que se está eliminando
  const { setCount } = usePostCount();

  useEffect(() => {
    getPosts()
      .then((data) =>
        setPosts(
          Array.isArray(data)
            ? data.map((post) => ({
                ...post,
                id: post._id || post.id,
              }))
            : []
        )
      )
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Ejemplo sencillo de useEffect: mantenemos el título actualizado con el total de posts
  useEffect(() => {
    setCount(posts.length);
    document.title = `Posts (${posts.length})`;
  }, [posts.length, setCount]);

  // Función para manejar la creación de un nuevo post
  async function handleCreate(data) {
    try {
      const payload = {
        user: data.user,
        imageUrl: data.imageUrl,
        description: data.description,
        createdAt: new Date().toISOString(),
      };

      const created = await createPost(payload);
      if (!created) return;

      const normalized = {
        ...created,
        id: created._id || created.id,
      };

      setPosts((prev) => [...prev, normalized]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  //Función para manejar la actualización de un post existente
  async function handleUpdate(data) {
    if (!postEditing) return;

    try {
      const updated = await updatePost(postEditing.id, {
        user: data.user,
        imageUrl: data.imageUrl,
        description: data.description,
      });
      if (!updated) return;

      const normalized = {
        ...updated,
        id: updated._id || updated.id,
      };

      setPosts((prev) =>
        prev.map((post) => (post.id === postEditing.id ? normalized : post))
      );
      setPostEditing(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  //Función para manejar la confirmación de eliminación de un post
  async function handleDeleteConfirm(id) {
    try {
      const deleted = await deletePost(id);
      if (!deleted) return;

      const deletedId = deleted._id || deleted.id || id;

      setPosts((prev) => prev.filter((post) => post.id !== deletedId));
      setPostDeleting(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
