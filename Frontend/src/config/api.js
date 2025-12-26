// URL du backend
// - En prod (Vercel): on utilise la même origine -> "/api"
// - En local: vous pouvez définir VITE_API_BASE_URL dans Frontend/.env (ex: http://localhost:5000/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default API_BASE_URL;

