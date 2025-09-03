// src/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if backend is hosted differently
});

export const setAuthToken = (token: string | null) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
};

export default API;
