export const classRoutes={
  'c_class_class_distribute': {
    path: 'c_class_class_distribute',
    name: 'c_class_class_distribute',
    component: () => import('../views/ClassExamAnalyze/Class_class_distribute')
  },
  'c_class_total_subsection': {
    path: 'c_class_total_subsection',
    name: 'c_class_total_subsection',
    component: () => import('../views/ClassExamAnalyze/Class_total_subsection.vue')
  },
  'c_class_total_ranking': {
    path: 'c_class_total_ranking',
    name: 'c_class_total_ranking',
    component: () => import('../views/ClassExamAnalyze/Class_total_ranking.vue')
  },
  'c_class_subject_analyze': {
    path: 'c_class_subject_analyze',
    name: 'c_class_subject_analyze',
    component: () => import('../views/ClassExamAnalyze/Class_subject_analyze.vue')
  },
  'c_class_total_pro_stu': {//进步
    path: 'c_class_total_pro_stu',
    name: 'c_class_total_pro_stu',
    component: () => import('../views/ClassExamAnalyze/Class_total_progress_student.vue')
  },
  'c_class_total_reg_stu': {//退步
    path: 'c_class_total_reg_stu',
    name: 'c_class_total_reg_stu',
    component: () => import('../views/ClassExamAnalyze/Class_total_regress_student.vue')
  },
  'c_totall_subject_stu_analyze': {//全体学科学生分析
    path: 'c_totall_subject_stu_analyze',
    name: 'c_totall_subject_stu_analyze',
    component: () => import('../views/ClassExamAnalyze/Totall_subject_stu_analyze.vue')
  },
  'c_class_by_subject_excellent_stu': {//班级分析学科准优秀生
    path: 'c_class_by_subject_excellent_stu',
    name: 'c_class_by_subject_excellent_stu',
    component: () => import('../views/ClassExamAnalyze/Class_by_subject_excellent_stu.vue')
  },
  'c_class_by_subject_good_stu': {//班级分析学科准良好生
    path: 'c_class_by_subject_good_stu',
    name: 'c_class_by_subject_good_stu',
    component: () => import('../views/ClassExamAnalyze/Class_by_subject_good_stu.vue')
  }

}