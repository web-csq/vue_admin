export default{
  namespaced:true,
  state:{
    // 左侧菜单栏数据
    menuItems: [
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
              text:"总分进步学生班级",
            },
            {
              type:"md-add",
              name: 's_total_reg_stu_class', // 要跳转的路由名称 不是路径
              text:"总分退步学生班级",
            }
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
              name: 'stu_subject_trand',
              text: '学科走势'
            },
            {
              type: 'ios-person',
              name: 'stu_score_forecast',
              text: '成绩预测'
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