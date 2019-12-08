import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '首页', // 文本内容
            },
            {
                text: '班级学情分析',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-notifications-outline',
                        name: 'msg',
                        text: '一班'
                    },
                    {
                        type: 'md-lock',
                        name: 'password',
                        text: '一班'
                    },
                    {
                        type: 'md-person',
                        name: 'userinfo',
                        text: '一班',
                    }
                ]
            }
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store