import axios from "axios";
// import store from "./store";
// import { LOGOUT } from "./types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://52.53.242.81:7088/japan/edu/api/',
  headers: {
    "Content-Type": "application/json",
    
   "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTAxMjM0NTY4IiwiaWF0IjoxNzMwNzA5MDk5LCJleHAiOjE3MzA4ODE4OTl9.GtGGcpx4fc09YCJdnY3W0lTmetLt-LuVSPoL5iPvkYI",
    // "admin_token": localStorage.token
  },
});

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );

export default api;