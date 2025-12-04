# Proyecto Final - Express + MongoDB Atlas

# 1. Configuración de MongoDB Atlas y preparación de la API

1. Crea una cuenta en MongoDB Atlas y crea un cluster

   [Diapositivas de Guy](https://campus.eurofirmsuniversity.com/mod/resource/view.php?id=10091)

2. Crea una base de datos para tu aplicación y una colección, debes de ver algo como esto

   ![Screenshot 2025-12-04 at 10.56.12.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_10.56.12.png)

3. En tu proyecto en la parte de la API debes de instalar mongodb si aún no lo has hecho

   ![Screenshot 2025-12-04 at 10.57.35.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_10.57.35.png)

4. Debes de crear un archivo .env para guardar las variables de entorno

   ![Screenshot 2025-12-04 at 11.02.27.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.02.27.png)

5. Escribe esta información en tu archivo .env

   ```
   # Copia este fichero a .env y completa los datos
   MONGO_URI=
   MONGO_DB=
   PORT=3000
   ```

6. En MONGO_URI escribe la url de tu cluster

   1. Accede a esta en los tres puntos a la derecha del nombre del cluster

      ![Screenshot 2025-12-04 at 11.11.43.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.11.43.png)

   2. Selecciona “Connect via…”

      ![Screenshot 2025-12-04 at 11.13.40.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.13.40.png)

   3. Luego clica en “Choose a connection method”

      ![Screenshot 2025-12-04 at 11.15.47.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.15.47.png)

   4. Elige Drivers

      ![Screenshot 2025-12-04 at 11.16.00.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.16.00.png)

   5. En el apartado de “3.Add your connection string into your application code” encontrarás la URL que tienes que pegar en MONGO_URI

      1. Recuerda modificar <db_password> con la contraseña

         ![Screenshot 2025-12-04 at 11.20.04.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.20.04.png)

7. En MONGO*DB escribe el nombre de la base de datos, en mi caso \_bootcamp-202509*. Al final tu archivo .env se debe ver como algo así pero con tus propios datos.

   ```json
   MONGO_URI="mongodb+srv://manuelda27999:contraseña123@instaflan.0hx3hzk.mongodb.net/?appName=Instaflan"
   MONGO_DB="bootcamp-202509"
   PORT=3000
   ```

8. Vamos a añadir algunos datos a tu colección para tenerlos disponibles para más tarde, clica en el nombre de la colección y luego en ADD DATA.

   1. Este es mi modelo en la base de datos JS

      ![Screenshot 2025-12-04 at 11.35.23.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.35.23.png)

   2. Y esta es la estructura que al hacer la inserción en formato JSON, puedes añadir dos o tres elementos, eso es suficiente.

      ![Screenshot 2025-12-04 at 11.33.58.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.33.58.png)

9. Enhorabuena!!! Tu base de datos está lista para funcionar, el siguiente paso es hacer la petición desde la API 😉

---

# 2. Conexión de la API con la base de datos

1. Crea esta estructura en tu carpeta `src` para añadir organización al proyecto (la empezaremos a utilizar poco a poco)

   ![Screenshot 2025-12-04 at 11.57.31.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_11.57.31.png)

2. Vamos a crear la conexión a la base de datos, esto lo hacemos en un nuevo archivo dentro de la carpeta config, lo llamaremos _db.js_

   1. Este el contenido que debemos de escribir en el archivo (configuración muy similar a la que hace Guy en su proyecto)

      ```jsx
      //Fichero db.js

      import mongoose from "mongoose";

      const connectDB = async () => {
        try {
          await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
          });
          console.log("[OK] Se ha conectado correctamente a MongoDB");
        } catch (err) {
          console.error("[ERROR] Error de conexión a MongoDB: ", err);

          process.exit(1);
        }
      };

      export default connectDB;
      ```

3. El siguiente paso en ejecutar esta función que conecta con la base de datos y verificar si la conexión se ha realizado de forma correcta. Para ello vamos al archivo principal de nuestra API, en mi caso index.js.

   1. Realizamos varias importaciones de elementos que vamos a utilizar

      ```jsx
      // Fichero index.js

      import dotenv from "dotenv"; //dotenv nos permitirá usar las variables de entorno desde un archivo .env
      import connectDB from "./src/config/db.js"; //Importamos la función para conectar a la base de datos
      ```

   2. De esta manera podemos usar las variables de entorno en nuestro servidor

      ```jsx
      // Fichero index.js

      // Cargar variables de entorno desde el archivo .env
      dotenv.config();
      const PORT = process.env.PORT || 3000;
      ```

   3. El siguiente paso es ejecutar la función conncectDB para realizar la conexión con la base de datos. Para ello escribimos el siguiente código

      ```jsx
      // Fichero index.js

      // Conectar a la base de datos
      await connectDB();
      ```

   4. Las primeras líneas de tu archivo index.js se deben de ver similar a esto:

      ```jsx
      import express from "express";
      import cors from "cors";
      import dotenv from "dotenv";
      import connectDB from "./src/config/db.js";

      // Cargar variables de entorno desde el archivo .env
      dotenv.config();
      const PORT = process.env.PORT || 3000;

      // Conectar a la base de datos
      await connectDB();

      const api = express();

      // Middleware para que el servidor acepte peticiones de cualquier dirección
      api.use(cors());
      ```

   5. El último paso para comprobar si hemos tenido éxito es ejecutar en nuestra terminal el servidor, para ellos hacemos:

      ```bash
      npm start
      ```

   6. Si puedes observar el mensaje de éxito, FELICIDADES has conseguido hacer la conexión exitosamente.

      ![Screenshot 2025-12-04 at 12.48.46.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_12.48.46.png)

   7. Ahora puedes pasar al último paso para obtener la información de la base de datos.

---

# 3. Petición GET a la base de datos

1. Vamos a crear un modelo para nuestra colección. En mi caso la colección es `posts`, así que creamos el fichero `src/models/post.model.js` con este contenido:

   ```jsx
   // Fichero src/models/post.model.js
   import mongoose from "mongoose";

   const postSchema = new mongoose.Schema({
     user: { type: String, required: true },
     imageUrl: { type: String, required: true },
     description: { type: String, required: true },
     createdAt: { type: Date, default: Date.now, required: true },
   });

   export default mongoose.model("Post", postSchema, "posts");
   ```

2. Añadimos una ruta GET en `index.js` para leer desde la base de datos. También activamos el parseo de JSON por si luego ampliamos con POST:

   ```jsx
   // Fichero index.js (continúa debajo de la configuración existente)
   import express from "express";
   import cors from "cors";
   import dotenv from "dotenv";
   import connectDB from "./src/config/db.js";
   import Post from "./src/models/post.model.js"; // ⬅️ import del modelo

   dotenv.config();
   const PORT = process.env.PORT || 3000;

   await connectDB();

   const api = express();
   api.use(cors());
   api.use(express.json()); // ⬅️ útil para futuras rutas POST/PUT

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

   api.listen(PORT, () => console.log(`API funcionando en puerto ${PORT}`));
   ```

3. Probamos la petición desde el navegador o con una herramienta tipo curl/Postman. Si ves un array de objetos como respuesta, ¡enhorabuena! Ya estás leyendo datos reales de tu colección `posts` desde la API.

   ![Screenshot 2025-12-04 at 13.28.41.png](Proyecto%20Final%20-%20Express%20+%20MongoDB%20Atlas/Screenshot_2025-12-04_at_13.28.41.png)
