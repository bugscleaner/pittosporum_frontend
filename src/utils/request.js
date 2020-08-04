import axios from 'axios'
import { getToken, TokenKey} from './auth'
import router from '../router'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    baseURL:"/api/",
    timeout: 1000 * 60 * 5 // request timeout
})

// request interceptor
// service.defaults.withCredentials=true;
service.interceptors.request.use(
    config => {
        config.headers[TokenKey] = getToken()
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.hasError == true) {
            if (res.code == 'B0008') {
                router.replace({name:'login'})
            }else{
                return Promise.reject(response);
            }
        } else {
            return Promise.resolve(response);
        }
    },

    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 502:
                    // router.replace({name:'not505'})
                    break;
                case 404:
                    // router.replace({name:'not404'})
                    break;
                case 500:
                    console.log("Internal Server Error")
                    break;
                default:

            }
            return Promise.reject(error.response);
        }
    }
)

import qs from "qs"
export function post(url, params) {
    return new Promise((resolve, reject) => {
            console.log(JSON.stringify(params))
            service.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}