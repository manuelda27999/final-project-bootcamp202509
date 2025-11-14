// Datos mock que representan el feed principal de la red social.
const posts = [
  {
    id: 1,
    author: { name: "Laura Gómez", role: "Talent Manager", initials: "LG" },
    timestamp: "Hace 12 minutos",
    content: [
      "Hoy damos la bienvenida a la nueva cohorte de especialistas en talento digital. Son perfiles con foco en cultura y employer branding que se incorporan la próxima semana.",
      "Recibirán un kit de onboarding y un mentor asignado. ¡Gracias al equipo que lo hizo posible!",
    ],
    tags: ["#TalentBoost", "#Onboarding", "#Cultura"],
    stats: { likes: 48, comments: 12, shares: 6 },
  },
  {
    id: 2,
    author: { name: "Carlos Pérez", role: "Tech Lead", initials: "CP" },
    timestamp: "Hace 1 hora",
    content: [
      "El equipo de tecnología desplegó la nueva versión del portal interno con mejoras en accesibilidad y gestión de vacaciones.",
      "Queremos tu feedback para pulir detalles antes del lanzamiento oficial.",
    ],
    tags: ["#Producto", "#TechTeam"],
    stats: { likes: 62, comments: 21, shares: 14 },
  },
  {
    id: 3,
    author: { name: "Ana Ruiz", role: "HR Business Partner", initials: "AR" },
    timestamp: "Hace 2 horas",
    content: [
      "Este jueves tendremos un espacio abierto para hablar de bienestar remoto: desconexión digital, ergonomía y dinámicas de equipo.",
      "Compartiremos las conclusiones aquí para quienes no puedan asistir en directo.",
    ],
    tags: ["#Bienestar", "#PeopleCare"],
    stats: { likes: 37, comments: 8, shares: 5 },
  },
];

export default posts;
