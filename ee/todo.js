// ================ 初始化:环境准备 ================
/*
* TODO: 初始化: 环境准备
*   fs: NodeJS的文件管理功能
*   express:  Web 应用框架
*   body-parser: HTTP 请求解析中间件
*   cors: 解决跨域问题
*   zlog: 自定义调试命令
 */
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const zlog = console.log.bind(console)

// ================ 初始化: 基本内容创建 ================
/*
* TODO: 初始化: 基本内容创建
*   创建 express 实例
*   配置静态文件目录
*   配置跨域
*   解析前端请求中的 JSON 数据
 */
const app = express()
app.use(express.static('static'))
app.use(cors())
app.use(bodyParser.json())

// ================ 工作区: 文件操作 ================
/*
* TODO: 文件操作
*   loadTodos: 加载待办列表
*   saveTodos: 保存代办
*   todoList: 直接调取当前待办列表
*   sendHtml: 发送 HTML 内容
*   sendJSON: 发送 JSON 内容
*   abort: 发送操作终止信息
*   todoAdd: 待办添加
*   todoEdit: 待办编辑
*   todoDelete: 待办删除
*   todoFetchById: 根据 id 获取指定待办信息
*/
const loadTodos = () => {
    let data = fs.readFileSync('todos.json')
    let todos = JSON.parse(data)
    return todos
}
const saveTodos = (inTodos) => {
    let s = JSON.stringify(inTodos, null, 2)
    fs.writeFileSync('todos.json', s)
}
const todoList = loadTodos()
const sendHtml = (path, res) => {
    let options = {
        encoding: 'utf-8',
    }

    fs.readFile(path, options, (err, data) => {
        zlog(`--->读取 HTML 文件 ${path} 内容是: `, typeof data)
        res.send(data)
    })
}
const sendJSON = (data, res) => {
    let r = JSON.stringify(data, null, 2)
    res.send(r)
}
const abort = (res, code) => {
    let mapper = {
        400: 'Bad Request.',
        404: 'Not Found.',
    }

    let text = mapper[code]
    res.status(code).send(text)
}
const todoAdd = (inTodo) => {
    if (todoList.length === 0) {
        inTodo.id = 1
    } else {
        let tailItem = todoList[todoList.length - 1]
        inTodo.id = tailItem.id + 1
    }

    let  now = Date.now()
    inTodo.timeCreate = now
    inTodo.timeUpdate = now
    inTodo.done = false
    todoList.push(inTodo)
    saveTodos(todoList)
    return  inTodo
}
const todoEdit = (inId, inTodo) => {
    let id = Number(inId)
    let todo = todoList.find(e => e.id === id)
    if (todo === undefined) {
        return {}
    } else {
        todo.timeUpdate = Date.now()
        Object.entries(inTodo).forEach(item => {
            let [key, value] = item
            todo[key] = value
        })
        // 另一种写法
        // Object.entries(inTodo).forEach([key, value] => todo[key] = value)

        saveTodos(todoList)
        return todo
    }
}
const todoDelete = (inId) => {
    id = Number(id)
    let index = todoList.findIndex(e => e.id === id)
    if ( index > -1) {
        let t = todoList.splice(index, 1)[0]
        saveTodos(todoList)
        return  t
    } else {
        return {}
    }
}
const todoFetch = (inId) => {
    let id = Number(inId)
    let todo = todoList.find(e => e.id === id)
    if (todo === undefined) {
        return {}
    } else {
        return  todo
    }
}

// ================ 工作区: 网络请求操作 ================
/*
* TODO: 网络请求操作
*   /: 进入首页
*   /api/todo/all: 获取所有待办
*   /api/todo/add: 待办新建
*   /api/todo/edit/:id: 待办编辑
*   /api/todo/delete/:id: 待办删除
*   /api/todo/:id: 待办查询
*/
app.get('/', (req, res) => {
    zlog(`===>Network | / | `)
})
app.get('/api/todo/all', (req, res) => {
    zlog(`===>Network | /api/todo/all | ${todoList}`)
    sendJSON(todoList, res)
})
app.post('/api/todo/add', (req, res) => {
    zlog(`===>Network | /api/todo/add | req.body`)
    let inTodo = req.body
    let todo = todoAdd(inTodo)
    sendJSON(todo, res)
})
app.post('/api/todo/edit/:id', (req, res) => {
    zlog(`===>Network | /api/todo/edit/:id | `)
    let inId = req.params.id
    let inTodo = req.body
    let todo = todoEdit(id, inTodo)
    sendJSON(todo, res)
})
app.get('/api/todo/delete/:id', (req, res) => {
    zlog(`===>Network | /api/todo/delete/:id | `)
    let id = req.params.id
    let todo = todoDelete(id)
    sendJSON(todo, res)
})
app.get('/api/todo/:id', (req, res) => {
    let id = req.params.id
    let todo = todoFetch(id)
    sendJSON(todo, res)
})

// ================ 调度区: 任务调度 ================
/*
* TODO: 任务调度
 */
const main = () => {
    let server = app.listen(8095, 'localhost', () => {
        let host = server.address().address
        let port = server.address().port

        zlog(`===>Server | Start | http://${host}:${port}`)
    })
}

if ( require.main === module) {
    main()
}
