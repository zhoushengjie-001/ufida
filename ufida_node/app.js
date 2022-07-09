const express = require('express')
const app = express()
const history = require('connect-history-api-fallback');
app.use(history())
// 解析请求数据
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// 配置静态资源
app.use(express.static('./public'))



app.use('/catalogue', require('./router/catalogue'))


app.listen('81', () => {
    console.log("81端口已启动！")
})