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

  //班级总分进步学生or班级总分退步学生
export const selectGradeListClassProgressOrRetrogress = (data) =>
  post({
    data,
    url:"/classAnalysisReport/selectGradeListClassProgressOrRetrogress"
  })

  // 班级学科整体分析
export const selectClassSubjectsAnalysis = (data) =>
  post({
    data,
    url:"/classAnalysisReport/selectClassSubjectsAnalysis"
  })
  //总分准良好学生班级分布图
  export const selectGradeListClassLevleFour = (data) =>
  post({
    data,
    url:"/classAnalysisReport/selectGradeListClassLevleFour"
  })
    //总分准优秀学生班级分布图
    export const selectGradeListClassLevleTwo = (data) =>
    post({
      data,
      url:"/classAnalysisReport/selectGradeListClassLevleTwo"
    })