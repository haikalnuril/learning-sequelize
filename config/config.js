const dotenv = require("dotenv")
dotenv.config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const host = process.env.HOST

module.exports = {
  "development": {
    "username": `${username}`,
    "password": `${password}`,
    "database": `${database}`,
    "host": `${host}`,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
