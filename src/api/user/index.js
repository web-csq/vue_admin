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

  //修改密码
export const changePassword=(data)=>
  post({
    url:"/user/changePassword",
    data
  })

  //修改用户头像
export const changePic=(data)=>
  post({
    url:"/user/changePic",
    data
  })

  /**
   * 通过用户id有选择的修改用户基本信息
   * @param {*} data 
   */
export const updateUserByIdSelected = (data)=>
  post({
    url:'/user/updateUserByIdSelected',
    data
  })

/**
 * 联系我们--注册接口
 */
export const contactUs = (data)=>
  post({
    url:'/contactUs',
    data
  })
//发送找回密码邮件
  export const sendRetrievePasswordEmail = (data) =>
  post({
    url:"/sendRetrievePasswordEmail",
    data
  })
//找回密码
export const retrievePassword = (data) =>
  post({
    url:"/retrievePassword",
    data
  })
  /**
   * 
   * @param {*} data 列出班级列表 
   * 
   */
export const listClass=(data)=>
  post({
    url:"/class/listClass",
    data
  })

export const listUserByRoleIdAndPage=(data)=>
  post({
    url:"/user/listUserByRoleIdAndPage",
    data
  })
