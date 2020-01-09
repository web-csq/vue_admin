export const stuRoutes={
  'stu_total_ranking': {
    path: 'stu_total_ranking',
    name: 'stu_total_ranking',
    component: () => import('@/views/StuExamAnalyze/Total_ranking')
  },
  'stu_subject_analyze': {
    path: 'stu_subject_analyze',
    name: 'stu_subject_analyze',
    component: () => import('@/views/StuExamAnalyze/Subject_analyze.vue')
  },
  'stu_score_forecast': {
    path: 'stu_score_forecast',
    name: 'stu_score_forecast',
    component: () => import('@/views/StuExamAnalyze/Score_forecast.vue')
  },
  'stu_subject_trand': {
    path: 'stu_subject_trand',
    name: 'stu_subject_trand',
    component: () => import('@/views/StuExamAnalyze/Subject_trand.vue')
  },
  'stu_group_subject': {
    path: 'stu_group_subject',
    name: 'stu_group_subject',
    component: () => import('@/views/StuExamAnalyze/Group_subject.vue')
  },
  'stu_total_sustain': {
    path: 'stu_total_sustain',
    name: 'stu_total_sustain',
    component: () => import('@/views/StuExamAnalyze/Total_sustain_after.vue')
  },
}