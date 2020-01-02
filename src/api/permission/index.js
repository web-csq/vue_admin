import {
  post
} from "@/utils/request"

export const authorization=(data)=>
  post({
    data,
    url:"/permission/authorization"
  })

export const getPermissionInfoById=(data)=>
  post({
    data,
    url:"/permission/getPermissionInfoById"
  })

export const getPermissionsForRoleId=(data)=>
  post({
    data,
    url:"/permission/getPermissionsForRoleId"
  })

export const insertPermission=(data)=>
  post({
    data,
    url:"/permission/insertPermission"
  })

export const insertRole=(data)=>
  post({
    data,
    url:"/permission/insertRole"
  })
  
export const listAllRoles=()=>
  post({
    url:"/permission/listAllRoles"
  })

export const updatePermissionByIdSelective=(data)=>
  post({
    data,
    url:"/permission/updatePermissionByIdSelective"
  })

export const updateRoleByIdSelective=(data)=>
  post({
    data,
    url:"/permission/updateRoleByIdSelective"
  })
