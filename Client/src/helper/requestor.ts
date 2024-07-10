import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    withCredentials: true
})


apiClient.interceptors.request.use(
    config => {
        const accesstoken = Cookies.get('accesstoken');
        if(accesstoken && typeof accesstoken === 'string') {
            config.headers['accesstoken'] = accesstoken
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    response => {
        if(response?.data?.statusCode === 401) {
            Cookies.remove('accesstoken');
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

const requestor = {
    get: (url:string, config = {}) => apiClient.get(url, {...config}),
    post: (url:string, data:any, config = {}) => {
        apiClient.post(url, data, {...config})} ,
    put: (url:string, data:any, config = {}) => apiClient.put(url, data, {...config}),
}

export default requestor;