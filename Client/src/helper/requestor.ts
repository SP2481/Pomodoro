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
    get: async (url:string, config = {}) => {
        const response = await apiClient.get(url, {...config});
        return response.data;
        
    },
    post: async (url:string, data:any, config = {}) => {
        const response = await apiClient.post(url, data, {...config})
        return response.data;
    } ,
    put: (url:string, data:any, config = {}) => apiClient.put(url, data, {...config}),
}

export default requestor;