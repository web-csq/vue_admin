import qs from "qs"
export default{
  namespaced:true,
  state:{
    // 左侧菜单栏数据
    menuItems: 
    [
      {
          size: 18, // icon大小
          type: 'md-home', // icon类型
          text: '校级分析报告', // 文本内容
          children:[
            {
              type:"md-add",
              name: 'home', // 要跳转的路由名称 不是路径
              text:"数据看板"
            },
            {
              type:"md-add",
              name: 's_total_total_subction', // 要跳转的路由名称 不是路径
              text:"总分全体分段统计"
            },
            {
              type:"md-add",
              name: 's_class_group_subction', // 要跳转的路由名称 不是路径
              text:"学科组合分段统计",
            },
            {
              type:"md-add",
              name: 's_total_class_subction', // 要跳转的路由名称 不是路径
              text:"总分班级分段统计对比",
            },
            {
              type:"md-add",
              name: 's_class_avg', // 要跳转的路由名称 不是路径
              text:"班级平均分对比",
            },
            {
              type:"md-add",
              name: 's_class_height_low', // 要跳转的路由名称 不是路径
              text:"班级高低分统计",
            },
            {
              type:"md-add",
              name: 's_total_all_ranking', // 要跳转的路由名称 不是路径
              text:"总分全体排名",
            },
            {
              type:"md-add",
              name: 's_total_pro_stu_class', // 要跳转的路由名称 不是路径
              text:"总分绝对进(退)步学生",
            },
            {
              type:"md-add",
              name: 's_total_reg_stu_class', // 要跳转的路由名称 不是路径
              text:"总分相对进(退)步学生",
            },
            {
              type:"md-add",
              name: 's_total_score_excellent_stu', // 要跳转的路由名称 不是路径
              text:"总分优秀学生班级",
            },
            {
              type:"md-add",
              name: 's_total_score_quasi_excellent_stu', // 要跳转的路由名称 不是路径
              text:"总分准优秀学生班级",
            },
            {
              type:"md-add",
              name: 's_total_score_good_stu', // 要跳转的路由名称 不是路径
              text:"总分良好学生班级",
            },
            {
              type:"md-add",
              name: 's_total_score_quasi_good_stu', // 要跳转的路由名称 不是路径
              text:"总分准良好学生班级",
            },
            {
              type:"md-add",
              name: 's_total_score_pass_stu', // 要跳转的路由名称 不是路径
              text:"总分及格学生班级",
            },
            {
              type:"md-add",
              name: 's_total_score_hard_stu', // 要跳转的路由名称 不是路径
              text:"总分学困学生班级",
            },
          ]
      },
      {
          text: '班级分析报告',
          type: 'ios-paper',
          children: [
              {
                  type: 'ios-link',
                  name: 'c_class_class_distribute',
                  text: '年级班级总分分布'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_total_subsection',
                  text: '班级总分分段分布'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_total_ranking',
                  text: '班级总分排名'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_subject_analyze',
                  text: '班级学科分析'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_total_pro_stu',
                  text: '班级进步学生'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_total_reg_stu',
                  text: '班级退步学生'
              },
              {
                  type: 'ios-link',
                  name: 'c_totall_subject_stu_analyze',
                  text: '全体学科学生分析'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_by_subject_excellent_stu',
                  text: '班级分析学科准优秀生'
              },
              {
                  type: 'ios-link',
                  name: 'c_class_by_subject_good_stu',
                  text: '班级分析学科准良好生'
              }
            ]
          },
          {
            text:"学科分析报告",
            type:"md-help-buoy",
            children:[
              {
                type:"ios-leaf-outline",
                name:"subject_total_distribution",
                text:"学科成绩总体分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_class_comparison",
                text:"学科成绩班级对比"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_question_score",
                text:"学科小题得分分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_question_score_class",
                text:"学科小题得分班级统计",
                hidden:true
              },
              {
                type:"ios-leaf-outline",
                name:"subject_exec_stu_class",
                text:"学科成绩优秀学生班级分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_subexec_stu_class",
                text:"学科成绩准优秀学生班级分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_well_stu_class",
                text:"学科成绩良好学生班级分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_subwell_stu_class",
                text:"学科成绩准良好学生班级分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_pass_stu_class",
                text:"学科成绩及格学生班级分布"
              },
              {
                type:"ios-leaf-outline",
                name:"subject_diffi_stu_class",
                text:"学科成绩学困生班级分布"
              }
            ]
          },
          {
            text: '学生分析报告',
            type: 'md-contacts',
            children: [
                {
                    type: 'ios-person',
                    name: 'stu_total_ranking',
                    text: '总分与名次'
                },
                {
                  type: 'ios-person',
                  name: 'stu_subject_analyze',
                  text: '学科分析'
                },
                {
                  type: 'ios-person',
                  name: 'stu_group_subject',
                  text: '学科组合分析'
                },
                {
                  type: 'ios-person',
                  name: 'stu_subject_trand',
                  text: '学科走势'
                },
                {
                  type: 'ios-person',
                  name: 'stu_score_forecast',
                  text: '成绩预测'
                },
                {
                  type: 'ios-person',
                  name: 'stu_total_sustain',
                  text: '总分成绩预测'
                }
            ]
          }
        ],
  },
  mutations:{
    setMenus(state, items) {
      state.menuItems = [...items]
    }
  }
}