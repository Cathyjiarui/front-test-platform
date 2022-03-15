export default {
    state: {
        token: localStorage.getItem('token') || '',
        user_name : localStorage.getItem('user_name') || ''
    },
    //同步修改state里面的值
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER_NAME: (state, user_name) => {
            state.user_name = user_name
        }
    },
    //异步调用mutations里面的方法
    //context.commit利用上下文触发mutations某个方法
    //vue代码里面 this.$store.dispatch触发action里面定义的方法
    actions: {
        setToken(content, token) {
            content.commit('SET_TOKEN', token)
        },
        clearToken(content) {
            content.commit('SET_TOKEN', '')
        },
        setUserName(content, user_name){
            content.commit('SET_USER_NAME', user_name)
        },
        clearUserName(content){
            content.commit('SET_USER_NAME','')
        }
    },
    modules: {}
}