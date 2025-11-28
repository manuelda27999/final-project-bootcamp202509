# ⚛️ Proyecto final · Fase 2.2 (Semana 10)

En esta fase continuamos con el CRUD de *Posts* (creado en 2.1), pero el foco exclusivo es entender cómo `useEffect` y `useContext` trabajan juntos para compartir información global y mantenerla sincronizada.

---

## 🎯 Objetivo
- Practicar un **useEffect sencillo** que reacciona cuando cambia la lista de posts.
- Exponer un **dato global** (número de posts) mediante `useContext` y consumirlo fuera de la página principal (NavBar).

---

## 📚 Conceptos clave
- **useEffect**
  - Se ejecuta después del render cuando cambian las dependencias.
  - Aquí lo usamos para dos efectos simultáneos: actualizar `document.title` y avisar al contexto del nuevo total de posts.
- **useContext**
  - Evita el *prop drilling* compartiendo un valor desde un Provider global.
  - `PostCountContext` expone `{ count, setCount }`, de modo que cualquier componente puede leer el total actualizado.

---

## 🛠️ Alcance técnico
1. **PostsPage.jsx**
   - Mantiene el CRUD en memoria con `useState`.
   - `useEffect` observa `posts.length` y, cuando cambia, hace dos cosas:
     1. `document.title = "Posts (N)"`.
     2. `setCount(posts.length)` para sincronizar el contexto global.
2. **PostCountContext.jsx**
   - Define el contexto con `createContext`, almacena el `count` en el Provider y expone el hook `usePostCount()`.
3. **NavBar.jsx**
   - Consume `usePostCount()` para mostrar "Posts totales: N" en la barra, demostrando cómo cualquier parte de la app puede acceder al dato.
4. **main.jsx**
   - Envuelve el router con `PostCountProvider` para que el valor esté accesible en todas las páginas.

---

## ✅ Criterios de aceptación
- El contador global refleja siempre el número real de posts (alta, edición o borrado).
- `document.title` se actualiza tras cada cambio en la colección.
- No existen warnings de React sobre dependencias del efecto o uso del contexto.

---

## 📂 Archivos relevantes
```
src/
  components/
    NavBar.jsx            ← lee el contexto y muestra el total global
  contexts/
    PostCountContext.jsx  ← define Provider + hook usePostCount
  pages/
    PostsPage.jsx         ← ejecuta el useEffect y actualiza el contexto
  main.jsx                ← envuelve la app con PostCountProvider
```

Con este enfoque, el alumnado se centra únicamente en cómo `useEffect` (sincronizamos datos) y `useContext` (compartimos esos datos) se complementan sobre el CRUD ya conocido.
