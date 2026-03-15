import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api", 
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
