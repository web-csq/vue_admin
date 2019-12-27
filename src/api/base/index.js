import { post } from "@/utils/request"
/**
 * 基础数据接口----学校模块
 */
//获取省,市，县
export const getProvinceOrCityOrCountry = (data) =>
  post({
    url:'/common/listDistrictByParentId',
    data
  })

  // 添加学校
  export const insertSchool = (data) => 
  post({
    url:'/school/insertSchool',
    data
  })

// 分页列出学校列表
export const listSchool =  (data) => 
  post({
    url:'/school/listSchool',
    data
  })

//启用或禁用学校
export const enableOrDisableSchools = (data) =>
  post({
    url:'/school/enableOrDisableSchools',
    data
  })

//修改学校
export const updateSchool = (data) => 
  post({
    url:'/school/updateSchool',
    data
  })




  /**
   * 用户管理模块
   */
//启用或禁用用户
export const enableOrDisableUsers = (data) =>
  post({
    url:'/user/enableOrDisableUsers',
    data
  })

//重置密码
export const resetPassword = (data) =>
  post({
    url:'/user/resetPassword',
    data
  })

//  添加学校管理员用户
export const insertSchoolAdministrator = (data) =>
  post({
    url:'/user/insertSchoolAdministrator',
    data
  })

  // 添加年级管理员用户
export const insertGradeAdministrator = (data) =>
  post({
    url:'/user/insertGradeAdministrator',
    data
  })

// 通过角色分页列出用户信息
export const listUserByRoleIdAndPage = (data) => 
  post({
    url:'/user/listUserByRoleIdAndPage',
    data
  })

// 添加省级管理员用户
export const insertProvincialAdministrator = (data) => 
  post({
    url:'/user/insertProvincialAdministrator',
    data
  })

// 添加市级管理员用户
export const insertMunicipalAdministrator = (data) => 
  post({
    url:'/user/insertMunicipalAdministrator',
    data
  })

  // 添加县/区级管理员用户
export const insertCountyAdministrator = (data) => 
post({
  url:'/user/insertCountyAdministrator',
  data
})



/***
 * 班级管理模块
 */
//  批量添加班级信息
export const batchInsert = (data) => 
  post({
    url:'/class/batchInsert',
    data
  })

//  分页列出班级信息
export const listClassByPage = (data) => 
  post({
    url:'/class/listClassByPage',
    data
  })

//列出班级信息
export const listClass = (data) => 
  post({
    url:'/class/listClass',
    data
  })

/**
 * 年级管理模块
 */
// 列出年级信息表
export const listGrade = (data) => 
  post({
    url:'/grade/listGrade',
    data
  })