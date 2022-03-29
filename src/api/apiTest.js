import axios from './config';

export const getApiList = (token, page, size, caseSerial) => axios.get('/api/pri/api_test_case/api_list', {
    params: {
        page: page,
        size: size,
        caseSerial: caseSerial
    },
    headers: {
        token
    }
})

export const delApiById = (token, id) => axios.delete('/api/pri/api_test_case/delete_api',
    {
        params:{
            id: id
        },
        headers:{
            token
        }
    })