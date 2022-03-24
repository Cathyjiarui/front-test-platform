/**
 * 加解密请求
 */
import axios from './config'

export const encryption = (str) => axios.get('/api/vi/pro/encryptionAndDecryption/encryption',
    {
        params:{
            str
        }
    })

export const decryption = (str) => axios.get('/api/vi/pro/encryptionAndDecryption/decryption',
    {
        params:{
            str
        }
    })

