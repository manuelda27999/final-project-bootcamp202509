import { NavLink } from "react-router-dom";
import { usePostCount } from "../contexts/PostCountContext.jsx";

/* 
3.0 - Vamos a crear un array de objetos para los enlaces de navegación. 
3.1 - Cada objeto tendrá las propiedades 'to' (ruta), 'label' (texto del enlace) y 'end' (booleano para la ruta exacta).
3.2 - Usaremos este array para mapear y generar los enlaces de navegación en el NavBar.
*/

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/my-posts", label: "Mis publicaciones" },
  { to: "/profile", label: "Perfil" },
  { to: "/messages", label: "Mensajes" },
  { to: "/notifications", label: "Notificaciones" },
];

export default function NavBar() {
  const { count } = usePostCount();
  return (
    <nav className="nav">
      {/* Sección de marca con nombre y descripción de la red social */}
      <div className="nav-brand">
        <h1>Conecta Team</h1>
        <p>Tu red social corporativa para seguir a tu equipo.</p>
      </div>
      {/* Lista de enlaces que permite moverse entre las vistas principales */}
      <ul className="nav-list">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-counter">
        Posts totales: <strong>{count}</strong>
      </div>

      {/* 3.3 - Este es un ejemplo de como el mapeo está funcinando por detrás, 
      puedes comentar la lista de arriba (etiqueta <ul></ul>) y descomentar la que muestro abajo (etiqueta <ul></ul>)*/}

      {/* <ul className="nav-list">
        <li key={links[0].to}>
          <NavLink
            to={links[0].to}
            end={links[0].end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {links[0].label}
          </NavLink>
        </li>
        <li key={links[1].to}>
          <NavLink
            to={links[1].to}
            end={links[1].end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {links[1].label}
          </NavLink>
        </li>
        <li key={links[2].to}>
          <NavLink
            to={links[2].to}
            end={links[2].end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {links[2].label}
          </NavLink>
        </li>
        <li key={links[3].to}>
          <NavLink
            to={links[3].to}
            end={links[3].end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {links[3].label}
          </NavLink>
        </li>
        <li key={links[4].to}>
          <NavLink
            to={links[4].to}
            end={links[4].end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {links[4].label}
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
}
