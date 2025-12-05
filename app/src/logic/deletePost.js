// Fichero: src/logic/deletePost.js
// Elimina una publicación por su ID

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function deletePost(id) {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}

export default deletePost;
