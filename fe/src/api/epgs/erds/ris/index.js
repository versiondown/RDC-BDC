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
