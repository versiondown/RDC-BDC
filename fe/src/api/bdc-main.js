import request from '@/plugin/connectEps'

export function getTodoList () {
  return request({
    url: '/api/todo/all',
    method: 'get',
  })
}
