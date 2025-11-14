import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",

});

instance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("admin-token");
  const userToken = localStorage.getItem("token");

  if (config.url.startsWith("/admin")) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return config;
});

export default instance;
