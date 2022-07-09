const {
    Router
} = require('express')
const router = Router()
const fs = require('fs')
const svg = require('../model/plugin_node/svgCaptcha')
const {
    uf_query,
    userLogin
} = require('../model/useData/searchData')

// 获取搜索数据
router.post('/getData', async (req, res) => {
    const result = await uf_query(req.body)
    res.send(result)


})

// 登录获取数据
router.post('/userlogin', async (req, res) => {
    const result = await userLogin(req.body)
    res.send(result)
})

// 发送验证码
router.get('/getVerifycode', (req, res) => {
    const {
        text,
        data
    } = svg()
    if (!text || !data) {
        res.send({
            code: 0,
            value: '验证码获取失败'
        })
    } else {
        res.send({
            code: 200,
            data: {
                text,
                data
            },
            value: '验证码获取成功'
        })
    }

})

module.exports = router