/**
 * 获取相关数据方法整合
 */
import axios from './config'
import {toKey} from "core-js/internals/reflect-metadata";

/**
 * 登录接口
 * @param name 用户名
 * @param pwd 密码
 */
export const loginApi = (name, pwd) => axios.post('/api/v1/pri/user/login', {
    name,
    pwd
})

/**
 * 获取用户列表
 * @param token
 * @param page 当前页
 * @param size 每页大小
 * @param name 用户名
 */
export const getUserListApi = (token, page, size, name) => axios.get('/api/v1/pri/user/user_list', {
    params: {
        page: page,
        size: size,
        userName: name
    },
    headers: {
        token
    }
})

/**
 * 添加用户
 * @param token
 * @param name 用户名
 * @param mail_box 邮箱
 * @param age 年龄
 * @param department 部门
 * @param position 职位
 * @param pwd 密码
 */
export const addUserApi = (token, name, mail_box, age, department, position, pwd) => axios.post('/api/v1/pri/user/save_user',
    {
        'name': name,
        'pwd': pwd,
        'mail_box': mail_box,
        'age': age,
        'department': department,
        'position': position
    },
    {
        headers: {
            token
        }
    }
)

/**
 * 更新用户
 * @param token
 * @param id 用户ID
 * @param name 用户名
 * @param mail_box 邮箱
 * @param age 年龄
 * @param department 部门
 * @param position 职位
 */
export const updateUserApi = (token, id, name, mail_box, age, department, position) => axios.put('/api/v1/pri/user/update_user',
    {
        'id': id,
        'name': name,
        'mail_box': mail_box,
        'age': age,
        'department': department,
        'position': position
    },
    {
        headers: {
            token
        }
    })

/**
 * 删除用户
 * @param token
 * @param id 用户ID
 */
export const deleteUserApi = (token, id) => axios.delete('/api/v1/pri/user/delete_user',
    {
        params: {
            id: id
        },
        headers: {
            token
        }
    })

/**
 * 根据Token获取用户信息
 * @param token
 */
export const getUserByToken = (token) => axios.get('/api/v1/pri/user/find_by_token',
    {
        headers: {
            token
        }
    })

/**
 * 查询未结束的测试任务
 * @param token
 * @param page 当前页
 * @param size 每页大小
 */
export const getNotOverTestCase = (token, page, size) => axios.get('/api/v1/pri/story/not_over_case',
    {
        params: {
            page,
            size
        },
        headers: {
            token
        }
    })

/**
 * 更新测试任务领用状态
 * @param token
 * @param id 测试任务ID
 * @param receive 领用状态
 * @param user_name 用户名
 */
export const updateTestCaseReceive = (token, id, receive, user_name) => axios.put('/api/v1/pri/story/update_case_by_id',
    {
        id: id,
        receive: receive,
        user_name: user_name
    },
    {
        headers: {
            token
        }
    })

/**
 * 更新测试任务重要状态
 * @param token
 * @param id 测试任务ID
 * @param is_important 重要程度
 */
export const updateTestCaseIsImportant = (token, id, is_important) => axios.put('/api/v1/pri/story/update_case_by_id',
    {
        id: id,
        is_important: is_important
    },
    {
        headers: {
            token
        }
    })
/**
 * 更新测试任务
 * @param token
 * @param id 测试任务ID
 * @param story_content 故事内容
 * @param association_story_point
 * @param git_address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateTestCase = (token, id, story_content, association_story_point, git_address) => axios.put('/api/v1/pri/story/update_case_by_id',
    {
        id: id,
        story_content: story_content,
        association_story_point: association_story_point,
        git_address: git_address
    },
    {
        headers: {
            token
        }
    })

/**
 * 结束测试任务
 * @param token
 * @param id 测试任务ID
 * @param test_over 结束
 */
export const testCaseOver = (token, id, test_over) => axios.put('/api/v1/pri/story/update_case_by_id',
    {
        id: id,
        test_over: test_over
    },
    {
        headers: {
            token
        }
    })

/**
 * 插入新的测试任务
 * @param token
 * @param story_content 故事内容
 * @param association_story_point 关联故事点
 * @param git_address Git地址
 */
export const insertTestCaseOver = (token, story_content, association_story_point, git_address) => axios.post('/api/v1/pri/story/insert_test_case',
    {
        story_content: story_content,
        association_story_point: association_story_point,
        git_address: git_address,
        receive: 0,
        test_over: 0,
        is_important: 0
    }, {
        headers: {
            token
        }
    })

export const findTestCaseByAssociationStoryPoint = (token, associationStoryPoint) => axios.get('/api/v1/pri/story/find_testCase_by_association_story_point',
    {
        params:{
            association_story_point : associationStoryPoint
        },
        headers:{
            token
        }
    })

/**
 * 获取小动物列表
 * @param current 当前页
 * @param size 每页大小
 * @param disposition 用户名
 */
export const getAnimalListApi = (current, size, disposition) => axios.get('/api/v1/pro/animal_forest_islander/getAll', {
    params: {
        current: current,
        size: size,
        disposition: disposition
    }
})

/**
 * 获取测试状态
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const testSituation = (token) => axios.get('/api/v1/pri/story/testSituation',
    {
        headers:{
            token
        }
    })

/**
 * 获取年内每月数据
 * @param token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const annualReport = (token) => axios.get('/api/v1/pri/story/annualReport',
    {
        headers:{
            token
        }
    })