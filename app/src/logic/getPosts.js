const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function getPosts() {
  // Esta parte debe coincidir con el puerto y la ruta de tu API.
  // `${BASE_URL}/posts` será, por defecto, http://localhost:3000/posts
  return fetch(`${BASE_URL}/posts`)
    .then((response) => response.json()) //Recibe el resultafo de la petición y lo convierte de formato JSON a JS
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

export default getPosts;
