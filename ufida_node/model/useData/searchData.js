/**
 *sqlserver Model
 **/
const mssql = require("mssql");
const fs = require('fs')
const {
    config
} = require("../db/tedious");
const {
    json
} = require("express/lib/response");

// 传入sql语句查询数据
let getData = function (s_ql) {
    return new Promise(function (resolve, reject) {
        mssql
            .connect(config)
            .then(function () {
                new mssql.Request()
                    .query(s_ql)
                    .then(function (recordset) {
                        resolve(recordset);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            })
            .catch(function (err) {
                reject(err);
            });
    });

}

// 传入变量以及输入sql语句
let uf_query = async function ({
    start_rq,
    end_rq,
    djbh,
    dwmch,
    username
}) {

    var s_ql = "";
    if (username == '系统管理员') {
        s_ql = " select top 10 a.rq,a.djbh,c.dwmch,a.ywy,a.hsje,b.fapiaoh,b.AttachId as linkurl,'点击下载'as down " +
            " from ksoa.dbo.pf_ckhz a (nolock) ,ksoa.dbo.fapiaogl b (nolock) ,ksoa.dbo.mchk c (nolock)  " +
            " where a.djbh = b.djbh and a.dwbh=c.dwbh and len(AttachId)>0 " +
            " and a.rq >= '" + start_rq + "' and a.rq <= '" + end_rq + "' and a.djbh like '%" + djbh + "%' and c.dwmch like '%" + dwmch + "%'  ";
    } else {
        s_ql = " select top 10 a.rq,a.djbh,c.dwmch,a.ywy,a.hsje,b.fapiaoh,b.AttachId as linkurl,'点击下载'as down " +
            " from ksoa.dbo.pf_ckhz a (nolock) ,ksoa.dbo.fapiaogl b (nolock) ,ksoa.dbo.mchk c (nolock)  " +
            " where a.djbh = b.djbh and a.dwbh=c.dwbh and len(AttachId)>0 " +
            " and a.rq >= '" + start_rq + "' and a.rq <= '" + end_rq + "' and a.djbh like '%" + djbh + "%' and c.dwmch like '%" + username + "%'  ";

    }
    const res = await getData(s_ql)
    fs.writeFileSync('data/search.json', JSON.stringify(res))
    const recordset = JSON.parse(fs.readFileSync('data/search.json')).recordset
    if (recordset.length == 0) {
        return {
            code: 0,
            value: '暂无数据'
        }
    } else {
        return {
            code: 200,
            data: recordset,
            value: '获取数据成功'
        }
    }
}

// 登录查询校验
let userLogin = async function ({
    lgnname,
    kl
}) {
    var s_ql = ''
    lgnname = "'" + lgnname + "'"
    s_ql = `select * from zhiydoc where lgnname = ${lgnname}`
    const res = await getData(s_ql)
    fs.writeFileSync('data/login.json', JSON.stringify(res))
    const recordset = JSON.parse(fs.readFileSync('data/login.json')).recordset

    if (recordset.length == 0) {
        return {
            code: 0,
            value: '用户不存在'
        }
    } else {
        if (recordset[0].kl == kl) {
            return {
                code: 200,
                data: recordset,
                value: '登录成功'
            }
        } else {
            return {
                code: 0,
                value: '密码错误'
            }
        }
    }
}


module.exports = {
    uf_query,
    userLogin
}