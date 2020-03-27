import request from '@/plugin/apiEas'

export function getBookList () {
  return request({
    url: '/api/book/all',
    method: 'get'
  })
}
export function getBookInfo (inId) {
  return request({
    url: `/api/book/${inId}`,
    method: 'get'
  })
}
export function addBook (inData) {
  return request({
    url: `/api/book/add`,
    method: 'post',
    data: inData
  })
}
export function delBook(inId) {
  return request({
    url: `/api/book/delete/${inId}`,
    method: 'get'
  })
}
