import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create an axios instance with dynamic baseURL
const api = axios.create({
  baseURL: baseURL,  
  withCredentials: true,  
});

// Optionally, you can add default headers or other configurations
api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;
