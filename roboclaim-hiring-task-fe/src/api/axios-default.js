import axios from "axios";

axios.defaults.baseURL = "http://165.227.171.60:5000/";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default axios;