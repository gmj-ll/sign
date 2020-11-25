import axios from 'axios'

const service = axios.create({
  baseURL: 'http://139.196.85.119:3000/',
  // withCredentials: true,
  timeout: 5000,
  headers: {
    post: {
        "Content-Type": "multipart/form-data"
    }
},
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    // 与后端约定的错误码
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service

