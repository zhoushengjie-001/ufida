const sql = require("mssql");

const config = {
    user: "web",
    password: "web_2022",
    server: "207.154.124.10",//已修改
    database: "web",
    port: 1637,//已修改
    encrypt: false
};

module.exports = {
    config
}
