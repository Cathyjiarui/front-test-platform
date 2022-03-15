import Mock from 'mockjs'
import userManageApi from './userManage'
import userApi from "@/mock/user";

//设置延时(200 - 2000毫秒)
Mock.setup({
    timeout: '200 - 2000'
})

//首页相关
Mock.mock(/\/userManage\/getData/,'get', userManageApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)