import axios from "axios";

let baseURL
process.env.NODE_ENV === "development" ? baseURL = "/api" : baseURL = "";
/**
 * 创建axios实例
 */
const http = axios.create({
  baseURL,
  withCredentials:true,
  timeout: 6000
})
/**
 * axios 拦截器
 */
// request interceptor
http.interceptors.request.use(
  config => {


    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    
    if(response.data.code==="0000")
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default http;