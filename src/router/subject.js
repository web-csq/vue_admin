export const subjectRoutes={
  'subject_total_distribution': {
    path: 'subject_total_distribution',
    name: 'subject_total_distribution',
    component: () => import('@/views/SubjectExamAnalyze/Total_distribution')
  },
  'subject_class_comparison': {
    path: 'subject_class_comparison',
    name: 'subject_class_comparison',
    component: () => import('@/views/SubjectExamAnalyze/Class_comparison')
  },
  'subject_question_score': {
    path: 'subject_question_score',
    name: 'subject_question_score',
    component: () => import('@/views/SubjectExamAnalyze/Question_score')
  },
  'subject_question_score_class': {
    path: 'subject_question_score_class',
    name: 'subject_question_score_class',
    component: () => import('@/views/SubjectExamAnalyze/Question_score_class')
  }
}