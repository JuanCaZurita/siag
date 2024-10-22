const { password, database, host } = require("pg/lib/defaults");

module.exports = {
    develoment: {
        username: "siag",
        password: "desa",
        database: "agricola",
        host: "localhost",
        port: "5433",
        dialect: "postgres"
    }
}