import { post } from "@/utils/request"
export const login=(data)=>
  post({
    url:"/login",
    data
  })

export const info=()=>
  post({
    url:"/info"
  })