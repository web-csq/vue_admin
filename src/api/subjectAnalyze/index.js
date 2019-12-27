import { post } from "@/utils/request"
export const listExamSchoolSubject=(data)=>
  post({
    url:"/subjectAnalysisReport/listExamSchoolSubject",
    data
  })

export const listExamClassSubject=(data)=>
  post({
    url:"/subjectAnalysisReport/listExamClassSubject",
    data
  })

export const listStudentAnswerSheetDetail=(data)=>
  post({
    url:"/subjectAnalysisReport/listStudentAnswerSheetDetail",
    data
  })