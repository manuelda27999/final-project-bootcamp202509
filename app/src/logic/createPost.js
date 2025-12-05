// Fichero: src/logic/createPost.js
// Crea una nueva publicación

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function createPost(postData) {
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error creating post:", error);
    });
}

export default createPost;
