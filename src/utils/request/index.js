import http from "@/http"
import qs from "qs"
export const post=({url,data})=>
  new Promise((resolve,reject)=>
    http({
      method:"post",
      url,
      data:qs.stringify(data)
    }).then(res=>resolve(res)).catch(err=>reject(err))
  )


export async function get({url,params}){
  try {
    return new Promise((resolve, reject) =>http.get(url, ...params)).then(res=>resolve(res)).catch(err=>reject(err))
  }
  catch (err) {
    return err;
  }
}