import { createContext, useContext, useState } from "react";

// Contexto ligero que expone el número total de posts y la función que lo actualiza.
// Nos permite compartir este dato (por ejemplo en la NavBar) sin tener que pasar props por todos los componentes.
export const PostCountContext = createContext(null);

// Componente Provider que envuelve a la aplicación (ver main.jsx) y hace accesible el contador a todo el árbol.
// - count: guarda el número de posts visibles en memoria.
// - setCount: lo actualizamos desde PostsPage cada vez que cambia la colección.
export function PostCountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <PostCountContext.Provider value={{ count, setCount }}>
      {children}
    </PostCountContext.Provider>
  );
}

// Hook de conveniencia para consumir el contexto en cualquier componente.
// Lanza un error descriptivo si se usa fuera del Provider para detectar fallos de integración en desarrollo.
export function usePostCount() {
  const ctx = useContext(PostCountContext);
  if (!ctx)
    throw new Error("usePostCount debe usarse dentro de PostCountProvider");
  return ctx;
}
