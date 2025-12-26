// URL du backend
// - En prod (Vercel): même origine -> "/api"
// - En local: override possible via VITE_API_BASE_URL (ex: http://localhost:5000/api)
const API_BASE_URL = import.meta.env.PROD
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api');

export default API_BASE_URL;

