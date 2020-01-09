import { post,postJson } from "@/utils/request"

/**
 * 
 * @param {*} data 
 * 总分分段
 */
export const selectExamSchoolTarget=(data)=>
  post({
    data,
    url:"/examSchoolTarget/selectExamSchoolTarget"
  })
  
export const insertExamTarget=(data)=>
  post({
    data,
    url:"/examSchoolTarget/insertExamTarget"
  })
  
export const updateExamTarget=(data)=>
  post({
    data,
    url:"/examSchoolTarget/updateExamTarget"
  })

/**
 * @param {*} data 
 * 学科分段
 */  
export const selectExamSchoolSubjectTarget=(data)=>
  post({
    data,
    url:"/examSchoolSubjectTarget/selectExamSchoolSubjectTarget"
  })

export const listSchoolSubjectsTarget=(data)=>
  post({
    data,
    url:"/examSchoolSubjectTarget/listSchoolSubjectsTarget"
  })

export const insertExamSchoolSubjectTarget=(data)=>
  post({
    data,
    url:"/examSchoolSubjectTarget/insertExamSchoolSubjectTarget"
  })

export const updateExamSchoolSubjectTarget=(data)=>
  post({
    data,
    url:"/examSchoolSubjectTarget/updateExamSchoolSubjectTarget"
  })