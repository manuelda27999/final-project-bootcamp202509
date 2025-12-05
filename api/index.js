import cors from "cors"; //Importamos cors para permitir peticiones desde cualquier origen
import express from "express"; //Importamos express para crear el servidor
import dotenv from "dotenv"; //dotenv nos permitirá usar las variables de entorno desde un archivo .env
import connectDB from "./src/config/db.js"; //Importamos la función para conectar a la base de datos
import Post from "./src/models/post.model.js"; //Importamos el modelo de Post

// Cargar variables de entorno desde el archivo .env
dotenv.config();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
await connectDB();

const api = express();

// Middleware para que el servidor acepte peticiones de cualquier dirección
api.use(cors());

api.use(express.json()); // Necesario para leer el req.body, útil para rutas POST/PUT

// Define una ruta básica para asegurarte de que el servidor funciona
api.get("/", (req, res) => {
  res.send("Hello World!");
});

// Ruta para obtener todas las publicaciones (posts)
// La petición GET se utiliza para pedir información al servidor
api.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().lean(); // .lean() devuelve objetos JS simples en lugar de documentos Mongoose
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /posts:", err);
    res.json({ error: "DB_ERROR" });
  }
});

// Ruta para crear una nueva publicación (post)
// La petición POST se utiliza para enviar datos al servidor
api.post("/posts", async (req, res) => {
  try {
    const postData = req.body;

    const newPost = new Post(postData); // Crear una nueva instancia del modelo Post con los datos del cuerpo de la solicitud

    const savedPost = await newPost.save(); // Guardar el nuevo post en la base de datos
    res.status(201).json(savedPost); // Devolver el post guardado con un estado 201 (Creado)
  } catch (err) {
    console.error("[ERROR] POST /posts:", err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

// Ruta para eliminar una publicación (post) por su ID
// La petición DELETE se utiliza para eliminar recursos del servidor
api.delete("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Buscar y eliminar el post por su ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    // Si no se encuentra el post, devolver un error 404
    if (!deletedPost) {
      return res.status(404).json({ error: "POST_NOT_FOUND" });
    }

    // Devolver el post eliminado
    return res.json(deletedPost);
  } catch (err) {
    console.error("[ERROR] DELETE /posts/:id:", err);
    return res.status(500).json({ error: "DB_ERROR" });
  }
});

// Ruta para actualizar una publicación (post) por su ID
// La petición PUT se utiliza para reemplazar/actualizar recursos en el servidor
api.put("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    // Buscar el post por su ID
    const post = await Post.findById(postId);

    // Si no se encuentra, 404
    if (!post) {
      return res.status(404).json({ error: "POST_NOT_FOUND" });
    }

    // Aplicar cambios recibidos al documento
    post.set(updateData);

    // Guardar cambios en la base de datos
    const updatedPost = await post.save();

    // Devolver el post actualizado
    return res.json(updatedPost);
  } catch (err) {
    console.error("[ERROR] PUT /posts/:id:", err);
    return res.status(500).json({ error: "DB_ERROR" });
  }
});

// Lanza el servidor en el puerto especificado
api.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
