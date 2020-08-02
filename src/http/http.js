import axios from "axios";
import { Message } from 'element-ui'
import store from '../store/index'

axios.defaults.timeout = 7000;
axios.defaults.baseURL = process.env.VUE_APP_URL + "api";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    config => {
        // 每次发送请求之 前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.user.token;
        token && (config.headers.Authorization = 'Bearer ' + token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)
axios.interceptors.response.use(
    response => {
        return response;
    },
    // 服务器状态码不是2开头的的情况,这里可以跟你们的后台开发人员协商好统一的错误状态码,然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 自行扩展
    error => {
        console.log(error);
        if (error.code === 'ECONNABORTED' || error.message === 'Network Error') Message.error(`连接超时，请检查网络后刷新页面`)
        if (error.response.status == 401) Message.error(`401`)
        if (error.response.status == 422) Message.error(`422-${error.response.statusText}:请求实体的语法是正确的，请检查参数`)
        if (error.response.status == 500) Message.error(`500-${error.response.statusText}:服务器内部错误`)
        return Promise.reject(error);
        // if (error.response.status) {
        //     switch (error.response.status) {
        //         // 401: 未登录
        //         // 未登录则跳转登录页面，并携带当前页面的路径
        //         // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //         case 401:
        //             localStorage.removeItem('Authorization');
        //             router.replace({
        //                 path: '/login',
        //                 query: {
        //                     redirect: router.currentRoute.fullPath
        //                 }
        //             });
        //             break;

        //         // 403 token过期
        //         // 登录过期对用户进行提示
        //         // 清除本地token和清空vuex中token对象
        //         // 跳转登录页面
        //         case 403:
        //             Message({ message: `错误403,登录过期，请重新登录`, type: "error" })

        //             // 清除token
        //             localStorage.removeItem('token');
        //             store.commit('loginSuccess', null);
        //             // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        //             setTimeout(() => {
        //                 router.replace({
        //                     path: '/login',
        //                     query: {
        //                         redirect: router.currentRoute.fullPath
        //                     }
        //                 });
        //             }, 1000);
        //             break;

        //         // 404请求不存在
        //         case 404:
        //             console.log("error.response:")
        //             console.log(error.response)
        //             Message({ message: `错误404,网络请求不存在`, type: "error" })
        //             break;
        //         // 其他错误，直接抛出错误提示
        //         default:
        //             console.log("error:")
        //             // Message({message:error.response.data.message,type:"error"})
        //             console.log(error)
        //             Message({ message: error.toString(), type: "error" })

        //     }
        //     return Promise.reject(error.response);
        // }
    }
)
const http = {
    get(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err)
            });
        })
    },
    patch(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
        })
    },
    put(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
        })
    }
}

export default http



