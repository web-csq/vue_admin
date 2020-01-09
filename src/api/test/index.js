import { post,postJson,get } from "@/utils/request"
export const listExamBySchoolId=(data)=>
  post({
    url:"/exam/listExamBySchoolId",
    data
  })
export const addExam=(data,headers={})=>
  postJson({
    url:"/exam/addExam",
    data
  },headers)

export const download=(params)=>
  get({
    url:"/common/downloadTheAttachment",
    params
  })

export const listExamSubject=(data)=>
  post({
    url:"/schoolSubject/listExamSubject",
    data
  })
  
export const analysisSubjects=(data)=>
  post({
    url:"/exam/analysisSubjects",
    data
  })

export const listExamInMarkSystem=(data)=>
  post({
    url:"/exam/listExamInMarkSystem",
    data
  })

export const deleteExam=(data)=>
  post({
    url:"/exam/deleteExam",
    data
  })

export const selectExamSchoolTarget=(data)=>
  post({
    url:"/examSchoolTarget/selectExamSchoolTarget",
    data
  })

export const updateExamTarget=(data)=>
  post({
    url:"/examSchoolTarget/updateExamTarget",
    data
  })

export const insertExamTarget=(data)=>
  post({
    url:"/examSchoolTarget/insertExamTarget",
    data
  })

export const listSchoolSubjectsTarget=(data)=>
  post({
    url:"/examSchoolSubjectTarget/listSchoolSubjectsTarget",
    data
  })

export const updateExamSchoolSubjectTarget=(data)=>
  post({
    url:"/examSchoolSubjectTarget/updateExamSchoolSubjectTarget",
    data
  })

export const insertExamSchoolSubjectTarget=(data)=>
  post({
    url:"/examSchoolSubjectTarget/insertExamSchoolSubjectTarget",
    data
  })