# ⚛️ Proyecto final - Fase 1

## **🎯 Objetivo de la fase**

Construir el **MVP inicial** con:

- Estructura base del proyecto y **componentes reutilizables** (Card, Product, Message, User).
- Uso de **props** en los componentes.
- **Lista** de entidades con .map() y **keys** estables.
- **Estado local** con useState.
- **Navegación con router** usando React Router DOM.

## 📚 Conceptos teóricos aplicados

- **Componentes y props:** creación de componentes reutilizables que reciben datos a través de props para mostrar información dinámica.
- **useState:** manejo del estado local para controlar datos que cambian en la interfaz.
- **Listas dinámicas:** renderizado de listas usando .map() y asignando keys únicas para optimizar el renderizado.
- **Router:** navegación entre páginas usando React Router DOM para gestionar rutas y vistas.
- **Composición:** combinación de componentes para construir interfaces complejas de forma modular y mantenible.

---

## **🧩 Líneas de proyecto (elige 1, pero define múltiples páginas para repartir)**

> Cada página debe de tener un tipo de dato establecido, como posts, users, items, services…
> Con diferentes propiedades
> Se debe de poder **listar, crear, editar y eliminar**

> Cada persona trabaja un **1 página con su propia memoria local**

### **A) Mini Red Social**

- **Publicaciones** (PostsPage)
- **Perfil** (ProfilePage)
- **Mensajes** (MessagesPage)
- **Notificaciones** (NotificationsPage)

**Modelo ejemplo**

```jsx
// posts.data.js
export const initialPosts = [
  {
    id: "p1",
    title: "Hola React",
    content: "Primer post",
    author: "Ada",
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "p2",
    title: "Componentes",
    content: "Reutiliza y compón",
    author: "Grace",
    createdAt: "2025-10-02T12:30:00Z",
  },
];
```

### **B) Inventario / Gestor**

- **Items** (InventoryPage)
- **Clientes** (ClientsPage)
- **Empresas** (CompaniesPage)
- **Mensajes** (SupportPage)

**Modelo ejemplo**

```jsx
// items.mocks.js
export const initialItems = [
  {
    id: "i1",
    name: "Teclado",
    description: "Teclado super moderno",
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "i2",
    name: "Ratón",
    description: "Inalámbrico",
    createdAt: "2025-10-02T12:30:00Z",
  },
];
```

### **C) Gestor Personal**

- **Empleados** (EmployeesPage)
- **Clientes** (ClientsPage)
- **Departamentos** (DepartmentsPage)
- **Proyectos** (ProjectsPage)

### **D) Modelo abierto**

- Consultar con el profesor
- Debe de tener varias secciones y varios modelos de datos que se puedan crear, ver, modificar y eliminar.

---

## **🛠️ Alcance técnico (MVP Semana 1)**

- **Componentes**: Card (reutilizables).
- **Páginas** (1 por persona): cada página tiene **lista**.
- **Estado**: useState para la colección.
- **Listas**: .map() con key = id (no usar índice).
- **Navegación**: usando router.

---

## 💡 Buenas prácticas y estilo de código

- Nombres de componentes en PascalCase y archivos en camelCase.
- Un componente por archivo.
- Código limpio y con comentarios en español.
- No repetir código: reutilizar componentes.
- Estructura de carpetas coherente para todos.
- Commits descriptivos en presente.

---

## ✅ Criterios mínimos de aceptación

- La app arranca sin errores ni warnings en consola.
- Hay barra de navegación que cambia de pestaña con router.
- Cada página muestra una lista de su entidad.
- Keys estables en la lista (no usar índice).
- Se usan componentes reutilizables para la interfaz.

---

## 👥 Grupos de trabajo

- **Grupo 1:** Santos, Ouissam, Ricardo, Marc
- **Grupo 2:** Natalia, Victor, Daniel, Cristobal
- **Grupo 3:** Jesús, Javier, Pepi, Nuria

## 🧠 División de responsabilidades y flujo de trabajo

- Todos trabajan en la misma rama principal (main).
- Cada persona trabaja en su propio archivo (página) pero comparte el CSS común.
- El CSS debe dividirse por secciones; cada miembro trabaja solo en su bloque CSS.
- Resolver conflictos en equipo al integrar cambios.

---

## 📤 Entregables

- Repositorio GitHub del grupo.
- App ejecutable con npm install && npm run dev.
- README.md con:
  - Páginas asignadas (quién hace qué).
  - Instrucciones de ejecución.
  - Decisiones técnicas (navegación por react router dom, componentes comunes).

---

## 🗂️ Estructura recomendada

```
src/
  components/    # Componentes reutilizables (Card, Button, etc.)
  pages/         # Páginas principales (PostsPage, ProfilePage, etc.)
  data/          # Datos mock o iniciales
  styles/        # Archivos CSS o SASS
  App.jsx        # Configuración del router y layout principal
  index.jsx      # Entrada principal de React
```
