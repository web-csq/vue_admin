import http from "@/http"
import qs from "qs"

/**
 * 
 * @param {*} formdata 
 */
export const post=({url,data})=>
  new Promise((resolve,reject)=>
    http({
      method:"post",
      url,
      data:qs.stringify(data),
      headers:{
        "content-type":"application/x-www-form-urlencoded"
      }
    }).then(res=>resolve(res)).catch(err=>reject(err))
  )

  /**
   * 
   * @param {*} param0 
   * @param {*} headers application/json
   */
export const postJson=({url,data},headers)=>
  new Promise((resolve,reject)=>
    http({
      method:"post",
      url,
      headers,
      data
    }).then(res=>resolve(res)).catch(err=>reject(err))
  )

  /**
   * 
   * @param {*} get 
   */
export const get=({url,params})=>
  new Promise((resolve,reject)=>
    http({
      method:"get",
      url,
      params
    }).then(res=>resolve(res)).catch(err=>reject(err))
  )
