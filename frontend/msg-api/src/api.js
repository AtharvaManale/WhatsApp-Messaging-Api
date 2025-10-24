import axios from 'axios'

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/"
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, async(error)=>{
        const originalRequest = error.config;

        if(error.response?.status == 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const refreshToken = localStorage.getItem("refresh_token");

                const res = await axios.post("http://127.0.0.1:5000/auth/refresh", {}, {
                    headers:{Authorization:`Bearer ${refreshToken}`}
                });

                const newAccessToken = res.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(refreshErr){
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;