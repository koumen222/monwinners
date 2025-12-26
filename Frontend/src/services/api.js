import axios from 'axios';
import API_BASE_URL from '../config/api';

// Créer une instance axios avec la base URL configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

