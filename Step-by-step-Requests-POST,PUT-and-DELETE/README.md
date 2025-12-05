# Proyecto Final - Peticiones POST, PUT y DELETE

# 1. POST

> 💡 Objetivo: crear un endpoint que reciba datos y cree una nueva publicación en la colección `posts`.
> 
1. Preparativos
    - Conexión a MongoDB funcionando (`connectDB`).
    - Variables de entorno con `dotenv`.
    - Servidor Express con CORS y `express.json()` activado.
    - Ficheros: `index.js`, `src/config/db.js`, `src/models/post.model.js`.
2. Modelo `Post` (si no lo tienes aún)
    
    ```jsx
    // Fichero: src/models/post.model.js
    import mongoose from "mongoose";
    
    const postSchema = new mongoose.Schema({
      user:        { type: String, required: true },
      imageUrl:    { type: String, required: true },
      description: { type: String, required: true },
      createdAt:   { type: Date,   required: true } // o usa: default: [Date.now](http://Date.now)
    });
    
    export default mongoose.model("Post", postSchema, "posts");
    ```
    
3. Middleware para leer JSON (en `index.js`)
    
    ```jsx
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
    ```
    
4. Endpoint POST `/posts`
    
    ```jsx
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
    ```
    
5. Respuestas esperadas
    - 201 Created + objeto insertado.
    - 500 si hay error de base de datos.
6. Prueba usando Postman (recomendado) o con un fichero .sh con instrucciones curl
    
    ![Screenshot 2025-12-05 at 10.25.29.png](Proyecto%20Final%20-%20Peticiones%20POST,%20PUT%20y%20DELETE/Screenshot_2025-12-05_at_10.25.29.png)
    
    ```bash
    curl -X POST [http://localhost:3000/posts](http://localhost:3000/posts) \
      -H "Content-Type: application/json" \
      -d '{
        "user": "manuelda",
        "imageUrl": "[https://picsum.photos/600/400](https://picsum.photos/600/400)",
        "description": "Mi primer post desde la API",
        "createdAt": "2025-12-05T08:45:00.000Z"
      }'
    ```
    
7. Errores comunes
    - Olvidar `api.use(express.json())` y `req.body` va vacío.
    - Campos que no coinciden con el esquema de Mongoose.
    - Conectar la BD después de montar rutas.
    - Falta CORS si el Frontend está en otro origen.

# 2. DELETE

> 💡 Objetivo: eliminar una publicación existente por su ID.
> 
1. Preparativos
    - Asegúrate de tener importado el modelo `Post` y la conexión activa a MongoDB.
    - Ya debes tener configurado `express.json()` y CORS en tu servidor.
2. Endpoint DELETE `/posts/:id`
    
    ```jsx
    // Ruta para eliminar una publicación (post) por su ID
    // La petición DELETE se utiliza para eliminar recursos del servidor
    api.delete("/posts/:id", async (req, res) => {
      try {
        const postId = [req.params.id](http://req.params.id);
    
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
    ```
    
3. Respuestas esperadas
    - 200 OK + objeto eliminado.
    - 404 si el ID no existe en la colección.
    - 500 si hay error de base de datos.
4. Prueba usando Postman (recomendado) o con un fichero .sh con instrucciones curl
    
    ![Screenshot 2025-12-05 at 13.53.28.png](Proyecto%20Final%20-%20Peticiones%20POST,%20PUT%20y%20DELETE/Screenshot_2025-12-05_at_13.53.28.png)
    
    ```bash
    # Reemplaza <ID> por el _id real de un documento de tu colección
    curl -X DELETE [http://localhost:3000/posts/<ID>](http://localhost:3000/posts/posts/<ID>)
    ```
    
5. Errores comunes
    - Usar un ID malformado (no es un ObjectId válido) → Mongoose lanzará error (500).
    - No controlar el caso de no encontrado (404) y devolver 200 con null.
    - No tener importado el modelo `Post` en `index.js`.

# 3. PUT

> 💡 Objetivo: actualizar una publicación existente por su ID.
> 
1. Preparativos
    - Modelo `Post` importado y conexión a MongoDB activa.
    - `express.json()` y CORS ya configurados.
2. Endpoint PUT `/posts/:id`
    
    ```jsx
    // Ruta para actualizar una publicación (post) por su ID
    // La petición PUT se utiliza para reemplazar/actualizar recursos en el servidor
    api.put("/posts/:id", async (req, res) => {
      try {
        const postId = [req.params.id](http://req.params.id);
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
        const updatedPost = await [post.save](http://post.save)();
    
        // Devolver el post actualizado
        return res.json(updatedPost);
      } catch (err) {
        console.error("[ERROR] PUT /posts/:id:", err);
        return res.status(500).json({ error: "DB_ERROR" });
      }
    });
    ```
    
3. Respuestas esperadas
    - 200 OK + objeto actualizado.
    - 404 si el ID no existe.
    - 500 si hay error de base de datos.
4. Prueba usando Postman (recomendado) o con un fichero .sh con instrucciones curl
    
    ![Screenshot 2025-12-05 at 14.00.15.png](Proyecto%20Final%20-%20Peticiones%20POST,%20PUT%20y%20DELETE/Screenshot_2025-12-05_at_14.00.15.png)
    
    ```bash
    # Reemplaza <ID> por el _id real de tu documento
    curl -X PUT [http://localhost:3000/posts/](http://localhost:3000/posts/posts/<ID>)<ID> \
      -H "Content-Type: application/json" \
      -d '{
        "description": "Descripción actualizada desde la API"
      }'
    ```
    
5. Errores comunes
    - No validar campos en Frontend y enviar valores vacíos sin querer.
    - Usar un ID malformado → provoca error (500).
    - Olvidar `runValidators: true` en la variante con `findByIdAndUpdate` y saltarte reglas del esquema.

# 4. Peticiones desde la app (Frontend)

> 💡 Objetivo: tener un fichero por cada petición a la API, usando variables de entorno (`VITE_API_URL`) como base.
> 

Estructura sugerida en tu Frontend:

- `src/logic/getPosts.js`
- `src/logic/createPost.js`
- `src/logic/updatePost.js`
- `src/logic/deletePost.js`
- (Opcional) `src/logic/index.js` como barrel para reexportar

Nota sobre Vite: en tiempo de ejecución, accedemos a `import.meta.env.VITE_API_URL`. Añadimos un pequeño fallback para desarrollo local.

## 4.1 GET — src/logic/getPosts.js

```jsx
// Fichero: src/logic/getPosts.js
const BASE_URL = import.meta.env.VITE_API_URL || "[http://localhost:3000](http://localhost:3000)";

async function getPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then((response) => response.json()) // JSON → JS
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

export default getPosts;
```

## 4.2 POST — src/logic/createPost.js

```jsx
// Fichero: src/logic/createPost.js
const BASE_URL = import.meta.env.VITE_API_URL || "[http://localhost:3000](http://localhost:3000)";

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
```

## 4.3 PUT — src/logic/updatePost.js

```jsx
// Fichero: src/logic/updatePost.js
const BASE_URL = import.meta.env.VITE_API_URL || "[http://localhost:3000](http://localhost:3000)";

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
```

## 4.4 DELETE — src/logic/deletePost.js

```jsx
// Fichero: src/logic/deletePost.js
const BASE_URL = import.meta.env.VITE_API_URL || "[http://localhost:3000](http://localhost:3000)";

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
```

## 4.5 (Opcional) Barrel — src/logic/index.js

```jsx
export { default as getPosts } from "./getPosts";
export { default as createPost } from "./createPost";
export { default as updatePost } from "./updatePost";
export { default as deletePost } from "./deletePost";
```

## Notas

- Crea un archivo `.env` en la raíz del Frontend con: `VITE_API_URL="[http://localhost:3000](http://localhost:3000)"` y reinicia el servidor de desarrollo.
- `import.meta.env` es específico de Vite. En otras herramientas, usa su mecanismo de env correspondiente.
- Este patrón por fichero facilita testear, mockear y reutilizar cada petición.

## 4.7 Página de lista (PostsPage) — explicación detallada

> Componente React que consume las funciones de lógica (getPosts, createPost, updatePost, deletePost) y gestiona la UI con modales.
> 

### 1) Importaciones clave

- Componentes de UI: `PostItem`, `EmptyState`, `CreatePostModal`, `EditPostModal`, `DeletePostModal`.
- Contexto: `usePostCount` para mantener un contador global de posts (útil para cabeceras o badges).
- Funciones de red (una por fichero): `getPosts`, `createPost`, `updatePost`, `deletePost`.

### 2) Estado del componente

- `posts`: array de publicaciones que se renderiza en la lista.
- `isCreateOpen`: controla visibilidad del modal de creación.
- `postEditing`: contiene el post que se está editando o `null` si no hay edición activa.
- `postDeleting`: contiene el post que se está eliminando o `null` si no hay eliminación activa.
- Del contexto: `setCount` para sincronizar el conteo global de posts.

### 3) Carga inicial de datos (useEffect nº1)

- Al montar el componente, se llama a `getPosts()`.
- Normalización: cada post recibe una propiedad `id` asegurando `post._id || [post.id](http://post.id)` para que los componentes hijos tengan una clave estable.
- Manejo de errores: se registra en consola si la petición falla.

Pseudocódigo relevante:

```jsx
useEffect(() => {
  getPosts()
    .then((data) => setPosts(Array.isArray(data)
      ? [data.map](http://data.map)((post) => ({ ...post, id: post._id || [post.id](http://post.id) }))
      : []
    ))
    .catch((error) => console.error("Error fetching posts:", error));
}, []);
```

### 4) Efecto derivado (useEffect nº2)

- Cada vez que cambia el número de posts:
    - Se actualiza el contador global con `setCount(posts.length)`.
    - Se actualiza el `document.title` para mostrar `Posts (N)`.

```jsx
useEffect(() => {
  setCount(posts.length);
  document.title = `Posts (${posts.length})`;
}, [posts.length, setCount]);
```

### 5) Crear post (handleCreate)

- Construye `payload` con `createdAt` usando `new Date().toISOString()`.
- Llama `createPost(payload)`.
- Normaliza el resultado a `{ ...created, id: created._id || [created.id](http://created.id) }`.
- Actualiza estado agregando el nuevo elemento al final y cierra el modal.

```jsx
async function handleCreate(data) {
  const payload = {
    user: data.user,
    imageUrl: data.imageUrl,
    description: data.description,
    createdAt: new Date().toISOString(),
  };
  const created = await createPost(payload);
  if (!created) return;
  const normalized = { ...created, id: created._id || [created.id](http://created.id) };
  setPosts((prev) => [...prev, normalized]);
  setIsCreateOpen(false);
}
```

### 6) Actualizar post (handleUpdate)

- Requiere que `postEditing` no sea `null`.
- Llama `updatePost([postEditing.id](http://postEditing.id), updateData)`.
- Normaliza y reemplaza el elemento correspondiente en el array.
- Limpia `postEditing` para cerrar el modal.

```jsx
async function handleUpdate(data) {
  if (!postEditing) return;
  const updated = await updatePost([postEditing.id](http://postEditing.id), {
    user: data.user,
    imageUrl: data.imageUrl,
    description: data.description,
  });
  if (!updated) return;
  const normalized = { ...updated, id: updated._id || [updated.id](http://updated.id) };
  setPosts((prev) => [prev.map](http://prev.map)((p) => ([p.id](http://p.id) === [postEditing.id](http://postEditing.id) ? normalized : p)));
  setPostEditing(null);
}
```

### 7) Eliminar post (handleDeleteConfirm)

- Llama `deletePost(id)`.
- Calcula `deletedId` con prioridad a `_id`, luego `id`, y por último el `id` de entrada como fallback.
- Filtra la lista y cierra el modal de eliminación.

```jsx
async function handleDeleteConfirm(id) {
  const deleted = await deletePost(id);
  if (!deleted) return;
  const deletedId = deleted._id || [deleted.id](http://deleted.id) || id;
  setPosts((prev) => prev.filter((p) => [p.id](http://p.id) !== deletedId));
  setPostDeleting(null);
}
```

### 8) Renderizado condicional

- Si `posts.length === 0`, muestra `EmptyState` con CTA para abrir el modal de creación.
- En caso contrario, lista de posts con `PostItem`.
    - `onEdit` abre el `EditPostModal` precargando el post actual.
    - `onDelete` abre el `DeletePostModal` para confirmar la eliminación.

```jsx
return (
  <section className="page">
    <div className="section-header">
      <div>
        <h2>Publicaciones</h2>
        <p>CRUD sencillo sobre posts con imagen obligatoria.</p>
      </div>
      <div className="section-actions">
        <button type="button" className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
          Crear post
        </button>
      </div>
    </div>

    {posts.length === 0 ? (
      <EmptyState title="Aún no hay publicaciones">
        <button type="button" className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
          Crear el primero
        </button>
      </EmptyState>
    ) : (
      <div className="posts-list">
        {[posts.map](http://posts.map)((post) => (
          <PostItem
            key={[post.id](http://post.id)}
            post={post}
            onEdit={(current) => setPostEditing(current)}
            onDelete={(current) => setPostDeleting(current)}
          />
        ))}
      </div>
    )}

    {isCreateOpen && (
      <CreatePostModal onClose={() => setIsCreateOpen(false)} onSubmit={handleCreate} />
    )}

    {postEditing && (
      <EditPostModal
        key={[postEditing.id](http://postEditing.id)}
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
```

### 9) Buenas prácticas y notas

- Normaliza siempre el identificador (`id`) para evitar inconsistencias entre `_id` de Mongo y `id` del Frontend.
- Maneja errores de red mostrando feedback al usuario además de registrar en consola.
- Cierra los modales al completar correctamente la operación.
- Mantén el contador global sincronizado si lo usas en cabeceras o navegación.
- Considera deshabilitar botones mientras hay peticiones en curso para evitar duplicados.

### Código completo: PostsPage.jsx

```jsx
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
  const [posts, setPosts] = useState([]); // Estado que contiene la lista de posts, lo iniciamos con un array vacío
  const [isCreateOpen, setIsCreateOpen] = useState(false); // Contorla la visibilidad del modal de creación
  const [postEditing, setPostEditing] = useState(null); // Contorla el post que se está editando
  const [postDeleting, setPostDeleting] = useState(null); // Contorla el post que se está eliminando
  const { setCount } = usePostCount();

  useEffect(() => {
    getPosts()
      .then((data) =>
        setPosts(
          Array.isArray(data)
            ? [data.map](http://data.map)((post) => ({
                ...post,
                id: post._id || [post.id](http://post.id),
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
        id: created._id || [created.id](http://created.id),
      };
      setPosts((prev) => [...prev, normalized]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  // Función para manejar la actualización de un post existente
  async function handleUpdate(data) {
    if (!postEditing) return;
    try {
      const updated = await updatePost([postEditing.id](http://postEditing.id), {
        user: data.user,
        imageUrl: data.imageUrl,
        description: data.description,
      });
      if (!updated) return;
      const normalized = {
        ...updated,
        id: updated._id || [updated.id](http://updated.id),
      };
      setPosts((prev) =>
        [prev.map](http://prev.map)((post) => ([post.id](http://post.id) === [postEditing.id](http://postEditing.id) ? normalized : post))
      );
      setPostEditing(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  // Función para manejar la confirmación de eliminación de un post
  async function handleDeleteConfirm(id) {
    try {
      const deleted = await deletePost(id);
      if (!deleted) return;
      const deletedId = deleted._id || [deleted.id](http://deleted.id) || id;
      setPosts((prev) => prev.filter((post) => [post.id](http://post.id) !== deletedId));
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
          {[posts.map](http://posts.map)((post) => (
            <PostItem
              key={[post.id](http://post.id)}
              post={post}
              onEdit={(current) => setPostEditing(current)} // Mediante esta prop se abre el modal de edición y le paso el post a editar
              onDelete={(current) => setPostDeleting(current)} // Mediante esta prop se abre el modal de eliminación y le paso el post a eliminar
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
          key={[postEditing.id](http://postEditing.id)}
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
```