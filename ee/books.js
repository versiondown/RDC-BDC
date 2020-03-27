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

// ================ 工作区: 网络通信 ================
/*
* TODO: 网络通信
*   sendHtml: 发送 HTML 内容
*   sendJSON: 发送 JSON 内容
*   abort: 发送操作终止信息
*/
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

// ================ 工作区: 账户管理 ================
/*
* TODO: 账户管理
*   loadBooks: 加载列表
*   saveBooks: 保存书籍
*   bookList: 直接调取当前书籍列表
*   sendHtml: 发送 HTML 内容
*   sendJSON: 发送 JSON 内容
*   abort: 发送操作终止信息
*   bookAdd: 书籍添加
*   bookEdit: 书籍编辑
*   bookDelete: 书籍删除
*   bookFetchById: 根据 id 获取指定书籍信息
*/

// ================ 工作区: 文件操作 ================
/*
* TODO: 文件操作
*   loadBooks: 加载书籍列表
*   saveBooks: 保存书籍
*   bookList: 直接调取当前书籍列表
*   sendHtml: 发送 HTML 内容
*   sendJSON: 发送 JSON 内容
*   abort: 发送操作终止信息
*   bookAdd: 书籍添加
*   bookEdit: 书籍编辑
*   bookDelete: 书籍删除
*   bookFetchById: 根据 id 获取指定书籍信息
*/
const loadBooks = () => {
    let data = fs.readFileSync('books.json')
    let books = JSON.parse(data)
    return books
}
const saveBooks = (inBooks) => {
    let s = JSON.stringify(inBooks, null, 2)
    fs.writeFileSync('books.json', s)
}
const bookList = loadBooks()
const bookAdd = (inBook) => {
    if (bookList.length === 0) {
        inBook.id = 1
    } else {
        let tailItem = bookList[bookList.length - 1]
        inBook.id = tailItem.id + 1
    }

    let  now = Date.now()
    inBook.timeCreate = now
    inBook.timeUpdate = now
    inBook.progress = `0/${String(inBook.progress)}`
    inBook.done = false
    bookList.push(inBook)
    saveBooks(bookList)
    return  inBook
}
const bookEdit = (inId, inBook) => {
    let id = Number(inId)
    let book = bookList.find(e => e.id === id)
    if (book === undefined) {
        return {}
    } else {
        book.timeUpdate = Date.now()
        Object.entries(inBook).forEach(item => {
            let [key, value] = item
            book[key] = value
        })
        // 另一种写法
        // Object.entries(inBook).forEach([key, value] => book[key] = value)

        saveBooks(bookList)
        return book
    }
}
const bookDelete = (inId) => {
    id = Number(inId)
    let index = bookList.findIndex(e => e.id === id)
    if ( index > -1) {
        let t = bookList.splice(index, 1)[0]
        saveBooks(bookList)
        return  t
    } else {
        return {}
    }
}
const bookFetch = (inId) => {
    let id = Number(inId)
    let book = bookList.find(e => e.id === id)
    if (book === undefined) {
        return {}
    } else {
        return  book
    }
}

// ================ 工作区: 网络请求操作 ================
/*
* TODO: 网络请求操作
*   /: 进入首页
*   /api/book/all: 获取所有书籍
*   /api/book/add: 书籍新建
*   /api/book/edit/:id: 书籍编辑
*   /api/book/delete/:id: 书籍删除
*   /api/book/:id: 书籍查询
*/
app.get('/', (req, res) => {
    zlog(`===>Network | / | `)
})
app.get('/api/book/all', (req, res) => {
    zlog(`===>Network | /api/book/all | ${bookList}`)
    sendJSON(bookList, res)
})
app.post('/api/book/add', (req, res) => {
    zlog(`===>Network | /api/book/add | ${JSON.stringify(req.body)}`)
    let inBook = req.body
    let book = bookAdd(inBook)
    sendJSON(book, res)
})
app.post('/api/book/edit/:id', (req, res) => {
    zlog(`===>Network | /api/book/edit/:id | `)
    let inId = req.params.id
    let inBook = req.body
    let book = bookEdit(id, inBook)
    sendJSON(book, res)
})
app.get('/api/book/delete/:id', (req, res) => {
    zlog(`===>Network | /api/book/delete/:id | `)
    let id = req.params.id
    let book = bookDelete(id)
    sendJSON(book, res)
})
app.get('/api/book/:id', (req, res) => {
    let id = req.params.id
    let book = bookFetch(id)
    sendJSON(book, res)
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
