import qs from "qs"
const state={
  permissionList: ( qs.parse(window.sessionStorage.permissionList)) || [],
  menuList:( qs.parse(window.sessionStorage.menuList)) || [],
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
    preload[0].url=preload[0].child[0].url
    let list=preload.filter((item)=>{
      return item.name==="智慧分析"
    })
    list=list[0].child
    for(let item of list){
      item.children=item.child
      item.text=item.name
      item.type=item.icon
      delete item.child
      for(let items of item.children){
        items.text=items.name
        items.type=items.icon
        items.name=items.url.substr(1)
      }
    }
    window.sessionStorage.menuList=qs.stringify(list); 
    state.menuList=list
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