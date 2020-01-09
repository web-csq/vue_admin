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

export const totalScoreRankTrack=(data)=>
  post({
    url:"/studentAnalysisReport/totalScoreRankTrack",
    data
  })

export const totalScoreAndRanking=(data)=>
  post({
    url:"/studentAnalysisReport/totalScoreAndRanking",
    data
  })