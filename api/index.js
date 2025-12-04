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

api.use(express.json()); // ⬅️ útil para futuras rutas POST/PUT

// Define una ruta básica para asegurarte de que el servidor funciona
api.get("/", (req, res) => {
  res.send("Hello World!");
});

// Ruta para obtener todas las publicaciones (posts)
// GET: devolver todos los posts
api.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.json(posts);
  } catch (err) {
    console.error("[ERROR] GET /posts:", err);
    res.json({ error: "DB_ERROR" });
  }
});

// Lanza el servidor en el puerto especificado
api.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
