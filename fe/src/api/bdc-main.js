import request from '@/plugin/apiEas'

export function getTodoList () {
  return request({
    url: '/api/todo/all',
    method: 'get',
  })
}
