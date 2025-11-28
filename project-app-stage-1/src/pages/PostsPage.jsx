import { useState } from "react";
import PostCard from "../components/PostCard.jsx";
import posts from "../data/posts.data.js";

export default function PostsPage() {
  // Guarda la lista de publicaciones para poder gestionarla en el futuro.
  const [postsList] = useState(posts);

  return (
    <section className="page">
      {/* Encabezado que resume qué muestra la sección */}
      <div className="section-header">
        <h2>Publicaciones recientes</h2>
        <p>Un vistazo rápido a lo que está ocurriendo en la comunidad.</p>
      </div>

      <div className="posts-list">
        {/* Cada publicación se renderiza con el componente reutilizable PostCard */}
        {postsList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
