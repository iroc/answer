import mysql from 'mysql'
import config from '../config'

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: config.database,
})

/**
 * [query 执行SQL语句，支持任意SQL语句]
 * @param  {[String]} sql    [sql语句]
 * @param  {Array}  params [参数数据，注重的每一项会被一一对应的填充到SQL语句中的?]
 * @return {[Promise]}        [返回一个Promise对象，需要通过then来接收返回的执行记录]
 */
export function query (sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sql, params, (err, rows) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  })
}
