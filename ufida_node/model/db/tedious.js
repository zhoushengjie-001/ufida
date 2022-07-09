const sql = require("mssql");

const config = {
    user: "web",
    password: "web_2022",
    server: "219.156.133.10",
    database: "web",
    port: 1433,
    encrypt: false
};

module.exports = {
    config
}