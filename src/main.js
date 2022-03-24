import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from './api/config'
import './mock'

//第三方包
import ElementUI from 'element-ui'
import qs from 'qs'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//路由拦截，拦截全部路由。每次操作都判断
router.beforeEach(((to, from, next) => {
    const token = localStorage.getItem('token')
    //筛选需要传token的路由，匹配route里面需要登录的路径，如果匹配到就是true
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //根据token是否有，判断是否需要跳到登录页面
        if (token) {
            next();
        } else {
            next('/')
        }
    } else {
        next()
    }
}))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
