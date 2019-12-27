import {
  post,
  postJson
} from "@/utils/request"

export const subjectAnalysis=(data)=>
  post({
    url:"/studentAnalysisReport/subjectAnalysis",
    data
  })

export const subjectDirection=(data)=>
  post({
    url:"/studentAnalysisReport/subjectDirection",
    data
  })

export const subjectCombinationAnalysis=(data)=>
  post({
    url:"/studentAnalysisReport/subjectCombinationAnalysis",
    data
  })