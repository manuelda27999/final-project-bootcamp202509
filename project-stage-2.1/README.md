# ⚛️ Proyecto final - Fase 2.1 (Semana 10)

## 🎯 Objetivo de la fase

Construir un **CRUD sencillo** en memoria centrado en la entidad **Post** con modelo minimalista. El foco es ganar soltura creando, editando y eliminando elementos sin bloquearse, respetando la estética y estructura de la **Fase 1**.

---

## 📚 Conceptos teóricos aplicados

- **CRUD:** Create, Read, Update, Delete sobre una colección.
- **Estado local y colecciones:** `useState` y operaciones **inmutables**.
- **Identificadores estables:** `id` único por elemento para keys y localizar elementos a editar/borrar.
- **Formularios controlados:** inputs ligados al estado con validación simple.

---

## 🛠️ Alcance técnico (Semana 10 · Fase 2.1)

- **Read (R):** listar posts con `.map()` y `key = id`.
- **Create (C):** botón “Crear post” abre un **modal** con formulario controlado. Generar `id` y `createdAt`.
- **Update (U):** botón “Editar” abre un **modal** precargado con los datos del post.
- **Delete (D):** botón “Eliminar” abre un **modal** de confirmación (sin `window.confirm`).
- **Estado:** `useState` para la colección y para controlar la visibilidad de cada modal desde `PostsPage`.
- **Restricciones:** no usar `useEffect` ni `useContext` en esta fase.
- **Orden:** se respeta el orden del array (no ordenar por fecha).

---

## 💡 Buenas prácticas y estilo de código

- Inmutabilidad: usar `map`, `filter` y spread para crear nuevas referencias.
- Respetar estilos de la Fase 1: layout, botones (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`) y apariencia de tarjetas.
- Componentes pequeños y reutilizables: `PostItem`, `CreatePostModal`, `EditPostModal`, `DeletePostModal`, `EmptyState`.
- Validación mínima (campos requeridos) y mensajes claros.
- Accesibilidad: `label`, `role="dialog"`, `aria-modal` y cierre en overlay.

---

## ✅ Criterios mínimos de aceptación

- La lista se renderiza sin warnings ni errores.
- Se puede **crear** un elemento sin que las propiedades estén vacías.
- Se puede **editar** un post existente en modal.
- Se puede **eliminar** un post con confirmación en modal.
- Keys estables e inmutabilidad del estado.
- UX básica: estado vacío visible y CTA para crear.
- No usar `useEffect` ni `useContext`.

---

## 👥 Grupos de trabajo

- **Grupo 1:** Santos, Ouissam, Ricardo, Marc
- **Grupo 2:** Natalia, Daniel, Cristobal
- **Grupo 3:** Jesús, Javier, Pepi, Nuria

---

## 🧠 División de responsabilidades y flujo de trabajo

- Todos trabajan en la misma rama principal (`main`).
- Cada persona trabaja en su propio archivo (página) pero comparte el CSS común.
- El CSS se divide por secciones; cada miembro trabaja solo en su bloque CSS.
- Resolver conflictos en equipo al integrar cambios.
- En esta fase, el CRUD se implementa en `PostsPage`; el resto de páginas se mantienen.

---

## 📤 Entregables

- Repositorio GitHub del grupo.
- App ejecutable con `npm install && npm run dev`.
- README del grupo actualizado con decisiones de la fase 2.1.

---

## 🗂️ Estructura recomendada

```
src/
  components/
    PostItem.jsx
    CreatePostModal.jsx
    EditPostModal.jsx
    DeletePostModal.jsx
    EmptyState.jsx
  pages/
    PostsPage.jsx
  data/
    postsSoft.data.js
  App.jsx
  main.jsx
```
