import request from '@/plugin/apiEas'

export function getBookList () {
  return request({
    url: '/api/book/all',
    method: 'get',
  })
}
