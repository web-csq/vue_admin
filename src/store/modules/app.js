import qs from "qs"
const state={
  permissionList: ( qs.parse(window.sessionStorage.permissionList)) || [],
  examType:[
    {
      id:1,
      value:"班级考试"
    },
    {
      id:2,
      value:"年级考试"
    },
    {
      id:3,
      value:"联考"
    }
  ],
  analyzeExam:( qs.parse(window.sessionStorage.analyzeExam)) || {},
  classList:( qs.parse(window.sessionStorage.classList)) || []
}
const mutations={
  ADDPERMISSIONLIST(state,preload){
    window.sessionStorage.permissionList=qs.stringify(preload); 
    state.permissionList=preload
  },
  ADDANALYZEEXAM(state,preload){
    window.sessionStorage.analyzeExam=qs.stringify(preload); 
    state.analyzeExam=preload
  },
  SETCLASSLIST(state,preload){
    state.classList=preload
    window.sessionStorage.classList=qs.stringify(preload); 
  }
}
const actions={

}
export default{
  namespaced:true,
  state,
  mutations,
  actions
}