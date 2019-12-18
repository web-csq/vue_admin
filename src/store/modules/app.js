import qs from "qs"
const state={
  permissionList: ( qs.parse(window.sessionStorage.permissionList)) || []
}
const mutations={
  ADDPERMISSIONLIST(state,preload){
    window.sessionStorage.permissionList=qs.stringify(preload); 
    state.permissionList=preload
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