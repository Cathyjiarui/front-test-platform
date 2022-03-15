import axios from 'axios'

//创建一个axios实例
const service = axios.create({
    //url = base url + request url
    // baseURL: "http://rear.cathyjiarui.com",
    baseURL: "http://localhost:8888",
    //配置请求超时时间
    timeout: 3000
})

//添加请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
    }
)

//添加响应拦截器
service.interceptors.response.use(
    response => {
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },
    error => {
        console.log(error)
    }
)

export default service