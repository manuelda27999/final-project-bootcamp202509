import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import PostsPage from "./pages/PostsPage.jsx";
import MyPostsPage from "./pages/MyPostsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { PostCountProvider } from "./contexts/PostCountContext.jsx";

/*
0.0 - Lo PRIMERO de todo antes de empezar a desarrollar es crear un repositorio en GitHub y compartirlo con los compañeros de tu equipo.
0.1 - Uno de los compañeros creará el proyecto con Vite y React. 
0.2 - También creará la estructura de carpetas y archivos del proyecto.
0.3 - Configurará el router con las rutas principales y creará los componentes y páginas necesarias.
0.4 - Cada miembro del equipo deberá clonar el repositorio en su máquina local, instalar las dependencias y empezar a trabajar en su página asignada.
*/

/* 
1.0 - Configuración del router con las rutas principales
1.1 - Crear las rutas para las páginas: Inicio (PostsPage), Mis publicaciones (MyPostsPage), Perfil (ProfilePage), Mensajes (MessagesPage) y Notificaciones (NotificationsPage).
1.2 - Asegurarse de que cada ruta renderiza el componente correspondiente antes a empezar a desarrollar este.

Continua leyendo en App.jsx.
*/

// Define las rutas principales y qué pantalla corresponde a cada URL.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PostsPage /> },
      { path: "my-posts", element: <MyPostsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
]);

// Monta la aplicación en el nodo raíz y entrega el router al árbol de React.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostCountProvider>
      <RouterProvider router={router} />
    </PostCountProvider>
  </StrictMode>
);
