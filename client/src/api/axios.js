import axios from 'axios';

const api = axios.create({
  // This points to your new Cloud Backend
  baseURL: 'https://swarms-backend.onrender.com/api', 
});

// Allow sending cookies/tokens automatically
api.defaults.withCredentials = false; // Changed to false for simpler deployment handling

export default api;