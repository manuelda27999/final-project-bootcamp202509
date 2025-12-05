// Fichero: src/logic/updatePost.js
// Actualiza una publicación por su ID

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function updatePost(id, updateData) {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error updating post:", error);
    });
}

export default updatePost;
