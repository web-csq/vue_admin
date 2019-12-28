import axios from "axios";
import { Message } from "iview"
import { resetTokenAndClearUser } from "@/utils/router"
import { Spin } from 'iview';
let baseURL=process.env.VUE_APP_URL;

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

  if(config.url.indexOf("/login")==-1){
    // Spin.show();
  }
   
  
    
    
    config.headers["x-requested-with"]="XMLHttpRequest"
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
   
    setTimeout(()=>{
      Spin.hide();
    },500)
    
    if(response.data.code==="8888"){
      resetTokenAndClearUser()
    }
    
    if(response.data.code!=="0000"){
      Message.warning(response.data.message)
    }
     
    return response.data
    
  },
  error => {
    Message.error('连接服务器超时！');
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default http;