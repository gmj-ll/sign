import request from '../axios/request'

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}