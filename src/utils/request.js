/*
 * 全局请求封装
 */
import axios from 'axios'
import { message } from 'ant-design-vue'

//创建axios实例
const request = axios.create({
    timeout: 8000,
    baseURL: import.meta.env.VITE_BASE_URL
})

//请求拦截
request.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers['X-Access-Token'] = token
    }
    return config
})

//响应拦截
request.interceptors.response.use(
    response => response.data,
    error => {
        let msg = ''
        const status = error.response?.status
        switch (status) {
            case 401:
                msg = 'TOKEN过期'
                break
            case 403:
                msg = '无权访问'
                break
            case 404:
                msg = '请求地址错误'
                break
            case 500:
                msg = '服务器出现问题'
                break
            default:
                msg = '网络出现问题'
                break
        }
        //提示错误信息
        message.error(msg)
        return Promise.reject(error)
    },
)

export default request
