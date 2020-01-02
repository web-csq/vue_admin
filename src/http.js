import axios from "axios";
import { Message } from "iview"
import { resetTokenAndClearUser } from "@/utils/router"
import { Loading } from 'element-ui';
let baseURL=process.env.VUE_APP_URL;

/**
 * 创建axios实例
 */
const http = axios.create({
  baseURL,
  withCredentials:true,
  timeout: 100000000
})
/**
 * axios 拦截器
 */
// request interceptor
let LoadingInstance
http.interceptors.request.use(
  config => {

  if(config.url.indexOf("/login")==-1 || config.url.indexOf("/contactUs")==-1 || config.url.indexOf("/retrievePassword")==-1 || config.url.indexOf("/sendRetrievePasswordEmail")==-1){
      
  }else{
    LoadingInstance= Loading.service({
      target:"main-content",
      lock:true
    });
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
      LoadingInstance.close();
    },500)
    
    if(response.data.code==="8888"){
      resetTokenAndClearUser()
      window.history.go(0)
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