import request from '../axios/request'

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export function getTags() {
  return request({
    url: '/tags/getTags',
    method: 'get',
  })
}

export function addTags(data) {
  return request({
    url: '/tags/addTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function deleteTags(data) {
  return request({
    url: '/tags/deleteTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function updateTags(data) {
  return request({
    url: '/tags/updateTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function save(data) {
  return request({
    url: '/save',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}
