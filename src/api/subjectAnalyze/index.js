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

export const subjectResultsClassLevelOne=(data)=>
  post({
    url:"/subjectAnalysisReport/subjectResultsClassLevelOne",
    data
  })

export const subjectResultsClassLevelTwo=(data)=>
  post({
    url:"/subjectAnalysisReport/subjectResultsClassLevelTwo",
    data
  })

export const subjectResultsClassLevelThree=(data)=>
  post({
    url:"/subjectAnalysisReport/subjectResultsClassLevelThree",
    data
  })

export const subjectResultsClassLevelFour=(data)=>
  post({
    url:"/subjectAnalysisReport/subjectResultsClassLevelFour",
    data
  })

export const subjectResultsClassLevelFive=(data)=>
  post({
    url:"/subjectAnalysisReport/subjectResultsClassLevelFive",
    data
  })

export const listExamSubjectAnswer=(data)=>
  post({
    url:"/subjectAnalysisReport/listExamSubjectAnswer",
    data
  })

