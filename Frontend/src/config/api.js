// URL du backend
// - Par défaut: "/api" (si frontend et backend partagent le même domaine, ex: Vercel fullstack)
// - Override: VITE_API_BASE_URL (utile si frontend et backend sont sur 2 domaines différents, ex: Front sur Vercel + API sur Render)
//   Exemple: https://monwinners-1.onrender.com/api
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export default API_BASE_URL;

