import { Sequelize } from "sequelize"

const DB_NAME = 'filmes_db'
const DB_USER = 'root'
const DB_PASSWORD = '0000'
const DB_HOST = 'localhost'
const DB_DIALECT = 'mysql'

export default new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT
    }
)