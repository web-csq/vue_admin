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
  },
  'subject_exec_stu_class': {
    path: 'subject_exec_stu_class',
    name: 'subject_exec_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Exec_stu_class')
  },
  'subject_subexec_stu_class': {
    path: 'subject_subexec_stu_class',
    name: 'subject_subexec_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Subexec_stu_class')
  },
  'subject_well_stu_class': {
    path: 'subject_well_stu_class',
    name: 'subject_well_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Well_stu_class')
  },
  'subject_subwell_stu_class': {
    path: 'subject_subwell_stu_class',
    name: 'subject_subwell_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Subwell_stu_class')
  },
  'subject_pass_stu_class': {
    path: 'subject_pass_stu_class',
    name: 'subject_pass_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Pass_stu_class')
  },
  'subject_diffi_stu_class': {
    path: 'subject_diffi_stu_class',
    name: 'subject_diffi_stu_class',
    component: () => import('@/views/SubjectExamAnalyze/Diffi_stu_class')
  }
}