import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9000", withCredentials: true,
});

api.interceptors.response.use((response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url === "/refresh") {
            return Promise.reject(error);
        }

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await api.post("/refresh");

            return api(originalRequest);
        } catch {
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }

            return Promise.reject(error);
        }
    },);

export default api;
