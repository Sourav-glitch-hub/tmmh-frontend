import axios from "axios";

const api = axios.create({
  baseURL: "https://tmmh-backend.onrender.com",
});

export default api;
