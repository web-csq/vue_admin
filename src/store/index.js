import Vue from 'vue'
import Vuex from 'vuex'
import app from "./modules/app"
import router from "./modules/router"
import user from "./modules/user"
import getters from "./getters"
Vue.use(Vuex)
const store = new Vuex.Store({
    getters,
    modules:{
      app,
      router,
      user
    }
})

export default store