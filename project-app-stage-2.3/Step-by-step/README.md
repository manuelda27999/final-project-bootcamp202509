# Proyecto Final - Express

# Paso a paso: Cómo crear tu API

## 1. Configuración del Servidor Básico

> 💡 **Objetivo:** En esta fase inicial levantaremos un servidor web sencillo. Esto creará los cimientos para que nuestra aplicación (Frontend) pueda comunicarse, enviar peticiones y recibir datos más adelante.
> 
1. **Prepara el entorno:** Crea una nueva carpeta (directorio) dedicada exclusivamente a la API de tu proyecto.
2. **Inicializa el proyecto:** Genera el archivo de configuración `package.json` que gestionará tu proyecto.
    1. Abre la terminal en la carpeta raíz de tu API y ejecuta:
        
        ```bash
        npm init
        ```
        
    2. Puedes dejar las opciones por defecto pulsando Enter, pero te recomendamos personalizar *description* y *author*.
        
        ![Screenshot 2025-11-28 at 12.13.48.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_12.13.48.png)
        
3. **Instala las herramientas necesarias:** Necesitaremos varias librerías para que todo funcione. Ejecuta en la raíz:
    
    ```bash
    npm i express mongoose dotenv
    ```
    
    *Esto instala Express (el servidor), Mongoose (para la base de datos futura) y Dotenv (para variables de entorno).*
    
    ![Screenshot 2025-11-28 at 12.19.06.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_12.19.06.png)
    
4. **Configura los permisos (CORS):** Para que tu Frontend pueda hablar con este Backend, necesitamos dar permiso de acceso.
    
    ```bash
    npm i cors
    ```
    
    ![Screenshot 2025-11-28 at 14.57.46.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_14.57.46.png)
    
5. **Crea el punto de entrada:** Crea un archivo llamado `index.js` en la raíz. Este será el corazón de tu servidor.
    
    ![Screenshot 2025-11-28 at 12.29.15.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_12.29.15.png)
    
6. **Ajusta el `package.json`:** Vamos a modernizar la configuración para usar `import` (ES Modules) y facilitar el arranque.
    1. Añade un script "start" para encender el servidor fácilmente:
        
        ```json
        "scripts": {
            "start": "node index.js",
            "test": "echo \"Error: no test specified\" && exit 1"
          },
        ```
        
    2. Define el tipo de módulo para poder usar `import` en lugar de `require`:
        
        ```json
        "type": "module",
        ```
        
        ![Screenshot 2025-11-28 at 13.00.17.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_13.00.17.png)
        
    3. **Importante:** Para asegurar que estos cambios se apliquen correctamente, ejecuta:
        
        ```bash
        npm i
        ```
        
7. **Escribe el código del servidor:** Escribe el siguiente código en tu `index.js`.  Hemos incluido comentarios explicativos:
    
    ```jsx
    import cors from "cors";
    import express from "express";
    /* 
        Nota: Usamos 'import' gracias a que configuramos "type": "module" en package.json.
        Es la forma moderna de hacer: const express = require("express");
    */
    
    const api = express(); // Creamos la instancia de la aplicación Express
    const PORT = 3000;     // Definimos el puerto donde escuchará el servidor
    
    // Middleware: Permite que lleguen peticiones desde otros dominios (CORS)
    api.use(cors());
    
    // Ruta de prueba: Para verificar que el servidor responde
    api.get("/", (req, res) => {
      res.send("Hello World!");
    });
    
    // Encendemos el servidor
    api.listen(PORT, () => {
      console.log(`API server running at [http://localhost:${PORT}`](http://localhost:${PORT}`));
    });
    ```
    
8. **¡Pruébalo!** Ejecuta el comando `npm start` en tu terminal.
    
    ![Screenshot 2025-11-28 at 12.43.09.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_12.43.09.png)
    
    ![Screenshot 2025-11-28 at 12.47.13.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_12.47.13.png)
    
    > 🚀 **¡Felicidades!** Si ves el mensaje en el navegador, tu servidor ya está vivo y funcionando.
    > 

## 2. Servidor con Datos (Mock Database)

> 💡 **Objetivo:** Ahora simularemos una base de datos dentro de la API. Esto nos servirá para que, cuando el Frontend pida información, el servidor tenga "algo" que devolver.
> 
1. **Estructura de datos:** Crea una carpeta llamada `data` en la raíz del proyecto. Dentro, crea un archivo [`post.data](http://post.data).js`.
    
    ![Screenshot 2025-11-28 at 13.02.57.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_13.02.57.png)
    
2. **Añade datos de prueba:** Copia el array de posts (el mismo que usabas en el Frontend) dentro de [`post.data](http://post.data).js`:
    
    ```jsx
    // Archivo: data/[post.data](http://post.data).js
    
    export const posts = [
      {
        id: "p1",
        user: "Ada Lovelace",
        imageUrl: "[https://picsum.photos/seed/ada/600/400](https://picsum.photos/seed/ada/600/400)",
        description:
          "Explorando interfaces simples: menos fricción, más foco en el flujo.",
        createdAt: "2025-10-01T10:00:00.000Z",
      },
      {
        id: "p2",
        user: "Grace Hopper",
        imageUrl: "[https://picsum.photos/seed/grace/600/400](https://picsum.photos/seed/grace/600/400)",
        description:
          "Pequeños pasos, grandes resultados. Empezando por un CRUD básico.",
        createdAt: "2025-10-02T12:30:00.000Z",
      },
      {
        id: "p3",
        user: "Linus Torvalds",
        imageUrl: "[https://picsum.photos/seed/linus/600/400](https://picsum.photos/seed/linus/600/400)",
        description: "Iterar, medir, simplificar. El orden será el del array.",
        createdAt: "2025-10-03T09:15:00.000Z",
      },
    ];
    
    export default posts;
    ```
    
3. **Conecta los datos al servidor:** En tu archivo `index.js`, importa los datos que acabas de crear.
    
    ```jsx
    import posts from "./data/[post.data](http://post.data).js";
    
    // Consejo: Puedes hacer un console.log(posts) aquí para verificar que cargan bien.
    console.log("Datos de posts cargados:", posts);
    ```
    
4. **Crea el Endpoint (La ruta):** Define una nueva ruta en `index.js` para que cuando alguien pida "/posts", el servidor responda con los datos en formato JSON.
    
    ```jsx
    // Ruta GET para obtener todas las publicaciones
    api.get("/posts", (req, res) => {
      res.json(posts); // Respondemos enviando los datos como JSON
    });
    ```
    
5. **Verificación:** Abre tu navegador y visita [`http://localhost:3000/posts`](http://localhost:3000/posts). Deberías ver tus datos en bruto.
    
    ![Screenshot 2025-11-28 at 13.16.47.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_13.16.47.png)
    
    > 🚀 **¡Genial!** Tu servidor ya no solo funciona, sino que **escucha** peticiones y **responde** con información útil.
    > 

## 3. Conectar el Frontend (Consumo de API)

> 💡 **Objetivo:** Vamos a hacer que tu aplicación React (Frontend) pida los datos a tu nuevo servidor (Backend) en lugar de leerlos de un archivo local.
> 
1. **Organización:** En tu proyecto Frontend (dentro de `src`), crea una carpeta llamada `logic` para organizar la lógica de conexión.
    
    ![Screenshot 2025-11-28 at 13.27.49.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_13.27.49.png)
    
2. **Función de petición:** Crea un archivo `getPosts.js` dentro de `logic`. El nombre describe exactamente qué hace.
    
    ![Screenshot 2025-11-28 at 13.29.06.png](Proyecto%20Final%20-%20Express/Screenshot_2025-11-28_at_13.29.06.png)
    
3. **Lógica del Fetch:** Implementa la función que irá a buscar los datos a tu API.
    
    ```jsx
    // Archivo: src/logic/getPosts.js
    
    async function getPosts() {
      // Hacemos la petición a la URL de TU servidor local
      return fetch("[http://localhost:3000/posts](http://localhost:3000/posts)")
        .then((response) => response.json()) // 1. Recibimos respuesta y la convertimos a JSON
        .then((data) => {
          console.log(data); // 2. Vemos los datos por consola (opcional, para debug)
          return data;       // 3. Devolvemos los datos limpios
        })
        .catch((error) => {
          console.error("Error al obtener los posts:", error); // Gestión de errores
        });
    }
    
    export default getPosts;
    ```
    
4. **Integración en el Componente:** Ve a tu archivo `PostPage.jsx` (donde muestras la lista) y actualízalo:
    1. **Estado inicial:** Inicializa tus posts como un array vacío, ya que al principio no tenemos datos (tienen que llegar del servidor).
        
        ```jsx
        // Archivo: PostPage.jsx
        const [posts, setPosts] = useState([]);
        ```
        
    2. **Efecto de carga (useEffect):** Usamos `useEffect` para llamar a la API una sola vez cuando el componente se monta.
        
        ```jsx
        // Archivo: PostPage.jsx
        useEffect(() => {
            // Llamamos a nuestra función de lógica
            getPosts()
              .then((data) => setPosts(data)) // Camino feliz: guardamos los datos recibidos en el estado
              .catch((error) => console.error("Error fetching posts:", error)); // Camino triste: mostramos el error
          }, []); // El array vacío [] asegura que esto solo se ejecute una vez al cargar
        ```