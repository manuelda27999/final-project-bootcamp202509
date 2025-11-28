import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

/* 
2.0 - Estructura principal de la aplicación.
2.1 - Crear el componente App.jsx que incluya el NavBar, el Outlet para las rutas y el Footer.
2.2 - Recuerda que el Outlet es donde se renderizan las páginas según la ruta activa.
2.3 - Asegurarse de que el NavBar y el Footer se renderizan en todas las páginas.

Continua leyendo en NavBar.jsx y Footer.jsx.
*/

export default function App() {
  return (
    <>
      <header>
        {/* Barra de navegación visible en todas las pantallas */}
        <NavBar />
      </header>
      <main>
        {/* Zona donde se inyecta la página que corresponde a la ruta activa */}
        <Outlet />
      </main>
      {/* Pie global con información de la red social */}
      <Footer />
    </>
  );
}
