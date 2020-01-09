import { post,postJson } from "@/utils/request"

/**
 * 校级分析报告模板
 */
// 年级总分排名
export const listStudentExamResultInfo = (data) =>
    post({
        url:'/gradeAnalysis/listStudentExamResultInfo',
        data
    })

// 学科组合分段统计
export const listSubjectCombinationSection = (data,headers={}) =>
postJson({
        url:'/gradeAnalysis/listSubjectCombinationSection',
        data
    },headers)

//总分全体分段统计
export const selectGradeDifSection = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeDifSection',
        data
    })

//班级高低分统计or班级平均分对比
export const selectGradeListClassAvgScoreOrHighLowScore = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassAvgScoreOrHighLowScore',
        data
    })

//总分班级分段统计对比
export const selectGradeListClassDifSection = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassDifSection',
        data
    })

// 进步与退步
export const selectGradeListClassProgressOrRetrogress = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassProgressOrRetrogress',
        data
    })

//总分优秀学生班级分布图
export const selectGradeListClassLevleOne = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleOne',
        data
    })

//  总分良好学生班级分布图
export const selectGradeListClassLevleThree = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleThree',
        data
    })
// 总分及格学生班级分布图
export const selectGradeListClassLevleFive = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleFive',
        data
    })
// 总分学困学生班级分布图
export const selectGradeListClassLevleSix = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleSix',
        data
    })
// 总分准优秀学生班级分布图
export const selectGradeListClassLevleTwo = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleTwo',
        data
    })    
// 总分准良好学生班级分布图
export const selectGradeListClassLevleFour = (data) =>
    post({
        url:'/gradeAnalysis/selectGradeListClassLevleFour',
        data
    })  
// 数据看板
export const dataKanban = (data) =>
    post({
        url:'/gradeAnalysis/dataKanban',
        data
    }) 

// 列出各科最高分
export const listTheHighestScoresInEachSubject = (data) =>
    post({
        url:'/gradeAnalysis/listTheHighestScoresInEachSubject',
        data
    })

// 年级总分排名(含排名筛选)
export const listStudentExamResultInfoByGradeRank = (data) =>
    post({
        url:'/gradeAnalysis/listStudentExamResultInfoByGradeRank',
        data
    })

// 列出各科分数统计信息
export const listEachSubjectScoreInfo = (data) =>
    post({
        url:'/gradeAnalysis/listEachSubjectScoreInfo',
        data
    })