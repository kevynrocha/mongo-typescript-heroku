import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.OPEN_FOOD_URL,
});

export default api;
