import {
  post
} from "@/utils/request"

export const listExamClass = (data) =>
  post({
    data,
    url:"/classAnalysisReport/listExamClass"
  })
  
export const listStudentTotalScoreGroupByClass = (data) =>
  post({
    data,
    url:"/classAnalysisReport/listStudentTotalScoreGroupByClass"
  })
  
export const listStudentExamResultInfo = (data) =>
  post({
    data,
    url:"/classAnalysisReport/listStudentExamResultInfo"
  })

export const listStudentScoreGroupByClass = (data) =>
  post({
    data,
    url:"/classAnalysisReport/listStudentScoreGroupByClass"
  })