import axios from 'axios'

export const API_SERVER = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

API_SERVER.interceptors.request.use(
    (config) => {
        console.log("将要发送请求：", config)
        return config
    },
    (error) => {
        console.log("无法发送请求：", error)
        return Promise.reject(error);
    },
)

API_SERVER.interceptors.response.use(
    (response) => {
        console.log("收到了返回值：", response)
        return response.data
    },
    (error) => {
        console.log("收到了错误：", error)
        return Promise.reject(error.response.data);
    },  
)