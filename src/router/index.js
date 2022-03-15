import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/Login/Login')
    },
    {
        path: '/404',
        name: 'notFound',
        component: () => import('@/views/404')
    },
    {
        path: '/Main',
        component: () => import('@/views/Main'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home/Home'),
                meta: {requiresAuth: true}
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/User/User'),
                meta: {requiresAuth: true}
            },
            {
                path: '/casePush',
                name: 'casePush',
                component: () => import('@/views/CasePush/CasePush'),
                meta: {requiresAuth: true}
            },
            {
                path: '/coreCustomers',
                name: 'coreCustomers',
                component: () => import('@/views/CoreCustomers/CoreCustomers'),
                meta: {requiresAuth: true}
            },
            {
                path: '/coreLibrary',
                name: 'coreLibrary',
                component: () => import('@/views/CoreLibrary/CoreLibrary'),
                meta: {requiresAuth: true}
            },
            {
                path: '/encryptionAndDecryption',
                name: 'encryptionAndDecryption',
                component: () => import('@/views/EncryptionAndDecryption/EncryptionAndDecryption'),
                meta: {requiresAuth: true}
            },
            {
                path: '/monthlyReport',
                name: 'monthlyReport',
                component: () => import('@/views/MonthlyReport/MonthlyReport'),
                meta: {requiresAuth: true}
            },
            {
                path: '/serverManagement',
                name: 'serverManagement',
                component: () => import('@/views/ServerManagement/ServerManagement'),
                meta: {requiresAuth: true}
            },
            {
                path: '/testingStatus',
                name: 'testingStatus',
                component: () => import('@/views/TestingStatus/TestingStatus'),
                meta: {requiresAuth: true}
            },
            {
                path: '/userManage',
                name: 'userManage',
                component: () => import('@/views/UserManage/UserManage'),
                meta: {requiresAuth: true}
            },
            {
                path: '/animal',
                name: 'animal',
                component: () => import('@/views/animal/animal')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
