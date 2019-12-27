import qs from "qs"
import { post } from "@/utils/request"
const state={
  user:( qs.parse(window.sessionStorage.user)) || [],
  school:( qs.parse(window.sessionStorage.school)) || {},
  uAva:"",
  subjectList:( qs.parse(window.sessionStorage.subjectList)) || [],
  term:(window.sessionStorage.term)|| "",
  token:"",
  classList:( qs.parse(window.sessionStorage.classList)) || [],
  jSessionID:"",
  year:window.sessionStorage.year || ""
}
const mutations={
  GETUSER(state,preload){
    state.user=preload
    window.sessionStorage.user=qs.stringify(preload); 
  },
  GETSCHOOL(state,preload){
    state.school=preload
    window.sessionStorage.school=qs.stringify(preload); 
    return preload
  },
  GETTERM(state,preload){
    state.term=preload
    window.sessionStorage.term=preload; 
  },
  SETCLASSLIST(state,preload){
    state.classList=preload
    window.sessionStorage.classList=qs.stringify(preload); 
  },
  SETSUBJECTLIST(state,preload){
    state.subjectList=preload
    window.sessionStorage.subjectList=qs.stringify(preload); 
  },
  GETYEAR(state,preload){
    state.year=preload
    window.sessionStorage.year=preload; 
  },
  CHANGEUSER(state,preload){
    state.user.truename=preload.truename
    state.user.pic=preload.pic
    window.sessionStorage.user=qs.stringify(state); 
  }
}
const actions={
  async getSchool({ commit }, preload ){
    commit("GETSCHOOL",preload)
    post({
      url:"/common/listDictionaryDataByDictId",
      data:{
        dictId:preload.section
      }
    }).then(res=>{
      commit("SETCLASSLIST",res.data)
    })
    post({
      url:"/common/listDictionaryDataByDictId",
      data:{
        dictId:Number(preload.section)+4 
      }
    }).then(res=>{
      commit("SETSUBJECTLIST",res.data)
    })
  }
}
export default{
  namespaced:true,
  state,
  mutations,
  actions
}